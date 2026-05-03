import { GitRefNode } from "@intellij-git-log/contracts/gitLogModels";
import { isSelectableRef } from "@app/navigation";
import { postMessageToHost } from "@bridge/vscode";
import { Panel } from "@shared/components/Panel";
import { useGitLogStore } from "@store/gitLogStore";

export function RefTreePanel(): JSX.Element {
  const refs = useGitLogStore((state) => state.refs);

  return (
    <Panel title="References">
      <div className="tree">
        {refs.map((node) => (
          <RefTreeNode key={node.id} node={node} depth={0} />
        ))}
      </div>
    </Panel>
  );
}

function RefTreeNode({ node, depth }: { node: GitRefNode; depth: number }): JSX.Element {
  const selectedRefId = useGitLogStore((state) => state.selection.selectedRefId);
  const expandedRefs = useGitLogStore((state) => state.expandedRefs);
  const toggleRefExpanded = useGitLogStore((state) => state.toggleRefExpanded);

  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expandedRefs.includes(node.id);
  const isSelected = selectedRefId === node.id;
  const isSelectable = isSelectableRef(node.type);

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
              refId: node.id
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
            if (hasChildren) {
              toggleRefExpanded(node.id);
            }
          }}
        >
          {hasChildren ? (isExpanded ? "▾" : "▸") : "•"}
        </span>
        <span className="ref-icon">{getRefIcon(node.type)}</span>
        <span className="ref-label">{node.label}</span>
        {node.type === "head" ? <span className="ref-type">current</span> : null}
      </div>
      {hasChildren && isExpanded
        ? node.children?.map((child) => <RefTreeNode key={child.id} node={child} depth={depth + 1} />)
        : null}
    </div>
  );
}

function getRefIcon(type: GitRefNode["type"]): string {
  switch (type) {
    case "head":
      return "●";
    case "group":
      return "▦";
    case "remote":
      return "☁";
    case "localBranch":
    case "remoteBranch":
      return "⑂";
    case "tag":
      return "🏷";
    default:
      return "•";
  }
}
