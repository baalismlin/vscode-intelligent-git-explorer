import { type ChangeEvent } from "react";
import { webviewCommands } from "@bridge/webviewCommands";
import { useGitLogStore } from "@store/gitLogStore";
import { AuthorFilterPopover } from "./AuthorFilterPopover";
import { CommitToolButton } from "./CommitToolButton";
import {
  createToolbarFilterState,
  DATE_FILTER_OPTIONS,
  getToolbarFilters,
  type ToolbarFilterKey
} from "../commitToolbarFilters";

export function CommitToolbar(): JSX.Element {
  const filters = useGitLogStore((state) => state.filters);
  const setFilters = useGitLogStore((state) => state.setFilters);
  const toolbarFilters = getToolbarFilters(filters);

  const updateFilter =
    (key: ToolbarFilterKey) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      applyFilterPatch({
        [key]: event.target.value
      });
    };

  const applyFilterPatch = (patch: Partial<Record<ToolbarFilterKey, string>>) => {
    const nextFilters = createToolbarFilterState(filters, {
      ...patch
    });
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
          value={toolbarFilters.searchText}
          onChange={updateFilter("searchText")}
        />
        <AuthorFilterPopover
          userFilter={toolbarFilters.user}
          onApply={(userFilter) => applyFilterPatch({ user: userFilter })}
        />
        <select
          className={getFilterClassName(toolbarFilters.date)}
          value={toolbarFilters.date}
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

function getFilterClassName(value: string): string {
  return value ? "commit-filter" : "commit-filter is-placeholder";
}
