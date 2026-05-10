import * as vscode from "vscode";
import * as path from "node:path";
import { GitLogApplicationService, PersistedGitLogState } from "#application/gitLogApplicationService";
import { RealGitLogProvider } from "#infrastructure/git/realGitLogProvider";
import { WebviewMessageRouter } from "#extension/bridge/webviewMessageRouter";
import { outputLogger } from "#extension/logging/outputLogger";

export class GitLogPanel {
  public static readonly viewType = "intelligentGitLog.panel";
  private static currentPanel: GitLogPanel | undefined;

  public static createOrShow(context: vscode.ExtensionContext): void {
    const column = vscode.ViewColumn.One;

    if (GitLogPanel.currentPanel) {
      outputLogger.info("Revealing existing Git Log panel.");
      GitLogPanel.currentPanel.panel.reveal(column);
      return;
    }

    outputLogger.info("Creating new Git Log panel.");

    const panel = vscode.window.createWebviewPanel(
      GitLogPanel.viewType,
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

    GitLogPanel.currentPanel = new GitLogPanel(panel, context);
  }

  public static disposeCurrent(): void {
    GitLogPanel.currentPanel?.dispose();
  }

  private readonly panel: vscode.WebviewPanel;
  private readonly router?: WebviewMessageRouter;
  private readonly disposables: vscode.Disposable[] = [];
  private readonly context: vscode.ExtensionContext;
  private persistenceKey: string = "";

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    this.panel = panel;
    this.context = context;

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
      const message = "Open a workspace folder to load Git history.";
      outputLogger.error(message);
      this.panel.webview.html = this.getErrorHtml(message);
      return;
    }

    outputLogger.info(`Using workspace root: ${workspaceFolder}`);
    this.persistenceKey = getPersistenceKey(workspaceFolder);
    const persistedState = context.workspaceState.get<PersistedGitLogState>(this.persistenceKey);
    const service = new GitLogApplicationService(new RealGitLogProvider(workspaceFolder), workspaceFolder, persistedState);
    this.router = new WebviewMessageRouter(
      panel,
      service,
      () => this.persistState(service.getPersistedState()),
      () => this.clearPersistedState()
    );

    this.panel.onDidChangeViewState(
      (event) => {
        outputLogger.info(
          `Panel view state changed. visible=${event.webviewPanel.visible} active=${event.webviewPanel.active}`
        );
      },
      null,
      this.disposables
    );
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    void this.initializeWebview(context.extensionUri).catch((error) => {
      const reason = error instanceof Error ? error.message : String(error);
      outputLogger.error(`Failed to initialize webview: ${reason}`);
      this.panel.webview.html = this.getErrorHtml(reason);
    });
  }

  public dispose(): void {
    if (GitLogPanel.currentPanel === this) {
      GitLogPanel.currentPanel = undefined;
    }
    outputLogger.info("Disposing Git Log panel.");
    this.router?.dispose();

    while (this.disposables.length > 0) {
      this.disposables.pop()?.dispose();
    }
  }

  private async initializeWebview(extensionUri: vscode.Uri): Promise<void> {
    const stylePath = vscode.Uri.joinPath(extensionUri, "packages", "webview", "dist", "gitLogWebview.css");
    const scriptPath = vscode.Uri.joinPath(extensionUri, "packages", "webview", "dist", "gitLogWebview.js");
    const codiconStylePath = vscode.Uri.joinPath(
      extensionUri,
      "node_modules",
      "@vscode",
      "codicons",
      "dist",
      "codicon.css"
    );

    await this.verifyResourceExists(stylePath);
    await this.verifyResourceExists(scriptPath);
    await this.verifyResourceExists(codiconStylePath);

    const html = this.getHtmlForWebview(this.panel.webview, extensionUri);
    outputLogger.info(
      `Setting webview HTML. script=${path.basename(scriptPath.fsPath)} style=${path.basename(stylePath.fsPath)}`
    );
    this.panel.webview.html = html;
  }

  private async verifyResourceExists(resource: vscode.Uri): Promise<void> {
    try {
      await vscode.workspace.fs.stat(resource);
      outputLogger.info(`Verified webview resource: ${resource.fsPath}`);
    } catch (error) {
      const message = `Missing webview resource: ${resource.fsPath}`;
      outputLogger.error(message);
      void vscode.window.showErrorMessage(message);
      throw error;
    }
  }

  private getHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri): string {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "packages", "webview", "dist", "gitLogWebview.css")
    );
    const codiconStyleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "node_modules", "@vscode", "codicons", "dist", "codicon.css")
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "packages", "webview", "dist", "gitLogWebview.js")
    );
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Intelligent Git Log</title>
    <link rel="stylesheet" href="${codiconStyleUri}" />
    <link rel="stylesheet" href="${styleUri}" />
  </head>
  <body>
    <div id="root">Loading Intelligent Git Log...</div>
    <script nonce="${nonce}">
      window.__INTELLIGENT_GIT_LOG_VSCODE_API__ =
        window.__INTELLIGENT_GIT_LOG_VSCODE_API__ || (window.acquireVsCodeApi ? window.acquireVsCodeApi() : undefined);
      const vscodeApi = window.__INTELLIGENT_GIT_LOG_VSCODE_API__;
      if (!globalThis.process) {
        globalThis.process = { env: { NODE_ENV: "production" } };
      } else if (!globalThis.process.env) {
        globalThis.process.env = { NODE_ENV: "production" };
      } else if (!globalThis.process.env.NODE_ENV) {
        globalThis.process.env.NODE_ENV = "production";
      }
      const hostLog = (level, message) => {
        vscodeApi?.postMessage({
          type: "log",
          payload: { level, message }
        });
      };
      hostLog("info", "Bootstrapping webview shell.");
      window.addEventListener("error", (event) => {
        hostLog("error", "Window error: " + event.message);
      });
      window.addEventListener("unhandledrejection", (event) => {
        const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
        hostLog("error", "Unhandled rejection: " + reason);
      });
    </script>
    <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
  </body>
</html>`;
  }

  private persistState(state: PersistedGitLogState): void {
    void this.context.workspaceState.update(this.persistenceKey, state);
  }

  private clearPersistedState(): Thenable<void> {
    return this.context.workspaceState.update(this.persistenceKey, undefined);
  }

  private getErrorHtml(reason: string): string {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        padding: 16px;
        font-family: Segoe UI, sans-serif;
        color: #22262e;
        background: #f7f8fa;
      }
      .error-box {
        border: 1px solid #d8dde6;
        background: #ffffff;
        padding: 12px;
      }
      .error-title {
        font-weight: 600;
        margin-bottom: 8px;
      }
      .error-text {
        color: #6f7783;
      }
    </style>
  </head>
  <body>
    <div class="error-box">
      <div class="error-title">Failed to load Intelligent Git Log</div>
      <div class="error-text">${escapeHtml(reason)}</div>
    </div>
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getPersistenceKey(repositoryRoot: string): string {
  return `intelligentGitLog:${repositoryRoot}`;
}
