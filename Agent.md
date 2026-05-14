# Project Status

Last checked: 2026-05-14

## Stage Summary

### Architecture Refactor Stage

- Status: Completed
- Completed:
  - React + Vite + TypeScript webview app
  - Typed message protocol with zod validation
  - Zustand-based UI state
  - Extension / bridge / webview layering

### Model Consolidation Stage

- Status: Completed
- Completed:
  - Domain models and view models
  - Mapper / adapter layer
  - Provider interface split
  - Application / domain / infrastructure separation

### Interaction Enhancement Stage

- Status: Mostly completed
- Completed:
  - Selection state
  - Filter state
  - Panel resize
  - Persisted panel and UI state
  - Basic keyboard navigation
  - Stabilized tree and list interaction boundaries
- Notes:
  - Keyboard navigation was intentionally not expanded further

### Data Integration Stage

- Status: Main flow completed, action-level gaps remain
- Completed:
  - Real Git data source integration
  - UI decoupled from provider implementation
  - Real refs / commits / changed files flow
  - Stale persisted state recovery
  - `loadMoreCommits` removed in favor of full Git log loading
  - Details toolbar with show diff, revert selected changes, expand all, and collapse all
  - VS Code Git-backed file open, diff, revert selected changes, branch creation, fetch, and go-to-ref/hash flow
- Remaining:
  - `refs:deleteSelected` is still wired through protocol/UI but posts a not-implemented error
  - `refs:compareWithCurrent` is still wired through protocol/UI but posts a not-implemented error
  - `commits:cherryPick` is still wired through protocol/UI but posts a not-implemented error

### Performance And Engineering Stage

- Status: Started
- Completed:
  - Virtual scrolling for the commits list
  - Virtual scrolling for the changed files tree
  - `pnpm run lint` passes
  - `pnpm run build` passes for contracts, extension, and webview
- Remaining:
  - Unit tests
  - Bridge contract tests
  - Core interaction tests
  - Automated regression coverage for Git action flows
  - Performance safeguards beyond current virtualization

## Current Position

The project has completed the main body of the data integration stage and has started engineering hardening:

- real repository data flows are active end-to-end
- core details actions for file open, diff, and revert are implemented
- three command actions remain intentionally unresolved
- lint and production build are currently clean
- no project-owned tests are present yet

The most accurate current label is:

- Data integration stage: main work completed, pending action-level closure
- Performance and engineering stage: started through virtualization plus clean lint/build, but not test-covered

## High Priority Remaining Work

- Decide whether `Delete`, `Compare`, and `Cherry-pick` should be implemented now or removed/disabled from the UI temporarily
- Add first test layer around contracts, mapper/service behavior, and bridge action dispatch
- Add regression coverage for open diff and revert selected changes

## Compressed Context

- Monorepo structure:
  - `packages/extension`
  - `packages/webview`
  - `packages/contracts`
- Webview stack:
  - React
  - Zustand
  - zod
  - Vite
- Extension stack:
  - application / domain / infrastructure layering
  - `RealGitLogProvider` is active
- Completed UI areas:
  - refs tree
  - commit log
  - changed files tree
  - panel persistence
  - codicon integration
  - commit list virtual scrolling
  - changed files virtual scrolling
  - details toolbar actions
- Implemented extension actions:
  - open file
  - open diff
  - revert selected changes
  - create branch through VS Code Git command
  - fetch through VS Code Git command
  - go to ref/hash prompt
- Unimplemented actions:
  - `refs:deleteSelected`
  - `refs:compareWithCurrent`
  - `commits:cherryPick`
- Verification:
  - `pnpm run lint`
  - `pnpm run build`
- Test status:
  - no repository-owned test files or test scripts found
- Recommended next stage focus:
  - tests
  - bridge contract coverage
  - engineering hardening

## Maintenance Rule

- After each completed feature, update this file so stage status, remaining work, and compressed context stay aligned with the codebase.