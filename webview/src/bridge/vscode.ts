import { WebviewToExtensionMessage } from "../../../src/domain/gitLogProtocol";

interface VsCodeApi {
  postMessage(message: unknown): void;
  setState<T>(state: T): void;
  getState<T>(): T | undefined;
}

declare global {
  interface Window {
    acquireVsCodeApi?: () => VsCodeApi;
    __INTELLIJ_GIT_LOG_VSCODE_API__?: VsCodeApi;
  }
}

const vscode =
  window.__INTELLIJ_GIT_LOG_VSCODE_API__ ||
  (window.acquireVsCodeApi ? window.acquireVsCodeApi() : undefined);

export function postMessageToHost(message: WebviewToExtensionMessage): void {
  vscode?.postMessage(message);
}

export function persistWebviewState<T>(state: T): void {
  vscode?.setState(state);
}

export function readPersistedWebviewState<T>(): T | undefined {
  return vscode?.getState<T>();
}
