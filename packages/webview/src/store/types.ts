import {
  type FilterState,
  type GitRefNode,
  type SelectionState
} from "@intelligent-git-log/contracts/gitLogModels";
import {
  type CommitDetailViewModel,
  type CommitListItemViewModel,
  type GitLogBootstrapViewModel
} from "@intelligent-git-log/contracts/gitLogViewModels";

export type FocusedPane = "refs" | "commits" | "files";

export interface LoadingState {
  refs: boolean;
  commits: boolean;
  details: boolean;
}

export interface PanelLayoutState {
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

export interface DataSlice {
  refs: GitRefNode[];
  commits: CommitListItemViewModel[];
  selectedCommitDetail: CommitDetailViewModel | null;
  selection: SelectionState;
  bootstrap: (payload: GitLogBootstrapViewModel) => void;
  setRefs: (refs: GitRefNode[]) => void;
  setCommits: (refId: string, commits: CommitListItemViewModel[]) => void;
  setCommitDetails: (commitId: string, detail: CommitDetailViewModel | null) => void;
  setSelection: (selection: SelectionState) => void;
}

export interface FilterSlice {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export interface StatusSlice {
  loading: LoadingState;
  errorMessage: string;
  setLoadingState: (area: keyof LoadingState, isLoading: boolean) => void;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
}

export interface UiSlice {
  expandedRefs: string[];
  expandedFiles: string[];
  selectedFileId: string;
  panelLayout: PanelLayoutState;
  focusedPane: FocusedPane;
  persistedUiState?: PersistedWebviewState;
  restorePersistedUiState: (state: PersistedWebviewState) => void;
  toggleRefExpanded: (refId: string) => void;
  setExpandedRefs: (refIds: string[]) => void;
  toggleFileExpanded: (fileId: string) => void;
  setExpandedFiles: (fileIds: string[]) => void;
  selectFile: (fileId: string) => void;
  setPanelLayout: (layout: Partial<PanelLayoutState>) => void;
  setFocusedPane: (pane: FocusedPane) => void;
  getPersistedUiState: () => PersistedWebviewState;
}

export type GitLogStoreState = DataSlice & FilterSlice & StatusSlice & UiSlice;
