import * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { gitLogPanelManager } from "#extension/panel/gitLogPanelManager";

export function registerOpenGitLogCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("intelligentGitLog.open", () => {
    outputLogger.show(true);
    outputLogger.info("Command invoked: intelligentGitLog.open");
    gitLogPanelManager.createOrShow(context);
  });
}
