import assert from "node:assert/strict";
import test from "node:test";

const { extensionToWebviewMessageSchema } = await import(
  "../dist/cjs/extensionToWebviewProtocol.js"
);

const refNode = {
  id: "main",
  label: "main",
  type: "localBranch"
};

const commitItem = {
  id: "abc123",
  shortHash: "abc123",
  message: "Initial commit",
  author: "Ada",
  date: "2026-05-14",
  graph: { color: "#2f80ed", lane: 0, shape: "straight" }
};

const commitDetail = {
  commitId: "abc123",
  shortHash: "abc123",
  message: "Initial commit",
  author: "Ada",
  date: "2026-05-14",
  changedFiles: [
    {
      id: "src",
      name: "src",
      path: "src",
      type: "folder",
      children: [
        {
          id: "src/index.ts",
          name: "index.ts",
          path: "src/index.ts",
          type: "file",
          status: "A"
        }
      ]
    }
  ],
  defaultExpandedFileIds: ["src"],
  initialSelectedFileId: "src/index.ts"
};

const selection = {
  selectedRefId: "main",
  selectedCommitId: "abc123"
};

const filters = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
};

const bootstrapPayload = {
  workspace: { repositoryRoot: "/repo" },
  refs: [
    {
      id: "branches",
      label: "Branches",
      type: "group",
      children: [refNode]
    }
  ],
  commits: [commitItem],
  selectedCommitDetail: commitDetail,
  selection,
  filters
};

const validMessages = [
  {
    type: "bootstrap",
    payload: bootstrapPayload
  },
  {
    type: "refsUpdated",
    payload: {
      refs: [refNode]
    }
  },
  {
    type: "commitsUpdated",
    payload: {
      refId: "main",
      commits: [commitItem]
    }
  },
  {
    type: "commitDetailsUpdated",
    payload: {
      commitId: "abc123",
      detail: commitDetail
    }
  },
  {
    type: "commitDetailsUpdated",
    payload: {
      commitId: "",
      detail: null
    }
  },
  {
    type: "selectionUpdated",
    payload: selection
  },
  {
    type: "loadingStateChanged",
    payload: {
      area: "commits",
      isLoading: true
    }
  },
  {
    type: "errorOccurred",
    payload: {
      message: "Something went wrong."
    }
  }
];

test("extension-to-webview schema accepts every message type", () => {
  for (const message of validMessages) {
    assert.equal(
      extensionToWebviewMessageSchema.safeParse(message).success,
      true,
      `Expected ${message.type} to be valid`
    );
  }
});

test("extension-to-webview schema validates recursive bootstrap payloads", () => {
  assert.equal(
    extensionToWebviewMessageSchema.safeParse({
      type: "bootstrap",
      payload: bootstrapPayload
    }).success,
    true
  );
});

test("extension-to-webview schema rejects invalid loading areas and file statuses", () => {
  assert.equal(
    extensionToWebviewMessageSchema.safeParse({
      type: "loadingStateChanged",
      payload: { area: "history", isLoading: true }
    }).success,
    false
  );

  assert.equal(
    extensionToWebviewMessageSchema.safeParse({
      type: "commitDetailsUpdated",
      payload: {
        commitId: "abc123",
        detail: {
          ...commitDetail,
          changedFiles: [
            {
              id: "src/index.ts",
              name: "index.ts",
              path: "src/index.ts",
              type: "file",
              status: "X"
            }
          ]
        }
      }
    }).success,
    false
  );
});
