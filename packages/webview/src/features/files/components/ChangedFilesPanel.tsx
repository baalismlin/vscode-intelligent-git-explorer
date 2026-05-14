import { useMemo } from "react";
import { webviewCommands } from "@bridge/webviewCommands";
import { VirtualList } from "@shared/components/VirtualList";
import { useGitLogStore } from "@store/gitLogStore";
import { ChangedFilesTree } from "./ChangedFilesTree";
import { CommitDetailsCard } from "./CommitDetailsCard";
import { collectFolderIds, findFileNode, flattenVisibleFileTree } from "../fileTreeUtils";

const fileRowHeight = 20;

export function ChangedFilesPanel(): JSX.Element {
  const selectedCommitDetail = useGitLogStore((state) => state.selectedCommitDetail);
  const selectedFileId = useGitLogStore((state) => state.selectedFileId);
  const expandedFiles = useGitLogStore((state) => state.expandedFiles);
  const setExpandedFiles = useGitLogStore((state) => state.setExpandedFiles);

  const selectedFile = selectedCommitDetail
    ? findFileNode(selectedCommitDetail.changedFiles, selectedFileId)
    : undefined;
  const canUseSelectedFile = selectedFile?.type === "file";
  const visibleFiles = useMemo(
    () =>
      selectedCommitDetail
        ? flattenVisibleFileTree(selectedCommitDetail.changedFiles, expandedFiles)
        : [],
    [expandedFiles, selectedCommitDetail]
  );

  return (
    <section className="panel files-panel">
      <div className="panel-body">
        <div className="detail-toolbar">
          <DetailToolButton
            label="Show diff"
            iconClassName="codicon codicon-diff"
            disabled={!canUseSelectedFile}
            onClick={() => {
              if (selectedFile) {
                webviewCommands.openDiff(selectedFile.path);
              }
            }}
          />
          <DetailToolButton
            label="Revert Selected Changes"
            iconClassName="codicon codicon-discard"
            disabled={!canUseSelectedFile}
            onClick={() => {
              if (selectedFile) {
                webviewCommands.revertSelectedChanges(selectedFile.path);
              }
            }}
          />
          <DetailToolButton
            label="Expand All"
            iconClassName="codicon codicon-expand-all"
            disabled={!selectedCommitDetail}
            onClick={() => {
              if (selectedCommitDetail) {
                setExpandedFiles(collectFolderIds(selectedCommitDetail.changedFiles));
              }
            }}
          />
          <DetailToolButton
            label="Collapse All"
            iconClassName="codicon codicon-collapse-all"
            disabled={!selectedCommitDetail}
            onClick={() => setExpandedFiles([])}
          />
        </div>
        <VirtualList
          items={visibleFiles}
          rowHeight={fileRowHeight}
          className="file-tree"
          contentClassName="virtual-list-content"
          emptyState={<div className="empty-state">Select a commit to inspect changed files.</div>}
          getKey={(item) => item.node.id}
          renderItem={(item) => <ChangedFilesTree node={item.node} depth={item.depth} />}
        />
        <CommitDetailsCard />
      </div>
    </section>
  );
}

function DetailToolButton({
  label,
  iconClassName,
  disabled = false,
  onClick
}: {
  label: string;
  iconClassName: string;
  disabled?: boolean;
  onClick?: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      className="detail-tool-button"
      disabled={disabled}
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      <span className={iconClassName} aria-hidden="true" />
    </button>
  );
}
