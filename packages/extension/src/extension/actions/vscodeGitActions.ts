import * as path from "node:path";
import * as vscode from "vscode";
import { outputLogger } from "#extension/logging/outputLogger";
import { resolveRepositoryFileUri } from "#extension/utils/repositoryFileResolver";

interface GitExtension {
  getAPI(version: 1): GitApi;
}

interface GitApi {
  toGitUri(uri: vscode.Uri, ref: string): vscode.Uri;
  getRepository(uri: vscode.Uri): GitRepository | null;
}

interface GitRepository {
  getCommit(ref: string): Promise<{ hash: string }>;
  diffBetweenPatch(ref1: string, ref2: string, path?: string): Promise<string>;
  apply(patch: string, options?: { allowEmpty?: boolean; reverse?: boolean; threeWay?: boolean }): Promise<void>;
}

export class VscodeGitActions {
  public async openFile(repositoryRoot: string, filePath: string): Promise<void> {
    const fileUri = resolveRepositoryFileUri(repositoryRoot, filePath);
    outputLogger.info(`Opening file: ${fileUri.fsPath}`);
    await vscode.commands.executeCommand("vscode.open", fileUri);
  }

  public async openDiff(repositoryRoot: string, selectedCommitId: string, filePath: string): Promise<void> {
    if (!selectedCommitId) {
      throw new Error("No commit is selected.");
    }

    const gitApi = await this.getGitApi();
    const fileUri = resolveRepositoryFileUri(repositoryRoot, filePath);
    const repository = gitApi.getRepository(fileUri);
    const previousRef = `${selectedCommitId}^`;
    const previousUri = gitApi.toGitUri(fileUri, previousRef);
    const selectedUri = gitApi.toGitUri(fileUri, selectedCommitId);
    const previousCommit = await repository?.getCommit(previousRef);
    const previousShortHash = (previousCommit?.hash ?? previousRef).slice(0, 7);
    const title = `${path.basename(filePath)} (${previousShortHash} - ${selectedCommitId.slice(0, 7)})`;

    outputLogger.info(`Opening diff for ${filePath} at commit ${selectedCommitId}`);
    await vscode.commands.executeCommand("vscode.diff", previousUri, selectedUri, title);
  }

  public async revertSelectedChanges(
    repositoryRoot: string,
    selectedCommitId: string,
    filePath: string
  ): Promise<boolean> {
    if (!selectedCommitId) {
      throw new Error("No commit is selected.");
    }

    const confirmation = await vscode.window.showWarningMessage(
      `Revert selected changes in ${filePath}? This will modify your working tree.`,
      { modal: true },
      "Revert"
    );
    if (confirmation !== "Revert") {
      return false;
    }

    const gitApi = await this.getGitApi();
    const fileUri = resolveRepositoryFileUri(repositoryRoot, filePath);
    const repository = gitApi.getRepository(fileUri);
    if (!repository) {
      throw new Error("No Git repository was found for the selected file.");
    }

    const previousRef = `${selectedCommitId}^`;
    const patch = await repository.diffBetweenPatch(previousRef, selectedCommitId, filePath);
    if (!patch.trim()) {
      throw new Error("No changes were found for the selected file.");
    }

    outputLogger.info(`Reverting selected changes for ${filePath} at commit ${selectedCommitId}`);
    await repository.apply(patch, { reverse: true, threeWay: true });
    return true;
  }

  public async createBranch(): Promise<void> {
    await vscode.commands.executeCommand("git.branch");
  }

  public async fetch(): Promise<void> {
    await vscode.commands.executeCommand("git.fetch");
  }

  public async promptForRefQuery(): Promise<string | undefined> {
    return vscode.window.showInputBox({
      title: "Go to hash/branch/tag",
      prompt: "Enter a branch, tag, ref, or commit text to filter the log.",
      placeHolder: "main, origin/main, v1.0.0, a1b2c3d",
      ignoreFocusOut: true
    });
  }

  private async getGitApi(): Promise<GitApi> {
    const gitExtension = vscode.extensions.getExtension<GitExtension>("vscode.git");
    if (!gitExtension) {
      throw new Error("VS Code Git extension is not available.");
    }

    return gitExtension.isActive ? gitExtension.exports.getAPI(1) : (await gitExtension.activate()).getAPI(1);
  }
}
