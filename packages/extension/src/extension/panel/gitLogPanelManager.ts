import * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { vscodeWindow } from "#extension/vscode/vscodeWindow";
import { GitLogPanelSession } from "./gitLogPanelSession";
import { GitLogServiceFactory } from "./gitLogServiceFactory";
import { WebviewHtmlRenderer } from "./webviewHtmlRenderer";

const viewType = "intelligentGitLog.panel";

export class GitLogPanelManager implements vscode.Disposable {
  private currentSession: GitLogPanelSession | undefined;

  public createOrShow(context: vscode.ExtensionContext): void {
    const column = vscode.ViewColumn.One;

    if (this.currentSession) {
      outputLogger.info("Revealing existing Git Log panel.");
      this.currentSession.reveal(column);
      return;
    }

    outputLogger.info("Creating new Git Log panel.");
    const panel = vscodeWindow.createWebviewPanel(viewType, "Intelligent Git Log", column, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, "packages", "webview", "dist"),
        vscode.Uri.joinPath(context.extensionUri, "node_modules", "@vscode", "codicons", "dist")
      ]
    });

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

  public dispose(): void {
    this.currentSession?.dispose();
  }
}
