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
