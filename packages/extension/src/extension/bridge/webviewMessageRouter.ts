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
import { GitLogApplicationService } from "../../application/gitLogApplicationService";
import { outputLogger } from "../logging/outputLogger";

export class WebviewMessageRouter {
  private readonly panel: vscode.WebviewPanel;
  private readonly service: GitLogApplicationService;
  private readonly onStateChanged?: () => void;
  private readonly disposables: vscode.Disposable[] = [];

  public constructor(panel: vscode.WebviewPanel, service: GitLogApplicationService, onStateChanged?: () => void) {
    this.panel = panel;
    this.service = service;
    this.onStateChanged = onStateChanged;

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
          outputLogger.error(`Failed to handle message ${result.data.type}: ${message}`);
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
            payload: { message: "Failed to process the requested action." }
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
        const bootstrap = await this.service.getBootstrapState();
        await this.postMessage({
          type: "bootstrap",
          payload: bootstrap
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
      case "loadMoreCommits":
      case "openFile":
      case "openDiff":
      case "runCommand":
        await this.postMessage({
          type: "errorOccurred",
          payload: { message: `Action ${message.type} is not implemented yet.` }
        });
        return;
      default:
        return;
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
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}
