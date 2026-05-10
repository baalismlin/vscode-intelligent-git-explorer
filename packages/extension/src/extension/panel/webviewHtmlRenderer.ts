import * as vscode from "vscode";

export class WebviewHtmlRenderer {
  public render(webview: vscode.Webview, extensionUri: vscode.Uri): string {
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

  public renderError(reason: string): string {
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
