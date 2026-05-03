import {
  ChangedFileStatus,
  FilterState,
  GitRefNode,
  SelectionState,
  WorkspaceState
} from "../domain/gitLogModels";

export interface CommitGraphViewModel {
  color: string;
  lane: number;
  shape: "straight" | "mergeLeft" | "mergeRight";
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
