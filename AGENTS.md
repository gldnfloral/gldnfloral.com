# AGENTS.md — Project Notes for Agents

This repository is the source for **gldnfloral.com**: a small, static **Astro + TypeScript** website intended to be a clean foundation for a personal floral business site. The goal is a site that is **fast, accessible, easy to maintain**, and **simple to extend** without accumulating unnecessary complexity.

> IMPORTANT: If `http://localhost:4321/` is already running, assume the human maintainer is running a dev server in another terminal to view live updates. Don’t kill that process.

---

## High-level goals (priorities)

1. **Keep the site static.** Prefer build-time rendering (SSG) and static assets.
2. **Keep dependencies minimal.** Add libraries only when there’s a clear need and a tangible payoff.
3. **Prefer plain Astro + TypeScript.** Reach for platform primitives and small utilities before frameworks.
4. **Ship with confidence.** Maintain strong test coverage, and ensure lint/test/build are green before finishing.
5. **Make it feel premium.** Strong typography, consistent spacing, great images, and thoughtful accessibility.

---

## Stack & constraints

- **Astro + TypeScript**
- **Static output** (configured in `astro.config.mjs`)
- **Tests**: Vitest (tests live in `test/`)
- **CI helper scripts**: `script/` (build/lint/test/server helpers)

---

## Dev environment

### Node version
- Node is pinned via `.node-version`. Use that version (or a compatible major) locally and in CI.
- If you use `nvm`, `fnm`, `asdf`, etc., configure it to read `.node-version`.

### Package manager
- Use **npm** (repo includes `package-lock.json`).
- Preferred install commands:
  - **CI / clean installs:** `npm ci`
  - **Local development:** `npm install`

---

## Common commands (run from repo root)

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build locally: `npm run preview`
- Lint: `npm run lint`
- Test: `npm run test`

### Handy patterns
- Run a specific test file:
  - `npm run test -- test/some-file.test.ts`
- Run tests in watch mode (if configured by Vitest in this repo):
  - `npm run test -- --watch`
- Run a specific test name:
  - `npm run test -- -t "renders hero"`

> If you’re unsure what flags are supported, check `vitest.config.ts` and `package.json` scripts.

---

## Repository structure (mental map)

- `src/pages/` — file-based routes (Astro pages)
- `public/` — static assets copied as-is (images, fonts, robots.txt, etc.)
- `script/` — CI helper scripts (build/lint/test/server)
- `test/` — Vitest tests
- `.github/` — GitHub Actions workflows (build/test/lint/deploy/validation)

Common (expected) Astro patterns you may see under `src/`:
- `src/components/` — UI components (`.astro` and/or `.tsx`)
- `src/layouts/` — page layouts
- `src/styles/` — global styles/tokens
- `src/content/` — content collections (if used)

If a directory doesn’t exist yet, create it only if it improves clarity and reduces repetition.

---

## How to work in this repo (agent workflow)

### 1) Start with intent + constraints
Before editing:
- Identify what page/feature you’re touching (route, component, style).
- Confirm the change can be done statically (no server-only assumptions).
- Keep scope tight: one feature or one fix at a time.

### 2) Make changes in small, reviewable steps
- Prefer small PR-sized diffs.
- Avoid sweeping refactors unless required to fix a bug or remove duplication introduced by the change.

### 3) Add tests as you go
- If you change behavior, add/adjust tests in `test/`.
- Tests should cover:
  - The “happy path”
  - 1–2 important edge cases
  - Regressions (if you’re fixing a bug)

### 4) Finish with the “green triangle”
Before finishing:
- `npm run lint`
- `npm run test`
- `npm run build`
- Optionally: `npm run preview` and do a quick manual smoke test (home page + key routes).

---

## Astro conventions & guidance

### Rendering strategy
- Prefer **server-side rendering at build time** (Astro default for SSG).
- Avoid client-side JS unless it’s truly needed (e.g., a small interactive gallery).

### Client islands (only when necessary)
If adding interactivity:
- Use Astro’s `client:*` directives sparingly:
  - `client:load` only when needed immediately.
  - Prefer `client:visible` for below-the-fold components.
  - Prefer `client:idle` for non-critical interactivity.
- Keep islands small and isolated; do not “turn the whole page into React”.

### Component design
- Favor simple, readable `.astro` components.
- Keep props typed and explicit.
- Avoid `any`. If you must use it temporarily, leave a clear TODO with rationale.

---

## Styling conventions

Goals: consistent spacing, typography, and a clean “floral brand” feel.

- Prefer:
  - CSS variables for tokens (colors, spacing, typography)
  - Small, reusable utility classes *only if already present*
  - Component-scoped styles for component-specific rules
- Avoid:
  - Adding a heavy CSS framework unless there’s a clear reason
  - One-off magic numbers; use tokens or established spacing scale when possible

### Suggested design tokens (if not already present)
If you’re building out a design system, keep it lightweight:
- Colors: background/surface/text/accent + 1–2 neutrals
- Typography: base font + display font (optional) + consistent line-height
- Spacing: small scale (e.g., 4/8/12/16/24/32/48)

---

## Images & media (critical for a floral site)

### Principles
- Images are often the biggest performance risk. Optimize aggressively.
- Always include meaningful `alt` text.
- Prefer responsive images over “one giant JPEG”.

### Practical guidance
- Put truly static files (favicons, OG images, brochure PDFs) in `public/`.
- For photo content:
  - Prefer modern formats when possible (WebP/AVIF)
  - Size images to the maximum they’ll actually display
  - Avoid committing extremely large originals unless they’re required as source assets

If the repo is configured to use Astro’s image tooling, prefer that for responsive images and correct width/height output.

---

## Accessibility (do not skip)

Minimum requirements:
- Semantic HTML (headings in order, correct landmarks)
- Focus states visible and not removed
- Color contrast meets WCAG AA where feasible
- Form fields have labels
- Images have alt text (or empty alt when purely decorative)

Quick checks:
- Keyboard tab through the page
- Screen-reader-friendly nav structure (header/nav/main/footer)
- Buttons are buttons, links are links

---

## SEO & sharing

For any new page or major update:
- Unique, descriptive `<title>` and meta description
- Open Graph / Twitter cards for key pages (especially home/portfolio)
- Canonical URLs if relevant
- Use clean, descriptive slugs (e.g., `/weddings`, `/portfolio`, `/contact`)

If you add structured data (JSON-LD), keep it accurate and minimal:
- Organization / LocalBusiness (if appropriate)
- Website
- Breadcrumbs (optional)

---

## “Static site” implications (important)

Because this site builds to static output:
- Don’t add server-only routes or runtime-only APIs.
- For contact forms:
  - Use a third-party static form provider (e.g., Formspree/Netlify forms/etc.) or a lightweight hosted endpoint.
  - Keep validation progressive (HTML validation first; minimal JS if needed).

---

## Testing strategy (Vitest)

Tests live in `test/` and run with Vitest.

Guidelines:
- Prefer testing pure logic/utilities directly (fast, stable).
- For UI rendering tests:
  - Assert on meaningful output (headings, links, accessible names)
  - Avoid brittle snapshots unless the component is highly stable and snapshot noise is low
- Mock network/time only when necessary.
- If you add a bug fix, add a regression test that fails without the fix.

Coverage expectations:
- Aim for high coverage on shared utilities and business logic.
- Don’t chase coverage by testing trivial getters; focus on behavior.

---

## Dependencies: rules of the road

Before adding a dependency:
- Check if Astro/TypeScript or a small local utility can solve it.
- Prefer tiny, well-maintained libraries.
- Avoid adding multiple overlapping libraries (e.g., two date libs, two validation libs).

If you do add one:
- Explain why in the PR description / commit message
- Include usage in tests where applicable
- Ensure tree-shaking / bundle impact is reasonable

---

## Safe changes vs. risky changes

### Safe (preferred)
- New pages in `src/pages/`
- Small components in `src/components/`
- Styling additions using existing token system
- Test additions and improvements

### Risky (be cautious)
- Changing build output settings or Astro config behavior
- Introducing a new framework or large dependency
- Broad refactors across many pages/components
- Changing CI scripts in `script/` or workflows in `.github/`

If you must do something risky, make the change minimal and well-justified, and ensure the full check suite passes.

---

## Completion checklist (required)

Before you conclude work:
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] If UI changed: quick manual check in dev or preview (home + key routes)
- [ ] No unnecessary dependencies added
- [ ] Tests updated/added for behavior changes
- [ ] Any new assets are optimized and correctly placed (`public/` vs processed assets)

---

## Local dev server note

If you detect `http://localhost:4321/` is already serving content:
- Assume it’s the maintainer’s dev server.
- Don’t stop it.
- If you need your own, use a different port (Astro supports `--port <n>`).

Example:
- `npm run dev -- --port 4333`

