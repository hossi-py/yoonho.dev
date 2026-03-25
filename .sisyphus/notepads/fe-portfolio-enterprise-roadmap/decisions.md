# Decisions
Wave0 Audit Decisions:
- Decision: Treat next-demo as non-viable baseline for Wave 0 due to missing manifests; use next-app as primary reference base with vue2-demo as supporting evidence where relevant.
- Rationale: manifest-level and runtime-entry evidence are complete for next-app and vue2-demo; next-demo lacks manifest data, making formal comparison impossible without further data.
- Next steps: formalize a 3-way comparison table (Next-demo, Next-app, Vue2-demo) and decide winner; report back with a weighted scorecard and fallback rules.

Task1 Asset Audit Decision (2026-03-25):
- Applied rule exactly: if next-demo total >= 75 choose next-demo, else choose next-app and treat next-demo as reference only.
- Result: next-demo total 2 (<75), therefore base repo is next-app.
- Fixed fallback text for later tasks: "next-demo가 실행 가능(매니페스트/런타임 근거) 기준을 충족하지 못하거나 총점이 75 미만이면, next-app을 기본 베이스로 사용하고 next-demo는 참조 전용으로만 사용한다."

Task 2 Case Schema Decision (2026-03-25):
- Adopted an 8-section content schema (Context, Constraints, My Role, Decision, Execution, Outcome, Evidence, Limitation) to ensure all case studies are comprehensive and structured for quick scanning.
- Fixed 4 metric labels (verified, anonymized, estimate, reconstruction) to provide clear context for quantitative claims.
- Established a mandatory anonymization policy with a publish-safety denylist and replacement rules to protect client confidentiality.

Task 3 Verification Baseline Decision (2026-03-25):
- Baseline 테스트 스택은 최소 구성으로 결정: Unit/Smoke는 `vitest`, E2E는 `playwright`, 링크/콘텐츠 게이트는 Node 스크립트(`scripts/check-links.mjs`, `scripts/check-content.mjs`), 품질 지표는 `lhci autorun`.
- `check:links`는 localhost 개발 URL을 외부 링크 체크 대상에서 제외하고, 실제 공개 링크를 HTTP 상태코드로 검증하는 정책으로 고정했다.
- `lighthouse:ci`는 현재 점수 기준에서 실패를 허용하지 않고 그대로 gate로 유지한다(실패도 재현 가능한 근거로 기록하여 이후 개선 작업의 기준선으로 사용).
- `lint`는 재현성 강화를 위해 루트 자동 탐색 대신 명시 경로 기반 실행(`src`, `tests`, `scripts`, `*.config.*`)으로 고정하고, `--no-error-on-unmatched-pattern`를 포함해 누락 경로 이슈를 방어한다.

Task 5 Layout & Navigation Decisions (2026-03-25):
- **Navigation Layout:** Implemented a horizontal scrolling navigation for mobile (`overflow-x-auto`) rather than a hamburger menu. This reduces JS complexity (keeps `Navbar` as a simple `use client` strictly for `usePathname`, without needing toggle state) and improves discoverability.
- **Global CTA Strategy:** Abstracted the global CTA to a `GlobalCTA.tsx` component and placed it in the `layout.tsx` before the Footer, ensuring it appears consistently across all routes automatically.
- **Test Attributes:** Standardized navigation and hero elements with `data-testid` properties. This decouples our E2E and unit tests from copy changes, making them more resilient.
Task 6 Quality Report Aggregation Decisions (2026-03-25):
- 집계 리포트에는 commit hash와 timestamp를 명시하여, 특정 시점의 코드 품질 스냅샷임을 보증하도록 결정했다.
- lighthouse:ci의 의도된 실패(Exit 1)를 리포트에서도 정직하게 FAIL로 기록하여, 베이스라인의 투명성을 유지하기로 했다.

## Task 4: GitHub Profile Curation (2026-03-25)
- Corrected the recommended pin set to favor verified non-fork public repositories: `yoonho.dev`, `portfolio-server`, `mobile-wedding-invite`, `wedding`, `TIL`, `mindwiki`.
- Excluded `hossi-portfolio` from public GitHub recommendations because `gh api repos/hossi-py/hossi-portfolio` returned 404.
- Excluded fork-heavy options (`MARS`, `LoLIN`, `Persona-front`) from the main recommendation once stronger non-fork candidates were verified.

## Task 7: Case Study 01 (2026-03-25)
- Published the first case study at `/case-studies/1` with two labeled metrics (`estimate`, `anonymized`) and an explicit evidence posture block.
- Extended the existing Playwright critical-path test so it verifies the case detail page instead of stopping at the index page only.
