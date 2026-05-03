import { FilterState, GitCommitSummary, SelectionState } from "../domain/gitLogModels";
import { GitLogProvider } from "../domain/gitLogProvider";
import { GitLogViewModelMapper } from "./gitLogViewModelMapper";
import { CommitDetailViewModel, CommitListItemViewModel, GitLogBootstrapViewModel } from "./gitLogViewModels";

const defaultFilters: FilterState = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
};

export class GitLogApplicationService {
  private readonly provider: GitLogProvider;
  private readonly repositoryRoot: string;
  private readonly mapper: GitLogViewModelMapper;
  private selection: SelectionState = {
    selectedRefId: "main",
    selectedCommitId: ""
  };
  private filters: FilterState = defaultFilters;

  public constructor(provider: GitLogProvider, repositoryRoot: string) {
    this.provider = provider;
    this.repositoryRoot = repositoryRoot;
    this.mapper = new GitLogViewModelMapper();
  }

  public async getBootstrapState(): Promise<GitLogBootstrapViewModel> {
    const refs = await this.provider.getRefs();
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
}
