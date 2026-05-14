import {
  type ChangedFileStatus,
  type FilterState,
  type GitRefNode,
  type SelectionState,
  type WorkspaceState
} from "./gitLogModels";

export interface CommitGraphViewModel {
  width: number;
  lanes: CommitGraphLaneViewModel[];
  edges: CommitGraphEdgeViewModel[];
  node: CommitGraphNodeViewModel;
}

export interface CommitGraphLaneViewModel {
  lane: number;
  color: string;
  top: boolean;
  bottom: boolean;
}

export interface CommitGraphEdgeViewModel {
  fromLane: number;
  toLane: number;
  from: "node" | "lane";
  to: "top" | "bottom";
  color: string;
}

export interface CommitGraphNodeViewModel {
  lane: number;
  color: string;
}

export interface CommitListItemViewModel {
  id: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  graph: CommitGraphViewModel;
}

export interface ChangedFileNodeViewModel {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  status?: ChangedFileStatus;
  children?: ChangedFileNodeViewModel[];
}

export interface CommitDetailViewModel {
  commitId: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  changedFiles: ChangedFileNodeViewModel[];
  defaultExpandedFileIds: string[];
  initialSelectedFileId: string;
}

export interface GitLogBootstrapViewModel {
  workspace: WorkspaceState;
  refs: GitRefNode[];
  commits: CommitListItemViewModel[];
  selectedCommitDetail: CommitDetailViewModel | null;
  selection: SelectionState;
  filters: FilterState;
}
