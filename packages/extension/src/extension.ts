import type * as vscode from "vscode";
import { registerOpenGitLogCommand } from "#extension/commands/openGitLogCommand";
import { outputLogger } from "#extension/logging/outputLogger";
import { GitLogPanelManager } from "#extension/panel/gitLogPanelManager";

export function activate(context: vscode.ExtensionContext): void {
  outputLogger.info("Extension activated.");
  const panelManager = new GitLogPanelManager();
  context.subscriptions.push(panelManager, registerOpenGitLogCommand(context, panelManager));
}

export function deactivate(): void {
  outputLogger.info("Extension deactivated.");
  outputLogger.dispose();
}
