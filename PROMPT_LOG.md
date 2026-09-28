# Prompt Log

## 2026-09-28 — Phase 1: Scaffold

Prompt: "Read AGENTS.md and start Phase 1 (Scaffold) only. In scope: create the Next.js app, configure lint and Vitest, create PROGRESS.md and PROMPT_LOG.md, first commit. Out of scope: any todo logic, UI, or deployment."

Outcome: Scaffolded the Next.js app per AGENTS.md conventions, configured ESLint and Vitest, created this log and PROGRESS.md, made the first commit.

## 2026-09-28 — Phase 2: Todo logic

Prompt: "Start phase 2" (following an approved plan for pure todo CRUD functions plus localStorage persistence, no UI).

Outcome: Added `src/lib/todos.ts` (add/edit/toggle/delete) and `src/lib/storage.ts` (load/save with SSR guard and error handling), with Vitest tests for both. Removed the Phase 1 placeholder test. Lint, tests, and build all pass.

## 2026-09-28 — Phase 3: UI

Prompt: "Continue with phase 3" (following an approved plan for a UI wired to the Phase 2 logic, plus a decision to add `@testing-library/react` for component tests).

Outcome: Added `src/components/TodoApp.tsx` (add/edit/toggle/delete UI backed by `localStorage`), replaced the default scaffold page, added `@testing-library/react`/`jest-dom` and component tests. Lint, tests, and build all pass.
