# Contracts Package

`@intelligent-git-log/contracts` contains the shared data contracts used by the VS Code extension host and the React webview. Keep this package free of extension or browser runtime dependencies so it remains a stable boundary between processes.

## Module Boundaries

- `src/gitLogModels.ts`
  - Domain and application-facing Git log models.
  - These types describe repository data before it is shaped for presentation.
  - Examples: refs, commit summaries, commit details, changed file nodes, filters, selection, and workspace state.

- `src/gitLogViewModels.ts`
  - Webview-facing presentation models.
  - These may duplicate some domain fields intentionally, but they are allowed to include UI-specific structure such as commit graph metadata, default tree expansion, and initial selection.
  - Keep this layer separate from domain models so extension/application code can evolve independently from the webview layout.

- `src/gitLogProtocolSchemas.ts`
  - Shared zod schemas for reusable payload fragments.
  - Recursive schemas are typed against the model/view-model interfaces to catch schema drift.

- `src/extensionToWebviewProtocol.ts`
  - Messages posted from the extension host to the webview.
  - Use this when extension code validates outgoing host messages or webview code handles host events.

- `src/webviewToExtensionProtocol.ts`
  - Messages posted from the webview to the extension host.
  - `runCommand.command` is intentionally a typed enum union (`WebviewCommand`) rather than a raw string.

## Schema And Type Rules

- Zod schemas validate cross-process messages at runtime.
- TypeScript interfaces document the intended model boundaries.
- When adding a protocol payload, add or reuse a zod schema and export an inferred message type.
- Avoid `any` in schemas. If a recursive schema needs a type annotation, bind it to the corresponding model or view-model interface with `z.ZodType<T>`.
- Keep domain models and view models separate even when their fields currently overlap. The duplication is acceptable when it protects the extension/application layer from webview presentation churn.

## Compatibility

The extension bundle and webview bundle are built and shipped together. The bridge protocol is therefore treated as an internal synchronized contract, not a cross-version public API. If this changes, add an explicit protocol version and migration strategy before introducing incompatible message changes.
