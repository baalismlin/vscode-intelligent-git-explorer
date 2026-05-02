import * as vscode from "vscode";
import { registerOpenGitLogCommand } from "./extension/commands/openGitLogCommand";
import { outputLogger } from "./extension/logging/outputLogger";

export function activate(context: vscode.ExtensionContext): void {
  outputLogger.info("Extension activated.");
  context.subscriptions.push(registerOpenGitLogCommand(context));
}

export function deactivate(): void {
  outputLogger.info("Extension deactivated.");
}
