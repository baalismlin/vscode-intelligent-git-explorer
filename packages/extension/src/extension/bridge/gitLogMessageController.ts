import {
  WebviewToExtensionMessage
} from "@intelligent-git-log/contracts/webviewToExtensionProtocol";
import { GitLogApplicationService } from "#application/gitLogApplicationService";
import { outputLogger } from "#extension/logging/outputLogger";
import { GitLogViewSynchronizer } from "./gitLogViewSynchronizer";
import { MessageExecutionContext } from "./messageExecutionQueue";
import {
  WebviewMessageAction,
  WebviewMessageActionRegistry
} from "./webviewMessageActionRegistry";
import { WebviewMessenger } from "./webviewMessenger";

export class GitLogMessageController {
  private readonly messenger: WebviewMessenger;
  private readonly messageActions: WebviewMessageActionRegistry;

  public constructor(
    service: GitLogApplicationService,
    messenger: WebviewMessenger,
    onStateChanged?: () => void
  ) {
    this.messenger = messenger;
    const view = new GitLogViewSynchronizer(service, messenger, onStateChanged);
    this.messageActions = new WebviewMessageActionRegistry(service, messenger, view);
  }

  public async handleMessage(
    message: WebviewToExtensionMessage,
    execution: MessageExecutionContext
  ): Promise<void> {
    const action = this.messageActions.get(message.type) as WebviewMessageAction | undefined;
    if (!action) {
      const errorMessage = `No handler is registered for webview message: ${message.type}`;
      outputLogger.error(errorMessage);
      await this.messenger.postError(errorMessage);
      return;
    }

    outputLogger.info(`Handling ${action.subtype} webview message: ${message.type}`);
    await action.handle(message, execution);
  }
}
