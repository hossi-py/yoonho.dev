import { AifExplainabilityDiagram } from '@/components/blog/AifExplainabilityDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Explainability',
    date: '2026. 02. 26',
    title: '예측 모델 설명 가능성 보고서와 PDP',
    description:
      '분기 수요 예측 모델의 투명성/설명가능성 요구사항을 만족하려면 보고서에 무엇을 넣어야 하는지 정리합니다.',
  },
  diagram: <AifExplainabilityDiagram />,
  analyze: {
    scenario: {
      english:
        'A company makes forecasts each quarter to decide how to optimize operations to meet expected demand. The company uses ML models to make these forecasts. An AI practitioner is writing a report about the trained ML models to provide transparency and explainability to company stakeholders. What should the AI practitioner include in the report to meet the transparency and explainability requirements?',
      korean:
        '회사는 예상 수요를 맞추기 위해 분기마다 운영 최적화 결정을 내리고, 이를 위해 ML 모델로 수요를 예측합니다. AI 실무자가 이해관계자에게 투명성과 설명가능성을 제공하기 위한 보고서를 작성하고 있습니다. 이 요구사항을 충족하려면 보고서에 무엇을 포함해야 할까요?',
    },
    requirements: [
      {
        num: 1,
        title: 'Transparency',
        desc: '모델이 어떤 특성에 영향을 받는지 이해관계자가 해석할 수 있어야 합니다.',
        keyword: 'Interpretability',
      },
      {
        num: 2,
        title: 'Explainability',
        desc: '예측 결과에 대한 설명 근거를 시각화해 전달해야 합니다.',
        keyword: 'Explainability',
      },
      {
        num: 3,
        title: 'Stakeholder Report',
        desc: '개발자 코드보다 비기술 이해관계자도 이해할 수 있는 형태가 중요합니다.',
        keyword: 'Business Readability',
      },
      {
        num: 4,
        title: 'Model Insight',
        desc: '학습 과정 로그보다 입력 특성과 결과의 관계를 설명하는 자료가 적합합니다.',
        keyword: 'Feature Effect',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'Code for model training',
        isCorrect: false,
        explanation: '코드는 재현성에는 도움이 되지만, 비기술 이해관계자에게 설명가능성을 직접 제공하지는 않습니다.',
      },
      {
        id: 'B',
        text: 'Partial dependence plots (PDPs)',
        isCorrect: true,
        explanation:
          '정답입니다. PDP는 특정 특성이 예측값에 미치는 영향을 보여 주어 투명성과 설명가능성 요구에 직접 부합합니다.',
      },
      {
        id: 'C',
        text: 'Sample data for training',
        isCorrect: false,
        explanation: '샘플 데이터만으로는 모델의 의사결정 구조와 특성 영향도를 설명하기 어렵습니다.',
      },
      {
        id: 'D',
        text: 'Model convergence tables',
        isCorrect: false,
        explanation: '수렴 표는 학습 안정성 지표이며, 예측 결과 해석을 위한 설명자료로는 제한적입니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🔎',
      title: 'Model Explainability (PDP)',
      desc: [
        '특성 값 변화에 따른 예측 변화량을 시각화',
        '비기술 이해관계자에게 모델 동작 원리 전달 가능',
        '투명성/설명가능성 보고서의 핵심 근거로 활용',
      ],
      subTitle: '설명가능성 요구를 직접 충족',
    },
    others: [
      {
        title: 'Code for model training',
        items: ['개발 관점 문서에는 유용', '이해관계자 설명자료로는 난이도가 높음'],
        warning: 'Explainability 요구와 직접 연결되지 않음',
      },
      {
        title: 'Sample training data',
        items: ['데이터 예시는 참고 자료', '예측에 대한 인과/영향 설명은 부족'],
      },
      {
        title: 'Convergence tables',
        items: ['학습 과정 품질 지표', '특성 영향도 설명에는 부적합'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 투명성과 설명가능성을 묻는 문제에서는 모델 내부 학습 로그보다
        특성 영향도를 설명하는 시각화(PDP, SHAP)가 정답 패턴입니다.
      </p>
    ),
  },
  deepDive: (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">빠른 복습 포인트</h3>
      <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <li>투명성/설명가능성 요구면 Feature Effect 시각화를 우선 떠올리세요.</li>
        <li>코드, 학습 데이터, 수렴 로그는 보조자료일 뿐 핵심 정답은 아닙니다.</li>
        <li>PDP는 특성-예측 관계를 직관적으로 설명하는 대표 도구입니다.</li>
      </ul>
    </div>
  ),
};

export default content;
