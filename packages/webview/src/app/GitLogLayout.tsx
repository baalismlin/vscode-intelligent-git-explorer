import { CommitTable } from "@features/commits/components/CommitTable";
import { CommitToolbar } from "@features/commits/components/CommitToolbar";
import { ChangedFilesPanel } from "@features/files/components/ChangedFilesPanel";
import { RefTreePanel } from "@features/refs/components/RefTreePanel";
import { ResizableSplitLayout } from "@shared/components/ResizableSplitLayout";
import { useGitLogStore } from "@store/gitLogStore";

export function GitLogLayout(): JSX.Element {
  const focusedPane = useGitLogStore((state) => state.focusedPane);
  const panelLayout = useGitLogStore((state) => state.panelLayout);
  const setPanelLayout = useGitLogStore((state) => state.setPanelLayout);
  const setFocusedPane = useGitLogStore((state) => state.setFocusedPane);

  return (
    <ResizableSplitLayout
      refsWidth={panelLayout.refsWidth}
      detailsWidth={panelLayout.detailsWidth}
      minRefsWidth={28}
      onResize={setPanelLayout}
      left={
        <div
          className={`pane-shell ${focusedPane === "refs" ? "focused-pane" : ""}`.trim()}
          onMouseDown={() => setFocusedPane("refs")}
        >
          <RefTreePanel />
        </div>
      }
      center={
        <div
          className={`pane-shell ${focusedPane === "commits" ? "focused-pane" : ""}`.trim()}
          onMouseDown={() => setFocusedPane("commits")}
        >
          <section className="panel commit-panel">
            <div className="panel-body">
              <CommitToolbar />
              <CommitTable />
            </div>
          </section>
        </div>
      }
      right={
        <div
          className={`pane-shell ${focusedPane === "files" ? "focused-pane" : ""}`.trim()}
          onMouseDown={() => setFocusedPane("files")}
        >
          <ChangedFilesPanel />
        </div>
      }
    />
  );
}
