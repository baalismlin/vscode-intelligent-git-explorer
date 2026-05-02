export type GitRefType =
  | "head"
  | "group"
  | "localBranch"
  | "remote"
  | "remoteBranch"
  | "tag";

export interface GitRefNode {
  id: string;
  label: string;
  type: GitRefType;
  children?: GitRefNode[];
}

export type ChangedFileStatus = "M" | "A" | "D" | "R";

export interface ChangedFileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  status?: ChangedFileStatus;
  children?: ChangedFileNode[];
}

export interface CommitItem {
  id: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  branchId: string;
  graphColor?: string;
  graphLane?: number;
  graphShape?: "straight" | "mergeLeft" | "mergeRight";
  changedFiles: ChangedFileNode[];
}

export interface FilterState {
  searchText: string;
  branch: string;
  user: string;
  date: string;
  paths: string;
}

export interface SelectionState {
  selectedRefId: string;
  selectedCommitId: string;
}

export interface WorkspaceState {
  repositoryRoot: string;
}

export interface BootstrapState {
  workspace: WorkspaceState;
  refs: GitRefNode[];
  commits: CommitItem[];
  selection: SelectionState;
  filters: FilterState;
}
