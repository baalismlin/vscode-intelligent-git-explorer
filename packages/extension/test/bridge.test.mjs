import assert from "node:assert/strict";
import Module from "node:module";
import test from "node:test";

installVscodeMock();

const { GitLogMessageController } = await import(
  "../dist/extension/bridge/gitLogMessageController.js"
);
const { MessageExecutionQueue } = await import(
  "../dist/extension/bridge/messageExecutionQueue.js"
);
const { WebviewMessageRouter } = await import("../dist/extension/bridge/webviewMessageRouter.js");

test("bridge dispatches selectCommit through service and posts detail updates", async () => {
  const service = createService();
  const messenger = createMessenger();
  const controller = new GitLogMessageController(service, messenger);

  await controller.handleMessage(
    { type: "selectCommit", payload: { commitId: "commit-2" } },
    { isCurrent: () => true }
  );

  assert.deepEqual(service.calls, [["selectCommit", "commit-2"]]);
  assert.deepEqual(
    messenger.messages.map((message) => message.type),
    ["loadingStateChanged", "selectionUpdated", "commitDetailsUpdated", "loadingStateChanged"]
  );
  assert.deepEqual(messenger.messages[1].payload, {
    selectedRefId: "main",
    selectedCommitId: "commit-2"
  });
  assert.equal(messenger.messages[2].payload.detail.commitId, "commit-2");
});

test("bridge dispatches unimplemented cherry-pick action to an error message", async () => {
  const messenger = createMessenger();
  const controller = new GitLogMessageController(createService(), messenger);

  await controller.handleMessage({ type: "commits:cherryPick" }, { isCurrent: () => true });

  assert.deepEqual(messenger.messages, [
    {
      type: "errorOccurred",
      payload: { message: "Action commits:cherryPick is not implemented yet." }
    }
  ]);
});

test("message execution queue skips stale queued messages", async () => {
  const queue = new MessageExecutionQueue();
  const handled = [];
  let releaseFirst;
  let markFirstStarted;
  const firstBlocker = new Promise((resolve) => {
    releaseFirst = resolve;
  });
  const firstStarted = new Promise((resolve) => {
    markFirstStarted = resolve;
  });

  const first = queue.enqueue("selectRef", async () => {
    handled.push("first");
    markFirstStarted();
    await firstBlocker;
  });
  await firstStarted;

  const second = queue.enqueue("selectCommit", async () => {
    handled.push("second");
  });
  const third = queue.enqueue("setFilters", async () => {
    handled.push("third");
  });

  releaseFirst();
  await Promise.all([first, second, third]);

  assert.deepEqual(handled, ["first", "third"]);
});

test("router rejects invalid messages before dispatch", async () => {
  const panel = createPanel();
  const router = new WebviewMessageRouter(panel, createService());

  await panel.receive({ type: "openFile", payload: {} });

  assert.deepEqual(panel.messages, [
    {
      type: "errorOccurred",
      payload: { message: "Invalid message from webview." }
    }
  ]);

  router.dispose();
  assert.equal(panel.disposed, true);
});

test("router clears loading and posts service errors", async () => {
  const panel = createPanel();
  const service = createService({
    async selectCommit() {
      throw new Error("Commit disappeared.");
    }
  });
  const router = new WebviewMessageRouter(panel, service);

  await panel.receive({ type: "selectCommit", payload: { commitId: "missing" } });

  assert.deepEqual(
    panel.messages.map((message) => message.type),
    [
      "loadingStateChanged",
      "loadingStateChanged",
      "loadingStateChanged",
      "loadingStateChanged",
      "loadingStateChanged",
      "errorOccurred"
    ]
  );
  assert.deepEqual(panel.messages.at(-1), {
    type: "errorOccurred",
    payload: { message: "Commit disappeared." }
  });

  router.dispose();
});

function createService(overrides = {}) {
  return {
    calls: [],
    async selectCommit(commitId) {
      this.calls.push(["selectCommit", commitId]);
      return {
        selection: { selectedRefId: "main", selectedCommitId: commitId },
        selectedCommitDetail: {
          commitId,
          shortHash: commitId.slice(0, 7),
          message: "Selected commit",
          author: "Ada",
          date: "2026-05-14",
          changedFiles: [],
          defaultExpandedFileIds: [],
          initialSelectedFileId: ""
        }
      };
    },
    ...overrides
  };
}

function createMessenger() {
  return {
    messages: [],
    async post(message) {
      this.messages.push(message);
    },
    async postError(message) {
      await this.post({ type: "errorOccurred", payload: { message } });
    },
    async postLoading(area, isLoading) {
      await this.post({ type: "loadingStateChanged", payload: { area, isLoading } });
    }
  };
}

function installVscodeMock() {
  const originalLoad = Module._load;

  Module._load = function load(request, parent, isMain) {
    if (request === "vscode") {
      return {
        window: {
          createOutputChannel() {
            return {
              appendLine() {},
              show() {},
              dispose() {}
            };
          }
        }
      };
    }

    return originalLoad.call(this, request, parent, isMain);
  };
}

function createPanel() {
  let handler;
  const disposable = {
    disposed: false,
    dispose() {
      this.disposed = true;
    }
  };
  const panel = {
    messages: [],
    webview: {
      onDidReceiveMessage(callback) {
        handler = callback;
        return disposable;
      },
      async postMessage(message) {
        panel.messages.push(message);
        return true;
      }
    },
    async receive(message) {
      await handler(message);
    }
  };

  Object.defineProperty(panel, "disposed", {
    get() {
      return disposable.disposed;
    }
  });

  return panel;
}
