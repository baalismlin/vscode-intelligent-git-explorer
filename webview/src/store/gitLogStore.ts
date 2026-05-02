import { create } from "zustand";
import { BootstrapPayload } from "../../../src/domain/gitLogProtocol";
import { CommitItem, FilterState, GitRefNode, SelectionState } from "../../../src/domain/gitLogModels";

interface LoadingState {
  refs: boolean;
  commits: boolean;
  details: boolean;
}

interface GitLogStoreState {
  refs: GitRefNode[];
  commits: CommitItem[];
  selectedCommit: CommitItem | null;
  selection: SelectionState;
  filters: FilterState;
  expandedRefs: string[];
  expandedFiles: string[];
  selectedFileId: string;
  loading: LoadingState;
  errorMessage: string;
  bootstrap: (payload: BootstrapPayload) => void;
  setRefs: (refs: GitRefNode[]) => void;
  setCommits: (refId: string, commits: CommitItem[]) => void;
  setCommitDetails: (commitId: string, commit: CommitItem | null) => void;
  setSelection: (selection: SelectionState) => void;
  setFilters: (filters: FilterState) => void;
  setLoadingState: (area: keyof LoadingState, isLoading: boolean) => void;
  setErrorMessage: (message: string) => void;
  toggleRefExpanded: (refId: string) => void;
  toggleFileExpanded: (fileId: string) => void;
  selectFile: (fileId: string) => void;
}

const defaultSelection: SelectionState = {
  selectedRefId: "",
  selectedCommitId: ""
};

const defaultFilters: FilterState = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
};

const defaultExpandedRefs = ["head-main", "local-group", "remote-group", "origin", "tags-group"];

export const useGitLogStore = create<GitLogStoreState>((set, get) => ({
  refs: [],
  commits: [],
  selectedCommit: null,
  selection: defaultSelection,
  filters: defaultFilters,
  expandedRefs: defaultExpandedRefs,
  expandedFiles: [],
  selectedFileId: "",
  loading: {
    refs: false,
    commits: false,
    details: false
  },
  errorMessage: "",
  bootstrap: (payload) => {
    const normalized = normalizeCommitDerivedState(payload.commits, payload.selection.selectedCommitId);
    set({
      refs: payload.refs,
      commits: payload.commits,
      selectedCommit: normalized.selectedCommit,
      selection: payload.selection,
      filters: payload.filters,
      expandedFiles: normalized.expandedFiles,
      selectedFileId: normalized.selectedFileId,
      errorMessage: ""
    });
  },
  setRefs: (refs) => set({ refs }),
  setCommits: (_refId, commits) => {
    const selectedCommitId = get().selection.selectedCommitId;
    const normalized = normalizeCommitDerivedState(commits, selectedCommitId);
    set({
      commits,
      selectedCommit: normalized.selectedCommit,
      expandedFiles: normalized.expandedFiles,
      selectedFileId: normalized.selectedFileId
    });
  },
  setCommitDetails: (commitId, commit) => {
    const normalized = normalizeCommitDerivedState(commit ? [commit] : [], commitId);
    set({
      selectedCommit: commit,
      expandedFiles: commit ? normalized.expandedFiles : [],
      selectedFileId: commit ? normalized.selectedFileId : ""
    });
  },
  setSelection: (selection) => set({ selection }),
  setFilters: (filters) => set({ filters }),
  setLoadingState: (area, isLoading) =>
    set((state) => ({
      loading: {
        ...state.loading,
        [area]: isLoading
      }
    })),
  setErrorMessage: (message) => set({ errorMessage: message }),
  toggleRefExpanded: (refId) =>
    set((state) => ({
      expandedRefs: toggleInArray(state.expandedRefs, refId)
    })),
  toggleFileExpanded: (fileId) =>
    set((state) => ({
      expandedFiles: toggleInArray(state.expandedFiles, fileId)
    })),
  selectFile: (fileId) => set({ selectedFileId: fileId })
}));

function toggleInArray(items: string[], value: string): string[] {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

function normalizeCommitDerivedState(commits: CommitItem[], selectedCommitId: string): {
  selectedCommit: CommitItem | null;
  expandedFiles: string[];
  selectedFileId: string;
} {
  if (!commits.length) {
    return {
      selectedCommit: null,
      expandedFiles: [],
      selectedFileId: ""
    };
  }

  const selectedCommit = commits.find((commit) => commit.id === selectedCommitId) ?? commits[0];
  const fileNodes = flattenFiles(selectedCommit.changedFiles);
  const expandedFiles = fileNodes.filter((node) => node.type === "folder").map((node) => node.id);
  const selectedFile = fileNodes.find((node) => node.type === "file");

  return {
    selectedCommit,
    expandedFiles,
    selectedFileId: selectedFile?.id ?? ""
  };
}

function flattenFiles(nodes: CommitItem["changedFiles"]): CommitItem["changedFiles"] {
  const result: CommitItem["changedFiles"] = [];

  for (const node of nodes) {
    result.push(node);
    if (node.children?.length) {
      result.push(...flattenFiles(node.children));
    }
  }

  return result;
}
