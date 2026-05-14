import assert from "node:assert/strict";
import test from "node:test";

const { webviewToExtensionMessageSchema } = await import(
  "../dist/cjs/webviewToExtensionProtocol.js"
);

const filters = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
};

const validMessages = [
  { type: "ready" },
  {
    type: "log",
    payload: {
      level: "info",
      message: "Loaded"
    }
  },
  {
    type: "selectRef",
    payload: {
      refId: "main"
    }
  },
  {
    type: "selectCommit",
    payload: {
      commitId: "abc123"
    }
  },
  {
    type: "setFilters",
    payload: filters
  },
  { type: "refresh" },
  {
    type: "openFile",
    payload: {
      path: "src/index.ts"
    }
  },
  {
    type: "openDiff",
    payload: {
      path: "src/index.ts"
    }
  },
  {
    type: "revertSelectedChanges",
    payload: {
      path: "src/index.ts"
    }
  },
  { type: "refs:newBranch" },
  { type: "refs:fetch" },
  { type: "refs:updateSelected" },
  { type: "refs:deleteSelected" },
  { type: "refs:compareWithCurrent" },
  { type: "commits:goToRef" },
  { type: "commits:cherryPick" }
];

test("webview-to-extension schema accepts every message type", () => {
  for (const message of validMessages) {
    assert.equal(
      webviewToExtensionMessageSchema.safeParse(message).success,
      true,
      `Expected ${message.type} to be valid`
    );
  }
});

test("webview-to-extension schema rejects malformed filter payloads", () => {
  const result = webviewToExtensionMessageSchema.safeParse({
    type: "setFilters",
    payload: {
      searchText: "fix",
      branch: "main",
      user: "Ada",
      date: "today"
    }
  });

  assert.equal(result.success, false);
});

test("webview-to-extension schema rejects malformed file action payloads", () => {
  assert.equal(
    webviewToExtensionMessageSchema.safeParse({
      type: "openFile",
      payload: {}
    }).success,
    false
  );

  assert.equal(
    webviewToExtensionMessageSchema.safeParse({
      type: "openDiff",
      payload: { path: 42 }
    }).success,
    false
  );
});
