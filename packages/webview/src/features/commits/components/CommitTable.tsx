import { useEffect, useRef, useState } from "react";
import { CommitListItemViewModel } from "@intellij-git-log/contracts/gitLogViewModels";
import { postMessageToHost } from "@bridge/vscode";
import { useGitLogStore } from "@store/gitLogStore";
import { CommitGraphCell } from "./CommitGraphCell";

const rowHeight = 25;
const overscan = 8;

export function CommitTable(): JSX.Element {
  const commits = useGitLogStore((state) => state.commits);
  const selectedCommitId = useGitLogStore((state) => state.selection.selectedCommitId);
  const isLoading = useGitLogStore((state) => state.loading.commits);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    setViewportHeight(container.clientHeight);
    const observer = new ResizeObserver(() => {
      setViewportHeight(container.clientHeight);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const totalHeight = commits.length * rowHeight;
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan * 2;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(commits.length, startIndex + visibleCount);
  const offsetY = startIndex * rowHeight;
  const visibleCommits = commits.slice(startIndex, endIndex);

  return (
    <div className="commit-table-shell">
      <div className="commit-header">
        <div>Graph</div>
        <div>Commit</div>
        <div>Author</div>
        <div>Date</div>
      </div>
      <div
        ref={scrollContainerRef}
        className={`commit-list-scroll ${isLoading ? "is-busy" : ""}`.trim()}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        {commits.length === 0 && <div className="empty-state">No commits for the selected reference.</div>}
        {commits.length > 0 && (
          <div className="commit-list" style={{ height: totalHeight }}>
            <div
              className="commit-list-window"
              style={{
                transform: `translateY(${offsetY}px)`
              }}
            >
              {visibleCommits.map((commit) => (
                <CommitRow key={commit.id} commit={commit} selected={selectedCommitId === commit.id} disabled={isLoading} />
              ))}
            </div>
          </div>
        )}
        {isLoading && (
          <div className="commit-loading-overlay" aria-hidden="true">
            <div className="commit-loading-spinner" />
            <span>Loading commits...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CommitRow({
  commit,
  selected,
  disabled
}: {
  commit: CommitListItemViewModel;
  selected: boolean;
  disabled: boolean;
}): JSX.Element {
  return (
    <div
      className={`commit-row ${selected ? "selected" : ""}`.trim()}
      onClick={() => {
        if (selected || disabled) {
          return;
        }

        postMessageToHost({
          type: "selectCommit",
          payload: {
            commitId: commit.id
          }
        });
      }}
    >
      <div className="commit-cell graph-cell">
        <CommitGraphCell commit={commit} />
      </div>
      <div className="commit-cell commit-message">
        <span>{commit.message}</span>
        <span className="commit-hash">{commit.shortHash}</span>
      </div>
      <div className="commit-cell secondary">{commit.author}</div>
      <div className="commit-cell secondary">{commit.date}</div>
    </div>
  );
}
