import { FrontendArticle, FrontendArticleListItem, FrontendArticleSection, FrontendFramework } from "./frontend-article-types";
import getPrismaClient from "./prisma";

const FALLBACK_ARTICLE: FrontendArticle = {
  id: 'react-describing-the-ui',
  category: 'frontend',
  framework: 'react',
  title: 'React "Describing the UI" 심화 가이드 — 문법을 넘어 설계 감각으로',
  description:
    'React 공식 문서 첫 챕터를 실무 맥락에서 다시 읽었습니다. 이 글은 문서의 핵심 메시지를 유지한 채, 컴포넌트 경계, key 정체성, 순수 렌더링 같은 심화 포인트를 코드와 함께 확장해 설명합니다.',
  summary:
    'ko.react.dev의 "Describing the UI" 챕터 9개 하위 주제를 실무 엔지니어 시선으로 확장 학습합니다. 컴포넌트를 왜 함수로 만드는지, JSX가 실제로 무엇인지, props를 왜 계약이라 부르는지, key가 상태 보존에 어떤 영향을 주는지까지 공식 문서의 의도를 깊게 연결합니다.',
  date: '2026-03-03',
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  tags: [
    'React',
    'Describing the UI',
    'Component Design',
    'Virtual DOM',
    'Reconciliation',
    'JSX Internals',
    'Purity',
    'Next.js App Router',
  ],
  sections: [
    {
      type: 'intro',
      heading: '프롤로그 - 이 챕터는 문법편이 아니라 설계편이다',
      paragraphs: [
        '많은 사람이 "Describing the UI"를 JSX 입문 챕터로만 소비합니다. 하지만 실무에서 터지는 문제들은 문법을 몰라서가 아니라 모델을 잘못 잡아서 생깁니다. 컴포넌트 경계가 흐려지고, key가 정체성을 잃고, 렌더링이 순수하지 않을 때 버그는 눈덩이처럼 커집니다.',
        '공식 문서의 핵심을 유지하면서, 실무에서 자주 마주치는 사례를 덧붙여 이해를 돕는 방식으로 정리했습니다.',
      ],
    },
    {
      type: 'concept',
      heading: '01. 컴포넌트 - 화면 조각이 아니라 책임 경계',
      body: '공식 문서는 "React 애플리케이션은 컴포넌트라고 불리는 독립된 UI 조각들로 이루어집니다"라고 시작합니다. 이 문장은 좋은 출발점이고, 실무에서는 여기에 "책임 경계" 관점을 더하면 설계 품질이 크게 올라갑니다. 컴포넌트를 단순히 "화면 조각"으로만 나누면 헤더 안에 검색, 알림, 프로필 로직이 함께 쌓이기 쉽습니다.',
      paragraphs: [
        '컴포넌트의 본질은 "책임의 경계"입니다. 하나의 컴포넌트는 하나의 질문에 답해야 합니다. "이 데이터를 어떤 모양으로 보여줄 것인가?" 혹은 "이 사용자 행동을 어떻게 처리할 것인가?" — 이 두 질문이 한 컴포넌트 안에 섞이기 시작하면, 그것이 바로 분리해야 할 신호입니다.',
        '실무에서 경계를 잡을 때는 아래 세 가지 기준부터 확인하면 빠르게 정리됩니다.',
        'import/export는 단순 문법이 아니라 모듈 API 설계입니다. 어떤 컴포넌트를 어떤 이름으로 공개할지 결정하는 순간, 팀이 앞으로 그 모듈을 어떻게 의존할지도 함께 결정됩니다. 예를 들어 barrel file(index.ts)로 내부 컴포넌트를 무분별하게 재수출하면 트리 쉐이킹 효율이 떨어지고, 작은 수정에도 불필요한 재빌드가 발생할 수 있습니다. 반대로 named export 중심으로 공개 범위를 최소화하면 규모가 커질수록 유지보수성이 좋아집니다.',
      ],
      bullets: [
        '반복: 같은 구조가 2번 이상 나타나면 컴포넌트로 추출합니다.',
        '독립적 변화: 나머지는 그대로인데 이 영역만 다시 그려야 한다면 분리합니다.',
        '데이터 소유권: "이 상태를 누가 가져야 하는가?"를 먼저 정하면 props 흐름과 계층 구조가 자연스럽게 정리됩니다.',
      ],
      code: '// 실무에서 자주 보는 안티패턴: "화면 영역 = 컴포넌트"로 나눈 경우\nfunction ProductPage() {\n  const [product, setProduct] = useState(null);\n  const [reviews, setReviews] = useState([]);\n  const [isCartOpen, setIsCartOpen] = useState(false);\n  const [relatedProducts, setRelatedProducts] = useState([]);\n\n  useEffect(() => { /* 상품 정보 fetch */ }, []);\n  useEffect(() => { /* 리뷰 fetch */ }, []);\n  useEffect(() => { /* 관련 상품 fetch */ }, []);\n\n  // 이 아래로 200줄의 JSX...\n  // 상품 정보, 리뷰 목록, 장바구니 모달, 관련 상품이 전부 한 곳에\n}\n\n// 책임 기준으로 분리한 결과\n// ProductPage: 레이아웃 조합만 담당\n//   └─ ProductInfo: 상품 정보 표시 (Server Component)\n//   └─ ReviewSection: 리뷰 표시 + 작성\n//   └─ CartDrawer: 장바구니 상호작용 ("use client")\n//   └─ RelatedProducts: 관련 상품 추천',
      misconceptions: [
        '"컴포넌트를 잘게 쪼개면 항상 좋다"는 것은 오해입니다. 과도한 분리는 props 전달 체인만 길어지고, 한 기능을 이해하기 위해 5개 파일을 오가야 하는 상황을 만듭니다. 핵심은 "수가 아니라 경계의 질"입니다.',
      ],
    },
    {
      type: 'concept',
      heading: '02. JSX - HTML 흉내가 아니라 설명서 객체 문법',
      body: '많은 개발자가 JSX를 "JavaScript 안에서 쓰는 HTML"이라고 생각합니다. 하지만 이 이해에서 출발하면 왜 `class` 대신 `className`을 써야 하는지, 왜 단일 루트가 필요한지, 왜 self-closing 태그를 닫아야 하는지 모두 "외워야 할 규칙"이 됩니다. JSX의 진짜 정체를 보면 이 규칙들이 필연적이라는 것을 알게 됩니다.',
      paragraphs: [
        'JSX는 Babel 같은 트랜스파일러에 의해 `React.createElement(type, props, ...children)` 호출로 변환됩니다. 즉 `<div className="box">Hello</div>`는 `React.createElement("div", { className: "box" }, "Hello")`가 됩니다. 이 함수의 반환값은 DOM 노드가 아니라 `{ type: "div", props: { className: "box", children: "Hello" } }` 형태의 일반 JavaScript 객체입니다. React는 이 객체를 "UI 설명서"로 활용하여, 이전 설명서와 비교하고 실제 DOM에 최소한의 변경만 적용합니다.',
        '이 사실을 이해하면 여러 규칙이 저절로 납득됩니다. `class`가 아닌 `className`인 이유 — JavaScript에서 `class`는 예약어이므로 객체 프로퍼티 이름으로 쓸 수 없습니다. 단일 루트가 필요한 이유 — 함수는 하나의 값만 반환할 수 있고, `React.createElement()`도 하나의 객체만 반환하기 때문입니다(`Fragment <></>`가 이 제약을 우회합니다). self-closing이 필수인 이유 — XML 파서 규칙을 따르기 때문입니다.',
        '그리고 중괄호 `{}`는 "JavaScript 세계로 통하는 창문"이라는 공식 문서의 비유가 정확합니다. JSX 컴파일러는 `{}`를 만나면 그 안의 내용을 JavaScript 표현식으로 평가하여 `props`나 `children` 자리에 넣습니다. 따라서 `{}` 안에는 값을 반환하는 표현식만 들어갈 수 있고, `if`문이나 `for`문 같은 문(statement)은 들어갈 수 없습니다. 이것이 조건부 렌더링에서 삼항 연산자나 `&&` 연산자를 쓰는 이유입니다.',
      ],
      code: "// JSX가 실제로 변환되는 과정을 눈으로 확인\n\n// 우리가 작성하는 JSX\nconst element = (\n  <article className=\"post\">\n    <h1>{title}</h1>\n    <p>{body}</p>\n  </article>\n);\n\n// Babel이 변환한 결과 (React 17+ 자동 런타임)\nimport { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';\nconst element = _jsxs('article', {\n  className: 'post',\n  children: [\n    _jsx('h1', { children: title }),\n    _jsx('p', { children: body }),\n  ],\n});\n\n// 최종적으로 생성되는 React Element 객체\n// {\n//   type: 'article',\n//   props: {\n//     className: 'post',\n//     children: [{ type: 'h1', ... }, { type: 'p', ... }]\n//   }\n// }\n// → 이것은 DOM 노드가 아니라, UI의 '설명서' 객체입니다.",
      misconceptions: [
        'JSX를 "HTML을 JavaScript에 넣은 것"으로 이해하면, 왜 `className`이고 왜 `htmlFor`인지 매번 구글링해야 합니다. "JavaScript 객체를 생성하는 문법"으로 이해하면, JavaScript 예약어와 충돌하는 속성명이 바뀌는 것이 당연해집니다.',
      ],
    },
    {
      type: 'concept',
      heading: '03. Props - 전달값이 아니라 컴포넌트 API 계약',
      body: '공식 문서에서 props를 "컴포넌트에 전달하는 정보"라고 소개하지만, 실무에서 props를 바라보는 더 유용한 관점은 "컴포넌트의 함수 시그니처"입니다. 좋은 함수는 매개변수가 명확하고, 함수 이름만 봐도 무엇을 하는지 알 수 있듯이, 좋은 컴포넌트는 props만 보고도 이 컴포넌트가 무엇을 그리는지 예측할 수 있어야 합니다.',
      paragraphs: [
        '가장 흔한 실수는 `props`를 "필요한 값을 하나하나 나열"하는 것입니다. `<UserCard name={...} email={...} avatar={...} role={...} lastLogin={...} />`처럼 `props`가 6개, 7개로 불어나면, 그것은 컴포넌트가 너무 많은 걸 알고 있다는 신호입니다. 대신 `<UserCard user={user} />`처럼 도메인 객체를 통째로 전달하면, 컴포넌트의 의존성이 "`User` 타입" 하나로 줄어들고, `User`에 필드가 추가되어도 `props`를 수정할 필요가 없습니다.',
        '`children`은 React에서 가장 과소평가되는 `props`입니다. `<Card><Avatar /></Card>`처럼 `children`을 활용하면, `Card`는 "어떤 내용을 담을지"를 전혀 모른 채 레이아웃 책임만 집니다. 이것이 React가 상속 대신 합성(composition)을 선호하는 이유이며, 실무에서 가장 재사용하기 좋은 컴포넌트는 대부분 `children`을 받는 래퍼 컴포넌트입니다.',
        'TypeScript를 쓴다면 `props` 타입을 먼저 정의하는 습관이 중요합니다. `interface UserCardProps { user: User; onEdit?: (id: string) => void; }` — 이 `interface`가 바로 컴포넌트의 API 문서입니다. 사용하는 쪽에서 잘못된 타입을 전달하면 컴파일 타임에 잡히고, 옵셔널 `props`를 명시하면 필수/선택 경계가 자동으로 문서화됩니다.',
      ],
      code: "// Props 설계의 진화 과정\n\n// Stage 1: 값을 낱개로 전달 (초심자)\ninterface BadProps {\n  userName: string;\n  userEmail: string;\n  userAvatar: string;\n  userRole: 'admin' | 'member';\n  onUserEdit: () => void;\n  onUserDelete: () => void;\n}\n\n// Stage 2: 도메인 객체 + 행동 분리 (중급)\ninterface BetterProps {\n  user: User;\n  onEdit: (id: string) => void;\n  onDelete: (id: string) => void;\n}\n\n// Stage 3: 합성(composition)으로 유연성 확보 (숙련)\ninterface CardProps {\n  children: React.ReactNode;  // 내용을 모름 → 재사용 극대화\n  variant?: 'default' | 'outlined';\n}\n// 사용: <Card><UserProfile user={user} /></Card>\n// 사용: <Card><ProductSummary product={product} /></Card>",
      misconceptions: [
        'props drilling이 3~4단을 넘어가면 보통 Context나 상태 관리 라이브러리를 떠올리지만, 진짜 문제는 대부분 "컴포넌트 구조 자체"에 있습니다. 중간 컴포넌트가 불필요하게 데이터를 중계하고 있지는 않은지, children 합성으로 계층을 평탄화할 수 없는지를 먼저 검토해야 합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '04. 조건부 렌더링 - 분기를 읽기 좋은 UI 코드로 번역하기',
      body: '공식 문서는 if문, 삼항 연산자, && 연산자를 소개하면서 "상황에 맞게 사용하라"고 말합니다. 하지만 "상황에 맞게"란 정확히 언제 무엇을 쓰라는 건지 감을 잡기 어렵습니다. 아래는 조건부 렌더링을 선택할 때 바로 적용할 수 있는 실용적인 기준입니다.',
      paragraphs: [
        '조건부 렌더링은 "분기 수"와 "UI 변화 범위"를 기준으로 선택하면 읽기 쉬워집니다.',
        '분기가 3개 이상이면 상태 맵(Status Map) 패턴을 추천합니다. `const VIEW_BY_STATUS = { idle: <Placeholder />, loading: <Spinner />, error: <ErrorView />, success: <DataView /> } as const;` 이렇게 하면 분기 로직과 렌더링이 분리되고, 새로운 상태가 추가될 때 TypeScript가 누락을 잡아줍니다.',
      ],
      bullets: [
        '분기가 완전히 다른 UI를 그리면 `early return`이 가장 명확합니다. 예: 로딩, 에러, 성공 화면.',
        '같은 레이아웃 안에서 일부만 바뀌면 삼항 연산자가 적합합니다. 단, 중첩 삼항(`a ? b ? c : d : e`)은 피합니다.',
        '`&&` 좌변이 숫자일 수 있으면 0 트랩을 반드시 점검합니다. `{count > 0 && <Badge />}`처럼 명시적으로 boolean을 만듭니다.',
      ],
      code: '// 실무에서 자주 발생하는 && 연산자 버그\n\ninterface CartBadgeProps {\n  itemCount: number;\n}\n\n// ❌ 버그: itemCount가 0이면 화면에 \'0\'이 렌더링됨\nfunction CartBadge({ itemCount }: CartBadgeProps) {\n  return (\n    <div>\n      {itemCount && <span className="badge">{itemCount}</span>}\n      {/* itemCount=0 → 0 && <span> → 0 → \'0\'이 화면에 표시! */}\n    </div>\n  );\n}\n\n// ✅ 수정: 명시적 비교로 boolean 변환\nfunction CartBadge({ itemCount }: CartBadgeProps) {\n  return (\n    <div>\n      {itemCount > 0 && <span className="badge">{itemCount}</span>}\n    </div>\n  );\n}',
      misconceptions: [
        '&& 연산자를 "짧은 if문"으로 이해하면 위의 0 트랩을 놓칩니다. && 연산자는 "좌변이 falsy이면 좌변을 반환한다"는 JavaScript의 단축 평가(short-circuit evaluation) 규칙을 따르며, React는 false/null/undefined는 렌더링하지 않지만 숫자 0과 빈 문자열 ""은 렌더링합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '05. key와 Reconciliation - 한 줄이 상태 보존을 결정한다',
      body: '이 섹션이 이 글에서 가장 중요합니다. key는 "리스트에 붙이는 경고 제거용 속성"이 아닙니다. key는 React의 재조정(Reconciliation) 엔진이 "이 노드가 이전 렌더와 동일한 개체인가 아닌가"를 판단하는 유일한 기준입니다. 이 한 문장을 이해하면 React에서 발생하는 가장 재현 어려운 버그 유형의 절반 이상을 예방할 수 있습니다.',
      paragraphs: [
        'React의 렌더링 과정을 간략히 보겠습니다. 상태가 변경되면 React는 컴포넌트를 다시 호출하여 새로운 React Element 트리(Virtual DOM)를 만듭니다. 그런 다음 이전 트리와 새 트리를 비교(diffing)하여 실제 DOM에 적용할 최소한의 변경 사항을 계산합니다. 이 비교 과정에서 "같은 위치에 있는 같은 타입의 요소"는 동일한 노드로 간주하고 props만 업데이트합니다. 다른 타입이면 이전 노드를 파괴(unmount)하고 새로 생성합니다.',
        'key는 이 "같은 위치 = 같은 노드" 규칙을 오버라이드합니다. 리스트에서 key가 같은 항목은 위치가 바뀌어도 같은 개체로 간주하여 내부 상태를 유지합니다. key가 달라지면 완전히 새로운 개체로 간주하여 이전 노드를 파괴하고 새로 만듭니다.',
        '이것이 왜 `index key`가 위험한지 설명합니다. 예를 들어 `[A, B, C]` 배열에서 A 앞에 D를 삽입하면 `[D, A, B, C]`가 됩니다. `index key`를 쓰면 `key=0`이 D에, `key=1`이 A에 매핑됩니다. React 입장에서 `key=0`은 이전에도 있었으니(이전의 A) "같은 노드"로 간주하고 `props`만 업데이트합니다. 만약 A에 입력 중인 텍스트가 있었다면, 그 텍스트가 D에 그대로 남아 있게 됩니다. 이것이 "입력값이 다른 행에 붙는" 버그의 정체입니다.',
        '`key`의 활용은 리스트에만 국한되지 않습니다. 의도적으로 `key`를 바꿔서 컴포넌트를 강제로 리셋하는 트릭도 유용합니다. 예를 들어 `<EditForm key={selectedUserId} user={selectedUser} />`에서 다른 사용자를 선택하면 `key`가 바뀌면서 `EditForm`이 완전히 재생성되어, 이전 사용자의 입력 상태가 깔끔하게 초기화됩니다.',
      ],
      code: '// key가 Reconciliation에 미치는 영향을 실제로 보여주는 시나리오\n\ninterface Todo {\n  id: string;\n  text: string;\n}\n\n// ❌ index key: 목록 맨 앞에 항목 추가 시 입력값 꼬임 발생\nfunction TodoList({ todos }: { todos: Todo[] }) {\n  return (\n    <ul>\n      {todos.map((todo, index) => (\n        <li key={index}>\n          {/* 항목이 삽입되면 index가 밀려서\n              이전 key=0의 상태가 새 항목에 붙음 */}\n          <span>{todo.text}</span>\n          <input placeholder="메모 추가" />\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// ✅ stable ID key: 항목의 정체성이 유지됨\nfunction TodoList({ todos }: { todos: Todo[] }) {\n  return (\n    <ul>\n      {todos.map((todo) => (\n        <li key={todo.id}>\n          <span>{todo.text}</span>\n          <input placeholder="메모 추가" />\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// 💡 응용: key 변경으로 컴포넌트 강제 리셋\n<ProfileEditor key={selectedProfile.id} profile={selectedProfile} />',
      misconceptions: [
        'key는 "성능 최적화 도구"가 아닙니다. key의 1차 목적은 올바른 정체성 추적이며, 효율적인 DOM 업데이트는 정체성이 올바르게 추적된 결과로 얻어지는 부수 효과입니다. Math.random()을 key로 쓰면 경고는 안 뜨지만, 매 렌더마다 모든 노드가 파괴 후 재생성되어 성능과 상태 모두 망가집니다.',
      ],
    },
    {
      type: 'concept',
      heading: '06. 순수성(Purity) - React가 예측 가능성을 지키는 방법',
      body: '공식 문서는 컴포넌트를 순수 함수로 유지하라고 말합니다. 하지만 "순수 함수면 좋죠"라는 추상적 동의와 "왜 순수해야 하며 깨지면 뭐가 터지는지" 이해하는 것은 전혀 다릅니다.',
      paragraphs: [
        '순수 컴포넌트의 정의는 명확합니다: 같은 props, state, context를 받으면 항상 같은 JSX를 반환한다. 렌더링 함수 실행 중에 외부 변수를 변경하거나, 네트워크 요청을 보내거나, DOM을 직접 조작하지 않는다. 이것을 "부수효과 없음"이라고 합니다.',
        'React가 순수성을 강제하는 이유는 Concurrent Mode(병렬 렌더링)와 직결됩니다. React 18부터 렌더링 작업은 중단, 재개, 폐기될 수 있습니다. 사용자가 빠르게 입력하면 React는 이전 렌더링을 폐기하고 최신 상태로 다시 렌더링합니다. 이때 렌더링 중 부수효과가 있었다면 — 예를 들어 전역 변수를 증가시켰다면 — 폐기된 렌더링의 부수효과와 완료된 렌더링의 부수효과가 중첩되어 의도하지 않은 결과가 발생합니다.',
        '`Strict Mode`에서 컴포넌트를 두 번 호출하는 것도 이 원칙을 검증하기 위해서입니다. 순수한 컴포넌트라면 두 번 호출해도 결과가 같습니다. 하지만 렌더링 중 `counter++`를 하고 있다면 두 번 호출 시 `counter`가 2 증가하면서, 개발 중에 바로 문제를 감지할 수 있습니다.',
        '그렇다면 부수효과는 어디서 수행하나요? 이벤트 핸들러(`onClick`, `onSubmit` 등)와 `useEffect` 안에서 수행합니다. 이벤트 핸들러는 "사용자 행동에 대한 반응"이므로 렌더링과 무관하게 실행됩니다. `useEffect`는 "렌더링이 화면에 반영된 뒤" 실행되므로, 렌더링 과정 자체의 순수성을 해치지 않습니다.',
      ],
      code: '// 순수성 위반이 Strict Mode에서 실제로 드러나는 과정\n\n// ❌ 렌더링 중 외부 변수 변경\nlet totalRendered = 0;\n\nfunction UserBadge({ name }: { name: string }) {\n  totalRendered += 1;  // 부수효과: 외부 변수 변경\n  return (\n    <span>\n      #{totalRendered} {name}\n    </span>\n  );\n}\n// Strict Mode에서의 결과:\n// <UserBadge name="Alice" /> → \'#2 Alice\' (1이 아니라 2!)\n// 이유: Strict Mode가 컴포넌트를 2번 호출하여 순수성 위반을 감지\n\n// ✅ 순수한 버전: 입력만으로 출력 결정\nfunction UserBadge({ name, index }: { name: string; index: number }) {\n  return (\n    <span>\n      #{index + 1} {name}\n    </span>\n  );\n}\n// 몇 번 호출되든 같은 입력이면 같은 결과',
      misconceptions: [
        '"개발 환경에서만 두 번 호출되니까 프로덕션에서는 괜찮다"는 위험한 생각입니다. Strict Mode의 이중 호출은 버그를 "만드는" 것이 아니라 "드러내는" 것입니다. 프로덕션에서는 Concurrent Mode의 렌더링 중단과 재개에 의해 같은 종류의 버그가 더 예측 불가능한 타이밍에 발생합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '07. 렌더 트리 vs 모듈 트리 - 성능과 번들을 같이 보는 시야',
      body: '공식 문서의 마지막 주제인 "트리로서의 UI"는 지금까지 다룬 개별 개념들을 아키텍처 수준에서 연결합니다. React 앱에는 두 가지 트리가 존재하며, 각각 다른 문제를 진단하는 데 사용됩니다.',
      paragraphs: [
        '렌더 트리는 컴포넌트의 부모-자식 관계입니다. App → Layout → Header + MainContent + Footer 같은 구조입니다. 이 트리에서 상태(state)가 위치하는 컴포넌트가 중요합니다. 왜냐하면 상태가 변경되면 해당 컴포넌트와 그 하위 트리 전체가 리렌더링 대상이 되기 때문입니다. 상태를 불필요하게 높은 컴포넌트에 두면 관련 없는 컴포넌트까지 불필요하게 리렌더링됩니다.',
        '모듈 의존성 트리는 `import` 관계입니다. `page.tsx → components/UserList.tsx → lib/api.ts → lib/http-client.ts` 같은 구조입니다. 이 트리는 번들 사이즈를 결정합니다. 한 곳에서 `lodash` 전체를 `import`하면, 그 모듈을 사용하는 모든 경로가 `lodash` 전체를 번들에 포함합니다. Next.js App Router에서 `Server Component`는 이 트리에서 "서버 경계"를 형성하여, 해당 컴포넌트의 `import`가 클라이언트 번들에 포함되지 않게 합니다.',
        '실무에서는 이 두 트리를 의식하면서 설계해야 합니다. 무거운 라이브러리(차트, 에디터 등)를 사용하는 컴포넌트는 dynamic import로 분리하고, 자주 변하는 상태는 가능한 한 낮은 컴포넌트에 위치시키고, Server Component로 처리할 수 있는 데이터 로딩은 서버에서 처리합니다.',
      ],
      misconceptions: [
        '"컴포넌트를 잘게 쪼개면 리렌더링 성능이 좋아진다"는 부분적으로만 맞습니다. 쪼개기만 하고 상태 위치를 고려하지 않으면, 상위 컴포넌트의 상태 변경이 여전히 모든 자식을 리렌더링합니다. 핵심은 "상태를 사용하는 곳 가까이에 두는 것(colocation)"입니다.',
      ],
    },
    {
      type: 'checkpoint',
      heading: 'Self Check - 실전 투입 전 이해도 점검',
      questions: [
        {
          q: '`<div className="box">Hello</div>`는 브라우저에게 바로 전달되는 HTML인가요? 아니라면 무엇인가요?',
          a: 'HTML이 아닙니다. Babel에 의해 `React.createElement("div", { className: "box" }, "Hello")`로 변환되어, `{ type: "div", props: { className: "box", children: "Hello" } }` 형태의 일반 JavaScript 객체(React Element)를 생성합니다. React는 이 객체를 이전 트리와 비교하여 실제 DOM에 최소한의 변경만 적용합니다.',
        },
        {
          q: '할 일 목록에서 index를 key로 사용했을 때, 목록 맨 앞에 새 항목을 추가하면 어떤 일이 발생하나요?',
          a: '기존 항목들의 index가 한 칸씩 밀립니다. React는 key=0이 이전에도 있었으므로 같은 노드로 간주하고 props만 업데이트합니다. 그 결과 기존 key=0 항목의 내부 상태(입력값 등)가 새로 추가된 항목에 그대로 남게 됩니다.',
        },
        {
          q: '`Strict Mode`에서 컴포넌트가 두 번 호출될 때, 순수하지 않은 컴포넌트에서는 어떤 증상이 나타나나요?',
          a: '외부 변수 증가가 2씩 되거나, API 호출이 2번 발생하거나, 의도하지 않은 DOM 변경이 중복 적용되는 등 부수효과가 두 번 실행됩니다. 이는 프로덕션의 Concurrent Mode에서 렌더링 중단 시 발생할 수 있는 버그를 미리 드러내 줍니다.',
        },
        {
          q: 'children props를 활용한 합성이 "상속보다 유연하다"고 하는 이유는?',
          a: '상속은 부모-자식 관계가 컴파일 타임에 고정되지만, children 합성은 런타임에 어떤 컴포넌트든 자유롭게 넣을 수 있습니다. <Card> 안에 <UserProfile>을 넣든 <ProductSummary>를 넣든 Card 컴포넌트 코드는 변경 없이 재사용됩니다.',
        },
        {
          q: '렌더 트리에서 상태를 최상위 컴포넌트에 두면 왜 성능 문제가 생기나요?',
          a: '상태가 변경되면 해당 컴포넌트와 모든 하위 트리가 리렌더링 대상이 됩니다. 최상위에 상태를 두면 사소한 상태 변경에도 앱 전체가 리렌더링을 시도하게 되어, 특히 복잡한 트리에서 체감 성능이 크게 떨어집니다.',
        },
      ],
    },
    {
      type: 'animation',
      heading: 'Visual Map - key, purity, tree를 한눈에',
      body: '위에서 다룬 Reconciliation 과정에서 key가 노드 정체성을 추적하는 과정, 순수/비순수 컴포넌트의 렌더 결과 차이, 렌더 트리 vs 모듈 의존성 트리 구조를 애니메이션으로 확인하세요.',
      animationKey: 'react-describing-ui-core',
    },
    {
      type: 'checklist',
      heading: 'PR Review Kit - 바로 붙여 쓰는 점검표',
      items: [
        '이 컴포넌트는 하나의 명확한 책임만 가지고 있는가? 이름만으로 역할을 설명할 수 있는가?',
        'props가 5개 이상이라면, 도메인 객체로 묶거나 children 합성으로 구조를 바꿀 수 있지 않은가?',
        '`JSX` 내 `{}` 안의 표현식이 한 줄을 넘으면, 바깥 변수로 추출되어 있는가?',
        '리스트의 `key`가 데이터의 고유 ID(DB PK, UUID 등)인가? `index`나 `Math.random()`이 아닌가?',
        '렌더링 함수 본문에서 외부 변수를 변경하거나, API를 호출하거나, `DOM`을 직접 조작하고 있지 않은가?',
        '조건 분기가 2단 이상 중첩된 삼항 연산자가 없는가? `early return`이나 상태 맵으로 바꿀 수 있지 않은가?',
        '`&&` 연산자의 좌변에 숫자 `0`이나 빈 문자열이 올 가능성이 없는가?',
        '상태가 실제로 사용되는 컴포넌트 가까이에 위치해 있는가? 불필요하게 높은 곳에 끌어올리지 않았는가?',
        '`Server/Client Component` 경계가 의도적으로 설계되어 있는가? `"use client"`가 가능한 한 아래쪽에 있는가?',
      ],
    },
  ],
};

const FALLBACK_ARTICLE_YOUR_FIRST_COMPONENT: FrontendArticle = {
  id: 'react-your-first-component',
  category: 'frontend',
  framework: 'react',
  title: 'React "Your First Component" 심화 가이드 — 첫 컴포넌트에서 설계 습관 만들기',
  description:
    'ko.react.dev/learn/your-first-component를 실무 관점으로 확장해, 네이밍 규칙부터 컴포넌트 분리 기준까지 한 번에 정리합니다.',
  summary:
    '첫 컴포넌트를 만드는 법을 단순 문법이 아니라 팀 개발 기준으로 풀어냅니다. PascalCase 규칙이 왜 필요한지, Root Element/Fragment를 언제 쓰는지, default export와 named export를 어떻게 선택할지, 컴포지션으로 책임을 분리하는 기준까지 실제 코드 중심으로 정리합니다.',
  date: '2026-03-04',
  readTimeMinutes: 19,
  difficulty: 'Beginner',
  tags: ['React', 'Your First Component', 'PascalCase', 'Fragment', 'Component Composition'],
  sections: [
    {
      type: 'intro',
      heading: '프롤로그 - 첫 컴포넌트는 문법 시작점이 아니라 설계 시작점',
      paragraphs: [
        '처음 컴포넌트를 만들 때는 단순히 화면 한 조각을 띄우는 것처럼 보입니다. 하지만 이 단계에서 만든 선택이 이후 파일 구조, 재사용성, 협업 난이도를 크게 좌우합니다.',
        '공식 문서의 예제를 바탕으로 "왜 이런 규칙이 필요한지"까지 연결해, 실무에서 바로 적용 가능한 기준으로 정리했습니다.',
      ],
    },
    {
      type: 'concept',
      heading: '01. 컴포넌트의 정체 - UI를 반환하는 함수',
      body: 'React 컴포넌트는 본질적으로 함수입니다. 입력(props)을 받아 출력(JSX)을 반환하는 함수라는 관점이 잡히면, 이후 규칙은 예외가 아니라 일관된 설계로 보입니다.',
      paragraphs: [
        '컴포넌트는 "같은 입력이면 같은 출력"을 유지할수록 재사용과 테스트가 쉬워집니다.',
        '처음부터 데이터 조회, 이벤트, 스타일, 레이아웃 책임을 한 컴포넌트에 몰아넣으면 금방 유지보수 한계가 옵니다.',
        '따라서 첫 컴포넌트에서도 "이 함수는 무엇을 보여주는가"를 한 문장으로 설명할 수 있어야 합니다.',
      ],
      code: "function Profile() {\n  return (\n    <img\n      src=\"https://i.imgur.com/MK3eW3As.jpg\"\n      alt=\"Katherine Johnson\"\n    />\n  );\n}\n\nexport default function Gallery() {\n  return (\n    <section>\n      <h1>Amazing scientists</h1>\n      <Profile />\n      <Profile />\n      <Profile />\n    </section>\n  );\n}",
      misconceptions: [
        '"JSX를 반환하면 모두 같은 수준의 컴포넌트"라는 오해가 있습니다. 실제로는 표현 컴포넌트와 조합 컴포넌트를 구분해야 규모가 커져도 구조가 유지됩니다.',
      ],
    },
    {
      type: 'concept',
      heading: '02. PascalCase 규칙 - 네이밍이 런타임 동작을 결정한다',
      body: 'React는 소문자로 시작하는 태그를 내장 DOM 요소로, 대문자로 시작하는 식별자를 컴포넌트로 처리합니다. 즉 네이밍 규칙은 스타일이 아니라 실행 규칙입니다.',
      paragraphs: [
        '예를 들어 <profile />는 사용자 컴포넌트가 아니라 미정의 HTML 태그처럼 해석될 수 있습니다.',
        '반대로 <Profile />는 JavaScript 변수(함수)를 참조해 컴포넌트 호출로 동작합니다.',
        '팀에서 네이밍 규칙을 통일하지 않으면 리뷰 단계에서 잡기 어려운 UI 누락 버그가 생깁니다.',
      ],
      bullets: [
        '컴포넌트 함수/파일명 모두 PascalCase로 유지합니다.',
        '도메인 개념이 드러나는 이름을 우선합니다. (UserCard, PriceSummary)',
        '동사형(renderCard)보다 역할형(Card) 이름이 조합에 유리합니다.',
      ],
      misconceptions: [
        '"이름만 맞추면 된다"는 오해가 있습니다. 이름은 시작일 뿐이고, 그 이름이 가리키는 책임까지 일관돼야 합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '03. Root Element와 Fragment - 반환 구조를 안정적으로 잡기',
      body: '컴포넌트는 하나의 Root Element를 반환해야 합니다. 여러 형제를 반환하려면 Fragment를 사용해 구조를 명시적으로 묶어야 합니다.',
      paragraphs: [
        '불필요한 div 래퍼를 남발하면 DOM 깊이가 증가하고 CSS 선택자 복잡도도 함께 늘어납니다.',
        '레이아웃 목적이 없다면 Fragment를 우선 고려하는 것이 좋습니다.',
      ],
      code: "function Toolbar() {\n  return (\n    <>\n      <button>Save</button>\n      <button>Publish</button>\n    </>\n  );\n}\n\nfunction BadToolbar() {\n  return (\n    <div>\n      <button>Save</button>\n      <button>Publish</button>\n    </div>\n  );\n}",
      misconceptions: [
        '"Root는 그냥 문법 제약"이라는 오해가 있습니다. 반환 구조를 명시적으로 만드는 규칙이기 때문에 컴포넌트 트리 가독성과 변경 안정성을 올려줍니다.',
      ],
    },
    {
      type: 'concept',
      heading: '04. default export vs named export - 첫 파일부터 API를 설계하기',
      body: '컴포넌트 파일은 팀 내부 API입니다. export 방식 선택은 import 경험과 리팩터링 비용에 직접적인 영향을 줍니다.',
      bullets: [
        '페이지 루트처럼 파일당 대표 컴포넌트 하나면 default export가 간결합니다.',
        '유틸/보조 컴포넌트가 함께 있으면 named export가 의존성을 명확히 드러냅니다.',
        '프로젝트 전반 규칙이 더 중요합니다. 한 방식으로 통일하세요.',
      ],
      code: "// default export\nexport default function ProfileCard() {\n  return <article />;\n}\n\n// named export\nexport function Avatar() {\n  return <img alt=\"avatar\" />;\n}\n\nexport function ProfileMeta() {\n  return <div />;\n}",
    },
    {
      type: 'concept',
      heading: '05. Component Composition - 큰 화면은 조합으로 만든다',
      body: '첫 컴포넌트 학습의 핵심은 재사용보다 조합입니다. 큰 UI를 한 파일에서 만들기보다 작은 컴포넌트를 조합해야 변경 비용이 낮아집니다.',
      paragraphs: [
        '상위는 데이터/배치, 하위는 표현 역할을 담당하면 테스트와 디버깅이 쉬워집니다.',
        '반복되는 카드, 버튼, 배지 같은 요소는 작은 컴포넌트로 추출해 같은 규칙을 재사용합니다.',
      ],
      code: "function UserAvatar() {\n  return <img className=\"h-10 w-10 rounded-full\" alt=\"user\" />;\n}\n\nfunction UserInfo() {\n  return (\n    <div>\n      <h3>Jane Doe</h3>\n      <p>Frontend Engineer</p>\n    </div>\n  );\n}\n\nexport default function UserCard() {\n  return (\n    <article className=\"flex gap-3\">\n      <UserAvatar />\n      <UserInfo />\n    </article>\n  );\n}",
      misconceptions: [
        '"처음에는 한 파일로 빨리 만들고 나중에 분리하면 된다"는 방식은 보통 나중이 오지 않습니다. 첫 버전부터 최소한의 분리 기준을 적용해야 합니다.',
      ],
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
      misconceptions: [
        '"에러 메시지만 고치면 끝"이 아니라, 왜 그런 에러가 났는지 컴포넌트 모델 관점에서 복기해야 같은 문제가 반복되지 않습니다.',
      ],
    },
    {
      type: 'checkpoint',
      heading: 'Self Check - 첫 컴포넌트 핵심 규칙 점검',
      questions: [
        {
          q: 'React 컴포넌트 이름이 왜 대문자로 시작해야 하나요?',
          a: '소문자 태그는 HTML 요소로 해석되고, 대문자로 시작해야 사용자 정의 컴포넌트로 인식됩니다.',
        },
        {
          q: '여러 JSX 요소를 반환하려면 어떻게 해야 하나요?',
          a: '하나의 Root Element로 감싸거나 Fragment(<>...</>)로 묶어 반환해야 합니다.',
        },
        {
          q: 'default export와 named export는 언제 선택하는 게 좋나요?',
          a: '대표 컴포넌트 하나면 default export가 간결하고, 여러 컴포넌트를 함께 공개하면 named export가 의존성을 명확히 보여줍니다.',
        },
        {
          q: '컴포넌트 분리 기준을 한 줄로 말하면?',
          a: '반복되는 UI, 독립적으로 변경되는 영역, 책임이 섞이는 지점을 기준으로 분리합니다.',
        },
      ],
    },
    {
      type: 'checklist',
      heading: 'PR Review Kit - Your First Component 점검표',
      items: [
        '컴포넌트 이름이 대문자로 시작하는가?',
        'JSX 반환이 명확한가? (return 누락 없음)',
        'Root Element/Fragment 규칙을 지켰는가?',
        'export 방식(default/named)이 파일 역할과 일치하는가?',
        '한 컴포넌트가 하나의 역할을 수행하는가?',
        '중복되는 UI를 하위 컴포넌트로 추출했는가?',
        '상위 컴포넌트는 조합, 하위 컴포넌트는 표현 책임으로 분리됐는가?',
      ],
    },
  ],
};

const FALLBACK_ARTICLE_IMPORT_EXPORT_COMPONENTS: FrontendArticle = {
  id: 'react-importing-and-exporting-components',
  category: 'frontend',
  framework: 'react',
  title: 'React "Importing and Exporting Components" 심화 가이드',
  description:
    'ko.react.dev/learn/importing-and-exporting-components를 바탕으로, 컴포넌트 모듈 경계를 실무에서 유지보수 가능하게 설계하는 기준을 정리합니다.',
  summary:
    'default export와 named export 선택 기준, 파일 분리 전략, barrel(index.ts) 사용 범위, import 실수 점검 체크리스트까지 한 번에 다룹니다.',
  date: '2026-03-04',
  readTimeMinutes: 14,
  difficulty: 'Beginner',
  tags: ['React', 'Import/Export', 'Module Design', 'Barrel File', 'Code Organization'],
  sections: [
    {
      type: 'intro',
      heading: '프롤로그 - import/export는 문법이 아니라 경계 설계다',
      paragraphs: [
        'import/export는 단순 문법이 아니라 모듈 계약을 정하는 설계 도구입니다. 어떤 컴포넌트를 어디까지 공개할지 정하면, 팀의 변경 속도와 안정성이 같이 결정됩니다.',
        '공식 문서는 기본 문법을 설명하지만, 실무에서는 같은 개념이 의존성 얽힘을 막는 기준으로 작동합니다. 이번 글은 그 기준을 코드 리뷰 관점까지 연결합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '01. 컴포넌트 파일 분리 - 스케일을 위한 기본 규칙',
      body: '데모 단계에서는 한 파일에 여러 컴포넌트를 넣어도 되지만, 재사용되는 컴포넌트는 파일을 분리해야 변경 범위가 명확해집니다.',
      bullets: [
        '탐색성: 컴포넌트/테스트/스토리 위치를 빠르게 찾을 수 있습니다.',
        '소유권: 코드 리뷰 범위가 명확해집니다.',
        '리팩터 안정성: 한 컴포넌트 이동이 다른 import를 연쇄 수정시키지 않습니다.',
      ],
      code: "export default function Gallery() {\n  return (\n    <section>\n      <h1>Amazing scientists</h1>\n      <Profile />\n    </section>\n  );\n}\n\n// Profile.tsx\nexport default function Profile() {\n  return <img alt=\"Katherine Johnson\" src=\"https://i.imgur.com/MK3eW3As.jpg\" />;\n}",
      misconceptions: [
        '파일 분리를 과한 설계로 보는 경우가 많지만, 실제로는 나중의 대규모 정리 비용을 줄이는 가장 저렴한 예방책입니다.',
      ],
    },
    {
      type: 'concept',
      heading: '02. default export vs named export',
      body: '파일의 대표 컴포넌트가 하나면 default export가 간결하고, 모듈이 여러 API를 공개해야 하면 named export가 의존성 경계를 더 명확하게 만듭니다.',
      paragraphs: [
        'default export는 import 이름을 자유롭게 정할 수 있어 빠르지만, 큰 코드베이스에서는 이름 일관성이 깨지기 쉽습니다.',
        'named export는 이름을 고정해 자동 import 정확도와 리팩터 안정성을 높입니다.',
      ],
      code: "// default export\nexport default function Button() {\n  return <button type=\"button\">Save</button>;\n}\n\n// named export\nexport function IconButton() {\n  return <button type=\"button\">Icon</button>;\n}\n\n// import examples\nimport Button from './Button';\nimport { IconButton } from './IconButton';",
      misconceptions: [
        '정답은 하나가 아닙니다. 팀 규칙을 먼저 정하고 일관되게 유지하는 것이 더 중요합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '03. barrel(index.ts) 사용 범위',
      body: 'barrel 파일은 import를 간결하게 만들지만, 무분별한 재수출은 의존성을 숨기고 결합도를 높일 수 있습니다.',
      bullets: [
        '전역 mega-barrel 하나보다 기능 폴더 단위 local barrel이 안전합니다.',
        '안정적인 public API만 재수출합니다.',
        '내부 구현 전용 모듈은 재수출하지 않습니다.',
      ],
      code: "// good: feature-scoped barrel\n// components/profile/index.ts\nexport { ProfileCard } from './ProfileCard';\nexport { ProfileAvatar } from './ProfileAvatar';\n\n// usage\nimport { ProfileCard } from '@/components/profile';",
    },
    {
      type: 'checkpoint',
      heading: 'Self Check - 핵심 점검',
      questions: [
        {
          q: 'default export를 우선 고려할 상황은 언제인가요?',
          a: '파일이 대표 컴포넌트 하나를 중심으로 동작하고, 팀 규칙에서도 해당 패턴을 허용할 때입니다.',
        },
        {
          q: '전역 barrel 파일이 커질 때 가장 큰 위험은 무엇인가요?',
          a: '숨은 의존성이 늘어나고 모듈 경계가 흐려져 리팩터링 난이도가 급격히 올라갑니다.',
        },
        {
          q: '재사용 컴포넌트를 파일로 분리해야 하는 이유는?',
          a: '탐색성, 소유권 명확성, 리팩터 안전성이 모두 좋아져 프로젝트 규모가 커져도 유지보수가 가능합니다.',
        },
      ],
    },
    {
      type: 'checklist',
      heading: 'PR Review Kit',
      items: [
        '재사용 컴포넌트가 전용 파일 단위로 분리되어 있는가?',
        'default/named export 선택이 팀 규칙과 일관적인가?',
        'barrel 파일이 기능 범위로 제한되어 있고 public API만 노출하는가?',
        '근거 없는 deep private import를 사용하지 않았는가?',
        '새 팀원이 30초 내 모듈 소유권을 파악할 수 있는 구조인가?',
      ],
    },
  ],
};

const FALLBACK_ARTICLE_WRITING_MARKUP_WITH_JSX: FrontendArticle = {
  id: 'react-writing-markup-with-jsx',
  category: 'frontend',
  framework: 'react',
  title: 'React "Writing Markup with JSX" 심화 가이드',
  description:
    'ko.react.dev/learn/writing-markup-with-jsx를 기반으로 JSX 문법을 실수 없이 쓰는 규칙과 실무 체크포인트를 정리합니다.',
  summary:
    'JSX의 핵심 규칙(단일 루트, 모든 태그 닫기, camelCase 속성명)을 중심으로 자주 나는 오류와 리팩터링 패턴을 빠르게 정리합니다.',
  date: '2026-03-05',
  readTimeMinutes: 12,
  difficulty: 'Beginner',
  tags: ['React', 'JSX', 'Markup', 'Frontend Basics', 'Code Style'],
  sections: [
    {
      type: 'intro',
      heading: '프롤로그 - JSX는 보기엔 HTML 같지만 JavaScript 문법입니다',
      paragraphs: [
        'JSX는 HTML 문자열이 아니라 JavaScript 안에서 UI를 기술하는 문법 확장입니다.',
        '그래서 React가 요구하는 문법 규칙을 지키지 않으면 렌더링 이전 단계에서 바로 오류가 발생합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '01. 단일 루트 요소 규칙',
      body: '컴포넌트는 하나의 JSX 루트를 반환해야 합니다. 여러 요소를 반환하려면 Fragment로 감싸야 합니다.',
      code: "function Toolbar() {\n  return (\n    <>\n      <button>Save</button>\n      <button>Publish</button>\n    </>\n  );\n}",
      misconceptions: [
        'JSX는 브라우저가 바로 읽는 HTML이 아니라 `React.createElement(...)` 호출 결과인 JavaScript 객체로 변환됩니다. 함수는 한 번에 하나의 값만 반환할 수 있으므로, 형제 JSX를 그대로 두 개 반환할 수 없습니다. 그래서 상위 태그나 Fragment(`<>...</>`)로 묶어 단일 반환값(하나의 루트 트리)으로 만들어야 합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '02. 모든 태그는 닫아야 합니다',
      body: 'JSX는 XML 스타일 규칙을 따르므로 `<img>`, `<input>` 같은 빈 태그도 반드시 self-closing 형태로 닫아야 합니다.',
      code: "export default function Avatar() {\n  return <img src=\"/avatar.png\" alt=\"profile\" />;\n}",
      bullets: [
        '`<img />`, `<input />`, `<br />`처럼 끝 슬래시를 포함합니다.',
        '중첩 태그는 열고 닫는 구조가 정확히 맞아야 합니다.',
      ],
    },
    {
      type: 'concept',
      heading: '03. JSX 속성은 camelCase를 사용합니다',
      body: 'JSX 속성은 JavaScript 객체 키와 유사하게 동작하므로 `class` 대신 `className`, `stroke-width` 대신 `strokeWidth`를 사용합니다.',
      code: "<section className=\"card\">\n  <svg strokeWidth={2} aria-label=\"icon\" />\n</section>",
      misconceptions: [
        'HTML 속성명을 그대로 복사하면 동작할 거라 생각하기 쉽지만, JSX에서는 이름 규칙이 다릅니다.',
      ],
    },
    {
      type: 'checkpoint',
      heading: 'Self Check - 빠른 점검',
      questions: [
        {
          q: '컴포넌트가 형제 JSX 요소 두 개를 직접 반환하면 왜 오류가 나나요?',
          a: 'JSX 반환값은 단일 루트여야 하기 때문입니다. Fragment 또는 상위 요소로 묶어야 합니다.',
        },
        {
          q: '`<img>`를 JSX에서 단독으로 쓰면 왜 문제인가요?',
          a: 'JSX는 태그를 닫아야 하므로 `<img />`처럼 self-closing으로 작성해야 합니다.',
        },
        {
          q: '왜 `class` 대신 `className`을 써야 하나요?',
          a: 'JSX는 JavaScript 문법 위에서 동작하고 `class`는 JS 예약어이기 때문에 `className`을 사용합니다.',
        },
      ],
    },
    {
      type: 'checklist',
      heading: 'PR Review Kit',
      items: [
        '컴포넌트 반환 JSX가 단일 루트(또는 Fragment)인지 확인했는가?',
        '빈 태그가 모두 self-closing(`/>`) 형태인지 확인했는가?',
        '속성명이 JSX 규칙(camelCase, className, htmlFor)에 맞는가?',
        '복잡한 마크업은 작은 컴포넌트로 분리해 가독성을 확보했는가?',
      ],
    },
  ],
};

const FALLBACK_ARTICLES: FrontendArticle[] = [
  FALLBACK_ARTICLE_WRITING_MARKUP_WITH_JSX,
  FALLBACK_ARTICLE_IMPORT_EXPORT_COMPONENTS,
  FALLBACK_ARTICLE_YOUR_FIRST_COMPONENT,
  FALLBACK_ARTICLE,
];

function fallbackFindById(id: string): FrontendArticle | null {
  return FALLBACK_ARTICLES.find((article) => article.id === id) ?? null;
}

function canUseDb() {
  return Boolean(process.env.DATABASE_URL);
}

function isMissingTableError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'P2021'
  );
}

function parseSections(value: unknown): FrontendArticleSection[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is FrontendArticleSection => {
    if (!entry || typeof entry !== 'object') return false;
    const obj = entry as { heading?: unknown; type?: unknown };
    return typeof obj.heading === 'string' && typeof obj.type === 'string';
  });
}

function toArticle(row: any): FrontendArticle {
  return {
    id: row.id,
    category: 'frontend',
    framework: row.framework,
    title: row.title,
    description: row.description,
    summary: row.summary,
    date: row.publishedAt.toISOString().slice(0, 10),
    readTimeMinutes: row.readTimeMinutes,
    difficulty: row.difficulty,
    tags: row.tags,
    sections: parseSections(row.sections),
  };
}

function toListItem(row: any): FrontendArticleListItem {
  return {
    id: row.id,
    category: 'frontend',
    framework: row.framework,
    title: row.title,
    description: row.description,
    date: row.publishedAt.toISOString().slice(0, 10),
    readTimeMinutes: row.readTimeMinutes,
    difficulty: row.difficulty,
    tags: row.tags,
  };
}

async function fallbackFindByFramework(
  framework: FrontendFramework
): Promise<FrontendArticleListItem[]> {
  return FALLBACK_ARTICLES
    .filter((article) => article.framework === framework)
    .sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      return a.title.localeCompare(b.title);
    })
    .map((article) => ({
      id: article.id,
      category: article.category,
      framework: article.framework,
      title: article.title,
      description: article.description,
      date: article.date,
      readTimeMinutes: article.readTimeMinutes,
      difficulty: article.difficulty,
      tags: article.tags,
    }));
}

export async function getFrontendArticlesByFramework(
  framework: FrontendFramework
): Promise<FrontendArticleListItem[]> {
  if (!canUseDb()) return fallbackFindByFramework(framework);

  try {
    const prisma = getPrismaClient();
    const rows = await prisma.frontendArticle.findMany({
      where: { framework },
      orderBy: [{ publishedAt: 'desc' }, { title: 'asc' }],
    });

    return rows.map(toListItem);
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error('[frontend-articles-repository] getFrontendArticlesByFramework failed', error);
    }
    return fallbackFindByFramework(framework);
  }
}

export async function getFrontendArticleById(id: string): Promise<FrontendArticle | null> {
  if (!canUseDb()) {
    return fallbackFindById(id);
  }

  try {
    const prisma = getPrismaClient();
    const row = await prisma.frontendArticle.findUnique({
      where: { id },
    });

    if (!row) return null;
    return toArticle(row);
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error('[frontend-articles-repository] getFrontendArticleById failed', error);
    }
    return fallbackFindById(id);
  }
}

export async function getFrontendArticleMetaById(
  id: string
): Promise<FrontendArticleListItem | null> {
  const article = await getFrontendArticleById(id);
  if (!article) return null;

  return {
    id: article.id,
    category: article.category,
    framework: article.framework,
    title: article.title,
    description: article.description,
    date: article.date,
    readTimeMinutes: article.readTimeMinutes,
    difficulty: article.difficulty,
    tags: article.tags,
  };
}

export async function getAdjacentFrontendArticles(framework: FrontendFramework, currentId: string) {
  const posts = await getFrontendArticlesByFramework(framework);
  const currentIndex = posts.findIndex((p) => p.id === currentId);

  if (currentIndex < 0) return { prev: null, next: null };

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

export async function getFrontendFrameworkCounts() {
  const [reactPosts, vuePosts, nextPosts] = await Promise.all([
    getFrontendArticlesByFramework('react'),
    getFrontendArticlesByFramework('vue'),
    getFrontendArticlesByFramework('nextjs'),
  ]);

  return {
    react: reactPosts.length,
    vue: vuePosts.length,
    nextjs: nextPosts.length,
    total: reactPosts.length + vuePosts.length + nextPosts.length,
  };
}

