import { type ChangedFileNodeViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";
import { postMessageToHost } from "@bridge/vscode";
import { useGitLogStore } from "@store/gitLogStore";

export function ChangedFilesTree({
  node,
  depth
}: {
  node: ChangedFileNodeViewModel;
  depth: number;
}): JSX.Element {
  const selectedFileId = useGitLogStore((state) => state.selectedFileId);
  const expandedFiles = useGitLogStore((state) => state.expandedFiles);
  const toggleFileExpanded = useGitLogStore((state) => state.toggleFileExpanded);
  const selectFile = useGitLogStore((state) => state.selectFile);

  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expandedFiles.includes(node.id);
  const isSelected = selectedFileId === node.id;
  const fileCount = node.type === "folder" ? countFiles(node) : 0;

  return (
    <div className="tree-node">
      <div
        className={`file-row ${node.type === "file" ? "clickable" : ""} ${isSelected ? "selected" : ""}`.trim()}
        onClick={(event) => {
          if (event.detail > 1) {
            return;
          }

          selectFile(node.id);
        }}
        onDoubleClick={() => {
          if (hasChildren) {
            toggleFileExpanded(node.id);
            return;
          }

          if (node.type === "file") {
            postMessageToHost({
              type: "openDiff",
              payload: { path: node.path }
            });
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
            if (hasChildren) {
              toggleFileExpanded(node.id);
            }
          }}
        >
          {hasChildren ? (isExpanded ? "▾" : "▸") : "•"}
        </span>
        <span className="file-icon">
          <span
            className={node.type === "folder" ? "codicon codicon-folder" : "codicon codicon-file"}
            aria-hidden="true"
          />
        </span>
        {node.status && <span className={`file-status status-${node.status}`}>{node.status}</span>}
        <span className="file-label">{node.name}</span>
        {node.type === "folder" ? <span className="file-count">{fileCount} files</span> : null}
      </div>
      {hasChildren && isExpanded
        ? node.children?.map((child) => (
            <ChangedFilesTree key={child.id} node={child} depth={depth + 1} />
          ))
        : null}
    </div>
  );
}

function countFiles(node: ChangedFileNodeViewModel): number {
  if (node.type === "file") {
    return 1;
  }

  return node.children?.reduce((count, child) => count + countFiles(child), 0) ?? 0;
}
