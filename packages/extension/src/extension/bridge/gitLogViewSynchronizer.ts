import { SelectionState } from "@intelligent-git-log/contracts/gitLogModels";
import {
  CommitDetailViewModel,
  CommitListItemViewModel
} from "@intelligent-git-log/contracts/gitLogViewModels";
import { GitLogApplicationService } from "#application/gitLogApplicationService";
import { outputLogger } from "#extension/logging/outputLogger";
import {
  alwaysCurrentExecution,
  MessageExecutionContext
} from "./messageExecutionQueue";
import { LoadingArea, WebviewMessenger } from "./webviewMessenger";

export class GitLogViewSynchronizer {
  private readonly service: GitLogApplicationService;
  private readonly messenger: WebviewMessenger;
  private readonly onStateChanged?: () => void;

  public constructor(
    service: GitLogApplicationService,
    messenger: WebviewMessenger,
    onStateChanged?: () => void
  ) {
    this.service = service;
    this.messenger = messenger;
    this.onStateChanged = onStateChanged;
  }

  public async reloadBootstrap(execution: MessageExecutionContext = alwaysCurrentExecution): Promise<void> {
    await this.withLoading(["refs", "commits", "details"], execution, async () => {
      const bootstrap = await this.service.getBootstrapState();
      if (!execution.isCurrent()) {
        outputLogger.info("Skipping stale bootstrap reload payload.");
        return;
      }
      await this.messenger.post({
        type: "bootstrap",
        payload: bootstrap
      });
      this.notifyStateChanged();
    });
  }

  public async postSelectionPayloads(
    selection: SelectionState,
    commits: CommitListItemViewModel[],
    selectedCommitDetail: CommitDetailViewModel | null,
    execution: MessageExecutionContext
  ): Promise<void> {
    if (!execution.isCurrent()) {
      outputLogger.info("Skipping stale selection payloads.");
      return;
    }

    await this.messenger.post({
      type: "selectionUpdated",
      payload: selection
    });
    await this.messenger.post({
      type: "commitsUpdated",
      payload: {
        refId: selection.selectedRefId,
        commits
      }
    });
    await this.messenger.post({
      type: "commitDetailsUpdated",
      payload: {
        commitId: selection.selectedCommitId,
        detail: selectedCommitDetail
      }
    });
    this.notifyStateChanged();
  }

  public notifyStateChanged(): void {
    this.onStateChanged?.();
  }

  public async withLoading(
    areas: LoadingArea[],
    execution: MessageExecutionContext,
    action: () => Promise<void>
  ): Promise<void> {
    if (execution.isCurrent()) {
      for (const area of areas) {
        await this.messenger.postLoading(area, true);
      }
    }

    try {
      await action();
    } finally {
      if (execution.isCurrent()) {
        for (const area of areas) {
          await this.messenger.postLoading(area, false);
        }
      }
    }
  }
}
