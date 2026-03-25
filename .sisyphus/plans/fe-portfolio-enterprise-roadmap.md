# FE Portfolio for Enterprise Hiring (8+ Week Roadmap)

## TL;DR
> **Summary**: 대기업 이직 목적의 FE 포트폴리오를 웹사이트+GitHub로 구축하며, 실무 중심 3개 케이스 스터디와 AI/운영 사고 실험실 화면으로 차별화한다.
> **Deliverables**:
> - 배포 가능한 포트폴리오 웹사이트 1개
> - 익명화+정량 중심 케이스 스터디 3개
> - GitHub 프로필/핀드 저장소 정리
> - 검증 증빙(.sisyphus/evidence) 세트
> **Effort**: Large
> **Parallel**: YES - 4 waves
> **Critical Path**: 1 (자산감사) → 2 (콘텐츠 계약) → 5 (사이트 IA/쉘) → 7/8/9 (케이스 페이지) → 10 (랩 페이지) → 최종 검증

## Context
### Original Request
- "FE 4년차 개발자로서 포트폴리오 만들려고 해. 추천좀 해줘봐"

### Interview Summary
- 목표: 국내 이직
- 타깃: 대기업 1순위
- 형태: 웹사이트 + GitHub
- 차별화: AI 활용 개발 방식 + 운영적 사고 실험실 화면
- 사례 전략: 실무 사례 중심, 익명화+정량 중심
- 메인 케이스: 3개
- 일정: 8주+
- 검증: 테스트-사후 + E2E 핵심 경로

### Metis Review (gaps addressed)
- 실행 전 **Wave 0 자산/증거 감사** 필수
- 사실/추정/재구성 라벨링 정책 필요
- next-demo 우선 후보, 실패 시 next-app 폴백 규칙 필요
- vue2-demo는 보조 서사로 제한 (주력 자산 아님)
- 실패 경로(QA)와 링크/접근성/성능 게이트를 명시해야 함

## Work Objectives
### Core Objective
- 대기업 평가 관점(신뢰성, 재현성, 품질 기준)에 맞춘 포트폴리오를 8주+ 내 실행 가능 상태로 완성한다.

### Deliverables
- 포트폴리오 사이트 정보구조: Home / Case Studies / Lab / About / Contact
- 케이스 스터디 3개(익명화된 실무 사례)
- AI+운영 사고 Lab 페이지 1개
- GitHub 공개면 정리(핀드 repo/README/깨진 링크)
- 자동 검증 결과 및 증빙 파일

### Definition of Done (verifiable conditions with commands)
- `npm run lint` 통과
- `npm run typecheck` 통과
- `npm run test` 통과(설정된 테스트 스위트)
- `npm run test:e2e` 에서 핵심 경로 3개 통과(Home→Case, Home→Lab, Contact)
- `npm run check:links` 통과(404/깨진 외부 링크 없음)
- `npm run check:content` 통과(금칙어/비공개 키워드 누출 없음)
- `npm run lighthouse:ci` 에서 Perf/Best/SEO/A11y 기준 충족

### Must Have
- 실무 사례 3개 각각: 문제/제약/기여/결과/근거/한계 섹션
- 각 정량 지표는 출처 상태 라벨(verified/anonymized/estimate/reconstruction) 명시
- 모바일(375px)과 데스크톱(1440px) 모두 스캔 가능한 레이아웃
- 모든 핵심 CTA 및 외부 링크 정상 동작

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- 튜토리얼형 데모(todo/weather/calculator) 전면 배치 금지
- 스킬 퍼센트 바/근거 없는 수치 표기 금지
- 내부 실명/고객사명/식별자 노출 금지
- Lab 페이지에서 "AI를 썼다" 수준의 추상 설명 금지 (의사결정/검증/롤백 루프 필수)
- CMS/블로그 엔진/디자인 시스템 대규모 확장 금지(이번 범위 밖)

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Test decision: tests-after + E2E critical path (Playwright 기준)
- QA policy: Every task has agent-executed happy + failure scenarios
- Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

## Execution Strategy
### Parallel Execution Waves
> Target: 5-8 tasks per wave. <3 per wave (except final) = under-splitting.
> Extract shared dependencies as Wave-1 tasks for max parallelism.

Wave 1: 자산/증거 감사 + 콘텐츠/검증 계약 확정
Wave 2: 사이트 기본 구조 + 검증 파이프라인 + GitHub 정리
Wave 3: 케이스 스터디 3개 병렬 작성/구현
Wave 4: Lab 페이지 + 통합 교정/회귀

### Dependency Matrix (full, all tasks)
| Task | Depends On | Blocks |
|---|---|---|
| 1 | - | 2,3,4,5 |
| 2 | 1 | 5,7,8,9,10 |
| 3 | 1 | 4,11 |
| 4 | 1,3 | 7,8,9,10,11 |
| 5 | 2 | 7,8,9,10 |
| 6 | 3 | 11 |
| 7 | 2,4,5 | 11 |
| 8 | 2,4,5 | 11 |
| 9 | 2,4,5 | 11 |
| 10 | 2,4,5 | 11 |
| 11 | 6,7,8,9,10 | F1,F2,F3,F4 |

### Agent Dispatch Summary (wave → task count → categories)
- Wave 1 → 4 tasks → deep, writing, unspecified-high
- Wave 2 → 2 tasks → visual-engineering, quick
- Wave 3 → 4 tasks → writing, visual-engineering
- Wave 4 → 1 task → unspecified-high
- Final verification → 4 tasks → oracle, unspecified-high, deep

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [x] 1. Wave 0 자산 감사 및 베이스 레포 결정

  **What to do**:
  - `next-demo`, `next-app`, `vue2-demo` 3개 디렉터리를 실제 실행/검증 관점으로 감사한다.
  - 아래 점수표로 베이스를 결정한다: 실행 가능성(30), 타입/린트/테스트 준비도(30), 페이지 구조 재사용성(20), 대기업 포트폴리오 적합성(20).
  - 기본 규칙: `next-demo`가 총점 75점 이상이면 베이스로 확정. 75점 미만이면 `next-app`을 베이스로 확정하고 `next-demo`는 레퍼런스로만 사용.
  - 결과를 `.sisyphus/evidence/task-1-asset-audit.md`에 기록(점수표, 근거 파일 경로, 최종 선택, 폴백 사유).

  **Must NOT do**:
  - 베이스 결정 없이 UI 구현부터 시작하지 않는다.
  - `vue2-demo`를 주력 포트폴리오 베이스로 채택하지 않는다.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: 다중 자산의 재사용성/리스크를 근거 기반으로 판단해야 함
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — 이 단계는 디자인이 아니라 감사/의사결정 단계

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 2,3,4,5 | Blocked By: -

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/plans/fe-portfolio-enterprise-roadmap.md` (Context/Work Objectives) — 확정된 목표/제약 확인
  - Pattern: `next-demo/` — 1순위 베이스 후보(실행 가능성 우선 검증)
  - Pattern: `next-app/` — 폴백 베이스 후보
  - Pattern: `vue2-demo/` — 보조 서사 후보(주력 제외)

  **Acceptance Criteria** (agent-executable only):
  - [ ] `.sisyphus/evidence/task-1-asset-audit.md` 생성 및 점수표 포함
  - [ ] 베이스 레포 1개가 명시적으로 확정됨(조건식 포함)
  - [ ] 폴백 규칙(언제 next-app으로 전환하는지)이 문서에 명시됨

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 베이스 레포 확정
    Tool: Bash
    Steps: [1] ls next-demo next-app vue2-demo [2] 각 후보에서 lint/typecheck/test 가능 명령 확인 [3] 점수표 작성
    Expected: 점수 근거와 함께 베이스 1개가 확정되고 evidence 파일에 기록됨
    Evidence: .sisyphus/evidence/task-1-asset-audit.md

  Scenario: Failure/edge case - 후보 모두 기준 미달
    Tool: Bash
    Steps: [1] 3개 후보 중 하나라도 필수 명령 부재 확인 [2] 최소 실행 셸 확보 계획(추가 스크립트) 기록
    Expected: "기준 미달" 상태와 보완 액션이 evidence 파일에 명확히 남음
    Evidence: .sisyphus/evidence/task-1-asset-audit-error.md
  ```

  **Commit**: YES | Message: `chore(audit): score portfolio base candidates and decide foundation` | Files: `.sisyphus/evidence/task-1-asset-audit.md`

- [x] 2. 케이스 스터디 콘텐츠 계약(스키마) 및 익명화 정책 고정

  **What to do**:
  - 케이스 스터디 공통 스키마를 고정한다: `Context, Constraints, My Role, Decision, Execution, Outcome, Evidence, Limitation`.
  - 각 정량 지표는 `verified/anonymized/estimate/reconstruction` 중 하나 라벨을 강제한다.
  - 금칙어 규칙(실명/고객사명/내부 식별자)과 대체 표기 규칙을 문서화한다.
  - 결과 문서를 `.sisyphus/evidence/task-2-case-schema.md`로 저장한다.

  **Must NOT do**:
  - 지표 라벨 없이 숫자를 게시하지 않는다.
  - "성과 향상" 같은 비정량 표현만 남기지 않는다.

  **Recommended Agent Profile**:
  - Category: `writing` — Reason: 고품질 문서 계약 정의가 핵심
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — UI 구현 전 계약 확정 우선

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 5,7,8,9,10 | Blocked By: 1

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/plans/fe-portfolio-enterprise-roadmap.md` (Interview Summary) — 목표/대상/공개정책 소스
  - External: `https://www.w3.org/WAI/standards-guidelines/wcag/` — 접근성 근거 표기 시 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] `.sisyphus/evidence/task-2-case-schema.md` 생성
  - [ ] 스키마 8개 섹션과 지표 라벨 규칙이 명시됨
  - [ ] 금칙어/대체 표기 규칙이 체크리스트 형태로 포함됨

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 스키마 완성
    Tool: Read
    Steps: [1] 문서에서 8개 섹션 키워드 검색 [2] 지표 라벨 4종 정의 확인
    Expected: 모든 섹션/라벨/금칙어 규칙이 누락 없이 존재
    Evidence: .sisyphus/evidence/task-2-case-schema.md

  Scenario: Failure/edge case - 라벨 누락
    Tool: Bash
    Steps: [1] 임시 예시 문장 1개 작성 [2] 라벨 미기재 상태로 검토 체크리스트 적용
    Expected: "게시 불가" 판정 규칙이 문서 기준으로 재현됨
    Evidence: .sisyphus/evidence/task-2-case-schema-error.md
  ```

  **Commit**: YES | Message: `docs(strategy): define enterprise case-study schema and anonymization policy` | Files: `.sisyphus/evidence/task-2-case-schema.md`

- [x] 3. 검증 커맨드 베이스라인(링크/콘텐츠/품질 게이트) 정의

  **What to do**:
  - 선택된 베이스 레포에 다음 커맨드 계약을 추가/정의한다: `lint`, `typecheck`, `test`, `test:e2e`, `check:links`, `check:content`, `lighthouse:ci`.
  - 없는 커맨드는 스크립트/설정 파일을 추가해 최소 실행 가능 상태를 만든다.
  - 실행 결과 요약을 `.sisyphus/evidence/task-3-verification-baseline.md`에 저장한다.

  **Must NOT do**:
  - 실행 불가능한 placeholder 명령을 남기지 않는다.
  - 수동 확인만으로 "통과" 판정하지 않는다.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: 테스트/품질 게이트 구성은 설정+실행 검증이 함께 필요
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — 비주얼 개선보다 자동 검증 기반 확보 우선

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 4,6,7,8,9,10,11 | Blocked By: 1

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-1-asset-audit.md` — 베이스 레포 결정 결과
  - External: `https://playwright.dev/docs/intro` — E2E 설정 기준
  - External: `https://github.com/GoogleChrome/lighthouse-ci` — Lighthouse CI 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] 선택된 베이스 레포에서 7개 커맨드가 모두 실행 가능
  - [ ] `.sisyphus/evidence/task-3-verification-baseline.md`에 실제 실행 로그 요약 포함
  - [ ] 실패 시 재현 단계(명령/오류코드)가 evidence 파일에 기록됨

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 품질 게이트 전부 실행
    Tool: Bash
    Steps: [1] npm run lint [2] npm run typecheck [3] npm run test [4] npm run test:e2e [5] npm run check:links [6] npm run check:content [7] npm run lighthouse:ci
    Expected: 모든 커맨드가 0 exit code로 종료되고 로그 요약이 evidence 파일에 저장됨
    Evidence: .sisyphus/evidence/task-3-verification-baseline.md

  Scenario: Failure/edge case - 링크 또는 콘텐츠 금칙어 실패
    Tool: Bash
    Steps: [1] 의도적으로 깨진 링크/금칙어 텍스트 삽입 [2] check:links/check:content 재실행
    Expected: 비정상 종료 + 실패 이유가 명확히 출력되고 수정 후 재통과
    Evidence: .sisyphus/evidence/task-3-verification-baseline-error.md
  ```

  **Commit**: YES | Message: `test(portfolio): establish executable verification baseline` | Files: `package.json`, `tests/**`, `.sisyphus/evidence/task-3-verification-baseline.md`

- [x] 4. GitHub 공개면(프로필/핀드 저장소) 신뢰성 정리

  **What to do**:
  - 핀드 저장소를 4~6개로 제한하고 포트폴리오 서사와 일치하도록 재배치한다.
  - 각 저장소 README를 통일 템플릿(문제/역할/기술/실행/결과)으로 정리한다.
  - 깨진 배지/데모 링크 제거 및 대체 링크를 설정한다.
  - 정리 결과를 `.sisyphus/evidence/task-4-github-curation.md`로 남긴다.

  **Must NOT do**:
  - 포트폴리오 본문과 상충하는 기술 스택/역할 설명을 남기지 않는다.
  - 업데이트 중단된 데모 URL을 그대로 노출하지 않는다.

  **Recommended Agent Profile**:
  - Category: `writing` — Reason: 채용자 스캔 친화적 텍스트 정리가 핵심
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — GitHub 문서/링크 정합성 작업

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 11 | Blocked By: 1,3

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-2-case-schema.md` — README 구조 기준
  - Pattern: `.sisyphus/plans/fe-portfolio-enterprise-roadmap.md` (Must Have/Must NOT Have) — 대기업 중심 메시지 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] 핀드 저장소 4~6개로 정리 완료
  - [ ] 모든 핀드 저장소 README에 공통 섹션 존재
  - [ ] 깨진 배지/링크 0건

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 핀드/README 정리 완료
    Tool: Bash
    Steps: [1] gh api로 pinned repo 목록 조회 [2] README 섹션 키워드 검사 [3] 링크 검사
    Expected: 기준을 충족하는 목록과 검사 결과가 evidence 문서에 기록됨
    Evidence: .sisyphus/evidence/task-4-github-curation.md

  Scenario: Failure/edge case - 깨진 데모 링크 발견
    Tool: Bash
    Steps: [1] 링크 검사 중 404 발생 [2] 대체 링크 또는 제거 조치 [3] 재검사
    Expected: 오류가 재현되고 재검사에서 0건으로 수렴
    Evidence: .sisyphus/evidence/task-4-github-curation-error.md
  ```

  **Commit**: YES | Message: `docs(github): normalize pinned repos and README credibility` | Files: `README.md (profile/repo)`, `.sisyphus/evidence/task-4-github-curation.md`

- [ ] 9. 케이스 스터디 #3 구현(운영/협업/리스크 관리 중심)

  **What to do**:
  - Case #3를 운영 관점 사례로 작성한다(장애 대응, 배포 안정성, 협업 프로세스 개선 등).
  - "문제 감지 → 원인 가설 → 조치 → 검증 → 재발 방지" 흐름을 반드시 포함한다.
  - test id 고정: `case-3-title`, `case-3-incident-flow`, `case-3-rollback`, `case-3-evidence`.

  **Must NOT do**:
  - 책임 회피형 서술("팀이 함")만 작성하지 않는다.
  - 재발 방지 항목 없는 회고형 문서로 끝내지 않는다.

  **Recommended Agent Profile**:
  - Category: `writing` — Reason: 운영 서사와 의사결정 기록의 명확성이 중요
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — 내러티브 신뢰성 확보가 우선

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 11 | Blocked By: 2,4,5

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-2-case-schema.md` — 섹션 구조 기준
  - Pattern: `.sisyphus/plans/fe-portfolio-enterprise-roadmap.md` (Interview Summary) — "운영적 사고" 차별화 요구사항

  **Acceptance Criteria** (agent-executable only):
  - [ ] 사고 대응 흐름 5단계가 페이지에 명시됨
  - [ ] 롤백/가드레일 섹션이 존재
  - [ ] 라벨/금칙어/링크 검사 통과

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - Case #3 운영 흐름 확인
    Tool: Playwright
    Steps: [1] /case-studies/3 접속 [2] case-3-incident-flow 블록 확인 [3] case-3-rollback 확인
    Expected: 5단계 흐름과 재발 방지 항목이 모두 보임
    Evidence: .sisyphus/evidence/task-9-case-3.png

  Scenario: Failure/edge case - 롤백 섹션 누락
    Tool: Playwright
    Steps: [1] case-3-rollback selector 존재 여부 검사
    Expected: 누락 시 테스트 실패, 섹션 추가 후 통과
    Evidence: .sisyphus/evidence/task-9-case-3-error.md
  ```

  **Commit**: YES | Message: `feat(case-study-3): add operational-thinking enterprise case` | Files: `app/case-studies/** or pages/case-studies/**`, `.sisyphus/evidence/task-9-case-3.*`

- [ ] 10. AI + 운영 사고 Lab 페이지 구현

  **What to do**:
  - Lab 페이지를 "AI 사용 기록"이 아닌 "의사결정 루프" 중심으로 구현한다.
  - 최소 4개 블록을 포함한다:
    1) 문제 정의 템플릿
    2) 실험 설계/가설
    3) 검증/품질 게이트
    4) 롤백/운영 체크리스트
  - test id 고정: `lab-problem-frame`, `lab-hypothesis`, `lab-validation`, `lab-rollback`.

  **Must NOT do**:
  - 프롬프트 예시 나열만으로 페이지를 구성하지 않는다.
  - 실패 시 대응(롤백/모니터링) 없는 낙관적 흐름만 제시하지 않는다.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: 구조적 정보 전달 UI + 방법론 표현
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/dev-browser]` — 구현 후 QA에서 브라우저 검증 수행

  **Parallelization**: Can Parallel: YES | Wave 4 | Blocks: 11 | Blocked By: 2,4,5

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/plans/fe-portfolio-enterprise-roadmap.md` (Interview Summary) — Lab 화면 요구사항
  - Pattern: `.sisyphus/evidence/task-2-case-schema.md` — 증거/라벨 표현 규칙

  **Acceptance Criteria** (agent-executable only):
  - [ ] 4개 필수 블록이 모두 렌더링됨
  - [ ] 각 블록이 구체적 입력/검증 기준을 포함함(추상 문구만 없음)
  - [ ] Home에서 Lab 이동 CTA 동작

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - Lab 블록 완전성 확인
    Tool: Playwright
    Steps: [1] 홈에서 nav-lab 클릭 [2] 4개 test id 존재 확인 [3] 각 블록의 핵심 텍스트 확인
    Expected: 문제정의/가설/검증/롤백 블록이 모두 표시됨
    Evidence: .sisyphus/evidence/task-10-lab-page.png

  Scenario: Failure/edge case - 추상 문구만 존재
    Tool: Bash
    Steps: [1] "AI로 생산성 향상" 같은 문구만 남긴 버전 검사 [2] 내용 규칙 검사 실행
    Expected: 구체성 부족으로 실패 판정, 보강 후 통과
    Evidence: .sisyphus/evidence/task-10-lab-page-error.md
  ```

  **Commit**: YES | Message: `feat(lab): implement ai-ops decision loop showcase` | Files: `app/lab/** or pages/lab/**`, `.sisyphus/evidence/task-10-lab-page.*`

- [ ] 11. 통합 회귀(콘텐츠 정합성+E2E+성능/접근성) 및 배포 준비

  **What to do**:
  - Task 6~10 산출물을 기준으로 통합 회귀를 실행한다.
  - 정합성 검사 항목: 홈 소개문구 vs 케이스 스택/역할 vs GitHub README 간 상충 여부.
  - E2E 핵심 경로 3개(Home→Case, Home→Lab, Contact 제출/이동) 재검증.
  - Lighthouse CI + 접근성(landmark/keyboard focus) 체크 후 배포 준비 상태를 선언한다.
  - 결과를 `.sisyphus/evidence/task-11-integration-gate.md`로 기록한다.

  **Must NOT do**:
  - 성능/접근성 미달 상태에서 배포 준비 완료로 표기하지 않는다.
  - Final Verification Wave(F1~F4) 전에 완료 처리하지 않는다.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: 다영역 회귀/정합성/품질 게이트를 종합 검증해야 함
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — 새로운 UI 추가가 아니라 최종 품질 검증 단계

  **Parallelization**: Can Parallel: NO | Wave 4 | Blocks: F1,F2,F3,F4 | Blocked By: 6,7,8,9,10

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-6-quality-report.md` — 게이트 집계 포맷
  - Pattern: `.sisyphus/evidence/task-7-case-1.png` — 케이스 #1 증빙
  - Pattern: `.sisyphus/evidence/task-8-case-2.png` — 케이스 #2 증빙
  - Pattern: `.sisyphus/evidence/task-9-case-3.png` — 케이스 #3 증빙
  - Pattern: `.sisyphus/evidence/task-10-lab-page.png` — Lab 증빙

  **Acceptance Criteria** (agent-executable only):
  - [ ] 핵심 E2E 3개 경로 모두 통과
  - [ ] Lighthouse CI 기준 충족(Perf/Best/SEO/A11y)
  - [ ] 정합성 충돌 0건(문구/역할/스택)
  - [ ] `.sisyphus/evidence/task-11-integration-gate.md` 생성

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 최종 게이트 통과
    Tool: Bash
    Steps: [1] npm run test:e2e [2] npm run lighthouse:ci [3] npm run check:content [4] npm run check:links
    Expected: 모든 명령 통과 + 통합 게이트 문서에 결과 집계
    Evidence: .sisyphus/evidence/task-11-integration-gate.md

  Scenario: Failure/edge case - 페이지 간 메시지 불일치
    Tool: Playwright
    Steps: [1] 홈 스택 문구와 Case/GitHub 문구를 비교하는 검증 스크립트 실행
    Expected: 불일치 감지 시 실패, 수정 후 재실행 시 통과
    Evidence: .sisyphus/evidence/task-11-integration-gate-error.md
  ```

  **Commit**: YES | Message: `chore(release): run integration gates and prepare deployment` | Files: `.sisyphus/evidence/task-11-integration-gate.*`, `tests/e2e/**`, `scripts/**`

- [x] 5. 포트폴리오 사이트 IA/네비게이션/공통 레이아웃 구현

  **What to do**:
  - 선택된 베이스 레포에 `Home / Case Studies / Lab / About / Contact` 라우트를 구성한다.
  - 헤더/푸터/글로벌 CTA를 추가하고, 아래 test id를 고정한다:
    - `data-testid="nav-home"`, `nav-cases`, `nav-lab`, `nav-about`, `nav-contact`
    - `data-testid="hero-title"`, `hero-subtitle`, `cta-primary`
  - 375px/1440px 뷰포트에서 스캔 가능한 타이포/간격 체계를 적용한다.

  **Must NOT do**:
  - 페이지별 개별 네비게이션을 구현하지 않는다(공통 레이아웃 강제).
  - 애니메이션/시각효과로 핵심 콘텐츠 가독성을 해치지 않는다.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: 정보구조+가독성 중심 UI 구현
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/dev-browser]` — 구현 단계 우선, 브라우저 자동화는 QA 단계에서 사용

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: 7,8,9,10 | Blocked By: 2

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-2-case-schema.md` — 케이스 페이지 정보 구조의 기준
  - Pattern: `.sisyphus/plans/fe-portfolio-enterprise-roadmap.md` (Interview Summary) — 대기업 타깃 메시지 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] 5개 라우트가 모두 렌더링되고 상호 이동 가능
  - [ ] 지정된 `data-testid`가 DOM에 존재
  - [ ] 모바일/데스크톱에서 네비게이션 오버플로 없이 표시

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 전체 네비게이션 동작
    Tool: Playwright
    Steps: [1] 홈 접속 [2] nav-cases 클릭 [3] nav-lab 클릭 [4] nav-about 클릭 [5] nav-contact 클릭 [6] nav-home 클릭
    Expected: 각 클릭마다 URL/헤더가 일치하고 hero-title이 홈에서 표시됨
    Evidence: .sisyphus/evidence/task-5-layout-nav.png

  Scenario: Failure/edge case - 모바일 메뉴 깨짐
    Tool: Playwright
    Steps: [1] viewport 375x812 설정 [2] 메뉴 열기/닫기 반복 [3] 각 항목 탭 이동
    Expected: 메뉴 항목 잘림/겹침/포커스 손실 없이 동작
    Evidence: .sisyphus/evidence/task-5-layout-nav-error.png
  ```

  **Commit**: YES | Message: `feat(portfolio): implement information architecture and global layout` | Files: `app/** or pages/**`, `components/layout/**`, `.sisyphus/evidence/task-5-layout-nav.*`

- [x] 6. 자동 검증 리포트 집계(품질 게이트 결과 아카이브)

  **What to do**:
  - Task 3의 검증 명령 결과를 단일 리포트(`.sisyphus/evidence/task-6-quality-report.md`)로 집계하는 스크립트를 추가한다.
  - 리포트에 실행 시각, 커밋 해시, 명령별 pass/fail, 실패 로그 경로를 기록한다.
  - CI/로컬 모두 동일 포맷 출력되도록 통일한다.

  **Must NOT do**:
  - 콘솔 출력만 남기고 파일 증빙을 생략하지 않는다.
  - 실패 로그를 덮어써서 원인 추적 불가 상태로 만들지 않는다.

  **Recommended Agent Profile**:
  - Category: `quick` — Reason: 집계 스크립트/포맷 표준화 중심의 한정 작업
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — UI 변경 없이 검증 인프라 정리 작업

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 11 | Blocked By: 3

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-3-verification-baseline.md` — 명령 목록 및 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] 집계 스크립트 1회 실행으로 리포트 파일 생성
  - [ ] 리포트에 최소 7개 명령 결과와 커밋 해시 포함
  - [ ] 실패 케이스에서 로그 파일 경로가 출력됨

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - 전체 리포트 생성
    Tool: Bash
    Steps: [1] 품질 명령 전부 실행 [2] 집계 스크립트 실행 [3] 결과 파일 확인
    Expected: 리포트에 명령별 pass/fail과 실행 시각/커밋 해시가 기록됨
    Evidence: .sisyphus/evidence/task-6-quality-report.md

  Scenario: Failure/edge case - 명령 1개 실패
    Tool: Bash
    Steps: [1] lint 에러를 의도 삽입 [2] 집계 스크립트 실행
    Expected: 리포트에 failed 상태와 로그 위치가 남고 종료 코드가 비정상 처리됨
    Evidence: .sisyphus/evidence/task-6-quality-report-error.md
  ```

  **Commit**: YES | Message: `chore(qa): add aggregated quality report pipeline` | Files: `scripts/**`, `.sisyphus/evidence/task-6-quality-report.*`

- [x] 7. 케이스 스터디 #1 구현(성과 지표 중심)

  **What to do**:
  - Task 2 스키마를 그대로 적용해 Case #1 페이지를 구현한다.
  - 최소 2개 정량 지표를 넣고 각각 라벨(`verified/anonymized/estimate/reconstruction`)을 표시한다.
  - 아래 test id를 고정한다:
    - `data-testid="case-1-title"`, `case-1-metric-1`, `case-1-metric-2`, `case-1-evidence`

  **Must NOT do**:
  - 지표 출처 라벨 없는 숫자를 노출하지 않는다.
  - 내부 실명/고객명/프로젝트 코드명을 노출하지 않는다.

  **Recommended Agent Profile**:
  - Category: `writing` — Reason: 사례 내러티브+근거 구조가 핵심
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — 이 단계는 콘텐츠 정확성 우선

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 11 | Blocked By: 2,4,5

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-2-case-schema.md` — 필수 섹션 계약
  - Pattern: `.sisyphus/evidence/task-4-github-curation.md` — 공개 문구 톤/정합성 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] Case #1 페이지에 8개 섹션 모두 존재
  - [ ] 정량 지표 2개 이상 + 라벨 표시
  - [ ] 금칙어 검사(`npm run check:content`) 통과

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - Case #1 읽기/검증
    Tool: Playwright
    Steps: [1] /case-studies/1 접속 [2] case-1-title 확인 [3] metric 2개 및 라벨 텍스트 확인
    Expected: 섹션 누락 없이 렌더링되고 evidence 블록이 보임
    Evidence: .sisyphus/evidence/task-7-case-1.png

  Scenario: Failure/edge case - 금칙어 노출
    Tool: Bash
    Steps: [1] 임시로 고객 실명 문자열 삽입 [2] npm run check:content 실행
    Expected: 검출 실패 후 수정 시 재통과
    Evidence: .sisyphus/evidence/task-7-case-1-error.md
  ```

  **Commit**: YES | Message: `feat(case-study-1): publish quantified enterprise case page` | Files: `app/case-studies/** or pages/case-studies/**`, `.sisyphus/evidence/task-7-case-1.*`

- [ ] 8. 케이스 스터디 #2 구현(성능/품질 개선 중심)

  **What to do**:
  - Case #2를 성능/품질 개선 사례로 구성한다(예: 로딩 시간, 번들 크기, 오류율 등).
  - 개선 전/후를 동일 단위로 비교하고, 검증 방법(도구/측정 시점)을 명시한다.
  - test id를 고정한다: `case-2-title`, `case-2-before-after`, `case-2-method`, `case-2-evidence`.

  **Must NOT do**:
  - 기준 단위가 다른 수치를 직접 비교하지 않는다.
  - 측정 방법이 없는 결과 숫자를 게시하지 않는다.

  **Recommended Agent Profile**:
  - Category: `writing` — Reason: 비교형 사례 문서화와 근거 설명이 핵심
  - Skills: `[]` — 별도 스킬 불필요
  - Omitted: `[/frontend-ui-ux]` — 비주얼보다 지표 정확성 우선

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: 11 | Blocked By: 2,4,5

  **References** (executor has NO interview context — be exhaustive):
  - Pattern: `.sisyphus/evidence/task-2-case-schema.md` — 공통 스키마
  - External: `https://web.dev/performance-scoring/` — 성능 지표 해석 기준

  **Acceptance Criteria** (agent-executable only):
  - [ ] 개선 전/후 섹션과 측정 방법 섹션이 존재
  - [ ] 최소 1개 before-after 수치가 동일 단위로 제시됨
  - [ ] 라벨/금칙어/링크 검사 통과

  **QA Scenarios** (MANDATORY — task incomplete without these):
  ```
  Scenario: Happy path - Case #2 성능 비교 확인
    Tool: Playwright
    Steps: [1] /case-studies/2 접속 [2] case-2-before-after 블록 확인 [3] case-2-method 텍스트 확인
    Expected: 비교표와 측정 방법이 함께 표시됨
    Evidence: .sisyphus/evidence/task-8-case-2.png

  Scenario: Failure/edge case - 단위 불일치
    Tool: Bash
    Steps: [1] ms vs sec 혼합 입력 [2] check:content 확장 규칙 또는 수동 검증 스크립트 실행
    Expected: 불일치 경고 발생 후 동일 단위로 수정
    Evidence: .sisyphus/evidence/task-8-case-2-error.md
  ```

  **Commit**: YES | Message: `feat(case-study-2): add performance-quality improvement case` | Files: `app/case-studies/** or pages/case-studies/**`, `.sisyphus/evidence/task-8-case-2.*`

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.
- [ ] F1. Plan Compliance Audit — oracle

  **What to do**:
  - Task 1~11 산출물을 본 계획 문서의 MUST/MUST NOT/Acceptance Criteria와 대조한다.
  - 누락/위반/불일치 항목을 표로 정리해 승인 여부를 판단한다.

  **QA Scenario**:
  ```
  Scenario: Plan compliance verification
    Tool: Read
    Steps: [1] 계획서의 Task 1~11 acceptance 항목 추출 [2] evidence 파일 존재 여부 대조 [3] 위반 항목 표 작성
    Expected: 위반 0건이면 APPROVE, 1건 이상이면 REJECT + 수정 지시
    Evidence: .sisyphus/evidence/f1-plan-compliance.md
  ```

- [ ] F2. Code Quality Review — unspecified-high

  **What to do**:
  - lint/typecheck/test/e2e/lighthouse 결과와 코드 변경을 교차 검토한다.
  - 안티패턴(중복 컴포넌트, 하드코딩된 비밀값, 접근성 속성 누락)을 점검한다.

  **QA Scenario**:
  ```
  Scenario: Quality gate + static review
    Tool: Bash
    Steps: [1] npm run lint [2] npm run typecheck [3] npm run test [4] npm run test:e2e [5] npm run lighthouse:ci
    Expected: 모든 게이트 통과 + 코드리뷰 코멘트가 0 critical
    Evidence: .sisyphus/evidence/f2-code-quality.md
  ```

- [ ] F3. Real Manual QA — unspecified-high (+ playwright if UI)

  **What to do**:
  - 실제 사용자 흐름을 브라우저 자동화로 재현한다(Home→Case 1/2/3→Lab→Contact).
  - 375x812 및 1440x900 뷰포트에서 레이아웃/포커스/CTA 동작을 검증한다.

  **QA Scenario**:
  ```
  Scenario: End-to-end user journey replay
    Tool: Playwright
    Steps: [1] 홈 진입 [2] Case 3개 순회 [3] Lab 진입 [4] Contact CTA 실행 [5] 모바일/데스크톱 각각 캡처
    Expected: 모든 경로 성공, 깨진 링크/레이아웃 오류/포커스 손실 0건
    Evidence: .sisyphus/evidence/f3-manual-qa.md
  ```

- [ ] F4. Scope Fidelity Check — deep

  **What to do**:
  - 최종 산출물이 스코프 IN/OUT과 일치하는지 검증한다.
  - 이번 범위 밖(CMS/블로그 엔진/과한 브랜딩 확장) 작업이 섞였는지 점검한다.

  **QA Scenario**:
  ```
  Scenario: Scope boundary enforcement
    Tool: Read
    Steps: [1] 변경 파일 목록과 계획서 Scope Boundaries 대조 [2] OUT 범위 작업 존재 여부 확인
    Expected: OUT 범위 변경 0건일 때만 APPROVE
    Evidence: .sisyphus/evidence/f4-scope-fidelity.md
  ```

## Commit Strategy
- Commit per task 원칙(최소 단위, 롤백 가능)
- 추천 메시지 규칙: `type(scope): desc`
- 콘텐츠/검증/UI 변경을 한 커밋에 혼합하지 않음

## Success Criteria
- 대기업 채용 담당자 관점에서 60초 스캔 시 강점/성과/신뢰 근거가 즉시 보인다.
- 케이스 스터디 3개가 서로 다른 문제 유형을 다루며, 각 페이지에 검증 가능한 지표와 근거가 포함된다.
- 핵심 품질 게이트(링크/접근성/성능/E2E)가 자동화되어 재배포 시 회귀를 방지한다.
