import { ChangeEvent } from "react";
import { postMessageToHost } from "@bridge/vscode";
import { useGitLogStore } from "@store/gitLogStore";

export function CommitToolbar(): JSX.Element {
  const filters = useGitLogStore((state) => state.filters);
  const setFilters = useGitLogStore((state) => state.setFilters);

  const updateFilter = (key: keyof typeof filters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const nextFilters = {
      ...filters,
      [key]: event.target.value
    };
    setFilters(nextFilters);
    postMessageToHost({
      type: "setFilters",
      payload: nextFilters
    });
  };

  return (
    <div className="toolbar">
      <input type="text" placeholder="Text or hash" value={filters.searchText} onChange={updateFilter("searchText")} />
      <select value={filters.branch} onChange={updateFilter("branch")}>
        <option value="">Branch</option>
      </select>
      <select value={filters.user} onChange={updateFilter("user")}>
        <option value="">User</option>
      </select>
      <select value={filters.date} onChange={updateFilter("date")}>
        <option value="">Date</option>
      </select>
      <select value={filters.paths} onChange={updateFilter("paths")}>
        <option value="">Paths</option>
      </select>
    </div>
  );
}
