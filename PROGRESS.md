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

## Phase 3: UI — done (2026-09-28)

- Added `src/components/TodoApp.tsx`: client component wiring the Phase 2 pure functions to state — add (form), edit (inline), toggle complete (checkbox), delete
- Loads todos from `localStorage` on mount and persists on every change, via the existing `loadTodos`/`saveTodos` helpers
- Replaced the default scaffold page (`src/app/page.tsx`) with `<TodoApp />`; removed the now-unused `page.module.css` and unreferenced scaffold SVGs; updated page `<title>`/description
- Added `@testing-library/react` + `@testing-library/jest-dom` (approved addition) and a Vitest setup file (`vitest.setup.ts`) for jest-dom matchers and automatic cleanup; added a path-alias resolver to `vitest.config.ts` so `@/*` imports work under Vitest
- Added component tests for render, add, empty-input guard, toggle, edit, delete, and localStorage persistence/reload (8 tests; 26 total across the suite)
- One `eslint-disable-next-line react-hooks/set-state-in-effect` with an inline comment: loading persisted todos can only happen after mount (no `window` during SSR), so this is an intentional exception, not an oversight
- Verified `npm run lint`, `npm test`, and `npm run build` all pass; checked the server-rendered HTML via `curl` (correct title, empty-state markup, no console/server errors in the dev log)
- Note: no browser-automation tool was available in this session, so the golden path (add/edit/complete/delete/refresh) was verified via the Testing Library suite (which drives the real DOM through jsdom) and server-rendered output, not a live clicked-through browser session

No deployment work was done in this phase.
