import { type ChangeEvent, useEffect } from "react";
import { webviewCommands } from "@bridge/webviewCommands";
import { useGitLogStore } from "@store/gitLogStore";

const DATE_FILTER_OPTIONS = [
  { label: "Last 1 Day", value: "1 day ago" },
  { label: "Last 3 Days", value: "3 days ago" },
  { label: "Last 7 Days", value: "7 days ago" },
  { label: "Last 30 Days", value: "30 days ago" }
] as const;

export function CommitToolbar(): JSX.Element {
  const filters = useGitLogStore((state) => state.filters);
  const setFilters = useGitLogStore((state) => state.setFilters);

  useEffect(() => {
    if (!filters.branch && !filters.paths) {
      return;
    }

    const nextFilters = {
      ...filters,
      branch: "",
      paths: ""
    };
    setFilters(nextFilters);
    webviewCommands.setFilters(nextFilters);
  }, [filters, setFilters]);

  const updateFilter =
    (key: keyof typeof filters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextFilters = {
        ...filters,
        [key]: event.target.value
      };
      setFilters(nextFilters);
      webviewCommands.setFilters(nextFilters);
    };

  const openUserFilterPrompt = () => {
    const nextUserFilter = window.prompt("Enter one or more authors separated by |", filters.user);
    if (nextUserFilter === null) {
      return;
    }

    const nextFilters = {
      ...filters,
      user: nextUserFilter.trim()
    };
    setFilters(nextFilters);
    webviewCommands.setFilters(nextFilters);
  };

  return (
    <div className="toolbar commit-toolbar">
      <div className="commit-toolbar-left">
        <input
          className="commit-search"
          type="text"
          placeholder="⌕ Text or hash"
          value={filters.searchText}
          onChange={updateFilter("searchText")}
        />
        <button
          type="button"
          className={getFilterButtonClassName(filters.user)}
          onClick={openUserFilterPrompt}
          title={filters.user || "User"}
        >
          {filters.user || "User"}
        </button>
        <select
          className={getFilterClassName(filters.date)}
          value={filters.date}
          onChange={updateFilter("date")}
        >
          <option value="">Date</option>
          {DATE_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="commit-toolbar-right">
        <CommitToolButton
          label="Refresh"
          iconClassName="codicon codicon-refresh"
          onClick={webviewCommands.refresh}
        />
        <CommitToolButton
          label="Cherry-pick"
          iconClassName="codicon codicon-git-commit"
          onClick={webviewCommands.cherryPickCommit}
        />
        <CommitToolButton
          label="Go to hash/branch/tag"
          iconClassName="codicon codicon-search"
          onClick={webviewCommands.goToRef}
        />
      </div>
    </div>
  );
}

function CommitToolButton({
  label,
  iconClassName,
  onClick
}: {
  label: string;
  iconClassName: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      className="commit-tool-button"
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      <span className={iconClassName} aria-hidden="true" />
    </button>
  );
}

function getFilterClassName(value: string): string {
  return value ? "commit-filter" : "commit-filter is-placeholder";
}

function getFilterButtonClassName(value: string): string {
  return value ? "commit-filter-button" : "commit-filter-button is-placeholder";
}
