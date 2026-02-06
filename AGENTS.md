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

## Requirements

You must ensure all tests pass with `npm run test` and you should strive for high levels of test coverage across the site.

## Structure

- Pages live in `src/pages`
- Static assets in `public`
- CI helper scripts live in `script/` (`build`, `lint`, `test`, `server`)
- Tests live in `test/` and run with Vitest.

## Conventions

- Keep dependencies minimal.
- Prefer plain Astro + TS; add libraries only when clearly needed.
- Favor small, readable components.

## Completion Checklist
- Run `npm run lint`, `npm run test`, and `npm run build` before finishing edits.

## Notes

If you happen to see that http://localhost:4321/ is already running on the machine while doing work, you can generally assume that means I'm running the web server locally in another terminal window so I can view the website refresh live as codex works on it.