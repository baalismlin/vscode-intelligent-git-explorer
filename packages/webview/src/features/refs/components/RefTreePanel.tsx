import { useDeferredValue, useMemo, useRef, useState } from "react";
import { isSelectableRef } from "@app/navigation";
import { webviewCommands } from "@bridge/webviewCommands";
import { VirtualList } from "@shared/components/VirtualList";
import { useGitLogStore } from "@store/gitLogStore";
import { RefToolButton } from "./RefToolButton";
import { RefTreeNode } from "./RefTreeNode";
import {
  collectExpandableRefIds,
  filterRefs,
  findRefById,
  flattenVisibleRefTree,
  flattenDirectoryGroups
} from "../refTreeUtils";

const collapsedRefsWidth = 28;
const defaultExpandedRefsWidth = 270;
const refRowHeight = 20;

export function RefTreePanel(): JSX.Element {
  const refs = useGitLogStore((state) => state.refs);
  const refsWidth = useGitLogStore((state) => state.panelLayout.refsWidth);
  const setPanelLayout = useGitLogStore((state) => state.setPanelLayout);
  const selectedRefId = useGitLogStore((state) => state.selection.selectedRefId);
  const expandedRefs = useGitLogStore((state) => state.expandedRefs);
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
  const visibleRefRows = useMemo(
    () => flattenVisibleRefTree(visibleRefs, expandedRefs, Boolean(deferredSearchQuery)),
    [deferredSearchQuery, expandedRefs, visibleRefs]
  );
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
          placeholder="⌕ Filter references"
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
            onClick={webviewCommands.createBranch}
          />
          <RefToolButton
            label="Update Selected"
            iconClassName="codicon codicon-sync"
            onClick={webviewCommands.updateSelectedRef}
          />
          <RefToolButton
            label="Delete"
            iconClassName="codicon codicon-trash"
            onClick={webviewCommands.deleteSelectedRef}
          />
          <RefToolButton
            label="Compare with Current"
            iconClassName="codicon codicon-diff"
            onClick={webviewCommands.compareSelectedRefWithCurrent}
          />
          <RefToolButton
            label="Fetch"
            iconClassName="codicon codicon-cloud-download"
            onClick={webviewCommands.fetchRefs}
          />
          <RefToolButton
            label="Navigate Log to selected branch HEAD"
            iconClassName="codicon codicon-issues"
            disabled={!selectedRefId || !selectedRef || !isSelectableRef(selectedRef.type)}
            onClick={() => {
              if (!selectedRefId) {
                return;
              }

              webviewCommands.selectRef(selectedRefId);
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
        <VirtualList
          items={visibleRefRows}
          rowHeight={refRowHeight}
          className="reference-tree-pane"
          contentClassName="reference-tree-content tree virtual-list-content"
          emptyState={
            <div className="reference-empty-state">No references match the current filter.</div>
          }
          getKey={(item) => item.node.id}
          renderItem={(item) => (
            <RefTreeNode
              node={item.node}
              depth={item.depth}
              forceExpanded={Boolean(deferredSearchQuery)}
            />
          )}
        />
      </div>
    </section>
  );
}
