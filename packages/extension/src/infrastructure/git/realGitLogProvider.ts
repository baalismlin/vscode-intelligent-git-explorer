import {
  type FilterState,
  type GitCommitDetail,
  type GitCommitSummary,
  type GitRefNode
} from "@intelligent-git-log/contracts/gitLogModels";
import { type GitLogProvider } from "#domain/gitLogProvider";
import { fieldSeparator, recordSeparator } from "./gitProtocol";
import { GitCommitParser } from "./gitCommitParser";
import { GitRefParser } from "./gitRefParser";
import { GitRunner } from "./gitRunner";

export class RealGitLogProvider implements GitLogProvider {
  private readonly commitParser: GitCommitParser;
  private readonly refParser: GitRefParser;
  private readonly runner: GitRunner;

  public constructor(repositoryRoot: string) {
    this.commitParser = new GitCommitParser();
    this.refParser = new GitRefParser();
    this.runner = new GitRunner(repositoryRoot);
  }

  public async getRefs(): Promise<GitRefNode[]> {
    await this.ensureGitRepository();

    const currentHead = await this.getCurrentHeadRef();
    const refOutput = await this.runner.run([
      "for-each-ref",
      `--format=%(refname)${fieldSeparator}%(refname:short)${fieldSeparator}%(committerdate:unix)`,
      "refs/heads",
      "refs/remotes",
      "refs/tags"
    ]);

    return this.refParser.parse(refOutput, currentHead);
  }

  public async getCommitSummaries(
    refId: string,
    filters: FilterState
  ): Promise<GitCommitSummary[]> {
    await this.ensureGitRepository();

    const targetRef = filters.branch.trim() || refId;
    if (!targetRef) {
      return [];
    }

    const args = [
      "log",
      targetRef,
      "--date=format-local:%Y-%m-%d %H:%M",
      `--pretty=format:%H${fieldSeparator}%h${fieldSeparator}%P${fieldSeparator}%an${fieldSeparator}%ad${fieldSeparator}%s${recordSeparator}`
    ];

    if (filters.user.trim()) {
      args.push(`--author=${filters.user.trim()}`);
    }

    if (filters.date.trim()) {
      args.push(`--since=${filters.date.trim()}`);
    }

    const pathFilters = parsePathFilters(filters.paths);
    if (pathFilters.length > 0) {
      args.push("--", ...pathFilters);
    }

    const output = await this.runner.run(args);
    return this.commitParser.parseSummaries(output, targetRef, filters);
  }

  public async getCommitDetail(commitId: string): Promise<GitCommitDetail | null> {
    await this.ensureGitRepository();

    if (!commitId) {
      return null;
    }

    const headerLine = await this.runner.run([
      "show",
      "--no-patch",
      "--no-notes",
      "-s",
      commitId,
      "--date=format-local:%Y-%m-%d %H:%M",
      `--format=%H${fieldSeparator}%h${fieldSeparator}%P${fieldSeparator}%an${fieldSeparator}%ad${fieldSeparator}%s`
    ]);
    const filesOutput = await this.runner.run([
      "diff-tree",
      "--root",
      "--no-commit-id",
      "--name-status",
      "-r",
      "--find-renames",
      commitId
    ]);

    return this.commitParser.parseDetail(headerLine, filesOutput);
  }

  private async ensureGitRepository(): Promise<void> {
    await this.runner.run(["rev-parse", "--is-inside-work-tree"]);
  }

  private async getCurrentHeadRef(): Promise<string | null> {
    try {
      const output = await this.runner.run(["symbolic-ref", "--quiet", "--short", "HEAD"]);
      return output.trim() || null;
    } catch {
      return null;
    }
  }
}

function parsePathFilters(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}
