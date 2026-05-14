export type GitRefType = "head" | "group" | "localBranch" | "remote" | "remoteBranch" | "tag";

export interface GitRefNode {
  id: string;
  label: string;
  type: GitRefType;
  children?: GitRefNode[];
}

export type ChangedFileStatus = "M" | "A" | "D" | "R";

export interface GitChangedFileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  status?: ChangedFileStatus;
  children?: GitChangedFileNode[];
}

export interface GitCommitSummary {
  id: string;
  shortHash: string;
  parentIds: string[];
  message: string;
  author: string;
  date: string;
  branchId: string;
}

export interface GitCommitDetail {
  commitId: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  changedFiles: GitChangedFileNode[];
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
