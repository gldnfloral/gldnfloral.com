# Project Notes for Agents

## Stack
- Astro + TypeScript
- Static output (`astro.config.mjs`)

## Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run test`

## Structure
- Pages live in `src/pages`
- Static assets in `public`
- CI helper scripts live in `script/` (`build`, `lint`, `test`, `server`)

## Conventions
- Keep dependencies minimal.
- Prefer plain Astro + TS; add libraries only when clearly needed.
- Favor small, readable components.

## Completion Checklist
- Run `npm run lint`, `npm run test`, and `npm run build` before finishing edits.
