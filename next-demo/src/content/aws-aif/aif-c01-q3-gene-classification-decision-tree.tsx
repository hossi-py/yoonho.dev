import { AifGeneDecisionTreeDiagram } from '@/components/blog/AifGeneDecisionTreeDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'ML Algorithm Selection',
    date: '2026. 02. 26',
    title: '유전자 20개 범주 분류와 모델 내부 설명 가능성',
    description:
      '유전자 특성 기반 다중 분류 문제에서 모델의 내부 작동 원리를 문서화해야 할 때 어떤 알고리즘이 적합한지 정리합니다.',
  },
  diagram: <AifGeneDecisionTreeDiagram />,
  analyze: {
    scenario: {
      english:
        'A company wants to classify human genes into 20 categories based on gene characteristics. The company needs an ML algorithm to document how the inner mechanism of the model affects the output. Which ML algorithm meets these requirements?',
      korean:
        '회사가 유전자 특성을 기반으로 인간 유전자를 20개 범주로 분류하려고 합니다. 또한 모델의 내부 메커니즘이 출력에 어떤 영향을 주는지 문서화해야 합니다. 어떤 ML 알고리즘이 요구사항에 가장 적합할까요?',
    },
    requirements: [
      {
        num: 1,
        title: 'Multi-class Classification',
        desc: '20개 카테고리 분류가 가능한 알고리즘이어야 합니다.',
        keyword: 'Classification',
      },
      {
        num: 2,
        title: 'Explainable Mechanism',
        desc: '모델 내부 의사결정 과정을 사람이 추적하고 설명할 수 있어야 합니다.',
        keyword: 'Interpretability',
      },
      {
        num: 3,
        title: 'Rule-based Documentation',
        desc: '출력이 어떤 분기/규칙으로 결정되는지 문서화하기 쉬워야 합니다.',
        keyword: 'Traceability',
      },
      {
        num: 4,
        title: 'Practical Reporting',
        desc: '이해관계자에게 모델 동작 원리를 직관적으로 전달할 수 있어야 합니다.',
        keyword: 'Transparency',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'Decision trees',
        isCorrect: true,
        explanation:
          '정답입니다. Decision Tree는 분기 규칙을 통해 결과가 도출되는 과정을 명확히 추적할 수 있어 내부 메커니즘 문서화에 가장 적합합니다.',
      },
      {
        id: 'B',
        text: 'Linear regression',
        isCorrect: false,
        explanation: '선형 회귀는 연속값 예측이 목적이며, 20개 범주의 다중 분류 문제에 직접적이지 않습니다.',
      },
      {
        id: 'C',
        text: 'Logistic regression',
        isCorrect: false,
        explanation:
          '다중 분류 확장은 가능하지만, 문제의 핵심인 내부 메커니즘의 직관적 문서화 측면에서는 Decision Tree가 더 적합합니다.',
      },
      {
        id: 'D',
        text: 'Neural networks',
        isCorrect: false,
        explanation: '신경망은 성능은 높을 수 있으나 내부 동작 해석과 문서화가 상대적으로 어렵습니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🌳',
      title: 'Decision Tree',
      desc: [
        '특성 임계값 기반 분기 구조를 명시적으로 제공',
        '각 출력이 어떤 규칙 경로를 거쳤는지 추적 가능',
        '모델 해석/감사 보고서 작성에 유리',
      ],
      subTitle: '설명 가능성이 필요한 분류 문제의 기본 선택지',
    },
    others: [
      {
        title: 'Linear Regression',
        items: ['연속값 예측에 적합', '범주형 다중 분류 문제와 목적 불일치'],
      },
      {
        title: 'Logistic Regression',
        items: ['분류 문제에 사용 가능', '결정 경로 설명 직관성은 트리 대비 낮음'],
      },
      {
        title: 'Neural Networks',
        items: ['복잡한 패턴 학습에 강점', '내부 메커니즘 문서화 요구에는 불리'],
        warning: 'High performance != High explainability',
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 문제에서 “내부 메커니즘을 문서화”하라고 하면 블랙박스 모델보다
        규칙 기반 경로를 설명할 수 있는 트리 계열을 우선 고려해야 합니다.
      </p>
    ),
  },
  deepDive: (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">빠른 복습 포인트</h3>
      <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <li>설명 가능성 요구가 강하면 Decision Tree/Rule-based 모델을 먼저 검토합니다.</li>
        <li>다중 분류 가능 여부 + 설명 가능성 요구를 함께 읽어야 합니다.</li>
        <li>신경망은 정확도가 높아도 해석/문서화 요구에서는 오답 패턴이 됩니다.</li>
      </ul>
    </div>
  ),
};

export default content;
