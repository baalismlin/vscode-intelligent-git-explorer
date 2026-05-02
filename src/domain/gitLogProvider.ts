import { CommitItem, FilterState, GitRefNode } from "./gitLogModels";

export interface GitLogProvider {
  getRefs(): Promise<GitRefNode[]>;
  getCommits(refId: string, filters: FilterState): Promise<CommitItem[]>;
}
