import { ChangedFileNodeViewModel } from "@intelligent-git-log/contracts/gitLogViewModels";
import { postMessageToHost } from "@bridge/vscode";
import { useGitLogStore } from "@store/gitLogStore";
import { ChangedFilesTree } from "./ChangedFilesTree";
import { CommitDetailsCard } from "./CommitDetailsCard";

export function ChangedFilesPanel(): JSX.Element {
  const selectedCommitDetail = useGitLogStore((state) => state.selectedCommitDetail);
  const selectedFileId = useGitLogStore((state) => state.selectedFileId);
  const setExpandedFiles = useGitLogStore((state) => state.setExpandedFiles);

  const selectedFile = selectedCommitDetail ? findFileNode(selectedCommitDetail.changedFiles, selectedFileId) : undefined;
  const canUseSelectedFile = selectedFile?.type === "file";

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
                postMessageToHost({
                  type: "openDiff",
                  payload: { path: selectedFile.path }
                });
              }
            }}
          />
          <DetailToolButton
            label="Revert Selected Changes"
            iconClassName="codicon codicon-discard"
            disabled={!canUseSelectedFile}
            onClick={() => {
              if (selectedFile) {
                postMessageToHost({
                  type: "revertSelectedChanges",
                  payload: { path: selectedFile.path }
                });
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
        <div className="file-tree">
          {selectedCommitDetail ? (
            selectedCommitDetail.changedFiles.map((node) => <ChangedFilesTree key={node.id} node={node} depth={0} />)
          ) : (
            <div className="empty-state">Select a commit to inspect changed files.</div>
          )}
        </div>
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

function findFileNode(nodes: ChangedFileNodeViewModel[], selectedFileId: string): ChangedFileNodeViewModel | undefined {
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

function collectFolderIds(nodes: ChangedFileNodeViewModel[]): string[] {
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
