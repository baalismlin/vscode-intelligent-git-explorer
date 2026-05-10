export class GitExecutableNotFoundError extends Error {
  public constructor(message = "Git executable was not found in the current environment.") {
    super(message);
    this.name = "GitExecutableNotFoundError";
  }
}

export class GitRepositoryNotFoundError extends Error {
  public constructor(repositoryRoot: string) {
    super(`The workspace folder is not a Git repository: ${repositoryRoot}`);
    this.name = "GitRepositoryNotFoundError";
  }
}

export class GitReferenceUnavailableError extends Error {
  public constructor(message = "The selected Git reference is no longer available.") {
    super(message);
    this.name = "GitReferenceUnavailableError";
  }
}
