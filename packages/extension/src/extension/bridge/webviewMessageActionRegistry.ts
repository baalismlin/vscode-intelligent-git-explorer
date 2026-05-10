import {
  WebviewToExtensionMessage
} from "@intelligent-git-log/contracts/webviewToExtensionProtocol";
import { GitLogApplicationService } from "#application/gitLogApplicationService";
import { outputLogger } from "#extension/logging/outputLogger";
import { safeJson } from "#extension/utils/safeJson";
import { GitLogViewSynchronizer } from "./gitLogViewSynchronizer";
import { MessageExecutionContext } from "./messageExecutionQueue";
import { WebviewMessenger } from "./webviewMessenger";

export type MessageSubtype = "log" | "read" | "update";
export type WebviewMessageType = WebviewToExtensionMessage["type"];

type WebviewMessageByType<TType extends WebviewMessageType> = Extract<WebviewToExtensionMessage, { type: TType }>;

export type WebviewMessageAction<TType extends WebviewMessageType = WebviewMessageType> = {
  subtype: MessageSubtype;
  handle: (message: WebviewMessageByType<TType>, execution: MessageExecutionContext) => Promise<void>;
};

type WebviewMessageActions = {
  [TType in WebviewMessageType]: WebviewMessageAction<TType>;
};

export class WebviewMessageActionRegistry {
  private readonly actions: WebviewMessageActions;

  public constructor(
    service: GitLogApplicationService,
    messenger: WebviewMessenger,
    view: GitLogViewSynchronizer
  ) {
    this.actions = {
      log: {
        subtype: "log",
        handle: async (message) => {
          const line = `Webview ${message.payload.level}: ${message.payload.message}`;
          if (message.payload.level === "error") {
            outputLogger.error(line);
          } else if (message.payload.level === "warn") {
            outputLogger.warn(line);
          } else {
            outputLogger.info(line);
          }
        }
      },
      ready: {
        subtype: "read",
        handle: async (_message, execution) => {
          outputLogger.info("Handling webview ready event.");
          await view.withLoading(["refs", "commits", "details"], execution, async () => {
            const bootstrap = await service.getBootstrapState();
            if (!execution.isCurrent()) {
              outputLogger.info("Skipping stale bootstrap payload.");
              return;
            }
            await messenger.post({
              type: "bootstrap",
              payload: bootstrap
            });
          });
        }
      },
      selectRef: {
        subtype: "update",
        handle: async (message, execution) => {
          outputLogger.info(`Selecting ref: ${message.payload.refId}`);
          await view.withLoading(["commits", "details"], execution, async () => {
            const result = await service.selectRef(message.payload.refId);
            await view.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail, execution);
          });
        }
      },
      selectCommit: {
        subtype: "update",
        handle: async (message, execution) => {
          outputLogger.info(`Selecting commit: ${message.payload.commitId}`);
          await view.withLoading(["details"], execution, async () => {
            const result = await service.selectCommit(message.payload.commitId);
            if (!execution.isCurrent()) {
              outputLogger.info("Skipping stale selected commit payload.");
              return;
            }
            await messenger.post({
              type: "selectionUpdated",
              payload: result.selection
            });
            await messenger.post({
              type: "commitDetailsUpdated",
              payload: {
                commitId: result.selection.selectedCommitId,
                detail: result.selectedCommitDetail
              }
            });
            view.notifyStateChanged();
          });
        }
      },
      setFilters: {
        subtype: "update",
        handle: async (message, execution) => {
          await view.withLoading(["commits", "details"], execution, async () => {
            outputLogger.info(`Updating filters: ${safeJson(message.payload)}`);
            const result = await service.setFilters(message.payload);
            await view.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail, execution);
          });
        }
      },
      refresh: {
        subtype: "read",
        handle: async (_message, execution) => {
          outputLogger.info("Refreshing commit list.");
          await view.withLoading(["commits", "details"], execution, async () => {
            const result = await service.refresh();
            await view.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail, execution);
          });
        }
      },
      openFile: {
        subtype: "read",
        handle: async (message) => {
          await service.openFile(message.payload.path);
        }
      },
      openDiff: {
        subtype: "read",
        handle: async (message) => {
          await service.openDiff(message.payload.path);
        }
      },
      revertSelectedChanges: {
        subtype: "update",
        handle: async (message) => {
          const didRevert = await service.revertSelectedChanges(message.payload.path);
          if (didRevert) {
            await view.reloadBootstrap();
          }
        }
      },
      "refs:newBranch": {
        subtype: "update",
        handle: async (_message, execution) => {
          await service.createBranch();
          await view.reloadBootstrap(execution);
        }
      },
      "refs:fetch": {
        subtype: "update",
        handle: async (_message, execution) => {
          await service.fetch();
          await view.reloadBootstrap(execution);
        }
      },
      "refs:updateSelected": {
        subtype: "read",
        handle: async (_message, execution) => {
          await view.reloadBootstrap(execution);
        }
      },
      "refs:deleteSelected": {
        subtype: "update",
        handle: async () => {
          await messenger.postError("Action refs:deleteSelected is not implemented yet.");
        }
      },
      "refs:compareWithCurrent": {
        subtype: "read",
        handle: async () => {
          await messenger.postError("Action refs:compareWithCurrent is not implemented yet.");
        }
      },
      "commits:goToRef": {
        subtype: "update",
        handle: async (_message, execution) => {
          const query = await service.promptForRefQuery();
          if (!query) {
            return;
          }
          if (!execution.isCurrent()) {
            outputLogger.info("Skipping stale go-to-ref command.");
            return;
          }
          await service.navigateToRefOrHash(query);
          await view.reloadBootstrap(execution);
        }
      },
      "commits:cherryPick": {
        subtype: "update",
        handle: async () => {
          await messenger.postError("Action commits:cherryPick is not implemented yet.");
        }
      }
    };
  }

  public get<TType extends WebviewMessageType>(messageType: TType): WebviewMessageAction<TType> | undefined {
    return this.actions[messageType];
  }
}
