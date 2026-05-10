import type * as vscode from "vscode";
import {
  GitLogApplicationService,
  type PersistedGitLogState
} from "#application/gitLogApplicationService";
import { RealGitLogProvider } from "#infrastructure/git/realGitLogProvider";
import { VscodeGitActions } from "#extension/actions/vscodeGitActions";

export interface GitLogServiceSession {
  persistenceKey: string;
  repositoryRoot: string;
  service: GitLogApplicationService;
}

export class GitLogServiceFactory {
  private readonly context: vscode.ExtensionContext;

  public constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public create(repositoryRoot: string): GitLogServiceSession {
    const persistenceKey = getPersistenceKey(repositoryRoot);
    const persistedState = this.context.workspaceState.get<PersistedGitLogState>(persistenceKey);
    const service = new GitLogApplicationService(
      new RealGitLogProvider(repositoryRoot),
      new VscodeGitActions(),
      repositoryRoot,
      persistedState
    );

    return {
      persistenceKey,
      repositoryRoot,
      service
    };
  }

  public persistState(persistenceKey: string, state: PersistedGitLogState): void {
    void this.context.workspaceState.update(persistenceKey, state);
  }

  public clearPersistedState(persistenceKey: string): Thenable<void> {
    return this.context.workspaceState.update(persistenceKey, undefined);
  }
}

function getPersistenceKey(repositoryRoot: string): string {
  return `intelligentGitLog:${repositoryRoot}`;
}
