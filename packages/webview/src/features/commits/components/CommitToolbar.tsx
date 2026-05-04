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
    <div className="toolbar commit-toolbar">
      <div className="commit-toolbar-left">
        <input
          className="commit-search"
          type="text"
          placeholder="Text or hash"
          value={filters.searchText}
          onChange={updateFilter("searchText")}
        />
        <select className={getFilterClassName(filters.branch)} value={filters.branch} onChange={updateFilter("branch")}>
          <option value="">Branch</option>
        </select>
        <select className={getFilterClassName(filters.user)} value={filters.user} onChange={updateFilter("user")}>
          <option value="">User</option>
        </select>
        <select className={getFilterClassName(filters.date)} value={filters.date} onChange={updateFilter("date")}>
          <option value="">Date</option>
        </select>
        <select className={getFilterClassName(filters.paths)} value={filters.paths} onChange={updateFilter("paths")}>
          <option value="">Paths</option>
        </select>
      </div>
      <div className="commit-toolbar-right">
        <CommitToolButton label="Refresh" icon="R" onClick={() => postMessageToHost({ type: "refresh" })} />
        <CommitToolButton
          label="Cherry-pick"
          icon="C"
          onClick={() =>
            postMessageToHost({
              type: "runCommand",
              payload: {
                command: "commits:cherryPick"
              }
            })
          }
        />
        <CommitToolButton
          label="Go to hash/branch/tag"
          icon="G"
          onClick={() =>
            postMessageToHost({
              type: "runCommand",
              payload: {
                command: "commits:goToRef"
              }
            })
          }
        />
      </div>
    </div>
  );
}

function CommitToolButton({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }): JSX.Element {
  return (
    <button type="button" className="commit-tool-button" title={label} aria-label={label} onClick={onClick}>
      {icon}
    </button>
  );
}

function getFilterClassName(value: string): string {
  return value ? "commit-filter" : "commit-filter is-placeholder";
}
