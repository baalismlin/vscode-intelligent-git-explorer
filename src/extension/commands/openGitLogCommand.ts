import * as vscode from "vscode";
import { outputLogger } from "../logging/outputLogger";
import { GitLogPanel } from "../panel/gitLogPanel";

export function registerOpenGitLogCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("intellijGitLog.open", () => {
    outputLogger.show(true);
    outputLogger.info("Command invoked: intellijGitLog.open");
    GitLogPanel.createOrShow(context);
  });
}
