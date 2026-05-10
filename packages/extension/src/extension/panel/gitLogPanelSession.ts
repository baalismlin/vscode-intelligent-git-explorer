import * as path from "node:path";
import * as vscode from "vscode";
import { WebviewMessageRouter } from "#extension/bridge/webviewMessageRouter";
import { outputLogger } from "#extension/logging/outputLogger";
import { GitLogServiceFactory } from "./gitLogServiceFactory";
import { WebviewHtmlRenderer } from "./webviewHtmlRenderer";

interface GitLogPanelSessionOptions {
  context: vscode.ExtensionContext;
  htmlRenderer: WebviewHtmlRenderer;
  onDidDispose: (session: GitLogPanelSession) => void;
  panel: vscode.WebviewPanel;
  serviceFactory: GitLogServiceFactory;
}

export class GitLogPanelSession {
  private readonly context: vscode.ExtensionContext;
  private readonly htmlRenderer: WebviewHtmlRenderer;
  private readonly onDidDisposeCallback: (session: GitLogPanelSession) => void;
  private readonly panel: vscode.WebviewPanel;
  private readonly serviceFactory: GitLogServiceFactory;
  private readonly disposables: vscode.Disposable[] = [];
  private isDisposed = false;
  private router?: WebviewMessageRouter;

  public constructor(options: GitLogPanelSessionOptions) {
    this.context = options.context;
    this.htmlRenderer = options.htmlRenderer;
    this.onDidDisposeCallback = options.onDidDispose;
    this.panel = options.panel;
    this.serviceFactory = options.serviceFactory;

    this.disposables.push(this.panel.onDidDispose(() => this.dispose()));
    this.initialize();
  }

  public reveal(column: vscode.ViewColumn): void {
    this.panel.reveal(column);
  }

  public dispose(): void {
    if (this.isDisposed) {
      return;
    }

    this.isDisposed = true;
    outputLogger.info("Disposing Git Log panel.");

    this.onDidDisposeCallback(this);
    this.router?.dispose();
    this.router = undefined;

    while (this.disposables.length > 0) {
      this.disposables.pop()?.dispose();
    }
    this.panel.dispose();
  }

  private initialize(): void {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
      const message = "Open a workspace folder to load Git history.";
      outputLogger.error(message);
      this.panel.webview.html = this.htmlRenderer.renderError(message);
      return;
    }

    outputLogger.info(`Using workspace root: ${workspaceFolder}`);
    const serviceSession = this.serviceFactory.create(workspaceFolder);
    this.router = new WebviewMessageRouter(
      this.panel,
      serviceSession.service,
      () => this.serviceFactory.persistState(serviceSession.persistenceKey, serviceSession.service.getPersistedState()),
      () => this.serviceFactory.clearPersistedState(serviceSession.persistenceKey)
    );

    this.panel.onDidChangeViewState((event) => {
      outputLogger.info(
        `Panel view state changed. visible=${event.webviewPanel.visible} active=${event.webviewPanel.active}`
      );
    }, null, this.disposables);

    this.initializeWebview().catch((error) => {
      const reason = error instanceof Error ? error.message : String(error);
      outputLogger.error(`Failed to initialize webview: ${reason}`);
      this.panel.webview.html = this.htmlRenderer.renderError(reason);
    });
  }

  private async initializeWebview(): Promise<void> {
    const stylePath = vscode.Uri.joinPath(this.context.extensionUri, "packages", "webview", "dist", "gitLogWebview.css");
    const scriptPath = vscode.Uri.joinPath(this.context.extensionUri, "packages", "webview", "dist", "gitLogWebview.js");
    const codiconStylePath = vscode.Uri.joinPath(
      this.context.extensionUri,
      "node_modules",
      "@vscode",
      "codicons",
      "dist",
      "codicon.css"
    );

    await this.verifyResourceExists(stylePath);
    await this.verifyResourceExists(scriptPath);
    await this.verifyResourceExists(codiconStylePath);

    outputLogger.info(
      `Setting webview HTML. script=${path.basename(scriptPath.fsPath)} style=${path.basename(stylePath.fsPath)}`
    );
    this.panel.webview.html = this.htmlRenderer.render(this.panel.webview, this.context.extensionUri);
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
}
