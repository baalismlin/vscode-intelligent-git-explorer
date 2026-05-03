import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  ChangedFileStatus,
  FilterState,
  GitChangedFileNode,
  GitCommitDetail,
  GitCommitSummary,
  GitRefNode
} from "@intellij-git-log/contracts/gitLogModels";
import { GitLogProvider } from "#domain/gitLogProvider";

const execFileAsync = promisify(execFile);
const fieldSeparator = "\u001f";
const recordSeparator = "\u001e";
const commitLimit = 200;

export class RealGitLogProvider implements GitLogProvider {
  private readonly repositoryRoot: string;

  public constructor(repositoryRoot: string) {
    this.repositoryRoot = repositoryRoot;
  }

  public async getRefs(): Promise<GitRefNode[]> {
    await this.ensureGitRepository();

    const currentHead = await this.getCurrentHeadRef();
    const refOutput = await this.runGit([
      "for-each-ref",
      `--format=%(refname)${fieldSeparator}%(refname:short)`,
      "refs/heads",
      "refs/remotes",
      "refs/tags"
    ]);

    const localBranches: GitRefNode[] = [];
    const remotes = new Map<string, GitRefNode[]>();
    const tags: GitRefNode[] = [];

    for (const line of splitLines(refOutput)) {
      const [fullRefName, shortRefName] = line.split(fieldSeparator);
      if (!fullRefName || !shortRefName) {
        continue;
      }

      if (fullRefName.startsWith("refs/heads/")) {
        localBranches.push({
          id: shortRefName,
          label: shortRefName,
          type: "localBranch"
        });
        continue;
      }

      if (fullRefName.startsWith("refs/remotes/")) {
        if (fullRefName.endsWith("/HEAD")) {
          continue;
        }

        const [remoteName, ...branchParts] = shortRefName.split("/");
        if (!remoteName || branchParts.length === 0) {
          continue;
        }

        const branches = remotes.get(remoteName) ?? [];
        branches.push({
          id: shortRefName,
          label: branchParts.join("/"),
          type: "remoteBranch"
        });
        remotes.set(remoteName, branches);
        continue;
      }

      if (fullRefName.startsWith("refs/tags/")) {
        tags.push({
          id: shortRefName,
          label: shortRefName,
          type: "tag"
        });
      }
    }

    localBranches.sort(compareByLabel);
    tags.sort(compareByLabel);
    const remoteGroups = Array.from(remotes.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([remoteName, branches]) => ({
        id: `remote:${remoteName}`,
        label: remoteName,
        type: "remote" as const,
        children: branches.sort(compareByLabel)
      }));

    const refs: GitRefNode[] = [];

    if (currentHead) {
      refs.push({
        id: `head:${currentHead}`,
        label: "HEAD",
        type: "head",
        children: [
          {
            id: currentHead,
            label: currentHead,
            type: "localBranch"
          }
        ]
      });
    }

    if (localBranches.length) {
      refs.push({
        id: "local-group",
        label: "Local",
        type: "group",
        children: localBranches
      });
    }

    if (remoteGroups.length) {
      refs.push({
        id: "remote-group",
        label: "Remote",
        type: "group",
        children: remoteGroups
      });
    }

    if (tags.length) {
      refs.push({
        id: "tags-group",
        label: "Tags",
        type: "group",
        children: tags
      });
    }

    return refs;
  }

  public async getCommitSummaries(refId: string, filters: FilterState): Promise<GitCommitSummary[]> {
    await this.ensureGitRepository();

    const targetRef = filters.branch.trim() || refId;
    if (!targetRef) {
      return [];
    }

    const args = [
      "log",
      targetRef,
      `--max-count=${commitLimit}`,
      "--date=format-local:%Y-%m-%d %H:%M",
      `--pretty=format:%H${fieldSeparator}%h${fieldSeparator}%an${fieldSeparator}%ad${fieldSeparator}%s${recordSeparator}`
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

    const output = await this.runGit(args);
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

  public async getCommitDetail(commitId: string): Promise<GitCommitDetail | null> {
    await this.ensureGitRepository();

    if (!commitId) {
      return null;
    }

    const headerLine = await this.runGit([
      "show",
      "--no-patch",
      "--no-notes",
      "-s",
      commitId,
      "--date=format-local:%Y-%m-%d %H:%M",
      `--format=%H${fieldSeparator}%h${fieldSeparator}%an${fieldSeparator}%ad${fieldSeparator}%s`
    ]);
    const filesOutput = await this.runGit([
      "diff-tree",
      "--root",
      "--no-commit-id",
      "--name-status",
      "-r",
      "--find-renames",
      commitId
    ]);
    if (!headerLine) {
      return null;
    }

    const [resolvedCommitId, shortHash, author, date, ...messageParts] = headerLine.split(fieldSeparator);
    const changedFiles = buildChangedFilesTree(splitLines(filesOutput));

    return {
      commitId: resolvedCommitId,
      shortHash,
      message: messageParts.join(fieldSeparator),
      author,
      date,
      changedFiles
    };
  }

  private async ensureGitRepository(): Promise<void> {
    await this.runGit(["rev-parse", "--is-inside-work-tree"]);
  }

  private async getCurrentHeadRef(): Promise<string | null> {
    try {
      const output = await this.runGit(["symbolic-ref", "--quiet", "--short", "HEAD"]);
      return output.trim() || null;
    } catch {
      return null;
    }
  }

  private async runGit(args: string[]): Promise<string> {
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

function buildChangedFilesTree(lines: string[]): GitChangedFileNode[] {
  const root = new Map<string, MutableTreeNode>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }

    const parts = trimmedLine.split("\t");
    const rawStatus = parts[0] ?? "";
    const status = normalizeStatus(rawStatus);
    const path = rawStatus.startsWith("R") ? parts[2] : parts[1];

    if (!path) {
      continue;
    }

    insertPath(root, path, status);
  }

  return Array.from(root.values()).map(toChangedFileNode).sort(compareFileNodes);
}

function insertPath(nodes: Map<string, MutableTreeNode>, filePath: string, status: ChangedFileStatus): void {
  const segments = filePath.split("/").filter(Boolean);
  let currentNodes = nodes;
  let currentPath = "";

  for (const [index, segment] of segments.entries()) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    const isLeaf = index === segments.length - 1;
    const existing = currentNodes.get(segment);

    if (existing) {
      if (isLeaf) {
        existing.status = status;
      }
      currentNodes = existing.children;
      continue;
    }

    const nextNode: MutableTreeNode = {
      id: `${isLeaf ? "file" : "folder"}:${currentPath}`,
      name: segment,
      path: currentPath,
      type: isLeaf ? "file" : "folder",
      status: isLeaf ? status : undefined,
      children: new Map<string, MutableTreeNode>()
    };

    currentNodes.set(segment, nextNode);
    currentNodes = nextNode.children;
  }
}

function toChangedFileNode(node: MutableTreeNode): GitChangedFileNode {
  const children = Array.from(node.children.values()).map(toChangedFileNode).sort(compareFileNodes);

  return {
    id: node.id,
    name: node.name,
    path: node.path,
    type: node.type,
    status: node.status,
    children: children.length > 0 ? children : undefined
  };
}

function parsePathFilters(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

function compareByLabel(left: GitRefNode, right: GitRefNode): number {
  return left.label.localeCompare(right.label);
}

function compareFileNodes(left: GitChangedFileNode, right: GitChangedFileNode): number {
  if (left.type !== right.type) {
    return left.type === "folder" ? -1 : 1;
  }

  return left.name.localeCompare(right.name);
}

function normalizeStatus(rawStatus: string): ChangedFileStatus {
  const code = rawStatus.charAt(0);
  switch (code) {
    case "A":
    case "D":
    case "R":
      return code;
    case "M":
    default:
      return "M";
  }
}

function toGitProviderError(error: unknown, repositoryRoot: string): Error {
  if (isExecError(error)) {
    if (error.code === "ENOENT") {
      return new Error("Git executable was not found in the current environment.");
    }

    const detail = `${error.stderr ?? error.message}`.trim();
    if (detail.includes("not a git repository")) {
      return new Error(`The workspace folder is not a Git repository: ${repositoryRoot}`);
    }

    if (detail.includes("unknown revision or path not in the working tree")) {
      return new Error("The selected Git reference is no longer available.");
    }

    return new Error(detail || "Failed to read data from the Git repository.");
  }

  return error instanceof Error ? error : new Error("Failed to read data from the Git repository.");
}

function isExecError(error: unknown): error is Error & { code?: string; stderr?: string } {
  return error instanceof Error;
}

interface MutableTreeNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  status?: ChangedFileStatus;
  children: Map<string, MutableTreeNode>;
}
