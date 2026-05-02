import { useEffect } from "react";
import { subscribeToHostMessages } from "../bridge/messageClient";
import { postMessageToHost } from "../bridge/vscode";
import { CommitToolbar } from "../features/commits/components/CommitToolbar";
import { CommitTable } from "../features/commits/components/CommitTable";
import { ChangedFilesPanel } from "../features/files/components/ChangedFilesPanel";
import { RefTreePanel } from "../features/refs/components/RefTreePanel";
import { useGitLogStore } from "../store/gitLogStore";

export function App(): JSX.Element {
  const errorMessage = useGitLogStore((state) => state.errorMessage);

  useEffect(() => {
    const unsubscribe = subscribeToHostMessages();
    postMessageToHost({ type: "ready" });
    return unsubscribe;
  }, []);

  return (
    <div className="layout-shell">
      {errorMessage ? <div className="app-banner">{errorMessage}</div> : null}
      <div className="layout">
        <RefTreePanel />
        <section className="panel">
          <div className="panel-title">Commit Log</div>
          <div className="panel-body">
            <CommitToolbar />
            <CommitTable />
          </div>
        </section>
        <ChangedFilesPanel />
      </div>
    </div>
  );
}
