import { type FilterState } from "@intelligent-git-log/contracts/gitLogModels";
import { postMessageToHost } from "./vscode";

export const webviewCommands = {
  ready: () => postMessageToHost({ type: "ready" }),
  log: (level: "info" | "warn" | "error", message: string) =>
    postMessageToHost({ type: "log", payload: { level, message } }),
  selectRef: (refId: string) => postMessageToHost({ type: "selectRef", payload: { refId } }),
  selectCommit: (commitId: string) =>
    postMessageToHost({ type: "selectCommit", payload: { commitId } }),
  setFilters: (filters: FilterState) => postMessageToHost({ type: "setFilters", payload: filters }),
  refresh: () => postMessageToHost({ type: "refresh" }),
  openFile: (path: string) => postMessageToHost({ type: "openFile", payload: { path } }),
  openDiff: (path: string) => postMessageToHost({ type: "openDiff", payload: { path } }),
  revertSelectedChanges: (path: string) =>
    postMessageToHost({ type: "revertSelectedChanges", payload: { path } }),
  createBranch: () => postMessageToHost({ type: "refs:newBranch" }),
  fetchRefs: () => postMessageToHost({ type: "refs:fetch" }),
  updateSelectedRef: () => postMessageToHost({ type: "refs:updateSelected" }),
  deleteSelectedRef: () => postMessageToHost({ type: "refs:deleteSelected" }),
  compareSelectedRefWithCurrent: () => postMessageToHost({ type: "refs:compareWithCurrent" }),
  goToRef: () => postMessageToHost({ type: "commits:goToRef" }),
  cherryPickCommit: () => postMessageToHost({ type: "commits:cherryPick" })
} as const;
