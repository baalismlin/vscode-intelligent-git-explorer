import { type GitRefNode } from "@intelligent-git-log/contracts/gitLogModels";
import { isSelectableRef } from "@app/navigation";

export function flattenDirectoryGroups(nodes: GitRefNode[]): GitRefNode[] {
  return nodes.map((node) => flattenDirectoryGroupNode(node, "", 0)).flat();
}

function flattenDirectoryGroupNode(node: GitRefNode, prefix: string, depth: number): GitRefNode[] {
  const nextPrefix = prefix ? `${prefix}/${node.label}` : node.label;

  if (node.type === "group" && shouldFlattenGroup(node, depth)) {
    return (node.children ?? []).flatMap((child) =>
      flattenDirectoryGroupNode(child, nextPrefix, depth + 1)
    );
  }

  if (!node.children?.length) {
    return [
      {
        ...node,
        label: prefix && isSelectableRef(node.type) ? `${prefix}/${node.label}` : node.label
      }
    ];
  }

  return [
    {
      ...node,
      children: node.children.flatMap((child) => flattenDirectoryGroupNode(child, "", depth + 1))
    }
  ];
}

function shouldFlattenGroup(node: GitRefNode, depth: number): boolean {
  if (node.type !== "group") {
    return false;
  }

  return (
    depth > 0 && node.id !== "local-group" && node.id !== "remote-group" && node.id !== "tags-group"
  );
}

export function filterRefs(nodes: GitRefNode[], query: string): GitRefNode[] {
  return nodes.flatMap((node) => {
    const filteredChildren = node.children ? filterRefs(node.children, query) : undefined;
    const matches = node.label.toLowerCase().includes(query);

    if (!matches && (!filteredChildren || filteredChildren.length === 0)) {
      return [];
    }

    return [
      {
        ...node,
        children: filteredChildren
      }
    ];
  });
}

export function collectExpandableRefIds(nodes: GitRefNode[]): string[] {
  const ids: string[] = [];

  for (const node of nodes) {
    if (node.children?.length) {
      ids.push(node.id);
      ids.push(...collectExpandableRefIds(node.children));
    }
  }

  return ids;
}

export function findRefById(nodes: GitRefNode[], refId: string): GitRefNode | undefined {
  for (const node of nodes) {
    if (node.id === refId) {
      return node;
    }

    if (node.children?.length) {
      const match = findRefById(node.children, refId);
      if (match) {
        return match;
      }
    }
  }

  return undefined;
}
