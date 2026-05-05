import { useDeferredValue, useMemo, useRef, useState } from "react";
import { GitRefNode } from "@intellij-git-log/contracts/gitLogModels";
import { isSelectableRef } from "@app/navigation";
import { postMessageToHost } from "@bridge/vscode";
import { useGitLogStore } from "@store/gitLogStore";

const collapsedRefsWidth = 28;
const defaultExpandedRefsWidth = 270;

export function RefTreePanel(): JSX.Element {
  const refs = useGitLogStore((state) => state.refs);
  const refsWidth = useGitLogStore((state) => state.panelLayout.refsWidth);
  const setPanelLayout = useGitLogStore((state) => state.setPanelLayout);
  const selectedRefId = useGitLogStore((state) => state.selection.selectedRefId);
  const setExpandedRefs = useGitLogStore((state) => state.setExpandedRefs);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupByDirectory, setGroupByDirectory] = useState(true);
  const deferredSearchQuery = useDeferredValue(searchQuery.trim().toLowerCase());
  const lastExpandedWidthRef = useRef(Math.max(refsWidth, defaultExpandedRefsWidth));
  const isCollapsed = refsWidth <= collapsedRefsWidth;

  if (!isCollapsed) {
    lastExpandedWidthRef.current = Math.max(refsWidth, collapsedRefsWidth);
  }

  const visibleRefs = useMemo(() => {
    let nextRefs = refs;

    if (!groupByDirectory) {
      nextRefs = flattenDirectoryGroups(nextRefs);
    }

    if (deferredSearchQuery) {
      nextRefs = filterRefs(nextRefs, deferredSearchQuery);
    }

    return nextRefs;
  }, [deferredSearchQuery, groupByDirectory, refs]);

  const expandableRefIds = useMemo(() => collectExpandableRefIds(visibleRefs), [visibleRefs]);
  const selectedRef = selectedRefId ? findRefById(refs, selectedRefId) : undefined;

  if (isCollapsed) {
    return (
      <section className="panel reference-panel reference-panel-collapsed">
        <div className="reference-collapsed-rail">
          <RefToolButton
            label="Show Git Branches"
            iconClassName="codicon codicon-chevron-right"
            onClick={() =>
              setPanelLayout({
                refsWidth: Math.max(lastExpandedWidthRef.current, defaultExpandedRefsWidth)
              })
            }
          />
          <div className="reference-collapsed-title">Branches</div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel reference-panel">
      <div className="reference-panel-header">
        <input
          className="reference-search"
          type="search"
          value={searchQuery}
          placeholder="$(alert)Filter references"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <div className="reference-panel-body">
        <div className="reference-tools">
          <RefToolButton
            label="Hide Git Branches"
            iconClassName="codicon codicon-chevron-left"
            onClick={() =>
              setPanelLayout({
                refsWidth: collapsedRefsWidth
              })
            }
          />
          <RefToolButton
            label="New Branch"
            iconClassName="codicon codicon-git-branch"
            onClick={() => runRefCommand("refs:newBranch")}
          />
          <RefToolButton
            label="Update Selected"
            iconClassName="codicon codicon-sync"
            onClick={() => runRefCommand("refs:updateSelected")}
          />
          <RefToolButton
            label="Delete"
            iconClassName="codicon codicon-trash"
            onClick={() => runRefCommand("refs:deleteSelected")}
          />
          <RefToolButton
            label="Compare with Current"
            iconClassName="codicon codicon-diff"
            onClick={() => runRefCommand("refs:compareWithCurrent")}
          />
          <RefToolButton
            label="Fetch"
            iconClassName="codicon codicon-cloud-download"
            onClick={() => runRefCommand("refs:fetch")}
          />
          <RefToolButton
            label="Navigate Log to selected branch HEAD"
            iconClassName="codicon codicon-history"
            disabled={!selectedRefId || !selectedRef || !isSelectableRef(selectedRef.type)}
            onClick={() => {
              if (!selectedRefId) {
                return;
              }

              postMessageToHost({
                type: "selectRef",
                payload: {
                  refId: selectedRefId
                }
              });
            }}
          />
          <RefToolButton
            label="Group by Directory"
            iconClassName="codicon codicon-list-tree"
            active={groupByDirectory}
            onClick={() => setGroupByDirectory((value) => !value)}
          />
          <RefToolButton
            label="Expand All"
            iconClassName="codicon codicon-expand-all"
            onClick={() => setExpandedRefs(expandableRefIds)}
          />
          <RefToolButton
            label="Collapse All"
            iconClassName="codicon codicon-collapse-all"
            onClick={() => setExpandedRefs([])}
          />
        </div>
        <div className="reference-tree-pane">
          <div className="reference-tree-content">
            <div className="tree">
            {visibleRefs.length > 0 ? (
              visibleRefs.map((node) => (
                <RefTreeNode
                  key={node.id}
                  node={node}
                  depth={0}
                  forceExpanded={Boolean(deferredSearchQuery)}
                />
              ))
            ) : (
              <div className="reference-empty-state">No references match the current filter.</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RefTreeNode({
  node,
  depth,
  forceExpanded
}: {
  node: GitRefNode;
  depth: number;
  forceExpanded: boolean;
}): JSX.Element {
  const selectedRefId = useGitLogStore((state) => state.selection.selectedRefId);
  const expandedRefs = useGitLogStore((state) => state.expandedRefs);
  const toggleRefExpanded = useGitLogStore((state) => state.toggleRefExpanded);

  const hasHeadChildBranch = node.type === "head" && node.children?.length === 1;
  const headChildRefId = hasHeadChildBranch ? node.children?.[0]?.id ?? "" : "";
  const headBranchName = hasHeadChildBranch ? node.children?.[0]?.label ?? "" : "";
  const hasChildren = Boolean(node.children?.length) && !hasHeadChildBranch;
  const isExpanded = forceExpanded || expandedRefs.includes(node.id);
  const isSelected = selectedRefId === node.id || (hasHeadChildBranch && selectedRefId === headChildRefId);
  const isSelectable = isSelectableRef(node.type) || hasHeadChildBranch;

  return (
    <div className="tree-node">
      <div
        className={`tree-row ${isSelectable ? "clickable" : ""} ${isSelected ? "selected" : ""}`.trim()}
        onClick={() => {
          if (!isSelectable) {
            return;
          }

          postMessageToHost({
            type: "selectRef",
            payload: {
              refId: hasHeadChildBranch ? headChildRefId : node.id
            }
          });
        }}
      >
        {Array.from({ length: depth }).map((_, index) => (
          <span key={`${node.id}-indent-${index}`} className="indent" />
        ))}
        <span
          className={`toggle ${hasChildren ? "" : "spacer"}`.trim()}
          onClick={(event) => {
            event.stopPropagation();
            if (hasChildren && !forceExpanded) {
              toggleRefExpanded(node.id);
            }
          }}
        >
          {hasChildren ? (isExpanded ? "▾" : "▸") : "•"}
        </span>
        {depth > 0 ? <span className="ref-icon">{getRefIcon(node.type)}</span> : null}
        <span className="ref-label">{node.label}</span>
        {node.type === "head" ? <span className="ref-type">current</span> : null}
        {hasHeadChildBranch ? <span className="ref-branch-inline">{headBranchName}</span> : null}
      </div>
      {hasChildren && isExpanded
        ? node.children?.map((child) => (
            <RefTreeNode key={child.id} node={child} depth={depth + 1} forceExpanded={forceExpanded} />
          ))
        : null}
    </div>
  );
}

function RefToolButton({
  label,
  iconClassName,
  active = false,
  disabled = false,
  onClick
}: {
  label: string;
  iconClassName: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      className={`reference-tool-button ${active ? "active" : ""}`.trim()}
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={iconClassName} aria-hidden="true" />
    </button>
  );
}

function runRefCommand(command: string): void {
  postMessageToHost({
    type: "runCommand",
    payload: {
      command
    }
  });
}

function flattenDirectoryGroups(nodes: GitRefNode[]): GitRefNode[] {
  return nodes.map((node) => flattenDirectoryGroupNode(node, "", 0)).flat();
}

function flattenDirectoryGroupNode(node: GitRefNode, prefix: string, depth: number): GitRefNode[] {
  const nextPrefix = prefix ? `${prefix}/${node.label}` : node.label;

  if (node.type === "group" && shouldFlattenGroup(node, depth)) {
    return (node.children ?? []).flatMap((child) => flattenDirectoryGroupNode(child, nextPrefix, depth + 1));
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

  return depth > 0 && node.id !== "local-group" && node.id !== "remote-group" && node.id !== "tags-group";
}

function filterRefs(nodes: GitRefNode[], query: string): GitRefNode[] {
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

function collectExpandableRefIds(nodes: GitRefNode[]): string[] {
  const ids: string[] = [];

  for (const node of nodes) {
    if (node.children?.length) {
      ids.push(node.id);
      ids.push(...collectExpandableRefIds(node.children));
    }
  }

  return ids;
}

function findRefById(nodes: GitRefNode[], refId: string): GitRefNode | undefined {
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

function getRefIcon(type: GitRefNode["type"]): string {
  switch (type) {
    case "head":
      return "@";
    case "group":
      return "#";
    case "remote":
      return "R";
    case "localBranch":
    case "remoteBranch":
      return ">";
    case "tag":
      return "T";
    default:
      return ".";
  }
}
