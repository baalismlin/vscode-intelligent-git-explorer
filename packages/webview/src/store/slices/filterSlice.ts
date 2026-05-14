import { type StateCreator } from "zustand";
import { type FilterState } from "@intelligent-git-log/contracts/gitLogModels";
import { type FilterSlice, type GitLogStoreState } from "../types";

const defaultFilters: FilterState = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
};

export const createFilterSlice: StateCreator<GitLogStoreState, [], [], FilterSlice> = (set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters })
});
