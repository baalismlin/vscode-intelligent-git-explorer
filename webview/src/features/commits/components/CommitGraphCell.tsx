import { CommitItem } from "../../../../../src/domain/gitLogModels";

export function CommitGraphCell({ commit }: { commit: CommitItem }): JSX.Element {
  const laneOffset = 14 + (commit.graphLane ?? 0) * 18;
  const color = commit.graphColor ?? "#2f80ed";

  return (
    <>
      <span className="graph-line" style={{ left: `${laneOffset}px`, background: color }} />
      {commit.graphShape === "mergeLeft" ? (
        <span className="graph-line diagonal-left" style={{ left: `${laneOffset - 16}px`, background: color }} />
      ) : null}
      {commit.graphShape === "mergeRight" ? (
        <span className="graph-line diagonal-right" style={{ left: `${laneOffset}px`, background: color }} />
      ) : null}
      <span className="graph-dot" style={{ left: `${laneOffset - 4}px`, background: color }} />
    </>
  );
}
