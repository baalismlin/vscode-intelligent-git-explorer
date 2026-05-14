import { type FilterState } from "@intelligent-git-log/contracts/gitLogModels";

export const DATE_FILTER_OPTIONS = [
  { label: "Last 1 Day", value: "1 day ago" },
  { label: "Last 3 Days", value: "3 days ago" },
  { label: "Last 7 Days", value: "7 days ago" },
  { label: "Last 30 Days", value: "30 days ago" }
] as const;

export type ToolbarFilterKey = "searchText" | "user" | "date";

export function getToolbarFilters(filters: FilterState): Pick<FilterState, ToolbarFilterKey> {
  return {
    searchText: filters.searchText,
    user: filters.user,
    date: filters.date
  };
}

export function createToolbarFilterState(
  filters: FilterState,
  patch: Partial<Pick<FilterState, ToolbarFilterKey>>
): FilterState {
  return {
    ...filters,
    ...patch,
    branch: "",
    paths: ""
  };
}
