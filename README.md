# Intelligent Git Log

Intelligent Git Log is a VS Code extension MVP for exploring Git history in a structured webview. It provides an IntelliJ-style Git log experience with commit lists, refs, changed files, and extension-to-webview actions.

## Project Structure

- `packages/extension` - VS Code extension host code, Git integration, commands, panel lifecycle, and message routing.
- `packages/webview` - React webview UI rendered inside VS Code.
- `packages/contracts` - Shared TypeScript models and zod schemas used by both the extension and webview.

## Requirements

- Node.js
- pnpm `10.10.0`
- VS Code `1.90.0` or newer
- Git available on your PATH

## Development

Install dependencies:

```bash
pnpm install
```

Build all packages:

```bash
pnpm run build
```

Run tests:

```bash
pnpm test
```

Lint and format:

```bash
pnpm run lint
pnpm run format
```

Watch the extension package while developing:

```bash
pnpm run watch
```

## Running In VS Code

1. Open this repository in VS Code.
2. Run `pnpm install`.
3. Run `pnpm run build`.
4. Start the extension host from VS Code.
5. Execute the `Open Intelligent Git Log` command from the command palette.

## Notes

The root extension manifest points VS Code to `packages/extension/dist/extension.js`. The webview bundle and shared contracts are built through the root `pnpm run build` script.
