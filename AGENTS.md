# AGENTS.md

## Project overview

- Simple todo list web app (HNG 15 AI track, Stage 1)
- Single Next.js app (App Router, TypeScript). No backend.
- Features: add, edit, complete, delete todos; data persists in the browser via localStorage
- Keep it small. No auth, no database, no extra features unless asked.

## Setup commands

- Install deps: `npm install`
- Start dev server: `npm run dev` (port 3000)
- Lint: `npm run lint`
- Run tests: `npm test`
- Production build: `npm run build`

## Code style

- TypeScript strict mode, functional components only
- Single quotes, semicolons, 2-space indentation
- Keep todo logic in small pure functions (for example `lib/todos.ts`), separate from UI components
- Wrap all localStorage access in try/catch and guard for server rendering (`typeof window`)
- Small functions, descriptive names
- Comment the why, not the what

## Working rules

- Plan first: state a short plan before writing code
- One feature per change; do not touch unrelated files
- Allowed dependencies: Next.js, React, Vitest and its testing helpers. Ask before adding anything else.
- Never hardcode secrets or commit `.env` files

## Testing instructions

- Use Vitest for unit tests on the todo logic (add, edit, toggle, delete, load and save)
- Run `npm run lint` and `npm test` after every change and fix failures before finishing
- Add or update tests for any logic you change

## Git and commit guidelines

- Commit after each working feature
- Message format: `type: short summary` (types: feat, fix, docs, chore)
- Never commit `.env`, `node_modules`, or `.next`
- Do not push to GitHub unless explicitly told to

## Deployment (Vercel)

- The user logs in to Vercel manually. The agent never logs in and never handles credentials.
- When asked to deploy, follow this order:
  1. Run `vercel whoami`. If it fails, stop and tell the user to run `vercel login`.
  2. Run `npm run lint`, `npm test`, and `npm run build`. If any fail, stop and report.
  3. Confirm changes are committed.
  4. Run `vercel --prod` (run `vercel link` first if the project is not linked).
  5. Report the live URL.
- Do not change project settings, domains, or environment variables without asking.
- If any deploy step fails, stop and report the error. Do not retry with workarounds.

## Definition of done

- All four todo actions work in the browser, and todos survive a page refresh
- No console errors; lint, tests, and build pass
- Code pushed to the private GitHub repo
- Live Vercel URL working
