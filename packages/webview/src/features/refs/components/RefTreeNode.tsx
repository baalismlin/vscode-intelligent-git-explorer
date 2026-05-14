import { type GitRefNode } from "@intelligent-git-log/contracts/gitLogModels";
import { isSelectableRef } from "@app/navigation";
import { webviewCommands } from "@bridge/webviewCommands";
import { useGitLogStore } from "@store/gitLogStore";

export function RefTreeNode({
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
  const headChildRefId = hasHeadChildBranch ? (node.children?.[0]?.id ?? "") : "";
  const headBranchName = hasHeadChildBranch ? (node.children?.[0]?.label ?? "") : "";
  const hasChildren = Boolean(node.children?.length) && !hasHeadChildBranch;
  const isExpanded = forceExpanded || expandedRefs.includes(node.id);
  const isSelected =
    selectedRefId === node.id || (hasHeadChildBranch && selectedRefId === headChildRefId);
  const isSelectable = isSelectableRef(node.type) || hasHeadChildBranch;

  return (
    <div className="tree-node">
      <div
        className={`tree-row ${isSelectable ? "clickable" : ""} ${isSelected ? "selected" : ""}`.trim()}
        onClick={(event) => {
          if (event.detail > 1) {
            return;
          }

          if (!isSelectable || isSelected) {
            return;
          }

          webviewCommands.selectRef(hasHeadChildBranch ? headChildRefId : node.id);
        }}
        onDoubleClick={() => {
          if (hasChildren && !forceExpanded) {
            toggleRefExpanded(node.id);
          }
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
        {depth > 0 ? (
          <span className="ref-icon">
            <span className={getRefIconClassName(node.type)} aria-hidden="true" />
          </span>
        ) : null}
        <span className="ref-label">{node.label}</span>
        {node.type === "head" ? <span className="ref-type">current</span> : null}
        {hasHeadChildBranch ? <span className="ref-branch-inline">{headBranchName}</span> : null}
      </div>
    </div>
  );
}

function getRefIconClassName(type: GitRefNode["type"]): string {
  switch (type) {
    case "head":
      return "codicon codicon-target";
    case "group":
      return "codicon codicon-folder";
    case "remote":
      return "codicon codicon-cloud";
    case "localBranch":
      return "codicon codicon-git-branch";
    case "remoteBranch":
      return "codicon codicon-repo";
    case "tag":
      return "codicon codicon-tag";
    default:
      return "codicon codicon-circle-filled";
  }
}
