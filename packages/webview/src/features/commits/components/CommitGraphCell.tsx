import { type CommitListItemViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";

const rowHeight = 25;
const laneSpacing = 16;
const graphPadding = 12;
const nodeRadius = 4;

export function CommitGraphCell({ commit }: { commit: CommitListItemViewModel }): JSX.Element {
  const graph = commit.graph;
  const centerY = rowHeight / 2;

  return (
    <svg
      className="commit-graph"
      width={graph.width}
      height={rowHeight}
      viewBox={`0 0 ${graph.width} ${rowHeight}`}
      aria-hidden="true"
    >
      {graph.lanes.map((lane) => {
        const x = laneX(lane.lane);
        return [
          lane.top ? (
            <line
              key={`lane-${lane.lane}-top`}
              className="commit-graph-line"
              x1={x}
              y1={0}
              x2={x}
              y2={centerY}
              stroke={lane.color}
            />
          ) : null,
          lane.bottom ? (
            <line
              key={`lane-${lane.lane}-bottom`}
              className="commit-graph-line"
              x1={x}
              y1={centerY}
              x2={x}
              y2={rowHeight}
              stroke={lane.color}
            />
          ) : null
        ];
      })}
      {graph.edges.map((edge, index) => (
        <path
          key={`edge-${edge.fromLane}-${edge.toLane}-${index}`}
          className="commit-graph-line"
          d={edgePath(edge.fromLane, edge.toLane, edge.from, edge.to, centerY)}
          stroke={edge.color}
        />
      ))}
      <circle
        className="commit-graph-node"
        cx={laneX(graph.node.lane)}
        cy={centerY}
        r={nodeRadius}
        fill={graph.node.color}
      />
    </svg>
  );
}

function laneX(lane: number): number {
  return graphPadding + lane * laneSpacing;
}

function edgePath(
  fromLane: number,
  toLane: number,
  from: "node" | "lane",
  to: "top" | "bottom",
  centerY: number
): string {
  const fromX = laneX(fromLane);
  const toX = laneX(toLane);
  const startY = from === "node" ? centerY : 0;
  const endY = to === "top" ? 0 : rowHeight;
  const controlY = to === "top" ? centerY - 7 : centerY + 7;

  return `M ${fromX} ${startY} C ${fromX} ${controlY}, ${toX} ${controlY}, ${toX} ${endY}`;
}
