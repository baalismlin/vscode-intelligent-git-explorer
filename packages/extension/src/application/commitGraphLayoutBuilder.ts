import { type CommitGraphViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";
import { type GitCommitSummary } from "@intelligent-git-log/contracts/gitLogModels";

const graphPalette = ["#2f80ed", "#f2994a", "#27ae60", "#9b51e0", "#eb5757", "#56ccf2", "#f2c94c"];
const laneSpacing = 16;
const graphPadding = 12;

export class CommitGraphLayoutBuilder {
  private readonly laneColors = new Map<string, string>();
  private nextColorIndex = 0;

  public build(commits: GitCommitSummary[]): Map<string, CommitGraphViewModel> {
    const graphs = new Map<string, CommitGraphViewModel>();
    const firstParentCommitIds = collectFirstParentCommitIds(commits);
    this.seedFirstParentColors(firstParentCommitIds, commits[0]?.id);
    let activeLanes: Array<string | null> = [];
    let maxWidth = 64;

    for (const commit of commits) {
      const parentIds = commit.parentIds;
      const isFirstParentCommit = firstParentCommitIds.has(commit.id);
      let nodeLane =
        isFirstParentCommit && activeLanes[0] === commit.id ? 0 : activeLanes.indexOf(commit.id);

      if (nodeLane < 0) {
        nodeLane = isFirstParentCommit ? 0 : firstEmptyLane(activeLanes);
        activeLanes = setLane(activeLanes, nodeLane, commit.id);
      }

      const secondaryParents = parentIds.slice(1);
      let rowLanes = activeLanes;

      for (const parentId of secondaryParents) {
        if (!rowLanes.includes(parentId)) {
          rowLanes = setLane(rowLanes, firstEmptyLane(rowLanes), parentId);
        }
      }

      const primaryParentId = parentIds[0];
      const primaryParentLane = primaryParentId ? rowLanes.indexOf(primaryParentId) : -1;
      const primaryParentIsFirstParentCommit = Boolean(
        primaryParentId && firstParentCommitIds.has(primaryParentId)
      );
      const primaryParentTargetLane = primaryParentLane;
      const primaryParentUsesExistingLane =
        primaryParentTargetLane >= 0 &&
        primaryParentTargetLane !== nodeLane &&
        !(isFirstParentCommit && primaryParentIsFirstParentCommit);
      const nodeColor = this.colorFor(commit.id);
      const width = Math.max(64, graphPadding * 2 + rowLanes.length * laneSpacing);
      maxWidth = Math.max(maxWidth, width);
      const graph: CommitGraphViewModel = {
        width,
        lanes: rowLanes.flatMap((laneCommitId, lane) => {
          if (!laneCommitId) {
            return [];
          }

          const isNodeLane = lane === nodeLane;
          const isCurrentCommitDuplicateLane = laneCommitId === commit.id && !isNodeLane;
          const isActiveBeforeRow = activeLanes.includes(laneCommitId);
          const isSecondaryParentIntroducedInRow =
            secondaryParents.includes(laneCommitId) && !isActiveBeforeRow;

          return [
            {
              lane,
              color: this.colorFor(laneCommitId),
              top: isActiveBeforeRow,
              bottom: isCurrentCommitDuplicateLane
                ? false
                : isNodeLane && primaryParentId
                  ? !primaryParentUsesExistingLane
                  : isActiveBeforeRow && !isSecondaryParentIntroducedInRow
            }
          ];
        }),
        edges: [
          ...(primaryParentUsesExistingLane
            ? [
                {
                  fromLane: nodeLane,
                  toLane: primaryParentTargetLane,
                  from: "node" as const,
                  to: "bottom" as const,
                  color: this.colorFor(primaryParentId)
                }
              ]
            : []),
          ...rowLanes.flatMap((laneCommitId, lane) =>
            laneCommitId === commit.id && lane !== nodeLane
              ? [
                  {
                    fromLane: nodeLane,
                    toLane: lane,
                    from: "node" as const,
                    to: "top" as const,
                    color: this.colorFor(laneCommitId)
                  }
                ]
              : []
          ),
          ...secondaryParents.map((parentId) => ({
            fromLane: nodeLane,
            toLane: rowLanes.indexOf(parentId),
            from: "node" as const,
            to: "bottom" as const,
            color: this.colorFor(parentId)
          }))
        ],
        node: {
          lane: nodeLane,
          color: nodeColor
        }
      };

      graphs.set(commit.id, graph);
      activeLanes = nextActiveLanes(
        rowLanes,
        nodeLane,
        commit.id,
        primaryParentId,
        firstParentCommitIds
      );

      if (primaryParentId) {
        this.inheritColor(primaryParentId, commit.id);
      }
    }

    for (const graph of graphs.values()) {
      graph.width = maxWidth;
    }

    return graphs;
  }

  private colorFor(commitId: string): string {
    const existing = this.laneColors.get(commitId);
    if (existing) {
      return existing;
    }

    const color = graphPalette[this.nextColorIndex % graphPalette.length];
    this.nextColorIndex += 1;
    this.laneColors.set(commitId, color);
    return color;
  }

  private inheritColor(commitId: string, sourceCommitId: string): void {
    if (!this.laneColors.has(commitId)) {
      this.laneColors.set(commitId, this.colorFor(sourceCommitId));
    }
  }

  private seedFirstParentColors(commitIds: Set<string>, rootCommitId: string | undefined): void {
    if (!rootCommitId) {
      return;
    }

    const color = this.colorFor(rootCommitId);
    for (const commitId of commitIds) {
      if (!this.laneColors.has(commitId)) {
        this.laneColors.set(commitId, color);
      }
    }
  }
}

function nextActiveLanes(
  rowLanes: Array<string | null>,
  nodeLane: number,
  commitId: string,
  primaryParentId: string | undefined,
  firstParentCommitIds: Set<string>
): Array<string | null> {
  const next = [...rowLanes];

  clearDuplicateCommitLanes(next, commitId, nodeLane);

  if (!primaryParentId) {
    next[nodeLane] = null;
  } else if (firstParentCommitIds.has(primaryParentId) && nodeLane === 0) {
    next[nodeLane] = primaryParentId;
  } else if (next.includes(primaryParentId)) {
    next[nodeLane] = null;
  } else if (firstParentCommitIds.has(primaryParentId) && nodeLane !== 0) {
    next[nodeLane] = primaryParentId;
  } else {
    next[nodeLane] = primaryParentId;
  }

  return trimTrailingEmptyLanes(next);
}

function clearDuplicateCommitLanes(
  lanes: Array<string | null>,
  commitId: string,
  keepLane: number
): void {
  for (let lane = 0; lane < lanes.length; lane += 1) {
    if (lane !== keepLane && lanes[lane] === commitId) {
      lanes[lane] = null;
    }
  }
}

function firstEmptyLane(lanes: Array<string | null>): number {
  const index = lanes.findIndex((lane) => lane === null);
  return index >= 0 ? index : lanes.length;
}

function setLane(lanes: Array<string | null>, lane: number, value: string): Array<string | null> {
  const next = [...lanes];
  next[lane] = value;
  return next;
}

function trimTrailingEmptyLanes(lanes: Array<string | null>): Array<string | null> {
  const next = [...lanes];

  while (next.at(-1) === null) {
    next.pop();
  }

  return next;
}

function collectFirstParentCommitIds(commits: GitCommitSummary[]): Set<string> {
  const commitsById = new Map(commits.map((commit) => [commit.id, commit]));
  const result = new Set<string>();
  let current: GitCommitSummary | undefined = commits[0];

  while (current && !result.has(current.id)) {
    result.add(current.id);
    const firstParentId: string | undefined = current.parentIds[0];
    current = firstParentId ? commitsById.get(firstParentId) : undefined;
  }

  return result;
}
