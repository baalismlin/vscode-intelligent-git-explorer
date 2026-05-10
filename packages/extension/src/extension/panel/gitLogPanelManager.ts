import * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { GitLogPanelSession } from "./gitLogPanelSession";
import { GitLogServiceFactory } from "./gitLogServiceFactory";
import { WebviewHtmlRenderer } from "./webviewHtmlRenderer";

export class GitLogPanelManager {
  public static readonly viewType = "intelligentGitLog.panel";
  private currentSession: GitLogPanelSession | undefined;

  public createOrShow(context: vscode.ExtensionContext): void {
    const column = vscode.ViewColumn.One;

    if (this.currentSession) {
      outputLogger.info("Revealing existing Git Log panel.");
      this.currentSession.reveal(column);
      return;
    }

    outputLogger.info("Creating new Git Log panel.");
    const panel = vscode.window.createWebviewPanel(
      GitLogPanelManager.viewType,
      "Intelligent Git Log",
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "packages", "webview", "dist"),
          vscode.Uri.joinPath(context.extensionUri, "node_modules", "@vscode", "codicons", "dist")
        ]
      }
    );

    this.currentSession = new GitLogPanelSession({
      context,
      htmlRenderer: new WebviewHtmlRenderer(),
      onDidDispose: (session) => {
        if (this.currentSession === session) {
          this.currentSession = undefined;
        }
      },
      panel,
      serviceFactory: new GitLogServiceFactory(context)
    });
  }

  public disposeCurrent(): void {
    this.currentSession?.dispose();
  }
}

export const gitLogPanelManager = new GitLogPanelManager();
