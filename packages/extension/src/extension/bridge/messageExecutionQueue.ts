import { outputLogger } from "#extension/logging/outputLogger";

export interface MessageExecutionContext {
  isCurrent(): boolean;
}

export const alwaysCurrentExecution: MessageExecutionContext = {
  isCurrent: () => true
};

export class MessageExecutionQueue {
  private queue: Promise<void> = Promise.resolve();
  private latestMessageId = 0;

  public async enqueue(messageType: string, handler: (execution: MessageExecutionContext) => Promise<void>): Promise<void> {
    const messageId = ++this.latestMessageId;
    const execution: MessageExecutionContext = {
      isCurrent: () => messageId === this.latestMessageId
    };

    const current = this.queue
      .catch(() => undefined)
      .then(async () => {
        if (!execution.isCurrent()) {
          outputLogger.info(`Skipping stale webview message before execution: ${messageType}`);
          return;
        }

        try {
          await handler(execution);
        } catch (error) {
          if (!execution.isCurrent()) {
            const reason = error instanceof Error ? error.message : String(error);
            outputLogger.info(`Ignoring stale webview message failure for ${messageType}: ${reason}`);
            return;
          }

          throw error;
        }
      });

    this.queue = current.catch(() => undefined);
    await current;
  }
}
