import {
  extensionToWebviewMessageSchema,
  ExtensionToWebviewMessage
} from "@intelligent-git-log/contracts/extensionToWebviewProtocol";
import { useGitLogStore } from "@store/gitLogStore";

export function subscribeToHostMessages(): () => void {
  const handler = (event: MessageEvent<unknown>) => {
    const result = extensionToWebviewMessageSchema.safeParse(event.data);
    if (!result.success) {
      useGitLogStore.getState().setErrorMessage("Received invalid payload from extension host.");
      return;
    }

    applyHostMessage(result.data);
  };

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}

function applyHostMessage(message: ExtensionToWebviewMessage): void {
  const store = useGitLogStore.getState();

  switch (message.type) {
    case "bootstrap":
      store.bootstrap(message.payload);
      return;
    case "refsUpdated":
      store.setRefs(message.payload.refs);
      return;
    case "commitsUpdated":
      store.setCommits(message.payload.refId, message.payload.commits);
      return;
    case "commitDetailsUpdated":
      store.setCommitDetails(message.payload.commitId, message.payload.detail);
      return;
    case "selectionUpdated":
      store.setSelection(message.payload);
      return;
    case "loadingStateChanged":
      store.setLoadingState(message.payload.area, message.payload.isLoading);
      return;
    case "errorOccurred":
      store.setErrorMessage(message.payload.message);
      return;
  }
}
