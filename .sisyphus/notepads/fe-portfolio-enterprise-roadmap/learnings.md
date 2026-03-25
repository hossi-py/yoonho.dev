# Learnings
Wave0 Audit Summary (2026-03-25):
- next-demo: manifest data not found; path: C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-demo (empty). Evidence: directory listing showed only . and ..; no package.json, lockfile, or README present.
- next-app: package.json at C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app\package.json; pnpm-lock.yaml at C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app\pnpm-lock.yaml; source entry: C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app\src\app\page.tsx; Next config: C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app\next.config.ts; README exists.
- vue2-demo: package.json at C:\Users\hyh_k\Desktop\workspace\yoonho.dev\vue2-demo\package.json; yarn.lock at C:\Users\hyh_k\Desktop\workspace\yoonho.dev\vue2-demo\yarn.lock; src/main.ts at C:\Users\hyh_k\Desktop\workspace\yoonho.dev\vue2-demo\src\main.ts; Vue CLI config: C:\Users\hyh_k\Desktop\workspace\yoonho.dev\vue2-demo\vue.config.js; README.md: C:\Users\hyh_k\Desktop\workspace\yoonho.dev\vue2-demo\README.md

Task1 Asset Audit Learnings (2026-03-25):
- next-app는 App Router(`src/app/layout.tsx`, `src/app/page.tsx`) + strict TS(`tsconfig.json`) + ESLint(`eslint.config.mjs`) 조합으로 엔터프라이즈형 초기 베이스로 바로 사용 가능한 최소 요건을 충족한다.
- vue2-demo는 실행/구조 증거는 충분하지만 `vue@2.6.14` 기반이라 2026 메인 베이스보다는 레거시 관리 역량 증빙용 포지션이 더 적합하다.
- next-demo는 디렉터리 자체가 비어 있어 점수카드 핵심 항목(실행/품질/구조) 산정에 필요한 로컬 증거가 없다.

Task 2 Case Schema Learnings (2026-03-25):
- Enterprise hiring managers prioritize readability and evidence; standardized schemas like the 8-section model ensure consistent high-quality case studies.
- Explicit metric labels (verified, anonymized, estimate, reconstruction) build trust by being transparent about data sources and accuracy.

Task 3 Verification Baseline Learnings (2026-03-25):
- `next-app`에서 baseline 품질 게이트 7종(`lint`, `typecheck`, `test`, `test:e2e`, `check:links`, `check:content`, `lighthouse:ci`)을 모두 실제 실행 가능한 커맨드로 고정했다.
- 링크 검증은 `src`/`README.md`의 실제 HTTP(S) 링크를 직접 요청해 상태코드로 판단하는 방식이, 초기 포트폴리오 콘텐츠 단계에서 가장 단순하면서도 실효성이 높다.
- 콘텐츠 denylist 검사는 git 인덱스 의존보다 디렉터리 스캔(`src`, `tests`, `scripts`, `README.md`)이 현재 워크스페이스 상태에서 더 안정적으로 재현된다.
- ESLint baseline은 루트 전체 자동 스캔보다 실제 존재 경로를 명시(`src tests scripts *.config.*`)하고 `--no-error-on-unmatched-pattern`를 함께 쓰는 편이 CI/로컬 편차(누락 디렉터리 scandir) 방지에 유리하다.

Task 5 Layout & Navigation Learnings (2026-03-25):
- Next.js App Router (`layout.tsx`) is highly effective for injecting static shared UI like Navbar, Footer, and GlobalCTA without requiring `use client` in the root layout.
- We opted for a horizontally scrollable nav (`overflow-x-auto no-scrollbar`) on mobile devices. This provides an immediate, scannable menu at 375px without hiding links behind a hamburger menu, keeping the implementation lightweight and avoiding unnecessary React state.
- Unescaped single quotes in page shells trigger `react/no-unescaped-entities` errors in ESLint. It is essential to use `&apos;` instead.

Task 6 Quality Report Aggregation Learnings (2026-03-25):
- next-app의 품질 게이트 결과를 .sisyphus/evidence/task-6-quality-report.md로 자동 집계하는 스크립트를 node:child_process 기반으로 구현하여, 단일 명령(pnpm report:quality)으로 품질 가시성을 확보했다.
- 각 게이트의 실행 시간(Duration)과 상세 로그(최근 2000자)를 포함함으로써, 실패 시 원인 파악을 위해 개별 명령을 다시 실행할 필요를 줄였다.

## Task 4: GitHub Profile Curation (2026-03-25)
- GitHub profile curation is critical for an enterprise narrative; projects should be categorized by Role, Tech, and Problem to be recruiter-scan-friendly.
- A root README in a multi-project workspace (monorepo pattern) provides necessary high-level context that subdirectory READMEs lack, especially for visitors entering through the main hub.
- Repository curation is more reliable when driven from verified `gh repo list` / `gh api repos/...` output than from local sibling folders alone.

## Task 7: Case Study 01 (2026-03-25)
- The 8-section schema maps cleanly onto a single long-form App Router page when metrics are surfaced first and the narrative sections follow below.
- Using `data-testid` on the title, metrics, and evidence block keeps E2E assertions stable even if explanatory copy changes later.
