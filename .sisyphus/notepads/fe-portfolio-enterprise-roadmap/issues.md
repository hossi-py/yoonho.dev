# Issues
Wave0 Audit Issues:
- next-demo has no manifest files detected; verify if this repo is intentionally empty or if manifests exist in a subpath not scanned.
- Recommendation: confirm plan for next-demo; if intended, provide manifest paths or re-scan deeper directories.

Task1 Asset Audit Issues (2026-03-25):
- `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-demo/package.json` not found, and `next-demo/` has 0 entries, so viability cannot be proven with local evidence.
- next-app와 vue2-demo 모두 package scripts에 `test` 항목이 확인되지 않아 테스트 준비도는 부분 감점이 필요했다.

Task 3 Verification Baseline Issues (2026-03-25):
- `lighthouse:ci`는 실행 자체는 정상이나, 기본 앱 기준 성능/인사이트 assertion에서 실패(Exit 1)한다. 현재는 의도된 baseline gate failure로 evidence에 고정 기록했다.
- 로컬 LSP 진단은 `typescript-language-server` 미설치로 수행 불가했다. 대신 `tsc --noEmit`/`next build`/테스트 실행으로 타입·실행 검증을 대체했다.
- 외부 검증에서 `pnpm lint`가 `test-results` 디렉터리 ENOENT로 Exit 2가 발생할 수 있는 케이스가 확인되었다. lint 입력 경로를 명시하고 unmatched pattern 허용으로 재발 방지 조치 완료.

Task 5 Layout & Navigation Issues (2026-03-25):
- Encountered `react/no-unescaped-entities` from ESLint in `GlobalCTA.tsx` and `contact/page.tsx`. Fixed by utilizing `&apos;`.
- Playwright E2E and Vitest unit tests broke initially due to removal of the default `next-app` boilerplate. Updated assertions to look for `data-testid` instead of specific hardcoded React elements or external link text.

Task 6 Quality Report Aggregation Issues (2026-03-25):
- pnpm report:quality 실행 중 test:e2e와 lighthouse:ci가 포트 3000 충돌(EADDRINUSE)로 실패하는 현상이 발생했다. 이는 이전 프로세스가 완전히 종료되지 않았거나, 병렬적인 서버 점유 시도가 있을 때 발생하며, taskkill로 해당 포트를 정리한 후 정상 실행됨을 확인했다.

## Task 4: GitHub Profile Curation (2026-03-25)
- `gh api graphql` does not seem to have a standard `updatePinnedItems` mutation in this environment, making profile pinning difficult via CLI without more specific discovery. Pinned selections are recorded in the evidence artifact.
- `hossi-portfolio` local repository has a remote pointing to a non-existent or inaccessible repository name on GitHub (`hossi-py/hossi-portfolio.git`). This project was excluded from the GitHub pinning plan but retained for local normalization.
- Verified current profile state still shows `pinnedItems.nodes = []`, so Task 4 must treat actual pinning as blocked rather than silently complete.

## Task 7: Case Study 01 (2026-03-25)
- Playwright screenshot output resolved relative to the workspace root rather than `next-app/`, so evidence verification should check `.sisyphus/evidence/task-7-case-1.png` from the repo root.
