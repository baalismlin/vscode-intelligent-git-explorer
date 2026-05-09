import * as vscode from "vscode";
import * as path from "node:path";
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

interface GitExtension {
  getAPI(version: 1): GitApi;
}

interface GitApi {
  toGitUri(uri: vscode.Uri, ref: string): vscode.Uri;
  getRepository(uri: vscode.Uri): GitRepository | null;
}

interface GitRepository {
  getCommit(ref: string): Promise<{ hash: string }>;
  diffBetweenPatch(ref1: string, ref2: string, path?: string): Promise<string>;
  apply(patch: string, options?: { allowEmpty?: boolean; reverse?: boolean; threeWay?: boolean }): Promise<void>;
}

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
        await this.handleOpenFile(message.payload.path);
        return;
      case "openDiff":
        await this.handleOpenDiff(message.payload.path);
        return;
      case "revertSelectedChanges":
        await this.handleRevertSelectedChanges(message.payload.path);
        return;
      case "runCommand":
        await this.handleRunCommand(message.payload.command);
        return;
      default:
        return;
    }
  }

  private async handleOpenFile(filePath: string): Promise<void> {
    const fileUri = this.resolveWorkspaceFileUri(filePath);
    outputLogger.info(`Opening file: ${fileUri.fsPath}`);
    await vscode.commands.executeCommand("vscode.open", fileUri);
  }

  private async handleOpenDiff(filePath: string): Promise<void> {
    const selectedCommitId = this.service.getSelection().selectedCommitId;
    if (!selectedCommitId) {
      await this.postMessage({
        type: "errorOccurred",
        payload: { message: "No commit is selected." }
      });
      return;
    }

    const gitExtension = vscode.extensions.getExtension<GitExtension>("vscode.git");
    if (!gitExtension) {
      await this.postMessage({
        type: "errorOccurred",
        payload: { message: "VS Code Git extension is not available." }
      });
      return;
    }

    const gitApi = gitExtension.isActive ? gitExtension.exports.getAPI(1) : (await gitExtension.activate()).getAPI(1);
    const fileUri = this.resolveWorkspaceFileUri(filePath);
    const repository = gitApi.getRepository(fileUri);
    const previousRef = `${selectedCommitId}^`;
    const previousUri = gitApi.toGitUri(fileUri, previousRef);
    const selectedUri = gitApi.toGitUri(fileUri, selectedCommitId);
    const previousCommit = await repository?.getCommit(previousRef);
    const previousShortHash = (previousCommit?.hash ?? previousRef).slice(0, 7);
    const title = `${path.basename(filePath)} (${previousShortHash} - ${selectedCommitId.slice(0, 7)})`;

    outputLogger.info(`Opening diff for ${filePath} at commit ${selectedCommitId}`);
    await vscode.commands.executeCommand("vscode.diff", previousUri, selectedUri, title);
  }

  private async handleRevertSelectedChanges(filePath: string): Promise<void> {
    const selectedCommitId = this.service.getSelection().selectedCommitId;
    if (!selectedCommitId) {
      await this.postMessage({
        type: "errorOccurred",
        payload: { message: "No commit is selected." }
      });
      return;
    }

    const confirmation = await vscode.window.showWarningMessage(
      `Revert selected changes in ${filePath}? This will modify your working tree.`,
      { modal: true },
      "Revert"
    );
    if (confirmation !== "Revert") {
      return;
    }

    const gitExtension = vscode.extensions.getExtension<GitExtension>("vscode.git");
    if (!gitExtension) {
      await this.postMessage({
        type: "errorOccurred",
        payload: { message: "VS Code Git extension is not available." }
      });
      return;
    }

    const gitApi = gitExtension.isActive ? gitExtension.exports.getAPI(1) : (await gitExtension.activate()).getAPI(1);
    const fileUri = this.resolveWorkspaceFileUri(filePath);
    const repository = gitApi.getRepository(fileUri);
    if (!repository) {
      await this.postMessage({
        type: "errorOccurred",
        payload: { message: "No Git repository was found for the selected file." }
      });
      return;
    }

    const previousRef = `${selectedCommitId}^`;
    const patch = await repository.diffBetweenPatch(previousRef, selectedCommitId, filePath);
    if (!patch.trim()) {
      await this.postMessage({
        type: "errorOccurred",
        payload: { message: "No changes were found for the selected file." }
      });
      return;
    }

    outputLogger.info(`Reverting selected changes for ${filePath} at commit ${selectedCommitId}`);
    await repository.apply(patch, { reverse: true, threeWay: true });
    await this.reloadBootstrap();
  }

  private resolveWorkspaceFileUri(filePath: string): vscode.Uri {
    const repositoryRoot = this.service.getRepositoryRoot();
    return vscode.Uri.file(path.isAbsolute(filePath) ? filePath : path.join(repositoryRoot, filePath));
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
