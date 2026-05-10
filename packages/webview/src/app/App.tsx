import { useEffect } from "react";
import { getVisibleFiles, getVisibleRefs } from "./navigation";
import { subscribeToHostMessages } from "@bridge/messageClient";
import { postMessageToHost, persistWebviewState, readPersistedWebviewState } from "@bridge/vscode";
import { CommitToolbar } from "@features/commits/components/CommitToolbar";
import { CommitTable } from "@features/commits/components/CommitTable";
import { ChangedFilesPanel } from "@features/files/components/ChangedFilesPanel";
import { RefTreePanel } from "@features/refs/components/RefTreePanel";
import { ResizableSplitLayout } from "@shared/components/ResizableSplitLayout";
import { type FocusedPane, type PersistedWebviewState, useGitLogStore } from "@store/gitLogStore";

export function App(): JSX.Element {
  const errorMessage = useGitLogStore((state) => state.errorMessage);
  const focusedPane = useGitLogStore((state) => state.focusedPane);
  const panelLayout = useGitLogStore((state) => state.panelLayout);
  const setPanelLayout = useGitLogStore((state) => state.setPanelLayout);
  const setFocusedPane = useGitLogStore((state) => state.setFocusedPane);

  useEffect(() => {
    const persistedState = readPersistedWebviewState<PersistedWebviewState>();
    if (persistedState) {
      useGitLogStore.getState().restorePersistedUiState(persistedState);
    }

    const unsubscribe = subscribeToHostMessages();
    const unsubscribePersist = useGitLogStore.subscribe((state) => {
      persistWebviewState(state.getPersistedUiState());
    });
    postMessageToHost({ type: "ready" });

    return () => {
      unsubscribe();
      unsubscribePersist();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      const store = useGitLogStore.getState();
      if (event.key === "Escape") {
        store.clearErrorMessage();
        return;
      }

      const handled = handlePaneNavigation(store.focusedPane, event.key);
      if (handled) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="layout-shell">
      {errorMessage ? <div className="app-banner">{errorMessage}</div> : null}
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
    </div>
  );
}

function handlePaneNavigation(focusedPane: FocusedPane, key: string): boolean {
  switch (focusedPane) {
    case "refs":
      return handleRefNavigation(key);
    case "commits":
      return handleCommitNavigation(key);
    case "files":
      return handleFileNavigation(key);
    default:
      return false;
  }
}

function handleRefNavigation(key: string): boolean {
  const store = useGitLogStore.getState();
  const visibleRefs = getVisibleRefs(store.refs, store.expandedRefs);
  const currentIndex = findCurrentIndex(
    visibleRefs.map((item) => item.id),
    store.selection.selectedRefId
  );
  const currentItem = visibleRefs[currentIndex];

  if (key === "ArrowDown" || key === "ArrowUp") {
    const nextItem = moveVisibleSelection(visibleRefs, currentIndex, key === "ArrowDown" ? 1 : -1);
    if (nextItem?.selectable) {
      postMessageToHost({ type: "selectRef", payload: { refId: nextItem.id } });
    }
    return Boolean(nextItem);
  }

  if (!currentItem) {
    return false;
  }

  if (key === "ArrowRight" && currentItem.expandable && !currentItem.expanded) {
    store.toggleRefExpanded(currentItem.id);
    return true;
  }

  if (key === "ArrowLeft" && currentItem.expandable && currentItem.expanded) {
    store.toggleRefExpanded(currentItem.id);
    return true;
  }

  if (key === "Enter" && currentItem.selectable) {
    postMessageToHost({ type: "selectRef", payload: { refId: currentItem.id } });
    return true;
  }

  return false;
}

function handleCommitNavigation(key: string): boolean {
  const store = useGitLogStore.getState();
  if (store.loading.commits) {
    return false;
  }

  const commitIds = store.commits.map((commit) => commit.id);
  const currentIndex = findCurrentIndex(commitIds, store.selection.selectedCommitId);

  if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Enter") {
    return false;
  }

  const nextIndex =
    key === "Enter"
      ? currentIndex
      : clamp(currentIndex + (key === "ArrowDown" ? 1 : -1), 0, Math.max(commitIds.length - 1, 0));
  const nextCommitId = commitIds[nextIndex];

  if (!nextCommitId) {
    return false;
  }

  postMessageToHost({
    type: "selectCommit",
    payload: {
      commitId: nextCommitId
    }
  });
  return true;
}

function handleFileNavigation(key: string): boolean {
  const store = useGitLogStore.getState();
  const detail = store.selectedCommitDetail;
  if (!detail) {
    return false;
  }

  const visibleFiles = getVisibleFiles(detail.changedFiles, store.expandedFiles);
  const currentIndex = findCurrentIndex(
    visibleFiles.map((item) => item.id),
    store.selectedFileId
  );
  const currentItem = visibleFiles[currentIndex];

  if (key === "ArrowDown" || key === "ArrowUp") {
    const nextItem = moveVisibleSelection(visibleFiles, currentIndex, key === "ArrowDown" ? 1 : -1);
    if (nextItem) {
      store.selectFile(nextItem.id);
    }
    return Boolean(nextItem);
  }

  if (!currentItem) {
    return false;
  }

  if (key === "ArrowRight" && currentItem.expandable && !currentItem.expanded) {
    store.toggleFileExpanded(currentItem.id);
    return true;
  }

  if (key === "ArrowLeft" && currentItem.expandable && currentItem.expanded) {
    store.toggleFileExpanded(currentItem.id);
    return true;
  }

  if (key === "Enter" && currentItem.selectable) {
    postMessageToHost({
      type: "openDiff",
      payload: { path: currentItem.path }
    });
    return true;
  }

  return false;
}

function moveVisibleSelection<T extends { selectable: boolean }>(
  items: T[],
  currentIndex: number,
  step: 1 | -1
): T | undefined {
  let nextIndex = currentIndex;

  while (nextIndex + step >= 0 && nextIndex + step < items.length) {
    nextIndex += step;
    if (items[nextIndex]?.selectable) {
      return items[nextIndex];
    }
  }

  return undefined;
}

function findCurrentIndex(items: string[], selectedId: string): number {
  const index = items.findIndex((item) => item === selectedId);
  return index >= 0 ? index : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function isEditableTarget(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element) {
    return false;
  }

  return Boolean(element.closest("input, select, textarea, [contenteditable='true']"));
}
