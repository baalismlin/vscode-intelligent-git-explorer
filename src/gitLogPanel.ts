import * as vscode from "vscode";
import { createInitialState } from "./mockData";

export class GitLogPanel {
  public static readonly viewType = "intellijGitLog.panel";
  private static currentPanel: GitLogPanel | undefined;

  public static createOrShow(context: vscode.ExtensionContext): void {
    const column = vscode.ViewColumn.One;

    if (GitLogPanel.currentPanel) {
      GitLogPanel.currentPanel.panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      GitLogPanel.viewType,
      "IntelliJ Git Log",
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")]
      }
    );

    GitLogPanel.currentPanel = new GitLogPanel(panel, context);
  }

  private readonly panel: vscode.WebviewPanel;
  private readonly context: vscode.ExtensionContext;
  private readonly disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    this.panel = panel;
    this.context = context;

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    this.panel.webview.html = this.getHtmlForWebview(this.panel.webview);
  }

  public dispose(): void {
    GitLogPanel.currentPanel = undefined;

    while (this.disposables.length > 0) {
      const disposable = this.disposables.pop();
      disposable?.dispose();
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "gitLog.css")
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "gitLog.js")
    );
    const nonce = getNonce();
    const state = JSON.stringify(createInitialState()).replace(/</g, "\\u003c");

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IntelliJ Git Log</title>
    <link rel="stylesheet" href="${styleUri}" />
  </head>
  <body>
    <div id="app"></div>
    <script nonce="${nonce}">
      window.__GIT_LOG_STATE__ = ${state};
    </script>
    <script nonce="${nonce}" src="${scriptUri}"></script>
  </body>
</html>`;
  }
}

function getNonce(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let value = "";

  for (let index = 0; index < 32; index += 1) {
    value += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return value;
}
