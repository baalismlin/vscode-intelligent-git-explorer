import {
  FilterState,
  GitRefNode,
  GitCommitSummary,
  SelectionState
} from "@intellij-git-log/contracts/gitLogModels";
import {
  CommitDetailViewModel,
  CommitListItemViewModel,
  GitLogBootstrapViewModel
} from "@intellij-git-log/contracts/gitLogViewModels";
import { GitLogProvider } from "#domain/gitLogProvider";
import { GitLogViewModelMapper } from "./gitLogViewModelMapper";

const defaultFilters: FilterState = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
};

export interface PersistedGitLogState {
  selection: SelectionState;
  filters: FilterState;
}

export class GitLogApplicationService {
  private readonly provider: GitLogProvider;
  private readonly repositoryRoot: string;
  private readonly mapper: GitLogViewModelMapper;
  private selection: SelectionState = {
    selectedRefId: "main",
    selectedCommitId: ""
  };
  private filters: FilterState = defaultFilters;

  public constructor(
    provider: GitLogProvider,
    repositoryRoot: string,
    persistedState?: Partial<PersistedGitLogState>
  ) {
    this.provider = provider;
    this.repositoryRoot = repositoryRoot;
    this.mapper = new GitLogViewModelMapper();
    this.selection = persistedState?.selection ?? this.selection;
    this.filters = persistedState?.filters ?? this.filters;
  }

  public async getBootstrapState(): Promise<GitLogBootstrapViewModel> {
    const refs = await this.provider.getRefs();
    this.selection = this.normalizeSelectedRef(refs, this.selection);
    const summaries = await this.provider.getCommitSummaries(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(
      summaries,
      this.selection.selectedRefId,
      this.selection.selectedCommitId
    );
    const detail = await this.provider.getCommitDetail(this.selection.selectedCommitId);

    return {
      workspace: {
        repositoryRoot: this.repositoryRoot
      },
      refs: this.mapper.mapRefs(refs),
      commits: this.mapper.mapCommitListItems(summaries),
      selectedCommitDetail: this.mapper.mapCommitDetail(detail),
      selection: this.selection,
      filters: this.filters
    };
  }

  public async selectRef(refId: string): Promise<{
    commits: CommitListItemViewModel[];
    selectedCommitDetail: CommitDetailViewModel | null;
    selection: SelectionState;
  }> {
    const summaries = await this.provider.getCommitSummaries(refId, this.filters);
    this.selection = this.normalizeSelection(summaries, refId, "");
    const detail = await this.provider.getCommitDetail(this.selection.selectedCommitId);

    return {
      commits: this.mapper.mapCommitListItems(summaries),
      selectedCommitDetail: this.mapper.mapCommitDetail(detail),
      selection: this.selection
    };
  }

  public async selectCommit(commitId: string): Promise<{
    selection: SelectionState;
    selectedCommitDetail: CommitDetailViewModel | null;
  }> {
    const summaries = await this.provider.getCommitSummaries(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(summaries, this.selection.selectedRefId, commitId);
    const detail = await this.provider.getCommitDetail(this.selection.selectedCommitId);

    return {
      selection: this.selection,
      selectedCommitDetail: this.mapper.mapCommitDetail(detail)
    };
  }

  public async setFilters(filters: FilterState): Promise<{
    commits: CommitListItemViewModel[];
    selectedCommitDetail: CommitDetailViewModel | null;
    selection: SelectionState;
  }> {
    this.filters = filters;
    const summaries = await this.provider.getCommitSummaries(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(
      summaries,
      this.selection.selectedRefId,
      this.selection.selectedCommitId
    );
    const detail = await this.provider.getCommitDetail(this.selection.selectedCommitId);

    return {
      commits: this.mapper.mapCommitListItems(summaries),
      selectedCommitDetail: this.mapper.mapCommitDetail(detail),
      selection: this.selection
    };
  }

  public async refresh(): Promise<{
    commits: CommitListItemViewModel[];
    selectedCommitDetail: CommitDetailViewModel | null;
    selection: SelectionState;
  }> {
    const summaries = await this.provider.getCommitSummaries(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(
      summaries,
      this.selection.selectedRefId,
      this.selection.selectedCommitId
    );
    const detail = await this.provider.getCommitDetail(this.selection.selectedCommitId);

    return {
      commits: this.mapper.mapCommitListItems(summaries),
      selectedCommitDetail: this.mapper.mapCommitDetail(detail),
      selection: this.selection
    };
  }

  public getPersistedState(): PersistedGitLogState {
    return {
      selection: this.selection,
      filters: this.filters
    };
  }

  public getSelection(): SelectionState {
    return this.selection;
  }

  public async navigateToRefOrHash(query: string): Promise<{
    commits: CommitListItemViewModel[];
    selectedCommitDetail: CommitDetailViewModel | null;
    selection: SelectionState;
    filters: FilterState;
  }> {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return {
        commits: [],
        selectedCommitDetail: null,
        selection: this.selection,
        filters: this.filters
      };
    }

    const refs = await this.provider.getRefs();
    const matchedRefId = findMatchingRefId(refs, normalizedQuery);

    if (matchedRefId) {
      const result = await this.selectRef(matchedRefId);
      return {
        ...result,
        filters: this.filters
      };
    }

    const nextFilters: FilterState = {
      ...this.filters,
      searchText: normalizedQuery
    };
    const result = await this.setFilters(nextFilters);

    return {
      ...result,
      filters: this.filters
    };
  }

  public resetPersistedState(): void {
    this.selection = {
      selectedRefId: "main",
      selectedCommitId: ""
    };
    this.filters = defaultFilters;
  }

  private normalizeSelection(
    commits: GitCommitSummary[],
    selectedRefId: string,
    selectedCommitId: string
  ): SelectionState {
    if (!commits.length) {
      return {
        selectedRefId,
        selectedCommitId: ""
      };
    }

    const nextCommitId = commits.some((commit) => commit.id === selectedCommitId)
      ? selectedCommitId
      : commits[0].id;

    return {
      selectedRefId,
      selectedCommitId: nextCommitId
    };
  }

  private normalizeSelectedRef(refs: GitRefNode[], selection: SelectionState): SelectionState {
    const selectableRefIds = collectSelectableRefIds(refs);
    if (selectableRefIds.length === 0) {
      return {
        selectedRefId: "",
        selectedCommitId: ""
      };
    }

    if (selectableRefIds.includes(selection.selectedRefId)) {
      return selection;
    }

    return {
      selectedRefId: selectableRefIds[0],
      selectedCommitId: ""
    };
  }
}

function collectSelectableRefIds(nodes: GitRefNode[]): string[] {
  const result: string[] = [];

  for (const node of nodes) {
    if (node.type === "localBranch" || node.type === "remoteBranch" || node.type === "tag") {
      result.push(node.id);
    }

    if (node.children?.length) {
      result.push(...collectSelectableRefIds(node.children));
    }
  }

  return result;
}

function findMatchingRefId(nodes: GitRefNode[], query: string): string | undefined {
  const normalizedQuery = query.toLowerCase();

  for (const node of nodes) {
    if (isSelectableRefNode(node) && (node.id.toLowerCase() === normalizedQuery || node.label.toLowerCase() === normalizedQuery)) {
      return node.id;
    }

    if (node.children?.length) {
      const nested = findMatchingRefId(node.children, query);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}

function isSelectableRefNode(node: GitRefNode): boolean {
  return node.type === "localBranch" || node.type === "remoteBranch" || node.type === "tag";
}
