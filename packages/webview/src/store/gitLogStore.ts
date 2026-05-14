import { create } from "zustand";
import { createDataSlice } from "./slices/dataSlice";
import { createFilterSlice } from "./slices/filterSlice";
import { createStatusSlice } from "./slices/statusSlice";
import { createUiSlice } from "./slices/uiSlice";
import {
  type FocusedPane,
  type GitLogStoreState,
  type PersistedWebviewState
} from "./types";

export type { FocusedPane, PersistedWebviewState };

export const useGitLogStore = create<GitLogStoreState>()((...storeApi) => ({
  ...createDataSlice(...storeApi),
  ...createFilterSlice(...storeApi),
  ...createStatusSlice(...storeApi),
  ...createUiSlice(...storeApi)
}));
