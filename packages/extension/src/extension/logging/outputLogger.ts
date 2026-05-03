import * as vscode from "vscode";

const channel = vscode.window.createOutputChannel("IntelliJ Git Log");

function write(level: "INFO" | "WARN" | "ERROR", message: string): void {
  channel.appendLine(`[${level}] ${new Date().toISOString()} ${message}`);
}

export const outputLogger = {
  show(preserveFocus = true): void {
    channel.show(preserveFocus);
  },
  info(message: string): void {
    write("INFO", message);
  },
  warn(message: string): void {
    write("WARN", message);
  },
  error(message: string): void {
    write("ERROR", message);
  },
  dispose(): void {
    channel.dispose();
  }
};
