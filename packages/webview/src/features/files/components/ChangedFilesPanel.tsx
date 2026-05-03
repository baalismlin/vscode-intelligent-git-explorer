import { Panel } from "@shared/components/Panel";
import { useGitLogStore } from "@store/gitLogStore";
import { ChangedFilesTree } from "./ChangedFilesTree";
import { CommitDetailsCard } from "./CommitDetailsCard";

export function ChangedFilesPanel(): JSX.Element {
  const selectedCommitDetail = useGitLogStore((state) => state.selectedCommitDetail);

  return (
    <Panel title="Changed Files">
      <div className="file-tree">
        {selectedCommitDetail ? (
          selectedCommitDetail.changedFiles.map((node) => <ChangedFilesTree key={node.id} node={node} depth={0} />)
        ) : (
          <div className="empty-state">Select a commit to inspect changed files.</div>
        )}
      </div>
      <CommitDetailsCard />
    </Panel>
  );
}
