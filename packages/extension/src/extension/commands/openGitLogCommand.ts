import * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { GitLogPanel } from "#extension/panel/gitLogPanel";

export function registerOpenGitLogCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("intelligentGitLog.open", () => {
    outputLogger.show(true);
    outputLogger.info("Command invoked: intelligentGitLog.open");
    GitLogPanel.createOrShow(context);
  });
}
