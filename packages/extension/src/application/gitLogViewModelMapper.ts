import {
  type ChangedFileNodeViewModel,
  type CommitDetailViewModel,
  type CommitListItemViewModel
} from "@intelligent-git-log/contracts/gitLogViewModels";
import {
  type GitChangedFileNode,
  type GitCommitDetail,
  type GitCommitSummary,
  type GitRefNode
} from "@intelligent-git-log/contracts/gitLogModels";
import { CommitGraphLayoutBuilder } from "./commitGraphLayoutBuilder";

export class GitLogViewModelMapper {
  private readonly graphLayoutBuilder: CommitGraphLayoutBuilder;

  public constructor(graphLayoutBuilder = new CommitGraphLayoutBuilder()) {
    this.graphLayoutBuilder = graphLayoutBuilder;
  }

  public mapRefs(refs: GitRefNode[]): GitRefNode[] {
    return refs;
  }

  public mapCommitListItems(commits: GitCommitSummary[]): CommitListItemViewModel[] {
    const graphs = this.graphLayoutBuilder.build(commits);

    return commits.map((commit) => ({
      id: commit.id,
      shortHash: commit.shortHash,
      message: commit.message,
      author: commit.author,
      date: commit.date,
      graph: graphs.get(commit.id) ?? {
        width: 64,
        lanes: [],
        edges: [],
        node: {
          lane: 0,
          color: "#2f80ed"
        }
      }
    }));
  }

  public mapCommitDetail(detail: GitCommitDetail | null): CommitDetailViewModel | null {
    if (!detail) {
      return null;
    }

    const changedFiles = this.mapChangedFiles(detail.changedFiles);
    const flattened = flattenFiles(changedFiles);
    const defaultExpandedFileIds = flattened
      .filter((node) => node.type === "folder")
      .map((node) => node.id);
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

  private mapChangedFiles(nodes: GitChangedFileNode[]): ChangedFileNodeViewModel[] {
    return compressChangedFileNodes(
      nodes.map((node) => ({
        id: node.id,
        name: node.name,
        path: node.path,
        type: node.type,
        status: node.status,
        children: node.children ? this.mapChangedFiles(node.children) : undefined
      }))
    );
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

function compressChangedFileNodes(nodes: ChangedFileNodeViewModel[]): ChangedFileNodeViewModel[] {
  return nodes.map((node) => compressChangedFileNode(node));
}

function compressChangedFileNode(node: ChangedFileNodeViewModel): ChangedFileNodeViewModel {
  const compressedChildren = node.children?.map((child) => compressChangedFileNode(child));
  const normalizedNode: ChangedFileNodeViewModel = {
    ...node,
    children: compressedChildren?.length ? compressedChildren : undefined
  };

  if (normalizedNode.type !== "folder") {
    return normalizedNode;
  }

  let currentNode = normalizedNode;

  while (
    currentNode.children?.length === 1 &&
    currentNode.children[0].type === "folder" &&
    !currentNode.children[0].status
  ) {
    const onlyChild = currentNode.children[0];
    currentNode = {
      ...onlyChild,
      id: currentNode.id,
      name: `${currentNode.name}/${onlyChild.name}`,
      path: onlyChild.path
    };
  }

  return currentNode;
}
