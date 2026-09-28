# Progress

## Phase 1: Scaffold — done (2026-09-28)

- Scaffolded Next.js app (App Router, TypeScript strict mode, ESLint, no Tailwind, `src/` directory)
- Added Vitest with `@vitejs/plugin-react` and `jsdom` for future todo logic and component tests
- Verified `npm run dev`, `npm run lint`, `npm test`, and `npm run build` all pass
- Disabled Next.js 16's automatic `AGENTS.md` agent-rules injection (`agentRules: false` in `next.config.ts`) so the project's own `AGENTS.md` stays authoritative
- Created `PROGRESS.md` and `PROMPT_LOG.md`
- First commit made

No todo logic, UI, or deployment work was done in this phase.
