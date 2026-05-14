import { type CommitListItemViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";
import { webviewCommands } from "@bridge/webviewCommands";
import { VirtualList } from "@shared/components/VirtualList";
import { useGitLogStore } from "@store/gitLogStore";
import { CommitGraphCell } from "./CommitGraphCell";

const rowHeight = 25;
const overscan = 8;

export function CommitTable(): JSX.Element {
  const commits = useGitLogStore((state) => state.commits);
  const selectedCommitId = useGitLogStore((state) => state.selection.selectedCommitId);
  const isLoading = useGitLogStore((state) => state.loading.commits);

  return (
    <div className="commit-table-shell">
      <div className="commit-header">
        <div>Graph</div>
        <div>Commit</div>
        <div>Author</div>
        <div>Date</div>
      </div>
      <VirtualList
        items={commits}
        rowHeight={rowHeight}
        overscan={overscan}
        className={`commit-list-scroll ${isLoading ? "is-busy" : ""}`.trim()}
        contentClassName="commit-list virtual-list__content"
        windowClassName="virtual-list__window"
        emptyState={<div className="empty-state">No commits for the selected reference.</div>}
        getKey={(commit) => commit.id}
        renderItem={(commit) => (
          <CommitRow
            commit={commit}
            selected={selectedCommitId === commit.id}
            disabled={isLoading}
          />
        )}
      />
      <div className="commit-list-overlay-host">
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

        webviewCommands.selectCommit(commit.id);
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
