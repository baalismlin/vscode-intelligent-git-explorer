import * as vscode from "vscode";

type WebviewPanelShowOptions =
  | vscode.ViewColumn
  | {
      readonly viewColumn: vscode.ViewColumn;
      readonly preserveFocus?: boolean;
    };

export const vscodeWindow = {
  createOutputChannel(name: string): vscode.OutputChannel {
    return vscode.window.createOutputChannel(name);
  },

  createWebviewPanel(
    viewType: string,
    title: string,
    showOptions: WebviewPanelShowOptions,
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
  ): vscode.WebviewPanel {
    return vscode.window.createWebviewPanel(viewType, title, showOptions, options);
  },

  async showErrorMessage<T extends string>(message: string, ...items: T[]): Promise<T | undefined> {
    return vscode.window.showErrorMessage(message, ...items);
  },

  async showWarningMessage<T extends string>(
    message: string,
    options: vscode.MessageOptions,
    ...items: T[]
  ): Promise<T | undefined> {
    return vscode.window.showWarningMessage(message, options, ...items);
  },

  async showInputBox(options?: vscode.InputBoxOptions): Promise<string | undefined> {
    return vscode.window.showInputBox(options);
  }
};
