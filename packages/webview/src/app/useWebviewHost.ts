import { useEffect } from "react";
import { subscribeToHostMessages } from "@bridge/messageClient";
import { persistWebviewState, readPersistedWebviewState } from "@bridge/vscode";
import { webviewCommands } from "@bridge/webviewCommands";
import { type PersistedWebviewState, useGitLogStore } from "@store/gitLogStore";

export function useWebviewHost(): void {
  useEffect(() => {
    const persistedState = readPersistedWebviewState<PersistedWebviewState>();
    if (persistedState) {
      useGitLogStore.getState().restorePersistedUiState(persistedState);
    }

    const unsubscribe = subscribeToHostMessages();
    const unsubscribePersist = useGitLogStore.subscribe(
      (state) => state.getPersistedUiState(),
      (state) => persistWebviewState(state),
      { equalityFn: arePersistedWebviewStatesEqual }
    );
    webviewCommands.ready();

    return () => {
      unsubscribe();
      unsubscribePersist();
    };
  }, []);
}

function arePersistedWebviewStatesEqual(
  left: PersistedWebviewState,
  right: PersistedWebviewState
): boolean {
  return (
    left.selectedFileId === right.selectedFileId &&
    left.focusedPane === right.focusedPane &&
    left.fileStateCommitId === right.fileStateCommitId &&
    left.panelLayout.refsWidth === right.panelLayout.refsWidth &&
    left.panelLayout.detailsWidth === right.panelLayout.detailsWidth &&
    areStringArraysEqual(left.expandedRefs, right.expandedRefs) &&
    areStringArraysEqual(left.expandedFiles, right.expandedFiles)
  );
}

function areStringArraysEqual(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
