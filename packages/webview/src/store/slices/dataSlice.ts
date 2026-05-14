import { type StateCreator } from "zustand";
import { type SelectionState } from "@intelligent-git-log/contracts/gitLogModels";
import { type DataSlice, type GitLogStoreState } from "../types";

const defaultSelection: SelectionState = {
  selectedRefId: "",
  selectedCommitId: ""
};

export const createDataSlice: StateCreator<GitLogStoreState, [], [], DataSlice> = (set, get) => ({
  refs: [],
  commits: [],
  selectedCommitDetail: null,
  selection: defaultSelection,
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
        ? (persistedUiState?.expandedFiles ?? [])
        : (selectedCommitDetail?.defaultExpandedFileIds ?? []),
      selectedFileId: shouldReuseFileState
        ? (persistedUiState?.selectedFileId ?? "")
        : (selectedCommitDetail?.initialSelectedFileId ?? ""),
      panelLayout: persistedUiState?.panelLayout ?? get().panelLayout,
      focusedPane: persistedUiState?.focusedPane ?? get().focusedPane,
      errorMessage: ""
    });
  },
  setRefs: (refs) => set({ refs }),
  setCommits: (_refId, commits) => {
    const selectedCommitId = get().selection.selectedCommitId;
    const selectedCommitDetail = get().selectedCommitDetail;

    set({
      commits,
      selectedCommitDetail:
        selectedCommitDetail?.commitId === selectedCommitId ? selectedCommitDetail : null
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
        ? (persistedUiState?.expandedFiles ?? [])
        : (detail?.defaultExpandedFileIds ?? []),
      selectedFileId: shouldReuseFileState
        ? (persistedUiState?.selectedFileId ?? "")
        : (detail?.initialSelectedFileId ?? "")
    });
  },
  setSelection: (selection) => set({ selection })
});
