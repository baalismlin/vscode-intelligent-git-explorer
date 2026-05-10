# Extension Package

`@intelligent-git-log/extension` contains the VS Code extension host code for Intelligent Git Log. It owns VS Code integration, Git command access, application orchestration, and the webview bridge. Browser UI code lives in `packages/webview`; shared message and model contracts live in `packages/contracts`.

## Build

```bash
pnpm --filter @intelligent-git-log/extension build
```

The extension package compiles TypeScript from `src` to `dist`. The root extension manifest points VS Code at `packages/extension/dist/extension.js`.

## Module Boundaries

- `src/extension.ts`
  - VS Code activation/deactivation entrypoint.
  - Creates extension-scoped services such as `GitLogPanelManager`.

- `src/extension/commands`
  - Registers VS Code commands.
  - Commands should delegate to injected services instead of constructing panel/session dependencies directly.

- `src/extension/panel`
  - Owns webview panel lifecycle.
  - `GitLogPanelManager` tracks the active panel session.
  - `GitLogPanelSession` owns one panel instance, router wiring, resource checks, and disposal.
  - `WebviewHtmlRenderer` renders the webview HTML and error HTML.
  - `GitLogServiceFactory` creates application services for the selected workspace and handles persisted state keys.

- `src/extension/bridge`
  - Owns extension-host to webview messaging.
  - `WebviewMessageRouter` validates incoming webview messages, serializes handling, and performs top-level error recovery.
  - `GitLogMessageController` looks up the registered message action and executes it.
  - `WebviewMessageActionRegistry` registers one action per `WebviewToExtensionMessage["type"]` and tags each action as `log`, `read`, or `update`.
  - `WebviewMessenger` validates and posts host-to-webview messages.

- `src/application`
  - Coordinates Git data and VS Code actions behind application-level methods.
  - The bridge should call `GitLogApplicationService`, not `RealGitLogProvider` or VS Code APIs directly.

- `src/domain`
  - Contains provider interfaces and typed domain errors.
  - Typed errors are preferred over string matching across layers.

- `src/infrastructure/git`
  - Implements Git-backed data access.
  - `RealGitLogProvider` builds Git command arguments and orchestrates parsing.
  - `GitRunner` executes Git commands and maps process errors to typed errors.
  - `GitRefParser`, `GitCommitParser`, and `ChangedFilesTreeBuilder` parse Git command output into contract models.

## Lifecycle Notes

Panel disposal flows through `GitLogPanelManager.dispose()` to `GitLogPanelSession.dispose()`, then to `WebviewMessageRouter.dispose()`. Event listeners are registered with explicit `disposables.push(...)` calls so disposal ownership is visible.

Webview messages are validated with zod schemas from `@intelligent-git-log/contracts` before reaching the controller. Unknown or malformed messages should be rejected at the router boundary.

## Development Guidelines

- Keep VS Code API usage in `src/extension` or infrastructure adapters.
- Keep Git process execution inside `GitRunner`.
- Keep Git output parsing in parser/builder modules, not in bridge or panel code.
- Add new webview-to-extension actions as first-class message types in `packages/contracts/src/webviewToExtensionProtocol.ts`, then register exactly one handler in `WebviewMessageActionRegistry`.
