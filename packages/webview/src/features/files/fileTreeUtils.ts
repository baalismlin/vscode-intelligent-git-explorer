import { type ChangedFileNodeViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";

export interface VisibleFileTreeItem {
  node: ChangedFileNodeViewModel;
  depth: number;
}

export function flattenVisibleFileTree(
  nodes: ChangedFileNodeViewModel[],
  expandedIds: string[]
): VisibleFileTreeItem[] {
  const items: VisibleFileTreeItem[] = [];

  const walk = (files: ChangedFileNodeViewModel[], depth: number) => {
    for (const node of files) {
      const hasChildren = Boolean(node.children?.length);
      items.push({ node, depth });

      if (hasChildren && expandedIds.includes(node.id)) {
        walk(node.children ?? [], depth + 1);
      }
    }
  };

  walk(nodes, 0);
  return items;
}

export function findFileNode(
  nodes: ChangedFileNodeViewModel[],
  selectedFileId: string
): ChangedFileNodeViewModel | undefined {
  for (const node of nodes) {
    if (node.id === selectedFileId) {
      return node;
    }

    if (node.children?.length) {
      const nested = findFileNode(node.children, selectedFileId);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}

export function collectFolderIds(nodes: ChangedFileNodeViewModel[]): string[] {
  const result: string[] = [];

  for (const node of nodes) {
    if (node.type === "folder") {
      result.push(node.id);
    }

    if (node.children?.length) {
      result.push(...collectFolderIds(node.children));
    }
  }

  return result;
}

export function countFiles(node: ChangedFileNodeViewModel): number {
  if (node.type === "file") {
    return 1;
  }

  return node.children?.reduce((count, child) => count + countFiles(child), 0) ?? 0;
}
