import { create } from "zustand";
import { FilterState, GitRefNode, SelectionState } from "@intellij-git-log/contracts/gitLogModels";
import { CommitDetailViewModel, CommitListItemViewModel } from "@intellij-git-log/contracts/gitLogViewModels";
import { BootstrapPayload } from "@intellij-git-log/contracts/gitLogProtocol";

export type FocusedPane = "refs" | "commits" | "files";

interface LoadingState {
  refs: boolean;
  commits: boolean;
  details: boolean;
}

interface PanelLayoutState {
  refsWidth: number;
  detailsWidth: number;
}

export interface PersistedWebviewState {
  expandedRefs: string[];
  expandedFiles: string[];
  selectedFileId: string;
  panelLayout: PanelLayoutState;
  focusedPane: FocusedPane;
  fileStateCommitId: string;
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
  panelLayout: PanelLayoutState;
  focusedPane: FocusedPane;
  loading: LoadingState;
  errorMessage: string;
  persistedUiState?: PersistedWebviewState;
  bootstrap: (payload: BootstrapPayload) => void;
  restorePersistedUiState: (state: PersistedWebviewState) => void;
  setRefs: (refs: GitRefNode[]) => void;
  setCommits: (refId: string, commits: CommitListItemViewModel[]) => void;
  setCommitDetails: (commitId: string, detail: CommitDetailViewModel | null) => void;
  setSelection: (selection: SelectionState) => void;
  setFilters: (filters: FilterState) => void;
  setLoadingState: (area: keyof LoadingState, isLoading: boolean) => void;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
  toggleRefExpanded: (refId: string) => void;
  setExpandedRefs: (refIds: string[]) => void;
  toggleFileExpanded: (fileId: string) => void;
  selectFile: (fileId: string) => void;
  setPanelLayout: (layout: Partial<PanelLayoutState>) => void;
  setFocusedPane: (pane: FocusedPane) => void;
  getPersistedUiState: () => PersistedWebviewState;
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
const defaultPanelLayout: PanelLayoutState = {
  refsWidth: 270,
  detailsWidth: 320
};

export const useGitLogStore = create<GitLogStoreState>((set, get) => ({
  refs: [],
  commits: [],
  selectedCommitDetail: null,
  selection: defaultSelection,
  filters: defaultFilters,
  expandedRefs: defaultExpandedRefs,
  expandedFiles: [],
  selectedFileId: "",
  panelLayout: defaultPanelLayout,
  focusedPane: "commits",
  loading: {
    refs: false,
    commits: false,
    details: false
  },
  errorMessage: "",
  restorePersistedUiState: (state) => set({ persistedUiState: state }),
  bootstrap: (payload) => {
    const persistedUiState = get().persistedUiState;
    const selectedCommitDetail = payload.selectedCommitDetail;
    const shouldReuseFileState =
      Boolean(persistedUiState?.fileStateCommitId) &&
      selectedCommitDetail?.commitId === persistedUiState?.fileStateCommitId;

    set({
      refs: payload.refs,
      commits: payload.commits,
      selectedCommitDetail,
      selection: payload.selection,
      filters: payload.filters,
      expandedRefs: persistedUiState?.expandedRefs ?? get().expandedRefs,
      expandedFiles: shouldReuseFileState
        ? persistedUiState?.expandedFiles ?? []
        : selectedCommitDetail?.defaultExpandedFileIds ?? [],
      selectedFileId: shouldReuseFileState
        ? persistedUiState?.selectedFileId ?? ""
        : selectedCommitDetail?.initialSelectedFileId ?? "",
      panelLayout: persistedUiState?.panelLayout ?? get().panelLayout,
      focusedPane: persistedUiState?.focusedPane ?? get().focusedPane,
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
    const persistedUiState = get().persistedUiState;
    const shouldReuseFileState =
      Boolean(persistedUiState?.fileStateCommitId) &&
      detail?.commitId === persistedUiState?.fileStateCommitId;

    set({
      selectedCommitDetail: detail,
      expandedFiles: shouldReuseFileState
        ? persistedUiState?.expandedFiles ?? []
        : detail?.defaultExpandedFileIds ?? [],
      selectedFileId: shouldReuseFileState
        ? persistedUiState?.selectedFileId ?? ""
        : detail?.initialSelectedFileId ?? ""
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
  clearErrorMessage: () => set({ errorMessage: "" }),
  toggleRefExpanded: (refId) =>
    set((state) => ({
      expandedRefs: toggleInArray(state.expandedRefs, refId)
    })),
  setExpandedRefs: (refIds) => set({ expandedRefs: refIds }),
  toggleFileExpanded: (fileId) =>
    set((state) => ({
      expandedFiles: toggleInArray(state.expandedFiles, fileId)
    })),
  selectFile: (fileId) => set({ selectedFileId: fileId }),
  setPanelLayout: (layout) =>
    set((state) => ({
      panelLayout: {
        ...state.panelLayout,
        ...layout
      }
    })),
  setFocusedPane: (pane) => set({ focusedPane: pane }),
  getPersistedUiState: () => ({
    expandedRefs: get().expandedRefs,
    expandedFiles: get().expandedFiles,
    selectedFileId: get().selectedFileId,
    panelLayout: get().panelLayout,
    focusedPane: get().focusedPane,
    fileStateCommitId: get().selectedCommitDetail?.commitId ?? ""
  })
}));

function toggleInArray(items: string[], value: string): string[] {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}
