import * as vscode from "vscode";

export const vscodeCommands = {
  registerOpenGitLogCommand(callback: () => unknown): vscode.Disposable {
    return vscode.commands.registerCommand("intelligentGitLog.open", callback);
  },

  async openFile(fileUri: vscode.Uri): Promise<void> {
    await vscode.commands.executeCommand("vscode.open", fileUri);
  },

  async openDiff(
    leftUri: vscode.Uri,
    rightUri: vscode.Uri,
    title?: string,
    options?: vscode.TextDocumentShowOptions
  ): Promise<void> {
    await vscode.commands.executeCommand("vscode.diff", leftUri, rightUri, title, options);
  },

  async createBranch(): Promise<void> {
    await vscode.commands.executeCommand("git.branch");
  },

  async fetch(): Promise<void> {
    await vscode.commands.executeCommand("git.fetch");
  }
};
