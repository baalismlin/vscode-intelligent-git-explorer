import { create } from "zustand";
import { BootstrapPayload } from "../../../src/domain/gitLogProtocol";
import { FilterState, GitRefNode, SelectionState } from "../../../src/domain/gitLogModels";
import { CommitDetailViewModel, CommitListItemViewModel } from "../../../src/application/gitLogViewModels";

interface LoadingState {
  refs: boolean;
  commits: boolean;
  details: boolean;
}

interface GitLogStoreState {
  refs: GitRefNode[];
  commits: CommitListItemViewModel[];
  selectedCommitDetail: CommitDetailViewModel | null;
  selection: SelectionState;
  filters: FilterState;
  expandedRefs: string[];
  expandedFiles: string[];
  selectedFileId: string;
  loading: LoadingState;
  errorMessage: string;
  bootstrap: (payload: BootstrapPayload) => void;
  setRefs: (refs: GitRefNode[]) => void;
  setCommits: (refId: string, commits: CommitListItemViewModel[]) => void;
  setCommitDetails: (commitId: string, detail: CommitDetailViewModel | null) => void;
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
  selectedCommitDetail: null,
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
    set({
      refs: payload.refs,
      commits: payload.commits,
      selectedCommitDetail: payload.selectedCommitDetail,
      selection: payload.selection,
      filters: payload.filters,
      expandedFiles: payload.selectedCommitDetail?.defaultExpandedFileIds ?? [],
      selectedFileId: payload.selectedCommitDetail?.initialSelectedFileId ?? "",
      errorMessage: ""
    });
  },
  setRefs: (refs) => set({ refs }),
  setCommits: (_refId, commits) => {
    const selectedCommitId = get().selection.selectedCommitId;
    set({
      commits,
      selectedCommitDetail:
        get().selectedCommitDetail?.commitId === selectedCommitId ? get().selectedCommitDetail : null
    });
  },
  setCommitDetails: (_commitId, detail) => {
    set({
      selectedCommitDetail: detail,
      expandedFiles: detail?.defaultExpandedFileIds ?? [],
      selectedFileId: detail?.initialSelectedFileId ?? ""
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
