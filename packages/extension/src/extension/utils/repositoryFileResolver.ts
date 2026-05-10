import * as path from "node:path";
import * as vscode from "vscode";

export function resolveRepositoryFileUri(repositoryRoot: string, filePath: string): vscode.Uri {
  const normalizedRepositoryRoot = path.resolve(repositoryRoot);
  const trimmedPath = filePath.trim();

  if (!trimmedPath) {
    throw new Error("No file path was provided.");
  }

  if (path.isAbsolute(trimmedPath)) {
    throw new Error("Absolute file paths are not allowed.");
  }

  const resolvedPath = path.resolve(normalizedRepositoryRoot, trimmedPath);
  const relativePath = path.relative(normalizedRepositoryRoot, resolvedPath);
  const isOutsideRepository =
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath);

  if (isOutsideRepository) {
    throw new Error("The selected file is outside the repository.");
  }

  return vscode.Uri.file(resolvedPath);
}
