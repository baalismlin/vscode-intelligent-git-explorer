import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  GitExecutableNotFoundError,
  GitReferenceUnavailableError,
  GitRepositoryNotFoundError
} from "#domain/gitLogErrors";

const execFileAsync = promisify(execFile);

export class GitRunner {
  private readonly repositoryRoot: string;

  public constructor(repositoryRoot: string) {
    this.repositoryRoot = repositoryRoot;
  }

  public async run(args: string[]): Promise<string> {
    try {
      const result = await execFileAsync("git", args, {
        cwd: this.repositoryRoot,
        maxBuffer: 8 * 1024 * 1024
      });
      return result.stdout.trim();
    } catch (error) {
      throw toGitProviderError(error, this.repositoryRoot);
    }
  }
}

function toGitProviderError(error: unknown, repositoryRoot: string): Error {
  if (isExecError(error)) {
    if (error.code === "ENOENT") {
      return new GitExecutableNotFoundError();
    }

    const detail = `${error.stderr ?? error.message}`.trim();
    if (detail.includes("not a git repository")) {
      return new GitRepositoryNotFoundError(repositoryRoot);
    }

    if (detail.includes("unknown revision or path not in the working tree")) {
      return new GitReferenceUnavailableError();
    }

    return new Error(detail || "Failed to read data from the Git repository.");
  }

  return error instanceof Error ? error : new Error("Failed to read data from the Git repository.");
}

function isExecError(error: unknown): error is Error & { code?: string; stderr?: string } {
  return error instanceof Error;
}
