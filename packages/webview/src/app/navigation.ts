import { GitRefNode } from "@intellij-git-log/contracts/gitLogModels";
import { ChangedFileNodeViewModel } from "@intellij-git-log/contracts/gitLogViewModels";

export interface VisibleRefItem {
  id: string;
  expandable: boolean;
  expanded: boolean;
  selectable: boolean;
}

export interface VisibleFileItem {
  id: string;
  path: string;
  expandable: boolean;
  expanded: boolean;
  selectable: boolean;
}

export function getVisibleRefs(nodes: GitRefNode[], expandedIds: string[]): VisibleRefItem[] {
  const visible: VisibleRefItem[] = [];

  const walk = (items: GitRefNode[]) => {
    for (const node of items) {
      const expandable = Boolean(node.children?.length);
      visible.push({
        id: node.id,
        expandable,
        expanded: expandedIds.includes(node.id),
        selectable: isSelectableRef(node.type)
      });

      if (expandable && expandedIds.includes(node.id)) {
        walk(node.children ?? []);
      }
    }
  };

  walk(nodes);
  return visible;
}

export function getVisibleFiles(nodes: ChangedFileNodeViewModel[], expandedIds: string[]): VisibleFileItem[] {
  const visible: VisibleFileItem[] = [];

  const walk = (items: ChangedFileNodeViewModel[]) => {
    for (const node of items) {
      const expandable = Boolean(node.children?.length);
      visible.push({
        id: node.id,
        path: node.path,
        expandable,
        expanded: expandedIds.includes(node.id),
        selectable: node.type === "file"
      });

      if (expandable && expandedIds.includes(node.id)) {
        walk(node.children ?? []);
      }
    }
  };

  walk(nodes);
  return visible;
}

export function isSelectableRef(type: GitRefNode["type"]): boolean {
  return type === "localBranch" || type === "remoteBranch" || type === "tag";
}
