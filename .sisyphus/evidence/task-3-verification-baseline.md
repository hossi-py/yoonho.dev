# Task 3 — Verification Command Baseline (`next-app`)

Date: 2026-03-25 (Asia/Seoul)

## Scope
- Base repo only: `next-app`
- Goal: implement 7 runnable verification commands and execute them with real outputs

## Implemented Commands (`next-app/package.json`)
- `lint`: `eslint --no-error-on-unmatched-pattern src tests scripts *.config.*`
- `typecheck`: `tsc --noEmit`
- `test`: `vitest run`
- `test:e2e`: `playwright test`
- `check:links`: `node ./scripts/check-links.mjs`
- `check:content`: `node ./scripts/check-content.mjs`
- `lighthouse:ci`: `pnpm build && lhci autorun --config=./lighthouserc.json`

## Added Minimal Supporting Files
- `next-app/vitest.config.mts`
- `next-app/playwright.config.ts`
- `next-app/lighthouserc.json`
- `next-app/tests/unit/home-page.test.tsx`
- `next-app/tests/e2e/home.spec.ts`
- `next-app/scripts/check-links.mjs`
- `next-app/scripts/check-content.mjs`

## Dependency Install
Executed in `next-app`:

```bash
pnpm install
pnpm exec playwright install chromium
```

Installed dev deps for this task: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/dom`, `@playwright/test`, `@lhci/cli`.

## Real Command Execution Results

### 1) `pnpm lint`
Exit: `0` (pass with warnings)

Observed warnings:
- `tests/unit/home-page.test.tsx` line 12: `@next/next/no-img-element`
- `tests/unit/home-page.test.tsx` line 12: `jsx-a11y/alt-text`

### 2) `pnpm typecheck`
Exit: `0` (pass)

### 3) `pnpm test`
Exit: `0` (pass)

Observed:
- `1 passed` (`tests/unit/home-page.test.tsx`)
- Non-failing runtime warning from mocked `next/image` about non-boolean `priority` attribute

### 4) `pnpm test:e2e`
Exit: `0` (pass)

Observed:
- `1 passed` (`tests/e2e/home.spec.ts`)
- Critical path checked: home render + "Documentation" link visibility/href

### 5) `pnpm check:links`
Exit: `0` (pass)

Observed:
- `13 links checked`
- External links in current README/page content returned HTTP `200`

### 6) `pnpm check:content`
Exit: `0` (pass)

Observed:
- `5 tracked files scanned`
- No denylist-sensitive content detected by current baseline rules

### 7) `pnpm lighthouse:ci`
Exit: `1` (real, reproducible gate failure)

Executed command:
```bash
pnpm lighthouse:ci
```

Result details:
- Build step succeeded (`next build` completed)
- LHCI ran successfully against `http://localhost:3000/`
- Assertion gate failed with measurable issues, including:
  - `legacy-javascript-insight` minScore failure (`found 0.5`, expected `>=0.9`)
  - `network-dependency-tree-insight` minScore failure (`found 0`, expected `>=0.9`)
  - `unused-javascript` maxLength failure (`found 2`, expected `<=0`)
- Report URL (from run output):
  - `https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1774402122062-24422.report.html`

Interpretation: `lighthouse:ci` is implemented and runnable; it currently acts as a real quality gate that fails on present performance/assertion baseline.

## Notes on Verification Tooling
- Attempted LSP diagnostics for modified TypeScript files, but local TS language server is not installed in this environment (`typescript-language-server` missing).
- Compensating checks were executed via `tsc --noEmit`, `next build`, unit test, and e2e test runs.

## Verification Correction (Lint ENOENT Fix)

Observed in external verification run:
- `pnpm lint` exited with code `2`
- Error: `ENOENT: no such file or directory, scandir '.../next-app/test-results'`

Applied minimal fix:
- Updated lint script to target existing paths and tolerate unmatched patterns:
  - `eslint --no-error-on-unmatched-pattern src tests scripts *.config.*`

Rerun results after fix (2026-03-25):
- `pnpm lint` → Exit `0` (runnable, warnings only)
- `pnpm typecheck` → Exit `0`
- `pnpm test` → Exit `0`
- `pnpm test:e2e` → Exit `0`
- `pnpm check:links` → Exit `0`
- `pnpm check:content` → Exit `0`
- `pnpm lighthouse:ci` → Exit `1` (reproducible LHCI assertion gate failure; report: `https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1774402434916-68660.report.html`)
