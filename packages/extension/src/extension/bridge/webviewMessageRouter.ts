import type * as vscode from "vscode";
import { webviewToExtensionMessageSchema } from "@intelligent-git-log/contracts/webviewToExtensionProtocol";
import { type GitLogApplicationService } from "#application/gitLogApplicationService";
import { GitReferenceUnavailableError } from "#domain/gitLogErrors";
import { outputLogger } from "#extension/logging/outputLogger";
import { safeJson } from "#extension/utils/safeJson";
import { GitLogMessageController } from "./gitLogMessageController";
import { alwaysCurrentExecution, MessageExecutionQueue } from "./messageExecutionQueue";
import { WebviewMessenger } from "./webviewMessenger";

export class WebviewMessageRouter {
  private readonly service: GitLogApplicationService;
  private readonly onStateCleared?: () => PromiseLike<void> | void;
  private readonly messenger: WebviewMessenger;
  private readonly controller: GitLogMessageController;
  private readonly queue = new MessageExecutionQueue();
  private readonly disposables: vscode.Disposable[] = [];

  public constructor(
    panel: vscode.WebviewPanel,
    service: GitLogApplicationService,
    onStateChanged?: () => void,
    onStateCleared?: () => PromiseLike<void> | void
  ) {
    this.service = service;
    this.onStateCleared = onStateCleared;
    this.messenger = new WebviewMessenger(panel.webview);
    this.controller = new GitLogMessageController(service, this.messenger, onStateChanged);

    this.disposables.push(
      panel.webview.onDidReceiveMessage((rawMessage) => this.handleReceiveMessage(rawMessage))
    );
  }

  public dispose(): void {
    while (this.disposables.length > 0) {
      this.disposables.pop()?.dispose();
    }
  }

  private async handleReceiveMessage(rawMessage: unknown): Promise<void> {
    outputLogger.info(`Message received from webview: ${safeJson(rawMessage)}`);
    const result = webviewToExtensionMessageSchema.safeParse(rawMessage);
    if (!result.success) {
      outputLogger.error(`Invalid message from webview: ${result.error.message}`);
      void this.messenger.postError("Invalid message from webview.");
      return;
    }

    try {
      await this.queue.enqueue(result.data.type, (execution) =>
        this.controller.handleMessage(result.data, execution)
      );
    } catch (error) {
      await this.handleMessageError(result.data.type, error);
    }
  }

  private async handleMessageError(messageType: string, error: unknown): Promise<void> {
    const message = error instanceof Error ? error.message : String(error);
    if (messageType === "ready" && error instanceof GitReferenceUnavailableError) {
      outputLogger.warn(`Clearing persisted state after bootstrap failure: ${message}`);
      this.service.resetPersistedState();
      await this.onStateCleared?.();
      await this.controller.handleMessage({ type: "ready" }, alwaysCurrentExecution);
      return;
    }

    outputLogger.error(`Failed to handle message ${messageType}: ${message}`);
    await this.messenger.clearLoading(["refs", "commits", "details"]);
    await this.messenger.postError(message);
  }
}
