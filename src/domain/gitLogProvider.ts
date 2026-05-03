import { FilterState, GitCommitDetail, GitCommitSummary, GitRefNode } from "./gitLogModels";

export interface GitLogProvider {
  getRefs(): Promise<GitRefNode[]>;
  getCommitSummaries(refId: string, filters: FilterState): Promise<GitCommitSummary[]>;
  getCommitDetail(commitId: string): Promise<GitCommitDetail | null>;
}
