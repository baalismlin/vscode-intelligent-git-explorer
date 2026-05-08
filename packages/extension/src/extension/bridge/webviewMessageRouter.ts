import * as vscode from "vscode";
import { SelectionState } from "@intellij-git-log/contracts/gitLogModels";
import {
  CommitDetailViewModel,
  CommitListItemViewModel
} from "@intellij-git-log/contracts/gitLogViewModels";
import {
  extensionToWebviewMessageSchema,
  ExtensionToWebviewMessage,
  webviewToExtensionMessageSchema
} from "@intellij-git-log/contracts/gitLogProtocol";
import { GitLogApplicationService } from "#application/gitLogApplicationService";
import { outputLogger } from "#extension/logging/outputLogger";

export class WebviewMessageRouter {
  private readonly panel: vscode.WebviewPanel;
  private readonly service: GitLogApplicationService;
  private readonly onStateChanged?: () => void;
  private readonly onStateCleared?: () => PromiseLike<void> | void;
  private readonly disposables: vscode.Disposable[] = [];

  public constructor(
    panel: vscode.WebviewPanel,
    service: GitLogApplicationService,
    onStateChanged?: () => void,
    onStateCleared?: () => PromiseLike<void> | void
  ) {
    this.panel = panel;
    this.service = service;
    this.onStateChanged = onStateChanged;
    this.onStateCleared = onStateCleared;

    this.disposables.push(
      this.panel.webview.onDidReceiveMessage(async (rawMessage) => {
        outputLogger.info(`Message received from webview: ${safeJson(rawMessage)}`);
        const result = webviewToExtensionMessageSchema.safeParse(rawMessage);
        if (!result.success) {
          outputLogger.error(`Invalid message from webview: ${result.error.message}`);
          void this.postMessage({
            type: "errorOccurred",
            payload: { message: "Invalid message from webview." }
          });
          return;
        }

        try {
          await this.handleMessage(result.data);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          if (result.data.type === "ready" && isInvalidPersistedStateError(message)) {
            outputLogger.warn(`Clearing persisted state after bootstrap failure: ${message}`);
            this.service.resetPersistedState();
            await this.onStateCleared?.();
            await this.handleMessage(result.data);
            return;
          }

          outputLogger.error(`Failed to handle message ${result.data.type}: ${message}`);
          await this.postMessage({
            type: "loadingStateChanged",
            payload: { area: "refs", isLoading: false }
          });
          await this.postMessage({
            type: "loadingStateChanged",
            payload: { area: "commits", isLoading: false }
          });
          await this.postMessage({
            type: "loadingStateChanged",
            payload: { area: "details", isLoading: false }
          });
          await this.postMessage({
            type: "errorOccurred",
            payload: { message }
          });
        }
      })
    );
  }

  public dispose(): void {
    while (this.disposables.length > 0) {
      this.disposables.pop()?.dispose();
    }
  }

  private async handleMessage(message: ReturnType<typeof webviewToExtensionMessageSchema.parse>): Promise<void> {
    switch (message.type) {
      case "log": {
        const line = `Webview ${message.payload.level}: ${message.payload.message}`;
        if (message.payload.level === "error") {
          outputLogger.error(line);
        } else if (message.payload.level === "warn") {
          outputLogger.warn(line);
        } else {
          outputLogger.info(line);
        }
        return;
      }
      case "ready": {
        outputLogger.info("Handling webview ready event.");
        await this.withLoading(["refs", "commits", "details"], async () => {
          const bootstrap = await this.service.getBootstrapState();
          await this.postMessage({
            type: "bootstrap",
            payload: bootstrap
          });
        });
        return;
      }
      case "selectRef": {
        outputLogger.info(`Selecting ref: ${message.payload.refId}`);
        await this.withLoading(["commits", "details"], async () => {
          const result = await this.service.selectRef(message.payload.refId);
          await this.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail);
        });
        return;
      }
      case "selectCommit": {
        outputLogger.info(`Selecting commit: ${message.payload.commitId}`);
        await this.withLoading(["details"], async () => {
          const result = await this.service.selectCommit(message.payload.commitId);
          await this.postMessage({
            type: "selectionUpdated",
            payload: result.selection
          });
          await this.postMessage({
            type: "commitDetailsUpdated",
            payload: {
              commitId: result.selection.selectedCommitId,
              detail: result.selectedCommitDetail
            }
          });
          this.onStateChanged?.();
        });
        return;
      }
      case "setFilters": {
        outputLogger.info(`Updating filters: ${safeJson(message.payload)}`);
        await this.withLoading(["commits", "details"], async () => {
          const result = await this.service.setFilters(message.payload);
          await this.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail);
        });
        return;
      }
      case "refresh": {
        outputLogger.info("Refreshing commit list.");
        await this.withLoading(["commits", "details"], async () => {
          const result = await this.service.refresh();
          await this.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail);
        });
        return;
      }
      case "openFile":
      case "openDiff":
        await this.postMessage({
          type: "errorOccurred",
          payload: { message: `Action ${message.type} is not implemented yet.` }
        });
        return;
      case "runCommand":
        await this.handleRunCommand(message.payload.command);
        return;
      default:
        return;
    }
  }

  private async handleRunCommand(command: string): Promise<void> {
    switch (command) {
      case "refs:newBranch":
        await vscode.commands.executeCommand("git.branch");
        await this.reloadBootstrap();
        return;
      case "refs:fetch":
        await vscode.commands.executeCommand("git.fetch");
        await this.reloadBootstrap();
        return;
      case "refs:updateSelected":
        await this.reloadBootstrap();
        return;
      case "commits:goToRef": {
        const query = await vscode.window.showInputBox({
          title: "Go to hash/branch/tag",
          prompt: "Enter a branch, tag, ref, or commit text to filter the log.",
          placeHolder: "main, origin/main, v1.0.0, a1b2c3d",
          ignoreFocusOut: true
        });
        if (!query) {
          return;
        }
        await this.service.navigateToRefOrHash(query);
        await this.reloadBootstrap();
        return;
      }
      case "commits:cherryPick":
      case "refs:deleteSelected":
      case "refs:compareWithCurrent":
        await this.postMessage({
          type: "errorOccurred",
          payload: { message: `Action ${command} is not implemented yet.` }
        });
        return;
      default:
        await this.postMessage({
          type: "errorOccurred",
          payload: { message: `Unknown command: ${command}` }
        });
    }
  }

  private async postSelectionPayloads(
    selection: SelectionState,
    commits: CommitListItemViewModel[],
    selectedCommitDetail: CommitDetailViewModel | null
  ): Promise<void> {
    await this.postMessage({
      type: "selectionUpdated",
      payload: selection
    });
    await this.postMessage({
      type: "commitsUpdated",
      payload: {
        refId: selection.selectedRefId,
        commits
      }
    });
    await this.postMessage({
      type: "commitDetailsUpdated",
      payload: {
        commitId: selection.selectedCommitId,
        detail: selectedCommitDetail
      }
    });
    this.onStateChanged?.();
  }

  private async withLoading(
    areas: Array<"refs" | "commits" | "details">,
    action: () => Promise<void>
  ): Promise<void> {
    for (const area of areas) {
      await this.postMessage({
        type: "loadingStateChanged",
        payload: { area, isLoading: true }
      });
    }

    try {
      await action();
    } finally {
      for (const area of areas) {
        await this.postMessage({
          type: "loadingStateChanged",
          payload: { area, isLoading: false }
        });
      }
    }
  }

  private async postMessage(message: ExtensionToWebviewMessage): Promise<void> {
    const validated = extensionToWebviewMessageSchema.parse(message);
    outputLogger.info(`Posting message to webview: ${validated.type}`);
    await this.panel.webview.postMessage(validated);
  }

  private async reloadBootstrap(): Promise<void> {
    await this.withLoading(["refs", "commits", "details"], async () => {
      const bootstrap = await this.service.getBootstrapState();
      await this.postMessage({
        type: "bootstrap",
        payload: bootstrap
      });
      this.onStateChanged?.();
    });
  }
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}

function isInvalidPersistedStateError(message: string): boolean {
  return message.includes("The selected Git reference is no longer available.");
}
