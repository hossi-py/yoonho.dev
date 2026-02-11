export interface Project {
  id: string;
  title: string;
  period: string;
  role: string;
  techStack: string[];
  description: string;
  achievements: string[];
  href: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'kb-planit',
    title: 'KB Planit (KB플랜잇)',
    period: '2025.05.03 ~ 진행 중',
    role: 'Frontend Developer',
    techStack: [
      'Vue 3 (Composition API)',
      'TypeScript',
      'Vite',
      'TanStack Vue Query',
      'Tailwind CSS',
      'Storybook',
      'Vuex',
      'VueUse',
    ],
    description: '프로젝트 관리 시스템',
    achievements: [
      'Vue 2에서 Vue 3 + Composition API로의 전환을 주도하여 로직 재사용성 및 유지보수 효율 증대',
      'Vite 도입 및 TanStack Query의 캐싱 전략을 활용하여 초기 렌더링 및 페이지 전환 속도 최적화',
      '디자인 시스템 기반의 18종 공통 UI 컴포넌트(Button, MultiSelect, Dialog 등) 자체 개발 및 UX 통일',
      'Tailwind CSS를 활용한 반응형 UI 구현으로 기존 노후화된 UI/UX 전면 개편',
      'Storybook을 활용한 컴포넌트 시각적 문서화로 공통 UI의 명세 및 품질 관리',
      '프로젝트 독자 기술 보호 및 자산화를 위해 소프트웨어 저작권 등록 요건 분석 및 프로그램등록신청서 작성을 주도하여 저작권 권리 확보',
    ],
    href: '/projects/kb-planit',
  },
  {
    id: 'gen-ai',
    title: 'KB GenAI 포털 (그룹 공동 생성형 AI)',
    period: '2024.11.01 ~ 2025.05.02',
    role: 'Frontend Developer',
    techStack: ['Vue 3 (Composition API)', 'JavaScript', 'Vite', 'Pinia', 'Alova', 'MSW'],
    description:
      'KB금융그룹 전 계열사가 공동 활용하는 엔터프라이즈 생성형 AI 플랫폼 포털의 프론트엔드 개발. 내부 직원/대고객용 AI 챗봇 및 업무 특화 AI 에이전트 관리와 AI 전문가용 모델 개발 환경(Studio)을 제공하는 중앙 관리 시스템 구축.',
    achievements: [
      'MSW(Mock Service Worker) 도입을 통한 API 개발 지연 병목 해결 및 독립적 개발 환경 구축',
      'Alova, Pinia, MSW 등 신규 기술 스택 연구 및 프로젝트 적용 후 팀 내 기술 공유 주도',
      '11명의 개발자(내부/외주) 협업을 위한 기술 규약 문서화(README) 및 코딩 컨벤션 확립',
      'Alova 전역 인터셉터를 활용한 에러 핸들링 일괄 처리로 중복 로직 제거 및 공통 대응 체계 구축',
    ],
    href: '/projects/gen-ai',
  },
  {
    id: 'msp-portal',
    title: 'MSP Portal (Cloud Management)',
    period: '2024.02.01 ~ 2024.10.31',
    role: 'Frontend Developer',
    techStack: [
      'React 18',
      'TypeScript',
      'TanStack Query (v4)',
      'Recoil',
      'MUI (Material UI v5)',
      'Tailwind CSS',
    ],
    description:
      '통합MSP에 있어 MSP사업부의 업무 자동화 및 효율화 뿐 아니라 계열사에게도 편리하고 신속하게 온라인에서 자원 현황 및 보고서 조회 등을 제공할 수 있도록 자체 구축한 포털 서비스',
    achievements: [
      'MUI X Pro의 유료 기능인 DateRangePicker를 기본 DatePicker 기반으로 커스텀 개발하여 라이선스 비용 절감 및 프로젝트 사양에 최적화된 유지보수 구조 구축',
      '사용자 경험(UX) 향상을 위해 서비스 전용 에러 페이지의 디자인 및 레이아웃을 주도적으로 기획·제안하여 서비스 안정성 신뢰도 제고',
      '공통 UI 컴포넌트 라이브러리를 설계 및 개발하여 프론트엔드 개발 생산성 및 디자인 일관성 확보',
      '외부 협력사 대상의 프론트엔드 개발 가이드라인 수립 및 기술 커뮤니케이션 리딩을 통해 협업 모듈의 코드 품질 상향 평준화',
    ],
    href: '/projects/msp-portal',
  },
  {
    id: 'saas-issue-reporter',
    title: '이슈리포터 상품 개발 및 운영',
    period: '2022.08.01 ~ 2024.01.31',
    role: 'Frontend Developer',
    techStack: ['Vue 2', 'TypeScript', 'Vuex', 'Axios', 'vue/composition-api'],
    description:
      '업무시스템에서 발생하는 이슈들을 캐치하여 PC와 모바일에서 간편히 등록하고, 테스트 수행을 위한 테스트 케이스 등록 및 관리가 가능한 통합 테스트 관리 도구',
    achievements: [
      'ChatGPT 기반 코드 리팩토링 주도: 생성형 AI를 활용하여 기존 노후 소스의 구조를 개선하고 비즈니스 로직을 최적화하여 코드 가용성 및 유지보수 효율성 증대',
      'Mock Data 기반 API 설계 제안: Mock Data를 통한 선개발 후 API 상세 설계를 백엔드에 역제안함으로써 개발 병목 해소 및 휴먼 에러 차단',
      '함수 공통화 및 소스 효율화: 프로젝트 내 중복 로직 및 유사 기능을 수행하는 함수들을 식별하여 공통 모듈로 분리함으로써 소스 복잡도 감소 및 재사용성 확보',
    ],
    href: '/projects/saas-issue-reporter',
  },
  {
    id: 'alfred',
    title: 'Alfred (신기술 연구 및 개발)',
    period: '2022.01.17 ~ 2022.07.31',
    role: 'Frontend Developer',
    techStack: ['Vue 2', 'TypeScript', 'Vuex', 'Axios', 'vue/composition-api'],
    description:
      'SaaS 사업부에서 개발 하는 다양한 ITEM(SaaS서비스)들의 계약을 관리 하고, 고객들의 SR접수와 사용현황및 미터링 현황을 보여주는 SaaS 서비스들의 현황 관리 시스템',
    achievements: [
      '시스템 오류 분석 및 서비스 안정화: R&D 단계에서 발생하는 초기 시스템 버그를 식별하고 수정하여 서비스 안정성 확보에 기여',
      '표준 UI 템플릿 기반 화면 구현: 사내 공통 UI 가이드라인과 기존 템플릿을 준수하여 화면을 개발함으로써 시스템 전반의 UI 일관성 유지',
      '실무 코드 구조 이해 및 기초 역량 확보: Vue 2와 TypeScript 기반의 프로젝트 구조를 파악하고 기본 기능을 구현하며 실무 개발 프로세스 습득',
    ],
    href: '/projects/alfred',
  },
];
