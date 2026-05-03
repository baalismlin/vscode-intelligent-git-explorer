import { CommitListItemViewModel } from "@intellij-git-log/contracts/gitLogViewModels";
import { postMessageToHost } from "../../../bridge/vscode";
import { useGitLogStore } from "../../../store/gitLogStore";
import { CommitGraphCell } from "./CommitGraphCell";

export function CommitTable(): JSX.Element {
  const commits = useGitLogStore((state) => state.commits);
  const selectedCommitId = useGitLogStore((state) => state.selection.selectedCommitId);
  const isLoading = useGitLogStore((state) => state.loading.commits);

  return (
    <>
      <div className="commit-header">
        <div>Graph</div>
        <div>Commit message</div>
        <div>Author</div>
        <div>Date</div>
      </div>
      <div className="commit-list">
        {isLoading ? <div className="empty-state">Loading commits...</div> : null}
        {!isLoading && commits.length === 0 ? <div className="empty-state">No commits for the selected reference.</div> : null}
        {!isLoading
          ? commits.map((commit) => (
              <CommitRow key={commit.id} commit={commit} selected={selectedCommitId === commit.id} />
            ))
          : null}
      </div>
    </>
  );
}

function CommitRow({ commit, selected }: { commit: CommitListItemViewModel; selected: boolean }): JSX.Element {
  return (
    <div
      className={`commit-row ${selected ? "selected" : ""}`.trim()}
      onClick={() =>
        postMessageToHost({
          type: "selectCommit",
          payload: {
            commitId: commit.id
          }
        })
      }
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
