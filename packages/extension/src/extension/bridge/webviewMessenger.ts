import type * as vscode from "vscode";
import {
  extensionToWebviewMessageSchema,
  type ExtensionToWebviewMessage
} from "@intelligent-git-log/contracts/extensionToWebviewProtocol";
import { outputLogger } from "#extension/logging/outputLogger";

export type LoadingArea = "refs" | "commits" | "details";

export class WebviewMessenger {
  private readonly webview: vscode.Webview;

  public constructor(webview: vscode.Webview) {
    this.webview = webview;
  }

  public async post(message: ExtensionToWebviewMessage): Promise<void> {
    const validated = extensionToWebviewMessageSchema.parse(message);
    outputLogger.info(`Posting message to webview: ${validated.type}`);
    await this.webview.postMessage(validated);
  }

  public async postError(message: string): Promise<void> {
    await this.post({
      type: "errorOccurred",
      payload: { message }
    });
  }

  public async postLoading(area: LoadingArea, isLoading: boolean): Promise<void> {
    await this.post({
      type: "loadingStateChanged",
      payload: { area, isLoading }
    });
  }

  public async clearLoading(areas: LoadingArea[]): Promise<void> {
    for (const area of areas) {
      await this.postLoading(area, false);
    }
  }
}
