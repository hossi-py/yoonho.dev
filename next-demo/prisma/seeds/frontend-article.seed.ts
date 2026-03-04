import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type FrontendArticleSeed = {
  id: string;
  category: string;
  framework: 'react' | 'vue' | 'nextjs';
  title: string;
  description: string;
  summary: string;
  publishedAt: Date;
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  sections: Prisma.JsonArray;
};

const FRONTEND_ARTICLES: FrontendArticleSeed[] = [
  {
    id: 'react-describing-the-ui',
    category: 'frontend',
    framework: 'react',
    title: 'React Describing the UI: 설계 관점으로 다시 읽기',
    description:
      'React의 UI 설계 모델을 문법 요약이 아닌 실무 설계 기준으로 정리합니다. 컴포넌트 경계, 선언적 렌더링, key 기반 재조정, 순수성 원칙을 중심으로 다룹니다.',
    summary:
      '공식 문서 내용을 그대로 옮기지 않고, "왜 React가 이런 제약을 두는가"를 기준으로 재구성했습니다. 각 섹션은 핵심 원리, 안티패턴, 베스트 프랙티스, 셀프 체크, 실습 미션으로 연결됩니다.',
    publishedAt: new Date('2026-03-03'),
    readTimeMinutes: 15,
    difficulty: 'Intermediate',
    tags: [
      'React',
      'Component-Driven Architecture',
      'Declarative UI',
      'Reconciliation',
      'Key Stability',
      'Purity',
      'Next.js',
    ],
    sections: [
      {
        type: 'intro',
        heading: '학습 목표와 접근 방식',
        paragraphs: [
          '이 글은 React 문법 암기가 아니라 UI 설계 판단력을 키우는 데 초점을 둡니다.',
          '핵심 질문은 하나입니다: "왜 React는 컴포넌트, 순수 렌더링, 안정적 key를 강제하는가?"',
          '각 섹션은 원리 설명 이후에 오해 포인트와 실무 적용 기준을 함께 제공합니다.',
        ],
      },
      {
        type: 'concept',
        heading: 'Component-Driven Architecture: 경계를 먼저 설계한다',
        body: '좋은 React 코드는 예쁜 JSX보다 컴포넌트 경계 설계에서 시작합니다.',
        bullets: [
          '반복/변화/책임을 기준으로 컴포넌트를 나눕니다.',
          '상태 소유권(누가 상태를 가진다)을 먼저 정하면 props 흐름이 자연스러워집니다.',
        ],
        misconceptions: [
          '화면 단위로만 나누면 데이터/행동 책임이 섞여 거대한 컴포넌트가 됩니다.',
        ],
        code: "// Antipattern: 역할 혼합\nfunction Page() {\n  // fetch + filter + modal + list rendering이 한 곳에 섞임\n}\n\n// Best Practice: 책임 분리\n// Page(데이터/조합) -> List(표현) -> Item(최소 단위)",
      },
      {
        type: 'concept',
        heading: 'Declarative UI Tracking: 상태를 UI로 번역한다',
        body: 'React는 "어떻게 그릴지"보다 "지금 상태에서 무엇이 보여야 하는지"를 선언하게 만듭니다.',
        bullets: [
          '조건부 렌더링은 상태 전이를 사용자 경험으로 번역하는 과정입니다.',
          '중괄호는 데이터와 UI를 연결하는 인터페이스입니다.',
        ],
        misconceptions: [
          '명령형 DOM 조작 습관을 JSX 안으로 끌고 오면 상태와 화면이 쉽게 불일치합니다.',
        ],
      },
      {
        type: 'concept',
        heading: 'Props Contract Design: 재사용성은 계약에서 나온다',
        body: 'props는 단순 전달값이 아니라 컴포넌트 API 계약입니다.',
        bullets: [
          'props 이름은 데이터 의미를 드러내야 합니다.',
          'children을 쓰는 래퍼 컴포넌트는 레이아웃 재사용에 특히 유리합니다.',
        ],
        misconceptions: [
          'props를 과도하게 전달(drilling)하면 구조 문제가 데이터 전달 문제로 보이기 쉽습니다.',
        ],
      },
      {
        type: 'concept',
        heading: 'Reconciliation Deep Dive: key는 성능이 아니라 정체성이다',
        body: 'React의 재조정 과정에서 key는 노드의 정체성을 보존하기 위한 기준값입니다.',
        bullets: [
          'stable key가 있어야 React가 항목 이동/수정/삭제를 정확히 판단합니다.',
          'index key는 순서 변경 시 상태 매핑 오류를 만들 수 있습니다.',
        ],
        misconceptions: [
          'key를 "경고 제거용"으로만 생각하면, 재현 어려운 상태 꼬임 버그가 남습니다.',
        ],
        code: "// Antipattern\n{items.map((item, index) => (\n  <Row key={index} item={item} />\n))}\n\n// Best Practice\n{items.map((item) => (\n  <Row key={item.id} item={item} />\n))}",
      },
      {
        type: 'concept',
        heading: 'Purity Principle: 렌더링은 예측 가능해야 한다',
        body: '같은 입력(props/state/context)이면 같은 출력이 나와야 UI 디버깅이 가능해집니다.',
        bullets: [
          '렌더링 중 외부 상태를 변경하지 않습니다.',
          '랜덤값/시간값은 렌더링 본문 밖으로 분리합니다.',
        ],
        misconceptions: [
          '"가끔만 깨지는 UI"의 상당수는 순수성 위반에서 시작됩니다.',
        ],
        code: "// Antipattern\nlet counter = 0;\nfunction Badge() {\n  counter += 1;\n  return <span>{counter}</span>;\n}\n\n// Best Practice\nfunction Badge({ count }: { count: number }) {\n  return <span>{count}</span>;\n}",
      },
      {
        type: 'checkpoint',
        heading: '셀프 체크: 이해했는지 바로 점검',
        questions: [
          {
            q: 'key가 동일하면 React는 무엇을 가정하나요?',
            a: '같은 개체(정체성)로 가정하고 기존 노드를 재사용합니다.',
          },
          {
            q: '조건부 렌더링 코드가 복잡해질 때 첫 리팩터링은?',
            a: '조건 의도를 이름 있는 변수/컴포넌트로 분리해 읽기 난이도를 낮춥니다.',
          },
          {
            q: '순수성 위반이 실제로 위험한 이유는?',
            a: '렌더 결과가 호출 시점/순서에 따라 달라져 재현 가능한 디버깅이 어려워집니다.',
          },
        ],
      },
      {
        type: 'animation',
        heading: '핵심 개념 애니메이션으로 이해하기',
        body: '순수성, key 안정성, 트리 기반 데이터 흐름을 시각적으로 확인하세요.',
        animationKey: 'react-describing-ui-core',
      },
    ],
  },
  {
    id: 'react-your-first-component',
    category: 'frontend',
    framework: 'react',
    title: 'React Your First Component: 첫 컴포넌트부터 설계 감각 만들기',
    description:
      '컴포넌트 이름 규칙, JSX 반환 구조, 조합 패턴을 중심으로 React 첫 컴포넌트를 실무 기준으로 정리합니다.',
    summary:
      'ko.react.dev/learn/your-first-component를 바탕으로, PascalCase/Fragment/export 전략/컴포지션 분리 기준을 실제 코드 흐름으로 연결합니다.',
    publishedAt: new Date('2026-03-04'),
    readTimeMinutes: 18,
    difficulty: 'Beginner',
    tags: ['React', 'Your First Component', 'PascalCase', 'Fragment', 'Component Composition'],
    sections: [
      {
        type: 'intro',
        heading: '프롤로그 - 첫 컴포넌트는 문법 시작점이 아니라 설계 시작점',
        paragraphs: [
          '첫 컴포넌트에서 배우는 규칙은 문법이 아니라 이후 구조 설계의 기본값이 됩니다.',
          '이 글은 공식 문서 내용을 실무에서 바로 쓰는 형태로 확장해 정리합니다.',
        ],
      },
      {
        type: 'concept',
        heading: '01. 컴포넌트의 정체 - UI를 반환하는 함수',
        body: 'React 컴포넌트는 입력에 따라 JSX를 반환하는 함수입니다. 이 관점으로 보면 규칙이 일관되게 이해됩니다.',
        bullets: [
          '컴포넌트 이름은 대문자로 시작합니다.',
          '컴포넌트는 하나의 Root Element를 반환합니다.',
          '역할을 한 문장으로 설명할 수 있어야 합니다.',
        ],
      },
      {
        type: 'concept',
        heading: '02. PascalCase 규칙 - 네이밍이 런타임 동작을 결정한다',
        body: '소문자 태그는 DOM 요소, 대문자 식별자는 컴포넌트로 해석됩니다. Root Element 규칙은 반환 구조 안정성의 핵심입니다.',
        misconceptions: ['규칙은 스타일 가이드가 아니라 런타임 해석 규칙입니다.'],
      },
      {
        type: 'concept',
        heading: '03. Root Element와 Fragment - 반환 구조를 안정적으로 잡기',
        body: '불필요한 래퍼 div 대신 Fragment를 활용하면 DOM 구조를 깔끔하게 유지할 수 있습니다.',
      },
      {
        type: 'concept',
        heading: '04. default export vs named export - 첫 파일부터 API를 설계하기',
        body: 'default/named export를 파일 역할에 맞게 선택해야 유지보수가 쉬워집니다.',
        bullets: [
          '대표 컴포넌트 하나면 default export가 간결합니다.',
          '보조 컴포넌트가 많으면 named export가 의존성을 명확히 보여줍니다.',
        ],
      },
      {
        type: 'concept',
        heading: '05. Component Composition - 큰 화면은 조합으로 만든다',
        body: '상위 컴포넌트는 조합, 하위 컴포넌트는 표현 역할을 맡기면 코드가 빠르게 안정됩니다.',
      },
      {
        type: 'concept',
        heading: '06. 첫 컴포넌트에서 자주 나는 오류 패턴',
        body: '초기 단계에서 반복되는 오류를 미리 알고 있으면 디버깅 시간이 크게 줄어듭니다.',
        bullets: [
          '소문자 컴포넌트명 사용 (profile)',
          'return 누락으로 undefined 반환',
          '루트 미묶음으로 JSX 구문 오류',
          '컴포넌트/DOM 태그 역할 혼동 (<Button> vs <button>)',
        ],
      },
      {
        type: 'checkpoint',
        heading: 'Self Check - 첫 컴포넌트 핵심 규칙 점검',
        questions: [
          {
            q: '컴포넌트 이름을 소문자로 작성하면 어떻게 되나요?',
            a: '사용자 정의 컴포넌트가 아니라 HTML 태그처럼 해석될 수 있습니다.',
          },
          {
            q: '여러 JSX 요소를 반환하려면?',
            a: 'Root Element로 감싸거나 Fragment를 사용해 하나로 묶어 반환합니다.',
          },
          {
            q: '컴포넌트 분리 기준을 한 줄로 말하면?',
            a: '반복되는 UI, 독립적으로 변하는 영역, 책임 혼합 여부를 기준으로 분리합니다.',
          },
        ],
      },
      {
        type: 'animation',
        heading: 'Visual Map - key, purity, tree를 한눈에',
        body: '첫 컴포넌트 규칙이 이후 key, purity, tree 개념과 어떻게 연결되는지 함께 확인하세요.',
        animationKey: 'react-describing-ui-core',
      },
      {
        type: 'checklist',
        heading: 'PR Review Kit - Your First Component 점검표',
        items: [
          '컴포넌트 이름이 대문자로 시작하는가?',
          'JSX 반환이 명확한가?',
          'Root Element/Fragment 규칙을 지켰는가?',
          'export 전략이 파일 역할과 일치하는가?',
          '상위(조합)와 하위(표현) 책임이 분리되었는가?',
        ],
      },
    ],
  },
];

export async function seedFrontendArticles() {
  for (const article of FRONTEND_ARTICLES) {
    await prisma.frontendArticle.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    });
  }
}


