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
      parentIds: [],
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
      parentIds: ["commit-1"],
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
  assert.deepEqual(result.commits[0].graph.node, {
    lane: 0,
    color: "#2f80ed"
  });
  assert.equal(result.commits[0].graph.width, 64);
  assert.equal(result.selectedCommitDetail.commitId, "commit-2");
});

test("mapper builds graph lanes and merge edges from commit parents", () => {
  const mapper = new GitLogViewModelMapper();
  const commits = mapper.mapCommitListItems([
    {
      id: "merge",
      shortHash: "m",
      message: "Merge",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-parent", "feature-parent"],
      branchId: "main"
    },
    {
      id: "main-parent",
      shortHash: "mp",
      message: "Main parent",
      author: "Ada",
      date: "2026-05-14",
      parentIds: [],
      branchId: "main"
    },
    {
      id: "feature-parent",
      shortHash: "fp",
      message: "Feature parent",
      author: "Ada",
      date: "2026-05-14",
      parentIds: [],
      branchId: "feature/test"
    }
  ]);

  assert.equal(commits[0].graph.node.lane, 0);
  assert.deepEqual(commits[0].graph.edges, [
    {
      fromLane: 0,
      toLane: 1,
      from: "node",
      to: "bottom",
      color: "#f2994a"
    }
  ]);
  assert.equal(commits[0].graph.lanes[1].top, false);
  assert.equal(commits[0].graph.lanes[1].bottom, false);
  assert.deepEqual(
    commits[0].graph.lanes.map((lane) => lane.lane),
    [0, 1]
  );
  assert.equal(commits[2].graph.node.lane, 1);
});

test("mapper uses an edge instead of a node-lane tail when the parent is already active", () => {
  const mapper = new GitLogViewModelMapper();
  const commits = mapper.mapCommitListItems([
    {
      id: "merge",
      shortHash: "m",
      message: "Merge",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-parent", "feature-parent"],
      branchId: "main"
    },
    {
      id: "feature-parent",
      shortHash: "fp",
      message: "Feature parent",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-parent"],
      branchId: "feature/test"
    },
    {
      id: "main-parent",
      shortHash: "mp",
      message: "Main parent",
      author: "Ada",
      date: "2026-05-14",
      parentIds: [],
      branchId: "main"
    }
  ]);

  assert.equal(commits[1].graph.node.lane, 1);
  assert.equal(commits[1].graph.lanes[1].bottom, false);
  assert.deepEqual(commits[1].graph.edges, [
    {
      fromLane: 1,
      toLane: 0,
      from: "node",
      to: "bottom",
      color: "#2f80ed"
    }
  ]);
});

test("mapper preserves branch lanes when another branch ends into an active parent", () => {
  const mapper = new GitLogViewModelMapper();
  const commits = mapper.mapCommitListItems([
    {
      id: "merge",
      shortHash: "m",
      message: "Merge B into A",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["branch-a", "branch-b"],
      branchId: "main"
    },
    {
      id: "branch-a",
      shortHash: "a",
      message: "A branch commit",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["branch-b"],
      branchId: "main"
    },
    {
      id: "branch-b",
      shortHash: "b",
      message: "B branch commit",
      author: "Ada",
      date: "2026-05-14",
      parentIds: [],
      branchId: "feature"
    }
  ]);

  assert.equal(commits[0].graph.node.lane, 0);
  assert.equal(commits[1].graph.node.lane, 0);
  assert.equal(commits[2].graph.node.lane, 0);
});

test("mapper keeps first-parent commits on the main lane when side branch appears first", () => {
  const mapper = new GitLogViewModelMapper();
  const commits = mapper.mapCommitListItems([
    {
      id: "merge",
      shortHash: "m",
      message: "Merge A into main",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-5", "branch-a-1"],
      branchId: "main"
    },
    {
      id: "branch-a-1",
      shortHash: "a1",
      message: "A branch commit",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-3"],
      branchId: "branch-a"
    },
    {
      id: "main-5",
      shortHash: "m5",
      message: "Main commit 5",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-4"],
      branchId: "main"
    },
    {
      id: "main-4",
      shortHash: "m4",
      message: "Main commit 4",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-3"],
      branchId: "main"
    },
    {
      id: "main-3",
      shortHash: "m3",
      message: "Main commit 3",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-2"],
      branchId: "main"
    },
    {
      id: "main-2",
      shortHash: "m2",
      message: "Main commit 2",
      author: "Ada",
      date: "2026-05-14",
      parentIds: ["main-1"],
      branchId: "main"
    },
    {
      id: "main-1",
      shortHash: "m1",
      message: "Main commit 1",
      author: "Ada",
      date: "2026-05-14",
      parentIds: [],
      branchId: "main"
    }
  ]);

  assert.equal(commits[1].graph.node.lane, 1);
  assert.equal(commits[1].graph.lanes[1].bottom, true);
  assert.deepEqual(commits[1].graph.edges, []);
  assert.equal(commits[4].graph.node.lane, 0);
  assert.deepEqual(commits[4].graph.edges, [
    {
      fromLane: 0,
      toLane: 1,
      from: "node",
      to: "top",
      color: "#2f80ed"
    }
  ]);
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
