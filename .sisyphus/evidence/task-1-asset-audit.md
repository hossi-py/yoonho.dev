# Task 1 — Wave 0 자산 감사 및 베이스 레포 결정

Date: 2026-03-25 (Asia/Seoul)

## 감사 범위
- 대상 레포(고정): `next-demo`, `next-app`, `vue2-demo`
- 평가 방식(가중치 고정):
  - 실행 가능성 30
  - 타입/린트/테스트 준비도 30
  - 페이지 구조 재사용성 20
  - 대기업 포트폴리오 적합성 20

## 로컬 증거 요약 (검증된 경로만 사용)

### next-demo
- 디렉터리 비어 있음(0 entries): `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-demo`
- `package.json` 부재: `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-demo/package.json` (not found)
- 누락 증거 명시: 실행 스크립트/프레임워크 버전/타입·린트·테스트 설정/페이지 구조를 확인할 파일이 없음.

### next-app
- 런타임/스크립트 확인: `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-app/package.json`
  - `next@16.2.1`, `react@19.2.4`, `react-dom@19.2.4`
  - scripts: `dev`, `build`, `start`, `lint`
- 타입/린트 설정 확인:
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-app/tsconfig.json` (`strict: true`)
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-app/eslint.config.mjs`
- 앱 라우터 구조 확인:
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-app/src/app/layout.tsx`
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-app/src/app/page.tsx`
- 누락 증거 명시: `test` 스크립트 또는 테스트 러너 설정 파일은 본 감사 범위 내 확인되지 않음.

### vue2-demo
- 런타임/스크립트 확인: `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/vue2-demo/package.json`
  - `vue@2.6.14`, `vue-router@3.5.1`
  - scripts: `serve`, `build`, `lint`
- 타입/린트/설정 확인:
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/vue2-demo/tsconfig.json`
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/vue2-demo/.eslintrc.js`
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/vue2-demo/vue.config.js`
- 페이지/라우팅 구조 확인:
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/vue2-demo/src/main.ts`
  - `C:/Users/hyh_k/Desktop/workspace/yoonho.dev/vue2-demo/src/router/index.ts`
- 누락 증거 명시: `test` 스크립트 또는 테스트 러너 설정 파일은 본 감사 범위 내 확인되지 않음.

## 가중 점수표

| 후보 | 실행 가능성 (30) | 타입/린트/테스트 준비도 (30) | 페이지 구조 재사용성 (20) | 대기업 포트폴리오 적합성 (20) | 총점 (100) |
|---|---:|---:|---:|---:|---:|
| next-demo | 0 | 0 | 0 | 2 | 2 |
| next-app | 28 | 22 | 16 | 18 | 84 |
| vue2-demo | 24 | 20 | 14 | 8 | 66 |

### 점수 산정 근거
- `next-demo`: 핵심 산정 근거 파일이 없어 실행/품질/구조 항목에 점수 부여 불가(0). 포트폴리오 적합성은 프레임워크 실증이 없어 최소치만 부여.
- `next-app`: 최신 Next/React 버전과 표준 실행 스크립트, TypeScript strict, ESLint, App Router 기본 골격이 확인되어 높은 점수.
- `vue2-demo`: 실행/타입/린트/라우팅 근거는 충분하나, Vue 2 기반(`vue@2.6.14`)으로 2026 대기업 메인 베이스 적합성에서 감점.

## 의사결정 규칙 적용 결과
- 규칙: **If `next-demo` total >= 75 → choose `next-demo`; Else choose `next-app` as base and treat `next-demo` as reference only**
- 실제: `next-demo` 총점 **2 < 75**
- 최종 선택: **`next-app`을 base repo로 채택**, `next-demo`는 **reference only**로 취급.

## Fallback Rule (후속 작업용 고정 문구)
**Fallback rule:** `next-demo`가 실행 가능(매니페스트/런타임 근거) 기준을 충족하지 못하거나 총점이 75 미만이면, `next-app`을 기본 베이스로 사용하고 `next-demo`는 참조 전용으로만 사용한다.
