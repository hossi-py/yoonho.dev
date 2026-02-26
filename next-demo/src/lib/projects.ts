/** 섹션 03: 진행한 일 — 배경-문제-핵심-해결 구조 */
export interface WorkItem {
  background: string;
  problem: string;
  solution: string;
  keywords: string[];
}

/** 섹션 06: 성장한 점 */
export interface GrowthItem {
  type: 'achievement' | 'lesson';
  content: string;
}

/** 프로젝트 상세 데이터 (7섹션) */
export interface ProjectDetail {
  intro: string;
  teamSize: number;
  duration: string;
  overview: string;
  works: WorkItem[];
  process: string[];
  result: string;
  resultHighlights: string[];
  growth: GrowthItem[];
  competency: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  role: string;
  techStack: string[];
  description: string;
  achievements: string[];
  href: string;
  github?: string;
  deployUrl?: string;
  category: 'company' | 'personal';
  detail: ProjectDetail;
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
    category: 'company',
    detail: {
      intro:
        'KB금융그룹의 사내 프로젝트 관리 시스템으로, 프론트엔드 레거시 마이그레이션과 디자인 시스템 구축을 주도했습니다.',
      teamSize: 8,
      duration: '9개월+',
      overview:
        'KB플랜잇은 KB금융그룹 내부에서 사용하는 통합 프로젝트 관리 플랫폼입니다. 기존 Vue 2 + 레거시 UI로 운영되던 시스템의 유지보수 비용이 증가하고, 사용자 경험이 노후화됨에 따라 Vue 3 기반의 전면 리뉴얼이 필요한 상황이었습니다. 이 프로젝트는 기술 스택 현대화와 동시에 디자인 시스템을 구축하여 장기적인 개발 생산성을 확보하는 것을 목표로 했습니다.',
      works: [
        {
          background:
            'Vue 2 기반의 기존 시스템은 Options API 중심으로 작성되어 로직 재사용이 어렵고, 컴포넌트 간 로직 공유 시 Mixin의 사이드이펙트가 빈번했습니다.',
          problem:
            '새로운 기능 추가 시 기존 Mixin과의 충돌로 개발 속도가 저하되고, 코드 추적이 어려워 버그 발생률이 증가.',
          solution:
            'Vue 3 Composition API로의 전환을 설계하고 주도하여, Composable 기반의 로직 분리 패턴을 확립. 팀원 대상 가이드 문서를 작성하고 마이그레이션 전략(점진적 전환)을 수립했습니다.',
          keywords: ['Vue 3 마이그레이션', 'Composition API', 'Composable 패턴'],
        },
        {
          background:
            '프로젝트 전반에서 사용되는 UI 컴포넌트가 각 페이지마다 제각각 구현되어 있어 디자인 일관성이 부족했습니다.',
          problem:
            '동일한 기능의 컴포넌트가 중복 구현되어 있었고, 디자인 변경 시 모든 페이지를 수동으로 수정해야 하는 비효율 발생.',
          solution:
            'Tailwind CSS 기반 디자인 토큰을 정의하고 Button, MultiSelect, Dialog 등 18종의 공통 UI 컴포넌트를 자체 설계·개발. Storybook으로 시각적 문서화하여 디자이너-개발자 간 커뮤니케이션 비용을 절감했습니다.',
          keywords: ['디자인 시스템', 'Storybook', 'Tailwind CSS', 'UI 컴포넌트'],
        },
        {
          background:
            'Webpack 기반 빌드 환경에서 개발 서버 구동 및 HMR 속도가 느려 개발 생산성이 저하되고 있었습니다.',
          problem:
            '개발 서버 구동에 30초 이상 소요되고, HMR 반영이 2~3초 이상 걸려 빠른 반복 개발이 어려운 상황.',
          solution:
            'Vite로 빌드 도구를 전환하고, TanStack Vue Query의 캐싱 전략(staleTime, gcTime)을 활용하여 API 중복 호출을 제거. 초기 렌더링 속도와 페이지 전환 체감 속도를 크게 개선했습니다.',
          keywords: ['Vite', 'TanStack Query', '캐싱 전략', '빌드 최적화'],
        },
      ],
      process: [
        'Vue 2 → Vue 3 마이그레이션 전략 수립 및 점진적 전환 로드맵 설계',
        'Composable 기반 로직 분리 패턴 확립 및 팀 내 가이드 문서 작성',
        '18종 공통 UI 컴포넌트 설계·개발 (Button, MultiSelect, Dialog, DatePicker 등)',
        'Storybook 도입 및 컴포넌트별 스토리 작성으로 시각적 문서화 체계 구축',
        'Vite 마이그레이션 및 빌드 파이프라인 최적화',
        'TanStack Vue Query 도입으로 서버 상태 관리 표준화',
        '소프트웨어 저작권 등록을 위한 프로그램등록신청서 작성 주도',
      ],
      result:
        'Vue 3 + Composition API 기반의 현대적 프론트엔드 아키텍처로 전환 완료. 18종 디자인 시스템 컴포넌트 라이브러리를 구축하여 프로젝트 전반의 UI 일관성을 확보하고, 신규 페이지 개발 속도를 크게 향상시켰습니다.',
      resultHighlights: [
        '18종 공통 UI 컴포넌트 라이브러리 구축 및 Storybook 문서화 완료',
        'Vite 전환으로 개발 서버 구동 시간 대폭 단축',
        'TanStack Query 캐싱으로 불필요한 API 호출 제거',
        '소프트웨어 저작권 등록 완료로 기술 자산화 달성',
      ],
      growth: [
        {
          type: 'achievement',
          content:
            '레거시 마이그레이션을 단순 기술 전환이 아닌, 팀 전체의 개발 패턴을 현대화하는 프로젝트로 이끌어낸 경험',
        },
        {
          type: 'achievement',
          content:
            '디자인 시스템이라는 개념을 팀에 도입하고, 실제 프로덕션에 적용하여 확산시킨 경험',
        },
        {
          type: 'lesson',
          content:
            '점진적 마이그레이션의 중요성 — 한 번에 전환하는 것보다 안정적인 병행 운영 전략이 팀의 부담을 줄인다는 것을 체감',
        },
        {
          type: 'lesson',
          content:
            'Storybook을 통한 컴포넌트 문서화가 "개발자 간 커뮤니케이션 도구"로서 갖는 가치를 이해',
        },
      ],
      competency:
        '레거시 시스템을 현대적 아키텍처로 전환하면서도 안정성을 유지하는 마이그레이션 전략을 수립할 수 있습니다. 디자인 시스템 구축 경험을 바탕으로 조직 전체의 UI 일관성과 개발 생산성을 동시에 향상시킬 수 있으며, 기술적 의사결정을 주도하면서도 팀원들의 성장을 함께 이끌어가는 리딩 역할을 수행할 수 있습니다.',
    },
  },
  {
    id: 'gen-ai',
    title: 'KB GenAI 포털',
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
    category: 'company',
    detail: {
      intro:
        'KB금융그룹 전 계열사가 공동 사용하는 생성형 AI 포털로, 11명 규모 팀에서 기술 표준화와 개발 환경 구축을 주도했습니다.',
      teamSize: 11,
      duration: '6개월',
      overview:
        'KB금융그룹 차원에서 생성형 AI를 내부 업무에 활용하기 위한 중앙 플랫폼을 구축하는 대규모 프로젝트였습니다. AI 챗봇, 업무 특화 AI 에이전트, 모델 개발 Studio 등 다양한 기능을 하나의 포털에서 제공해야 했으며, 내부 개발자와 외주 개발자가 혼합된 11명의 팀이 효율적으로 협업할 수 있는 개발 환경과 기술 규약을 확립하는 것이 핵심 과제였습니다.',
      works: [
        {
          background:
            '11명의 개발자(사내 + 외주)가 동시에 개발을 진행해야 하는 상황에서, 백엔드 API 개발 일정이 프론트엔드보다 지연되는 병목이 반복되었습니다.',
          problem:
            '백엔드 API 미완성 상태에서 프론트엔드 개발이 블로킹되어 전체 일정이 지연되는 악순환 발생.',
          solution:
            'MSW(Mock Service Worker)를 도입하여 실제 API 스펙에 맞는 Mock 환경을 구축. 프론트엔드가 백엔드와 독립적으로 개발할 수 있는 환경을 만들어 개발 병목을 해소했습니다.',
          keywords: ['MSW', 'Mock API', '독립 개발 환경', '병목 해소'],
        },
        {
          background:
            '대규모 팀에서 코드 스타일과 기술 사용 방법이 제각각이라 코드 리뷰 비용이 높아지고 있었습니다.',
          problem:
            '외주 개발자의 코드 품질 편차가 크고, 동일 기능에 대해 서로 다른 구현 방식을 사용하여 유지보수가 어려운 상황.',
          solution:
            '프로젝트 README에 기술 규약을 상세 문서화하고, 코딩 컨벤션과 디렉토리 구조 가이드를 확립. Alova 전역 인터셉터를 활용한 에러 핸들링 패턴을 공통 모듈로 제공하여 코드 품질을 상향 평준화했습니다.',
          keywords: ['기술 규약', '코딩 컨벤션', '팀 리딩', 'Alova 인터셉터'],
        },
      ],
      process: [
        'MSW 도입 및 Mock API 시나리오 설계 — 백엔드 API 스펙 기반 목업 작성',
        'Alova, Pinia 등 신규 기술 스택 리서치 후 PoC(Proof of Concept) 진행 및 팀 공유',
        'README 기반 기술 규약 문서화 — 디렉토리 구조, 네이밍 컨벤션, API 호출 패턴 등',
        'Alova 전역 인터셉터로 에러 핸들링 공통 모듈 개발',
        '외주 개발자 대상 기술 온보딩 세션 진행',
      ],
      result:
        'MSW 기반 독립 개발 환경을 통해 프론트엔드 개발이 백엔드 일정에 의존하지 않고 진행할 수 있게 되었고, 기술 규약 문서화와 공통 모듈 제공으로 11명 개발자의 코드 일관성을 확보했습니다.',
      resultHighlights: [
        'MSW 도입으로 백엔드 의존 없는 독립 개발 환경 구축',
        '기술 규약 문서화를 통한 11인 팀의 코드 품질 표준화',
        'Alova 전역 인터셉터 기반 에러 핸들링 공통 체계 확립',
        '신규 기술 스택 연구 → 적용 → 팀 공유까지의 기술 주도 사이클 확립',
      ],
      growth: [
        {
          type: 'achievement',
          content:
            '11명 규모의 혼합 팀(사내+외주)에서 기술 표준을 수립하고, 모든 개발자가 따를 수 있는 가이드라인을 만들어낸 경험',
        },
        {
          type: 'achievement',
          content:
            'MSW를 통해 "프론트엔드 독립 개발"이라는 패러다임을 팀에 정착시킨 주도적 문제 해결 경험',
        },
        {
          type: 'lesson',
          content:
            '기술 도입은 "도구 선택"이 끝이 아니라, "팀이 실제로 활용할 수 있도록 만드는 과정"까지가 완성이라는 것을 체감',
        },
        {
          type: 'lesson',
          content:
            '문서화의 힘 — 구두 전달은 사라지지만, 잘 작성된 README는 팀의 공유 자산이 된다는 것을 경험',
        },
      ],
      competency:
        '대규모 팀에서의 기술 표준화 경험을 통해, 코드 품질과 팀 생산성을 동시에 끌어올리는 체계를 구축할 수 있습니다. 신규 기술 도입 시 리서치-PoC-적용-공유로 이어지는 사이클을 주도할 수 있으며, 기술 문서화와 팀 온보딩을 통해 팀 전체의 기술 역량 향상에 기여할 수 있습니다.',
    },
  },
  {
    id: 'msp-portal',
    title: 'MSP Portal',
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
    category: 'company',
    detail: {
      intro:
        'KB금융그룹의 클라우드 자원 관리 포털로, UI 컴포넌트 자체 개발과 외부 협력사 기술 리딩을 담당했습니다.',
      teamSize: 6,
      duration: '9개월',
      overview:
        'MSP(Managed Service Provider) 사업부에서 KB금융그룹 계열사들의 클라우드 자원 현황 모니터링, 보고서 조회, 업무 자동화를 제공하는 내부 포털 서비스입니다. React 18과 TypeScript 기반으로 구축되었으며, 외부 협력사와의 공동 개발이 포함된 프로젝트였습니다.',
      works: [
        {
          background:
            'DateRangePicker 기능이 필요했으나, MUI X Pro의 유료 라이선스(연간 수백만 원)가 필요한 상황이었습니다.',
          problem:
            '예산 제약으로 유료 라이선스 구매가 어려웠고, 기본 DatePicker만으로는 기간 선택 UX를 제공할 수 없었음.',
          solution:
            'MUI의 기본 DatePicker 2개를 조합하고, 커스텀 로직(시작일-종료일 유효성 검증, 달력 연동 등)을 직접 구현하여 DateRangePicker를 자체 개발. 프로젝트 사양에 최적화된 경량 솔루션을 만들었습니다.',
          keywords: ['MUI 커스텀', 'DateRangePicker', '비용 절감', 'UX 설계'],
        },
        {
          background:
            '기존 서비스에 에러 발생 시 브라우저 기본 에러 화면이 노출되어 사용자 경험이 좋지 않았습니다.',
          problem:
            '에러 상황에서 사용자에게 아무런 안내 없이 기본 에러 화면이 보여져, 서비스 신뢰도 하락 우려.',
          solution:
            '서비스 전용 에러 페이지의 디자인과 레이아웃을 직접 기획·제안하고 구현. 에러 유형별(404, 500, 네트워크)로 분기하여 사용자에게 적절한 안내 메시지를 제공했습니다.',
          keywords: ['에러 페이지', 'UX 기획', '서비스 안정성'],
        },
        {
          background:
            '외부 협력사 개발자들이 프로젝트에 참여하면서, 프론트엔드 코드 품질 편차가 발생했습니다.',
          problem:
            '협력사 코드가 자체 팀의 아키텍처 패턴과 맞지 않아, 통합 시 리팩토링 비용이 높아지는 상황.',
          solution:
            '프론트엔드 개발 가이드라인(컴포넌트 구조, 상태 관리 패턴, API 호출 규칙)을 수립하고 협력사 대상 기술 커뮤니케이션을 주도. 공통 UI 컴포넌트 라이브러리를 제공하여 코드 품질을 상향 평준화했습니다.',
          keywords: ['기술 가이드라인', '협력사 리딩', 'UI 라이브러리'],
        },
      ],
      process: [
        'MUI DatePicker 분석 후 DateRangePicker 커스텀 솔루션 설계 및 개발',
        '에러 페이지 디자인 기획 → PM/디자이너 승인 → 구현까지 전 과정 주도',
        '공통 UI 컴포넌트 라이브러리 아키텍처 설계 및 개발 (Form, Table, Modal 등)',
        '외부 협력사 대상 프론트엔드 개발 가이드라인 문서 작성 및 공유',
        '협력사 코드 리뷰 참여 및 기술 피드백 제공',
      ],
      result:
        '유료 라이선스 없이 프로젝트 사양에 최적화된 DateRangePicker를 구현하여 비용을 절감했고, 공통 UI 라이브러리와 가이드라인을 통해 협력사 포함 전체 팀의 코드 품질을 통일했습니다.',
      resultHighlights: [
        'MUI X Pro 라이선스 비용 절감 — DateRangePicker 자체 개발',
        '에러 페이지 직접 기획·제안으로 서비스 UX 품질 향상',
        '공통 UI 컴포넌트 라이브러리로 개발 생산성 향상',
        '협력사 기술 가이드라인 수립으로 코드 품질 상향 평준화',
      ],
      growth: [
        {
          type: 'achievement',
          content:
            '유료 라이브러리에 의존하지 않고 자체 솔루션을 설계하여 비용 절감과 유지보수 효율을 동시에 달성',
        },
        {
          type: 'achievement',
          content:
            'UX 기획까지 영역을 넓혀, 단순 구현을 넘어 "어떤 경험이 좋은가"를 함께 고민하는 개발자로 성장',
        },
        {
          type: 'lesson',
          content:
            '외부 협력사와의 기술 커뮤니케이션에서, 명확한 기준을 문서로 제시하는 것이 구두 설명보다 효과적이라는 것을 경험',
        },
        {
          type: 'lesson',
          content:
            'React 생태계(TanStack Query, Recoil)에서의 실무 경험으로 Vue 외 프레임워크에 대한 시야를 넓힘',
        },
      ],
      competency:
        '프레임워크에 종속되지 않는 문제 해결 역량을 갖추고 있습니다. Vue와 React 모두 실무 경험이 있으며, 외부 라이브러리에 의존하지 않는 커스텀 솔루션 설계 능력과 외부 팀과의 기술 커뮤니케이션 리딩 경험을 바탕으로, 다양한 환경에서 즉시 기여할 수 있습니다.',
    },
  },
  {
    id: 'saas-issue-reporter',
    title: '이슈리포터 상품 개발',
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
    category: 'company',
    detail: {
      intro:
        'PC/모바일 크로스 플랫폼 이슈 관리 도구로, 레거시 코드 리팩토링과 개발 프로세스 개선을 주도했습니다.',
      teamSize: 5,
      duration: '1년 6개월',
      overview:
        '이슈리포터는 업무 시스템에서 발생하는 이슈를 PC와 모바일에서 등록하고, 테스트 케이스를 관리할 수 있는 통합 테스트 관리 도구입니다. SaaS 서비스로 운영되며, 고객사에 맞춤 배포가 가능한 구조입니다. 1년 6개월간 운영하면서 레거시 코드의 품질 개선과 개발 프로세스 효율화에 집중했습니다.',
      works: [
        {
          background:
            '초기 개발된 레거시 코드가 점점 복잡해지면서 유지보수 비용이 증가하고, 새로운 기능 추가가 어려운 상황이었습니다.',
          problem:
            '코드 구조가 정리되지 않아 하나의 수정이 예상치 못한 사이드이펙트를 유발하는 경우가 빈번.',
          solution:
            'ChatGPT를 활용한 체계적 리팩토링을 주도. AI를 통해 코드 구조 개선 방향을 도출하고, 비즈니스 로직을 최적화하여 유지보수 효율성을 높였습니다.',
          keywords: ['AI 활용 리팩토링', 'ChatGPT', '코드 품질 개선'],
        },
        {
          background:
            '프론트엔드와 백엔드 간 API 스펙이 개발 중간에 변경되는 경우가 잦아 재작업이 발생했습니다.',
          problem:
            'API 스펙이 불명확한 상태에서 개발을 시작하면 나중에 대규모 수정이 불가피한 상황 반복.',
          solution:
            'Mock Data 기반으로 프론트엔드가 먼저 이상적인 API 구조를 설계한 후 백엔드에 역제안하는 프로세스를 도입. 양방향 커뮤니케이션으로 API 설계 품질을 높이고 개발 병목을 해소했습니다.',
          keywords: ['Mock Data', 'API 설계', '역제안 프로세스'],
        },
      ],
      process: [
        'ChatGPT를 활용한 레거시 코드 분석 및 리팩토링 전략 수립',
        '중복 로직 식별 → 공통 모듈 분리 → 재사용 가능한 유틸리티 함수 라이브러리 구축',
        'Mock Data 기반 API 설계 프로세스 제안 및 팀 내 도입',
        '비즈니스 로직 최적화를 통한 코드 복잡도 감소',
      ],
      result:
        '레거시 코드의 구조적 개선으로 유지보수 효율성을 높였고, Mock Data 기반 API 설계 프로세스를 통해 프론트-백엔드 간 커뮤니케이션 비용을 절감했습니다.',
      resultHighlights: [
        'AI 활용 리팩토링으로 레거시 코드 품질 개선',
        'Mock Data 역제안 프로세스로 API 설계 품질 향상 및 개발 병목 해소',
        '중복 로직 공통 모듈화를 통한 코드 재사용성 확보',
      ],
      growth: [
        {
          type: 'achievement',
          content: 'AI 도구(ChatGPT)를 실무 리팩토링에 효과적으로 활용한 초기 사례를 만들어낸 경험',
        },
        {
          type: 'achievement',
          content:
            '프론트엔드가 API 설계를 선제적으로 제안하는 "역제안 프로세스"를 팀에 도입한 경험',
        },
        {
          type: 'lesson',
          content:
            '레거시 코드 개선은 기술적 역량뿐 아니라, 팀 내 설득과 점진적 적용이라는 소프트 스킬이 필요하다는 것을 학습',
        },
        {
          type: 'lesson',
          content:
            '운영 중인 서비스에서의 리팩토링은 안정성과 개선을 동시에 고려해야 하는 균형감각이 중요하다는 것을 체감',
        },
      ],
      competency:
        'AI 도구를 실무에 효과적으로 접목하여 개발 생산성을 높일 수 있으며, 프론트-백엔드 간 효율적인 협업 프로세스를 설계한 경험이 있습니다. 레거시 코드를 분석하고 점진적으로 개선하는 실무 경험을 통해, 어떤 코드베이스에서도 빠르게 적응하고 개선점을 찾아낼 수 있습니다.',
    },
  },
  {
    id: 'alfred',
    title: 'Alfred (신기술 연구)',
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
    category: 'company',
    detail: {
      intro:
        'SaaS 서비스 현황 관리 시스템으로, 실무 프론트엔드 개발의 기초를 다진 첫 프로젝트입니다.',
      teamSize: 4,
      duration: '7개월',
      overview:
        'Alfred는 SaaS 사업부에서 개발하는 다양한 서비스(ITEM)들의 계약 관리, 고객 SR 접수, 사용 현황 및 미터링 현황을 통합 관리하는 시스템입니다. R&D 단계에서 시작된 프로젝트로, 초기 시스템 안정화와 기본 화면 구현에 집중했습니다. 이 프로젝트를 통해 Vue 2, TypeScript 기반의 실무 코드 구조를 파악하고, 엔터프라이즈 레벨 프로젝트의 개발 프로세스를 습득했습니다.',
      works: [
        {
          background:
            'R&D 단계의 초기 시스템이라 크고 작은 버그가 많았고, 안정적인 서비스 운영을 위한 디버깅 역량이 필요했습니다.',
          problem: '다양한 환경에서 발생하는 예측하기 어려운 버그들이 서비스 안정성을 위협.',
          solution:
            '체계적인 로그 분석과 디버깅을 통해 초기 시스템 버그를 식별하고 수정. 재현 시나리오를 문서화하여 향후 유사 이슈에 대한 대응력을 높였습니다.',
          keywords: ['디버깅', '서비스 안정화', 'R&D'],
        },
        {
          background:
            '사내 공통 UI 가이드라인이 존재했으나, 기존 코드만으로는 가이드라인의 정확한 적용 방법을 파악하기 어려웠습니다.',
          problem:
            '가이드라인을 따르면서도 실제 프로젝트 맥락에 맞는 UI를 구현하는 것이 초기 개발자에게 도전적인 과제.',
          solution:
            '표준 UI 템플릿과 가이드라인을 분석하여 프로젝트에 맞게 화면을 구현. 기존 코드 패턴을 학습하면서 Vue 2 + TypeScript의 실무 구조를 체화했습니다.',
          keywords: ['UI 가이드라인', '표준 템플릿', 'Vue 2', 'TypeScript'],
        },
      ],
      process: [
        'R&D 단계 시스템의 버그 식별 및 수정 — 체계적 디버깅 프로세스 수립',
        '사내 공통 UI 가이드라인 분석 및 표준 템플릿 기반 화면 구현',
        'Vue 2 + TypeScript + Vuex 아키텍처 패턴 학습 및 적용',
        '코드 리뷰를 통한 실무 코딩 컨벤션 습득',
      ],
      result:
        'R&D 단계의 시스템을 안정화하는 데 기여했으며, Vue 2와 TypeScript 기반 엔터프라이즈 프로젝트의 구조와 개발 프로세스를 체화하여 이후 프로젝트들의 기반 역량을 확보했습니다.',
      resultHighlights: [
        '초기 시스템 버그 식별 및 수정으로 서비스 안정성 확보',
        '표준 UI 가이드라인 준수를 통한 시스템 디자인 일관성 유지',
        'Vue 2 + TypeScript 실무 역량 확보',
      ],
      growth: [
        {
          type: 'lesson',
          content:
            '엔터프라이즈 프로젝트에서의 코드 구조와 아키텍처 패턴을 실무로 체화하는 첫 경험',
        },
        {
          type: 'lesson',
          content:
            '기존 코드를 읽고 이해하는 역량의 중요성 — 코드 리딩 자체가 개발자의 핵심 역량이라는 것을 학습',
        },
        {
          type: 'lesson',
          content:
            'R&D 단계의 프로젝트에서 "완벽함"보다 "동작하는 소프트웨어"를 빠르게 만드는 것의 가치를 이해',
        },
      ],
      competency:
        '실무 프로젝트의 기초부터 차근차근 경험을 쌓아온 개발자로서, 어떤 코드베이스에든 빠르게 적응할 수 있는 코드 리딩 역량과 디버깅 능력을 갖추고 있습니다. 이 첫 프로젝트의 경험이 이후 모든 프로젝트에서의 주도적 역할 수행의 밑거름이 되었습니다.',
    },
  },
];

export function searchProjects(query: string): Project[] {
  // 공백을 모두 제거하고 소문자로 변환하여 비교 (한글 띄어쓰기 제약 완화)
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, '');
  if (!normalizedQuery) return [];

  return PROJECTS.filter((project) => {
    const title = project.title.toLowerCase().replace(/\s+/g, '');
    const description = project.description.toLowerCase().replace(/\s+/g, '');
    const techStacks = project.techStack.map((tech) => tech.toLowerCase().replace(/\s+/g, ''));

    return (
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      techStacks.some((tech) => tech.includes(normalizedQuery))
    );
  });
}
