import { type StateCreator } from "zustand";
import { type GitLogStoreState, type LoadingState, type StatusSlice } from "../types";

const defaultLoadingState: LoadingState = {
  refs: false,
  commits: false,
  details: false
};

export const createStatusSlice: StateCreator<GitLogStoreState, [], [], StatusSlice> = (set) => ({
  loading: defaultLoadingState,
  errorMessage: "",
  setLoadingState: (area, isLoading) =>
    set((state) => ({
      loading: {
        ...state.loading,
        [area]: isLoading
      }
    })),
  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: "" })
});
