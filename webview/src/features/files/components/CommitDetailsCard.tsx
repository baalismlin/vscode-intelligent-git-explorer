import { useGitLogStore } from "../../../store/gitLogStore";

export function CommitDetailsCard(): JSX.Element {
  const selectedCommit = useGitLogStore((state) => state.selectedCommit);

  if (!selectedCommit) {
    return (
      <div className="details">
        <div className="detail-title">Commit Details</div>
        <div className="detail-row">No commit selected.</div>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="detail-title">{selectedCommit.message}</div>
      <div className="detail-row">
        Hash: <span className="secondary">{selectedCommit.shortHash}</span>
      </div>
      <div className="detail-row">
        Author: <span className="secondary">{selectedCommit.author}</span>
      </div>
      <div className="detail-row">
        Date: <span className="secondary">{selectedCommit.date}</span>
      </div>
    </div>
  );
}
