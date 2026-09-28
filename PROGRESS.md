# Progress

## Phase 1: Scaffold — done (2026-09-28)

- Scaffolded Next.js app (App Router, TypeScript strict mode, ESLint, no Tailwind, `src/` directory)
- Added Vitest with `@vitejs/plugin-react` and `jsdom` for future todo logic and component tests
- Verified `npm run dev`, `npm run lint`, `npm test`, and `npm run build` all pass
- Disabled Next.js 16's automatic `AGENTS.md` agent-rules injection (`agentRules: false` in `next.config.ts`) so the project's own `AGENTS.md` stays authoritative
- Created `PROGRESS.md` and `PROMPT_LOG.md`
- First commit made

No todo logic, UI, or deployment work was done in this phase.

## Phase 2: Todo logic — done (2026-09-28)

- Added `src/lib/todos.ts`: pure functions `addTodo`, `editTodo`, `toggleTodo`, `deleteTodo` (trim/empty-text guards, no mutation of input arrays)
- Added `src/lib/storage.ts`: `loadTodos`/`saveTodos` wrapping `localStorage`, guarded for SSR (`typeof window`) and wrapped in try/catch for corrupt JSON, non-array data, and quota errors
- Added Vitest unit tests for all of the above (18 tests total), covering add/edit/toggle/delete, load/save round-trip, corrupt data, and the server-rendering guard
- Removed the Phase 1 placeholder test
- Verified `npm run lint`, `npm test`, and `npm run build` all pass

No UI or deployment work was done in this phase.
