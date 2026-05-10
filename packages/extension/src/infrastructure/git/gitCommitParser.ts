import {
  type FilterState,
  type GitCommitDetail,
  type GitCommitSummary
} from "@intelligent-git-log/contracts/gitLogModels";
import { ChangedFilesTreeBuilder } from "./changedFilesTreeBuilder";
import { fieldSeparator, recordSeparator, splitLines } from "./gitProtocol";

export class GitCommitParser {
  private readonly changedFilesTreeBuilder: ChangedFilesTreeBuilder;

  public constructor(changedFilesTreeBuilder = new ChangedFilesTreeBuilder()) {
    this.changedFilesTreeBuilder = changedFilesTreeBuilder;
  }

  public parseSummaries(
    output: string,
    targetRef: string,
    filters: FilterState
  ): GitCommitSummary[] {
    const commits = output
      .split(recordSeparator)
      .map((record) => record.trim())
      .filter(Boolean)
      .map((record) => {
        const [id, shortHash, author, date, ...messageParts] = record.split(fieldSeparator);
        return {
          id,
          shortHash,
          author,
          date,
          message: messageParts.join(fieldSeparator),
          branchId: targetRef
        } satisfies GitCommitSummary;
      });

    const searchQuery = filters.searchText.trim().toLowerCase();
    if (!searchQuery) {
      return commits;
    }

    return commits.filter((commit) => {
      return (
        commit.id.toLowerCase().includes(searchQuery) ||
        commit.shortHash.toLowerCase().includes(searchQuery) ||
        commit.author.toLowerCase().includes(searchQuery) ||
        commit.message.toLowerCase().includes(searchQuery)
      );
    });
  }

  public parseDetail(headerLine: string, filesOutput: string): GitCommitDetail | null {
    if (!headerLine) {
      return null;
    }

    const [resolvedCommitId, shortHash, author, date, ...messageParts] =
      headerLine.split(fieldSeparator);
    const changedFiles = this.changedFilesTreeBuilder.build(splitLines(filesOutput));

    return {
      commitId: resolvedCommitId,
      shortHash,
      message: messageParts.join(fieldSeparator),
      author,
      date,
      changedFiles
    };
  }
}
