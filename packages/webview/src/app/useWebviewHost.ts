import { useEffect } from "react";
import { subscribeToHostMessages } from "@bridge/messageClient";
import { postMessageToHost, persistWebviewState, readPersistedWebviewState } from "@bridge/vscode";
import { type PersistedWebviewState, useGitLogStore } from "@store/gitLogStore";

export function useWebviewHost(): void {
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
}
