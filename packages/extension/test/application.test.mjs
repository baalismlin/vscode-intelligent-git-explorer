import assert from "node:assert/strict";
import test from "node:test";

const { GitLogApplicationService } = await import(
  "../dist/application/gitLogApplicationService.js"
);
const { GitLogViewModelMapper } = await import("../dist/application/gitLogViewModelMapper.js");

const refs = [
  {
    id: "branches",
    label: "Branches",
    type: "group",
    children: [
      { id: "main", label: "main", type: "localBranch" },
      { id: "feature/test", label: "feature/test", type: "localBranch" }
    ]
  }
];

const commitsByRef = {
  main: [
    {
      id: "commit-1",
      shortHash: "c1",
      message: "First",
      author: "Ada",
      date: "2026-05-14",
      branchId: "main"
    }
  ],
  "feature/test": [
    {
      id: "commit-2",
      shortHash: "c2",
      message: "Feature",
      author: "Ada",
      date: "2026-05-14",
      branchId: "feature/test"
    }
  ]
};

const detailsByCommit = {
  "commit-1": {
    commitId: "commit-1",
    shortHash: "c1",
    message: "First",
    author: "Ada",
    date: "2026-05-14",
    changedFiles: []
  },
  "commit-2": {
    commitId: "commit-2",
    shortHash: "c2",
    message: "Feature",
    author: "Ada",
    date: "2026-05-14",
    changedFiles: []
  }
};

test("mapper compresses single-child folder chains and selects the first file", () => {
  const mapper = new GitLogViewModelMapper();

  const detail = mapper.mapCommitDetail({
    commitId: "commit-1",
    shortHash: "c1",
    message: "First",
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
            id: "src/app",
            name: "app",
            path: "src/app",
            type: "folder",
            children: [
              {
                id: "src/app/index.ts",
                name: "index.ts",
                path: "src/app/index.ts",
                type: "file",
                status: "M"
              }
            ]
          }
        ]
      }
    ]
  });

  assert.equal(detail.changedFiles[0].id, "src");
  assert.equal(detail.changedFiles[0].name, "src/app");
  assert.deepEqual(detail.defaultExpandedFileIds, ["src"]);
  assert.equal(detail.initialSelectedFileId, "src/app/index.ts");
});

test("service normalizes stale persisted selection during bootstrap", async () => {
  const service = new GitLogApplicationService(createProvider(), createActions(), "/repo", {
    selection: { selectedRefId: "missing", selectedCommitId: "missing-commit" },
    filters: { searchText: "", branch: "", user: "", date: "", paths: "" }
  });

  const bootstrap = await service.getBootstrapState();

  assert.deepEqual(bootstrap.selection, {
    selectedRefId: "main",
    selectedCommitId: "commit-1"
  });
  assert.equal(bootstrap.commits[0].id, "commit-1");
  assert.equal(bootstrap.selectedCommitDetail.commitId, "commit-1");
});

test("service selects refs and maps selected commit details", async () => {
  const service = new GitLogApplicationService(createProvider(), createActions(), "/repo");

  const result = await service.selectRef("feature/test");

  assert.deepEqual(result.selection, {
    selectedRefId: "feature/test",
    selectedCommitId: "commit-2"
  });
  assert.equal(result.commits[0].graph.shape, "mergeRight");
  assert.equal(result.selectedCommitDetail.commitId, "commit-2");
});

test("service applies filters and preserves them in persisted state", async () => {
  const provider = createProvider();
  const service = new GitLogApplicationService(provider, createActions(), "/repo");
  const filters = {
    searchText: "Feature",
    branch: "feature/test",
    user: "Ada",
    date: "2026-05-14",
    paths: "src"
  };

  await service.getBootstrapState();
  const result = await service.setFilters(filters);

  assert.deepEqual(provider.requests.at(-1), {
    refId: "main",
    filters
  });
  assert.deepEqual(service.getPersistedState().filters, filters);
  assert.equal(result.selection.selectedRefId, "main");
});

test("service go-to-ref selects matching refs and filters unmatched queries", async () => {
  const provider = createProvider();
  const service = new GitLogApplicationService(provider, createActions(), "/repo");

  const matched = await service.navigateToRefOrHash("feature/test");
  assert.equal(matched.selection.selectedRefId, "feature/test");
  assert.equal(matched.selection.selectedCommitId, "commit-2");

  const unmatched = await service.navigateToRefOrHash("deadbee");
  assert.equal(unmatched.filters.searchText, "deadbee");
  assert.deepEqual(provider.requests.at(-1), {
    refId: "feature/test",
    filters: { searchText: "deadbee", branch: "", user: "", date: "", paths: "" }
  });
});

function createProvider() {
  const provider = {
    requests: [],

    async getRefs() {
      return refs;
    },

    async getCommitSummaries(refId, filters) {
      this.requests.push({ refId, filters });
      return commitsByRef[refId] ?? [];
    },

    async getCommitDetail(commitId) {
      return detailsByCommit[commitId] ?? null;
    }
  };

  return provider;
}

function createActions() {
  return {
    async openFile() {},
    async openDiff() {},
    async revertSelectedChanges() {
      return true;
    },
    async createBranch() {},
    async fetch() {},
    async promptForRefQuery() {
      return undefined;
    }
  };
}
