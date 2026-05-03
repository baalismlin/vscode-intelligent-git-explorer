import { useGitLogStore } from "@store/gitLogStore";

export function CommitDetailsCard(): JSX.Element {
  const selectedCommitDetail = useGitLogStore((state) => state.selectedCommitDetail);

  if (!selectedCommitDetail) {
    return (
      <div className="details">
        <div className="detail-title">Commit Details</div>
        <div className="detail-row">No commit selected.</div>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="detail-title">{selectedCommitDetail.message}</div>
      <div className="detail-row">
        Hash: <span className="secondary">{selectedCommitDetail.shortHash}</span>
      </div>
      <div className="detail-row">
        Author: <span className="secondary">{selectedCommitDetail.author}</span>
      </div>
      <div className="detail-row">
        Date: <span className="secondary">{selectedCommitDetail.date}</span>
      </div>
    </div>
  );
}
