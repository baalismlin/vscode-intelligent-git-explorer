import { GitLogProvider } from "../../domain/gitLogProvider";
import { CommitItem, FilterState, GitRefNode } from "../../domain/gitLogModels";

const changedFilesMain1 = [
  {
    id: "cf-main-1-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      { id: "cf-main-1-readme", name: "README.md", path: "project-name/README.md", type: "file" as const, status: "M" as const },
      {
        id: "cf-main-1-src",
        name: "src",
        path: "project-name/src",
        type: "folder" as const,
        children: [
          { id: "cf-main-1-index", name: "index.ts", path: "project-name/src/index.ts", type: "file" as const, status: "M" as const },
          { id: "cf-main-1-service", name: "gitService.ts", path: "project-name/src/gitService.ts", type: "file" as const, status: "A" as const }
        ]
      }
    ]
  }
];

const changedFilesMain2 = [
  {
    id: "cf-main-2-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      {
        id: "cf-main-2-src",
        name: "src",
        path: "project-name/src",
        type: "folder" as const,
        children: [
          { id: "cf-main-2-panel", name: "gitLogPanel.ts", path: "project-name/src/gitLogPanel.ts", type: "file" as const, status: "M" as const },
          { id: "cf-main-2-ext", name: "extension.ts", path: "project-name/src/extension.ts", type: "file" as const, status: "M" as const }
        ]
      },
      { id: "cf-main-2-pkg", name: "package.json", path: "project-name/package.json", type: "file" as const, status: "M" as const }
    ]
  }
];

const changedFilesMain3 = [
  {
    id: "cf-main-3-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      {
        id: "cf-main-3-media",
        name: "media",
        path: "project-name/media",
        type: "folder" as const,
        children: [
          { id: "cf-main-3-css", name: "gitLogWebview.css", path: "project-name/media/webview/gitLogWebview.css", type: "file" as const, status: "A" as const },
          { id: "cf-main-3-js", name: "gitLogWebview.js", path: "project-name/media/webview/gitLogWebview.js", type: "file" as const, status: "A" as const }
        ]
      },
      { id: "cf-main-3-vite", name: "vite.webview.config.ts", path: "project-name/vite.webview.config.ts", type: "file" as const, status: "A" as const }
    ]
  }
];

const changedFilesFeature1 = [
  {
    id: "cf-feature-1-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      {
        id: "cf-feature-1-webview",
        name: "webview",
        path: "project-name/webview",
        type: "folder" as const,
        children: [
          { id: "cf-feature-1-main", name: "main.tsx", path: "project-name/webview/src/main.tsx", type: "file" as const, status: "A" as const },
          { id: "cf-feature-1-store", name: "gitLogStore.ts", path: "project-name/webview/src/store/gitLogStore.ts", type: "file" as const, status: "A" as const }
        ]
      }
    ]
  }
];

const changedFilesFeature2 = [
  {
    id: "cf-feature-2-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      {
        id: "cf-feature-2-src",
        name: "src",
        path: "project-name/src",
        type: "folder" as const,
        children: [
          { id: "cf-feature-2-domain", name: "gitLogProtocol.ts", path: "project-name/src/domain/gitLogProtocol.ts", type: "file" as const, status: "A" as const },
          { id: "cf-feature-2-service", name: "gitLogApplicationService.ts", path: "project-name/src/application/gitLogApplicationService.ts", type: "file" as const, status: "A" as const }
        ]
      }
    ]
  }
];

const changedFilesRemote1 = [
  {
    id: "cf-remote-1-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      {
        id: "cf-remote-1-src",
        name: "src",
        path: "project-name/src",
        type: "folder" as const,
        children: [
          { id: "cf-remote-1-router", name: "webviewMessageRouter.ts", path: "project-name/src/extension/bridge/webviewMessageRouter.ts", type: "file" as const, status: "A" as const },
          { id: "cf-remote-1-panel", name: "gitLogPanel.ts", path: "project-name/src/extension/panel/gitLogPanel.ts", type: "file" as const, status: "A" as const }
        ]
      }
    ]
  }
];

const changedFilesTag1 = [
  {
    id: "cf-tag-1-root",
    name: "project-name",
    path: "project-name",
    type: "folder" as const,
    children: [
      {
        id: "cf-tag-1-webview",
        name: "webview",
        path: "project-name/webview",
        type: "folder" as const,
        children: [
          { id: "cf-tag-1-app", name: "App.tsx", path: "project-name/webview/src/app/App.tsx", type: "file" as const, status: "A" as const }
        ]
      }
    ]
  }
];

const refs: GitRefNode[] = [
  {
    id: "head-main",
    label: "HEAD",
    type: "head",
    children: [{ id: "main", label: "main", type: "localBranch" }]
  },
  {
    id: "local-group",
    label: "Local",
    type: "group",
    children: [
      { id: "main", label: "main", type: "localBranch" },
      { id: "feature-ui", label: "feature/git-log-ui", type: "localBranch" },
      { id: "release-1-1", label: "release/1.1", type: "localBranch" }
    ]
  },
  {
    id: "remote-group",
    label: "Remote",
    type: "group",
    children: [
      {
        id: "origin",
        label: "origin",
        type: "remote",
        children: [
          { id: "origin-main", label: "main", type: "remoteBranch" },
          { id: "origin-feature-ui", label: "feature/git-log-ui", type: "remoteBranch" },
          { id: "origin-release-1-1", label: "release/1.1", type: "remoteBranch" }
        ]
      }
    ]
  },
  {
    id: "tags-group",
    label: "Tags",
    type: "group",
    children: [
      { id: "tag-v1-0-0", label: "v1.0.0", type: "tag" },
      { id: "tag-v1-1-0", label: "v1.1.0", type: "tag" }
    ]
  }
];

const commitsByRef: Record<string, CommitItem[]> = {
  main: [
    {
      id: "c-main-1",
      shortHash: "a1c9f72",
      message: "Refine webview state handling for the Git Log MVP",
      author: "Feng",
      date: "2026-04-26 10:12",
      branchId: "main",
      graphColor: "#2f80ed",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesMain1
    },
    {
      id: "c-main-2",
      shortHash: "b82de14",
      message: "Align panel layout with IntelliJ log proportions",
      author: "Mina",
      date: "2026-04-26 09:47",
      branchId: "main",
      graphColor: "#f2994a",
      graphLane: 1,
      graphShape: "mergeLeft",
      changedFiles: changedFilesMain2
    },
    {
      id: "c-main-3",
      shortHash: "ce11ab0",
      message: "Add initial React webview scaffold and bridge layer",
      author: "Noah",
      date: "2026-04-25 18:03",
      branchId: "main",
      graphColor: "#27ae60",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesMain3
    }
  ],
  "feature-ui": [
    {
      id: "c-feature-1",
      shortHash: "7fd290e",
      message: "Prototype branch-driven selection flow",
      author: "Feng",
      date: "2026-04-26 11:04",
      branchId: "feature-ui",
      graphColor: "#9b51e0",
      graphLane: 1,
      graphShape: "mergeRight",
      changedFiles: changedFilesFeature1
    },
    {
      id: "c-feature-2",
      shortHash: "48a2e1d",
      message: "Add typed protocol and application service shell",
      author: "Mina",
      date: "2026-04-26 10:36",
      branchId: "feature-ui",
      graphColor: "#eb5757",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesFeature2
    }
  ],
  "release-1-1": [
    {
      id: "c-release-1",
      shortHash: "90c72a4",
      message: "Prepare release branch snapshot",
      author: "Ava",
      date: "2026-04-24 16:22",
      branchId: "release-1-1",
      graphColor: "#2d9cdb",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesMain2
    }
  ],
  "origin-main": [
    {
      id: "c-remote-1",
      shortHash: "d5f1028",
      message: "Sync remote history with internal explorer state",
      author: "Olivia",
      date: "2026-04-23 14:15",
      branchId: "origin-main",
      graphColor: "#56ccf2",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesRemote1
    },
    {
      id: "c-remote-2",
      shortHash: "e643fd0",
      message: "Stabilize mock commit graph colors",
      author: "Liam",
      date: "2026-04-22 08:41",
      branchId: "origin-main",
      graphColor: "#6fcf97",
      graphLane: 1,
      graphShape: "mergeLeft",
      changedFiles: changedFilesMain1
    }
  ],
  "origin-feature-ui": [
    {
      id: "c-origin-feature-1",
      shortHash: "11f7c3b",
      message: "Push in-progress Git Log UI experiment",
      author: "Feng",
      date: "2026-04-21 19:30",
      branchId: "origin-feature-ui",
      graphColor: "#bb6bd9",
      graphLane: 1,
      graphShape: "mergeRight",
      changedFiles: changedFilesFeature1
    }
  ],
  "origin-release-1-1": [
    {
      id: "c-origin-release-1",
      shortHash: "53de9ac",
      message: "Tag release candidate assets",
      author: "Ava",
      date: "2026-04-20 12:09",
      branchId: "origin-release-1-1",
      graphColor: "#f2c94c",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesTag1
    }
  ],
  "tag-v1-0-0": [
    {
      id: "c-tag-1",
      shortHash: "aa10f4e",
      message: "Version 1.0.0 baseline",
      author: "Ava",
      date: "2026-04-19 10:00",
      branchId: "tag-v1-0-0",
      graphColor: "#828282",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesTag1
    }
  ],
  "tag-v1-1-0": [
    {
      id: "c-tag-2",
      shortHash: "bb20e7d",
      message: "Version 1.1.0 release snapshot",
      author: "Ava",
      date: "2026-04-24 09:00",
      branchId: "tag-v1-1-0",
      graphColor: "#4f4f4f",
      graphLane: 0,
      graphShape: "straight",
      changedFiles: changedFilesMain3
    }
  ]
};

export class MockGitLogProvider implements GitLogProvider {
  public async getRefs(): Promise<GitRefNode[]> {
    return refs;
  }

  public async getCommits(refId: string, filters: FilterState): Promise<CommitItem[]> {
    const commits = commitsByRef[refId] ?? [];
    const query = filters.searchText.trim().toLowerCase();

    if (!query) {
      return commits;
    }

    return commits.filter((commit) => {
      return (
        commit.message.toLowerCase().includes(query) ||
        commit.shortHash.toLowerCase().includes(query) ||
        commit.author.toLowerCase().includes(query)
      );
    });
  }
}
