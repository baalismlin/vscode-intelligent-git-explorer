import {
  GitChangedFileNode,
  GitCommitDetail,
  GitCommitSummary,
  GitRefNode
} from "../domain/gitLogModels";
import {
  ChangedFileNodeViewModel,
  CommitDetailViewModel,
  CommitListItemViewModel,
  CommitGraphViewModel
} from "./gitLogViewModels";

const graphPalette = ["#2f80ed", "#f2994a", "#27ae60", "#9b51e0", "#eb5757", "#56ccf2", "#f2c94c"];

export class GitLogViewModelMapper {
  public mapRefs(refs: GitRefNode[]): GitRefNode[] {
    return refs;
  }

  public mapCommitListItems(commits: GitCommitSummary[]): CommitListItemViewModel[] {
    return commits.map((commit, index) => ({
      id: commit.id,
      shortHash: commit.shortHash,
      message: commit.message,
      author: commit.author,
      date: commit.date,
      graph: this.mapCommitGraph(commit, index)
    }));
  }

  public mapCommitDetail(detail: GitCommitDetail | null): CommitDetailViewModel | null {
    if (!detail) {
      return null;
    }

    const changedFiles = this.mapChangedFiles(detail.changedFiles);
    const flattened = flattenFiles(changedFiles);
    const defaultExpandedFileIds = flattened.filter((node) => node.type === "folder").map((node) => node.id);
    const initialSelectedFileId = flattened.find((node) => node.type === "file")?.id ?? "";

    return {
      commitId: detail.commitId,
      shortHash: detail.shortHash,
      message: detail.message,
      author: detail.author,
      date: detail.date,
      changedFiles,
      defaultExpandedFileIds,
      initialSelectedFileId
    };
  }

  private mapCommitGraph(commit: GitCommitSummary, index: number): CommitGraphViewModel {
    const lane = index % 2;
    const color = graphPalette[index % graphPalette.length];

    if (commit.branchId.includes("feature")) {
      return {
        color,
        lane: 1,
        shape: "mergeRight"
      };
    }

    if (index % 3 === 1) {
      return {
        color,
        lane,
        shape: "mergeLeft"
      };
    }

    return {
      color,
      lane,
      shape: "straight"
    };
  }

  private mapChangedFiles(nodes: GitChangedFileNode[]): ChangedFileNodeViewModel[] {
    return nodes.map((node) => ({
      id: node.id,
      name: node.name,
      path: node.path,
      type: node.type,
      status: node.status,
      children: node.children ? this.mapChangedFiles(node.children) : undefined
    }));
  }
}

function flattenFiles(nodes: ChangedFileNodeViewModel[]): ChangedFileNodeViewModel[] {
  const result: ChangedFileNodeViewModel[] = [];

  for (const node of nodes) {
    result.push(node);
    if (node.children?.length) {
      result.push(...flattenFiles(node.children));
    }
  }

  return result;
}
