import * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { type GitLogPanelManager } from "#extension/panel/gitLogPanelManager";

export function registerOpenGitLogCommand(
  context: vscode.ExtensionContext,
  panelManager: GitLogPanelManager
): vscode.Disposable {
  return vscode.commands.registerCommand("intelligentGitLog.open", () => {
    outputLogger.show(true);
    outputLogger.info("Command invoked: intelligentGitLog.open");
    panelManager.createOrShow(context);
  });
}
