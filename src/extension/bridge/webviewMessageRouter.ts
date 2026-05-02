import * as vscode from "vscode";
import {
  extensionToWebviewMessageSchema,
  ExtensionToWebviewMessage,
  webviewToExtensionMessageSchema
} from "../../domain/gitLogProtocol";
import { GitLogApplicationService } from "../../application/gitLogApplicationService";
import { outputLogger } from "../logging/outputLogger";

export class WebviewMessageRouter {
  private readonly panel: vscode.WebviewPanel;
  private readonly service: GitLogApplicationService;
  private readonly disposables: vscode.Disposable[] = [];

  public constructor(panel: vscode.WebviewPanel, service: GitLogApplicationService) {
    this.panel = panel;
    this.service = service;

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

        await this.handleMessage(result.data);
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
        await this.postMessage({
          type: "loadingStateChanged",
          payload: { area: "commits", isLoading: true }
        });
        const result = await this.service.selectRef(message.payload.refId);
        await this.postMessage({
          type: "selectionUpdated",
          payload: result.selection
        });
        await this.postMessage({
          type: "commitsUpdated",
          payload: {
            refId: result.selection.selectedRefId,
            commits: result.commits
          }
        });
        const selectedCommit = result.commits.find((commit) => commit.id === result.selection.selectedCommitId) ?? null;
        await this.postMessage({
          type: "commitDetailsUpdated",
          payload: {
            commitId: result.selection.selectedCommitId,
            commit: selectedCommit
          }
        });
        await this.postMessage({
          type: "loadingStateChanged",
          payload: { area: "commits", isLoading: false }
        });
        return;
      }
      case "selectCommit": {
        outputLogger.info(`Selecting commit: ${message.payload.commitId}`);
        const selection = await this.service.selectCommit(message.payload.commitId);
        const bootstrap = await this.service.getBootstrapState();
        await this.postMessage({
          type: "selectionUpdated",
          payload: selection
        });
        const selectedCommit = bootstrap.commits.find((commit) => commit.id === selection.selectedCommitId) ?? null;
        await this.postMessage({
          type: "commitDetailsUpdated",
          payload: {
            commitId: selection.selectedCommitId,
            commit: selectedCommit
          }
        });
        return;
      }
      case "setFilters": {
        outputLogger.info(`Updating filters: ${safeJson(message.payload)}`);
        const result = await this.service.setFilters(message.payload);
        await this.postMessage({
          type: "selectionUpdated",
          payload: result.selection
        });
        await this.postMessage({
          type: "commitsUpdated",
          payload: {
            refId: result.selection.selectedRefId,
            commits: result.commits
          }
        });
        const selectedCommit = result.commits.find((commit) => commit.id === result.selection.selectedCommitId) ?? null;
        await this.postMessage({
          type: "commitDetailsUpdated",
          payload: {
            commitId: result.selection.selectedCommitId,
            commit: selectedCommit
          }
        });
        return;
      }
      case "refresh": {
        outputLogger.info("Refreshing commit list.");
        const result = await this.service.refresh();
        await this.postMessage({
          type: "selectionUpdated",
          payload: result.selection
        });
        await this.postMessage({
          type: "commitsUpdated",
          payload: {
            refId: result.selection.selectedRefId,
            commits: result.commits
          }
        });
        return;
      }
      default:
        return;
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
