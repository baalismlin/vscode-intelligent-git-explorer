import { CommitListItemViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";

export function CommitGraphCell({ commit }: { commit: CommitListItemViewModel }): JSX.Element {
  const laneOffset = 14 + commit.graph.lane * 18;
  const color = commit.graph.color;

  return (
    <>
      <span className="graph-line" style={{ left: `${laneOffset}px`, background: color }} />
      {commit.graph.shape === "mergeLeft" ? (
        <span className="graph-line diagonal-left" style={{ left: `${laneOffset - 16}px`, background: color }} />
      ) : null}
      {commit.graph.shape === "mergeRight" ? (
        <span className="graph-line diagonal-right" style={{ left: `${laneOffset}px`, background: color }} />
      ) : null}
      <span className="graph-dot" style={{ left: `${laneOffset - 4}px`, background: color }} />
    </>
  );
}
