import type * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { type GitLogPanelManager } from "#extension/panel/gitLogPanelManager";
import { vscodeCommands } from "#extension/vscode/vscodeCommands";

export function registerOpenGitLogCommand(
  context: vscode.ExtensionContext,
  panelManager: GitLogPanelManager
): vscode.Disposable {
  return vscodeCommands.registerOpenGitLogCommand(() => {
    outputLogger.show(true);
    outputLogger.info("Command invoked: intelligentGitLog.open");
    panelManager.createOrShow(context);
  });
}
