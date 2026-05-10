import { GitRefNode } from "@intelligent-git-log/contracts/gitLogModels";
import { fieldSeparator, splitLines } from "./gitProtocol";

export class GitRefParser {
  public parse(refOutput: string, currentHead: string | null): GitRefNode[] {
    const localBranches: TimedRefLeaf[] = [];
    const remotes = new Map<string, TimedRefLeaf[]>();
    const tags: TimedRefLeaf[] = [];

    for (const line of splitLines(refOutput)) {
      const [fullRefName, shortRefName, timestampValue] = line.split(fieldSeparator);
      if (!fullRefName || !shortRefName) {
        continue;
      }
      const timestamp = Number(timestampValue || "0");

      if (fullRefName.startsWith("refs/heads/")) {
        localBranches.push({
          id: shortRefName,
          label: shortRefName,
          type: "localBranch",
          timestamp
        });
        continue;
      }

      if (fullRefName.startsWith("refs/remotes/")) {
        if (fullRefName.endsWith("/HEAD")) {
          continue;
        }

        const [remoteName, ...branchParts] = shortRefName.split("/");
        if (!remoteName || branchParts.length === 0) {
          continue;
        }

        const branches = remotes.get(remoteName) ?? [];
        branches.push({
          id: shortRefName,
          label: branchParts.join("/"),
          type: "remoteBranch",
          timestamp
        });
        remotes.set(remoteName, branches);
        continue;
      }

      if (fullRefName.startsWith("refs/tags/")) {
        tags.push({
          id: shortRefName,
          label: shortRefName,
          type: "tag",
          timestamp
        });
      }
    }

    const localTree = buildRefTree(localBranches, "local");
    const tagTree = buildRefTree(tags, "tag");
    const remoteGroups = Array.from(remotes.entries())
      .map(([remoteName, branches]) => {
        const remoteTree = buildRefTree(branches, `remote:${remoteName}`);
        return {
          id: `remote:${remoteName}`,
          label: remoteName,
          type: "remote" as const,
          children: remoteTree,
          timestamp: getMaxTimestamp(branches)
        };
      })
      .sort(compareTimedTreeNode)
      .map(({ id, label, type, children }) => ({
        id,
        label,
        type,
        children
      }));

    const refs: GitRefNode[] = [];

    if (currentHead) {
      refs.push({
        id: `head:${currentHead}`,
        label: "HEAD",
        type: "head",
        children: [
          {
            id: currentHead,
            label: currentHead,
            type: "localBranch"
          }
        ]
      });
    }

    if (localBranches.length) {
      refs.push({
        id: "local-group",
        label: "Local",
        type: "group",
        children: localTree
      });
    }

    if (remoteGroups.length) {
      refs.push({
        id: "remote-group",
        label: "Remote",
        type: "group",
        children: remoteGroups
      });
    }

    if (tags.length) {
      refs.push({
        id: "tags-group",
        label: "Tags",
        type: "group",
        children: tagTree
      });
    }

    return refs;
  }
}

interface TimedRefLeaf extends GitRefNode {
  timestamp: number;
}

interface TimedTreeNode extends GitRefNode {
  timestamp: number;
}

interface MutableRefTreeNode extends TimedTreeNode {
  children: MutableRefTreeNode[];
  childMap: Map<string, MutableRefTreeNode>;
}

function buildRefTree(branches: TimedRefLeaf[], groupScope: string): GitRefNode[] {
  const roots: MutableRefTreeNode[] = [];
  const rootMap = new Map<string, MutableRefTreeNode>();

  for (const branch of branches) {
    const segments = branch.label.split("/").filter(Boolean);
    if (segments.length <= 1) {
      roots.push(createLeafNode(branch.id, branch.label, branch.type, branch.timestamp));
      continue;
    }

    let children = rootMap;
    let parentNode: MutableRefTreeNode | undefined;
    let groupPath = "";

    for (const [index, segment] of segments.entries()) {
      const isLeaf = index === segments.length - 1;
      groupPath = groupPath ? `${groupPath}/${segment}` : segment;

      if (isLeaf) {
        const leaf = createLeafNode(branch.id, segment, branch.type, branch.timestamp);

        if (parentNode) {
          parentNode.children.push(leaf);
          parentNode.timestamp = Math.max(parentNode.timestamp, branch.timestamp);
        } else {
          roots.push(leaf);
        }
        continue;
      }

      const mapKey = `${groupScope}:${groupPath}`;
      let groupNode = children.get(mapKey);
      if (!groupNode) {
        groupNode = {
          id: `group:${groupScope}:${groupPath}`,
          label: segment,
          type: "group",
          timestamp: branch.timestamp,
          children: [],
          childMap: new Map<string, MutableRefTreeNode>()
        };
        children.set(mapKey, groupNode);
        if (parentNode) {
          parentNode.children.push(groupNode);
          parentNode.timestamp = Math.max(parentNode.timestamp, branch.timestamp);
        } else {
          roots.push(groupNode);
        }
      } else {
        groupNode.timestamp = Math.max(groupNode.timestamp, branch.timestamp);
      }

      parentNode = groupNode;
      children = groupNode.childMap;
    }
  }

  return sortTimedTreeNodes(roots).map(stripTimestamp);
}

function sortTimedTreeNodes(nodes: MutableRefTreeNode[]): MutableRefTreeNode[] {
  return [...nodes]
    .map((node) => ({
      ...node,
      children: sortTimedTreeNodes(node.children)
    }))
    .sort(compareTimedTreeNode);
}

function compareTimedTreeNode(left: TimedTreeNode, right: TimedTreeNode): number {
  if (left.timestamp !== right.timestamp) {
    return right.timestamp - left.timestamp;
  }

  if (left.type !== right.type) {
    if (left.type === "group" || left.type === "remote") {
      return -1;
    }

    if (right.type === "group" || right.type === "remote") {
      return 1;
    }
  }

  return left.label.localeCompare(right.label);
}

function stripTimestamp(node: TimedTreeNode): GitRefNode {
  const children = node.children;

  return {
    id: node.id,
    label: node.label,
    type: node.type,
    children: children && children.length > 0 ? children.map((child) => stripTimestamp(child as TimedTreeNode)) : undefined
  };
}

function getMaxTimestamp(nodes: TimedRefLeaf[]): number {
  return nodes.reduce((max, node) => Math.max(max, node.timestamp), 0);
}

function createLeafNode(
  id: string,
  label: string,
  type: GitRefNode["type"],
  timestamp: number
): MutableRefTreeNode {
  return {
    id,
    label,
    type,
    timestamp,
    children: [],
    childMap: new Map<string, MutableRefTreeNode>()
  };
}
