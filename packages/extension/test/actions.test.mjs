import assert from "node:assert/strict";
import Module from "node:module";
import path from "node:path";
import test from "node:test";

const vscodeMock = installVscodeMock();

const { VscodeGitActions } = await import("../dist/extension/actions/vscodeGitActions.js");
const { resolveRepositoryFileUri } = await import(
  "../dist/extension/utils/repositoryFileResolver.js"
);

test("repository file resolver rejects empty, absolute, and escaping paths", () => {
  assert.throws(() => resolveRepositoryFileUri("/repo", " "), /No file path was provided/);
  assert.throws(
    () => resolveRepositoryFileUri("/repo", path.resolve("/tmp/outside.ts")),
    /Absolute file paths are not allowed/
  );
  assert.throws(
    () => resolveRepositoryFileUri("/repo", "../outside.ts"),
    /outside the repository/
  );
});

test("repository file resolver accepts normalized relative paths", () => {
  const uri = resolveRepositoryFileUri("/repo", "src/../src/index.ts");

  assert.equal(uri.fsPath, path.resolve("/repo/src/index.ts"));
});

test("git actions open files through the command facade", async () => {
  const actions = new VscodeGitActions();

  await actions.openFile("/repo", "src/index.ts");

  assert.deepEqual(vscodeMock.commands.at(-1), {
    command: "vscode.open",
    args: [{ fsPath: path.resolve("/repo/src/index.ts") }]
  });
});

test("git actions open commit diffs with previous and selected git URIs", async () => {
  const actions = new VscodeGitActions();

  await actions.openDiff("/repo", "abcdef123456", "src/index.ts");

  assert.deepEqual(vscodeMock.commands.at(-1), {
    command: "vscode.diff",
    args: [
      { fsPath: path.resolve("/repo/src/index.ts"), ref: "abcdef123456^" },
      { fsPath: path.resolve("/repo/src/index.ts"), ref: "abcdef123456" },
      "index.ts (parent1 - abcdef1)",
      undefined
    ]
  });
});

test("git actions do not revert when confirmation is cancelled", async () => {
  const actions = new VscodeGitActions();
  vscodeMock.warningResult = undefined;

  const didRevert = await actions.revertSelectedChanges("/repo", "abcdef123456", "src/index.ts");

  assert.equal(didRevert, false);
  assert.equal(vscodeMock.repository.appliedPatches.length, 0);
});

test("git actions reverse-apply selected file patch after confirmation", async () => {
  const actions = new VscodeGitActions();
  vscodeMock.warningResult = "Revert";

  const didRevert = await actions.revertSelectedChanges("/repo", "abcdef123456", "src/index.ts");

  assert.equal(didRevert, true);
  assert.deepEqual(vscodeMock.repository.patchRequests.at(-1), {
    ref1: "abcdef123456^",
    ref2: "abcdef123456",
    filePath: "src/index.ts"
  });
  assert.deepEqual(vscodeMock.repository.appliedPatches.at(-1), {
    patch: "diff --git a/src/index.ts b/src/index.ts",
    options: { reverse: true, threeWay: true }
  });
});

function installVscodeMock() {
  const mock = {
    commands: [],
    warningResult: undefined,
    repository: {
      patchRequests: [],
      appliedPatches: [],
      async getCommit(ref) {
        return { hash: ref === "abcdef123456^" ? "parent123456" : ref };
      },
      async diffBetweenPatch(ref1, ref2, filePath) {
        this.patchRequests.push({ ref1, ref2, filePath });
        return "diff --git a/src/index.ts b/src/index.ts";
      },
      async apply(patch, options) {
        this.appliedPatches.push({ patch, options });
      }
    }
  };
  const originalLoad = Module._load;

  Module._load = function load(request, parent, isMain) {
    if (request === "vscode") {
      return {
        Uri: {
          file(fsPath) {
            return { fsPath };
          }
        },
        commands: {
          async executeCommand(command, ...args) {
            mock.commands.push({ command, args });
            return undefined;
          }
        },
        extensions: {
          getExtension() {
            return {
              isActive: true,
              exports: {
                getAPI() {
                  return {
                    toGitUri(uri, ref) {
                      return { ...uri, ref };
                    },
                    getRepository() {
                      return mock.repository;
                    }
                  };
                }
              }
            };
          }
        },
        window: {
          createOutputChannel() {
            return {
              appendLine() {},
              show() {},
              dispose() {}
            };
          },
          async showWarningMessage() {
            return mock.warningResult;
          },
          async showInputBox() {
            return undefined;
          }
        }
      };
    }

    return originalLoad.call(this, request, parent, isMain);
  };

  return mock;
}
