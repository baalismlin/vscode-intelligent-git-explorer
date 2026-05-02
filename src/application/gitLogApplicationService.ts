import { BootstrapState, CommitItem, FilterState, SelectionState } from "../domain/gitLogModels";
import { GitLogProvider } from "../domain/gitLogProvider";

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
  private selection: SelectionState = {
    selectedRefId: "main",
    selectedCommitId: ""
  };
  private filters: FilterState = defaultFilters;

  public constructor(provider: GitLogProvider, repositoryRoot: string) {
    this.provider = provider;
    this.repositoryRoot = repositoryRoot;
  }

  public async getBootstrapState(): Promise<BootstrapState> {
    const refs = await this.provider.getRefs();
    const commits = await this.provider.getCommits(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(commits, this.selection.selectedRefId, this.selection.selectedCommitId);

    return {
      workspace: {
        repositoryRoot: this.repositoryRoot
      },
      refs,
      commits,
      selection: this.selection,
      filters: this.filters
    };
  }

  public async selectRef(refId: string): Promise<{ commits: CommitItem[]; selection: SelectionState }> {
    const commits = await this.provider.getCommits(refId, this.filters);
    this.selection = this.normalizeSelection(commits, refId, "");

    return {
      commits,
      selection: this.selection
    };
  }

  public async selectCommit(commitId: string): Promise<SelectionState> {
    const commits = await this.provider.getCommits(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(commits, this.selection.selectedRefId, commitId);
    return this.selection;
  }

  public async setFilters(filters: FilterState): Promise<{ commits: CommitItem[]; selection: SelectionState }> {
    this.filters = filters;
    const commits = await this.provider.getCommits(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(commits, this.selection.selectedRefId, this.selection.selectedCommitId);

    return {
      commits,
      selection: this.selection
    };
  }

  public async refresh(): Promise<{ commits: CommitItem[]; selection: SelectionState }> {
    const commits = await this.provider.getCommits(this.selection.selectedRefId, this.filters);
    this.selection = this.normalizeSelection(commits, this.selection.selectedRefId, this.selection.selectedCommitId);

    return {
      commits,
      selection: this.selection
    };
  }

  private normalizeSelection(
    commits: CommitItem[],
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
