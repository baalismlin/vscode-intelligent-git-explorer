import {
  ChangedFileStatus,
  GitChangedFileNode
} from "@intelligent-git-log/contracts/gitLogModels";

export class ChangedFilesTreeBuilder {
  public build(lines: string[]): GitChangedFileNode[] {
    const root = new Map<string, MutableTreeNode>();

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        continue;
      }

      const parts = trimmedLine.split("\t");
      const rawStatus = parts[0] ?? "";
      const status = normalizeStatus(rawStatus);
      const path = rawStatus.startsWith("R") ? parts[2] : parts[1];

      if (!path) {
        continue;
      }

      insertPath(root, path, status);
    }

    return Array.from(root.values()).map(toChangedFileNode).sort(compareFileNodes);
  }
}

function insertPath(nodes: Map<string, MutableTreeNode>, filePath: string, status: ChangedFileStatus): void {
  const segments = filePath.split("/").filter(Boolean);
  let currentNodes = nodes;
  let currentPath = "";

  for (const [index, segment] of segments.entries()) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    const isLeaf = index === segments.length - 1;
    const existing = currentNodes.get(segment);

    if (existing) {
      if (isLeaf) {
        existing.status = status;
      }
      currentNodes = existing.children;
      continue;
    }

    const nextNode: MutableTreeNode = {
      id: `${isLeaf ? "file" : "folder"}:${currentPath}`,
      name: segment,
      path: currentPath,
      type: isLeaf ? "file" : "folder",
      status: isLeaf ? status : undefined,
      children: new Map<string, MutableTreeNode>()
    };

    currentNodes.set(segment, nextNode);
    currentNodes = nextNode.children;
  }
}

function toChangedFileNode(node: MutableTreeNode): GitChangedFileNode {
  const children = Array.from(node.children.values()).map(toChangedFileNode).sort(compareFileNodes);

  return {
    id: node.id,
    name: node.name,
    path: node.path,
    type: node.type,
    status: node.status,
    children: children.length > 0 ? children : undefined
  };
}

function compareFileNodes(left: GitChangedFileNode, right: GitChangedFileNode): number {
  if (left.type !== right.type) {
    return left.type === "folder" ? -1 : 1;
  }

  return left.name.localeCompare(right.name);
}

function normalizeStatus(rawStatus: string): ChangedFileStatus {
  const code = rawStatus.charAt(0);
  switch (code) {
    case "A":
    case "D":
    case "R":
      return code;
    case "M":
    default:
      return "M";
  }
}

interface MutableTreeNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  status?: ChangedFileStatus;
  children: Map<string, MutableTreeNode>;
}
