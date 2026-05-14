import { type StateCreator } from "zustand";
import {
  type FocusedPane,
  type GitLogStoreState,
  type PanelLayoutState,
  type UiSlice
} from "../types";

const defaultExpandedRefs = ["head-main", "local-group", "remote-group", "origin", "tags-group"];

const defaultPanelLayout: PanelLayoutState = {
  refsWidth: 270,
  detailsWidth: 320
};

export const createUiSlice: StateCreator<GitLogStoreState, [], [], UiSlice> = (set, get) => ({
  expandedRefs: defaultExpandedRefs,
  expandedFiles: [],
  selectedFileId: "",
  panelLayout: defaultPanelLayout,
  focusedPane: "commits",
  restorePersistedUiState: (state) =>
    set({
      persistedUiState: state,
      expandedRefs: state.expandedRefs,
      expandedFiles: state.expandedFiles,
      selectedFileId: state.selectedFileId,
      panelLayout: state.panelLayout,
      focusedPane: state.focusedPane
    }),
  toggleRefExpanded: (refId) =>
    set((state) => ({
      expandedRefs: toggleInArray(state.expandedRefs, refId)
    })),
  setExpandedRefs: (refIds) => set({ expandedRefs: refIds }),
  toggleFileExpanded: (fileId) =>
    set((state) => ({
      expandedFiles: toggleInArray(state.expandedFiles, fileId)
    })),
  setExpandedFiles: (fileIds) => set({ expandedFiles: fileIds }),
  selectFile: (fileId) => set({ selectedFileId: fileId }),
  setPanelLayout: (layout) =>
    set((state) => ({
      panelLayout: {
        ...state.panelLayout,
        ...layout
      }
    })),
  setFocusedPane: (pane: FocusedPane) => set({ focusedPane: pane }),
  getPersistedUiState: () => ({
    expandedRefs: get().expandedRefs,
    expandedFiles: get().expandedFiles,
    selectedFileId: get().selectedFileId,
    panelLayout: get().panelLayout,
    focusedPane: get().focusedPane,
    fileStateCommitId:
      get().selectedCommitDetail?.commitId ?? get().persistedUiState?.fileStateCommitId ?? ""
  })
});

function toggleInArray(items: string[], value: string): string[] {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}
