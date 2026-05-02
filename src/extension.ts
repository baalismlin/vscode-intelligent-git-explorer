import * as vscode from "vscode";
import { GitLogPanel } from "./gitLogPanel";

export function activate(context: vscode.ExtensionContext): void {
  const openCommand = vscode.commands.registerCommand("intellijGitLog.open", () => {
    GitLogPanel.createOrShow(context);
  });

  context.subscriptions.push(openCommand);
}

export function deactivate(): void {}
