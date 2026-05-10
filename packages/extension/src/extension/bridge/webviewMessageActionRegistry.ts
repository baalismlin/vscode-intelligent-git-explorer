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
type WebviewPayloadMessage = Extract<WebviewToExtensionMessage, { payload: unknown }>;
type WebviewPayloadMessageType = WebviewPayloadMessage["type"];

export interface WebviewMessageAction {
  subtype: MessageSubtype;
  handle(message: WebviewToExtensionMessage, execution: MessageExecutionContext): Promise<void>;
}

export class WebviewMessageActionRegistry {
  private readonly actions = new Map<WebviewMessageType, WebviewMessageAction>();

  public constructor(
    service: GitLogApplicationService,
    messenger: WebviewMessenger,
    view: GitLogViewSynchronizer
  ) {
    this.register("log", {
      subtype: "log",
      handle: async (message) => {
        const payload = payloadOf(message, "log");
        const line = `Webview ${payload.level}: ${payload.message}`;
        if (payload.level === "error") {
          outputLogger.error(line);
        } else if (payload.level === "warn") {
          outputLogger.warn(line);
        } else {
          outputLogger.info(line);
        }
      }
    });
    this.register("ready", {
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
    });
    this.register("selectRef", {
      subtype: "update",
      handle: async (message, execution) => {
        const payload = payloadOf(message, "selectRef");
        outputLogger.info(`Selecting ref: ${payload.refId}`);
        await view.withLoading(["commits", "details"], execution, async () => {
          const result = await service.selectRef(payload.refId);
          await view.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail, execution);
        });
      }
    });
    this.register("selectCommit", {
      subtype: "update",
      handle: async (message, execution) => {
        const payload = payloadOf(message, "selectCommit");
        outputLogger.info(`Selecting commit: ${payload.commitId}`);
        await view.withLoading(["details"], execution, async () => {
          const result = await service.selectCommit(payload.commitId);
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
    });
    this.register("setFilters", {
      subtype: "update",
      handle: async (message, execution) => {
        const payload = payloadOf(message, "setFilters");
        await view.withLoading(["commits", "details"], execution, async () => {
          outputLogger.info(`Updating filters: ${safeJson(payload)}`);
          const result = await service.setFilters(payload);
          await view.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail, execution);
        });
      }
    });
    this.register("refresh", {
      subtype: "read",
      handle: async (_message, execution) => {
        outputLogger.info("Refreshing commit list.");
        await view.withLoading(["commits", "details"], execution, async () => {
          const result = await service.refresh();
          await view.postSelectionPayloads(result.selection, result.commits, result.selectedCommitDetail, execution);
        });
      }
    });
    this.register("openFile", {
      subtype: "read",
      handle: async (message) => {
        await service.openFile(payloadOf(message, "openFile").path);
      }
    });
    this.register("openDiff", {
      subtype: "read",
      handle: async (message) => {
        await service.openDiff(payloadOf(message, "openDiff").path);
      }
    });
    this.register("revertSelectedChanges", {
      subtype: "update",
      handle: async (message) => {
        const didRevert = await service.revertSelectedChanges(payloadOf(message, "revertSelectedChanges").path);
        if (didRevert) {
          await view.reloadBootstrap();
        }
      }
    });
    this.register("refs:newBranch", {
      subtype: "update",
      handle: async (_message, execution) => {
        await service.createBranch();
        await view.reloadBootstrap(execution);
      }
    });
    this.register("refs:fetch", {
      subtype: "update",
      handle: async (_message, execution) => {
        await service.fetch();
        await view.reloadBootstrap(execution);
      }
    });
    this.register("refs:updateSelected", {
      subtype: "read",
      handle: async (_message, execution) => {
        await view.reloadBootstrap(execution);
      }
    });
    this.register("refs:deleteSelected", {
      subtype: "update",
      handle: async () => {
        await messenger.postError("Action refs:deleteSelected is not implemented yet.");
      }
    });
    this.register("refs:compareWithCurrent", {
      subtype: "read",
      handle: async () => {
        await messenger.postError("Action refs:compareWithCurrent is not implemented yet.");
      }
    });
    this.register("commits:goToRef", {
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
    });
    this.register("commits:cherryPick", {
      subtype: "update",
      handle: async () => {
        await messenger.postError("Action commits:cherryPick is not implemented yet.");
      }
    });
  }

  public get(messageType: WebviewMessageType): WebviewMessageAction | undefined {
    return this.actions.get(messageType);
  }

  private register(messageType: WebviewMessageType, action: WebviewMessageAction): void {
    this.actions.set(messageType, action);
  }
}

function payloadOf<TType extends WebviewPayloadMessageType>(
  message: WebviewToExtensionMessage,
  type: TType
): Extract<WebviewPayloadMessage, { type: TType }>["payload"] {
  if (message.type !== type) {
    throw new Error(`Expected webview message ${type} but received ${message.type}.`);
  }

  return (message as Extract<WebviewPayloadMessage, { type: TType }>).payload;
}
