import { AifExplainabilityDiagram } from '@/components/blog/AifExplainabilityDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Explainability',
    date: '2026. 02. 26',
    title: '예측 모델 설명 가능성 보고서와 PDP',
    description:
      '투명성과 설명가능성 요구를 만족하는 보고서 항목을 고르는 문제입니다. 핵심은 특성 영향도를 보여주는 시각화입니다.',
  },
  diagram: <AifExplainabilityDiagram />,
  analyze: {
    scenario: {
      english:
        'A company makes forecasts each quarter to decide how to optimize operations to meet expected demand. The company uses ML models to make these forecasts. An AI practitioner is writing a report about the trained ML models to provide transparency and explainability to company stakeholders. What should the AI practitioner include in the report to meet the transparency and explainability requirements?',
      korean:
        '회사가 분기별 수요 예측을 위해 ML 모델을 사용한다. 이해관계자에게 투명성과 설명가능성을 제공하기 위한 보고서를 작성할 때 어떤 항목을 포함해야 할까?',
    },
    requirements: [
      {
        num: 1,
        title: 'Transparency',
        desc: '비기술 이해관계자가 모델 근거를 이해할 수 있어야 한다.',
        keyword: 'Interpretability',
      },
      {
        num: 2,
        title: 'Explainability',
        desc: '예측 결과에 대한 특성 영향도를 명시해야 한다.',
        keyword: 'Explainability',
      },
      {
        num: 3,
        title: 'Stakeholder Report',
        desc: '코드보다 해석 가능한 시각화와 요약이 중요하다.',
        keyword: 'Business Readability',
      },
      {
        num: 4,
        title: 'Model Insight',
        desc: '학습 로그보다 입력 특성과 예측 간 관계 설명이 핵심이다.',
        keyword: 'Feature Effect',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '모델 학습 코드 (Training Code)',
        isCorrect: false,
        explanation: '구현 정보는 제공하지만 이해관계자 설명 자료로는 직접성이 낮다.',
      },
      {
        id: 'B',
        text: '부분 의존도 플롯 (Partial Dependence Plots, PDPs)',
        isCorrect: true,
        explanation:
          '정답이다. PDP는 특정 특성이 예측값에 미치는 영향을 시각화해 투명성과 설명가능성 요구를 직접 충족한다.',
      },
      {
        id: 'C',
        text: '학습 샘플 데이터 (Sample Training Data)',
        isCorrect: false,
        explanation: '데이터 자체는 참고 자료이며 예측 근거를 직접 설명하지 못한다.',
      },
      {
        id: 'D',
        text: '모델 수렴 테이블 (Model Convergence Tables)',
        isCorrect: false,
        explanation: '수렴 정보는 학습 안정성 지표이지 설명가능성 결과물은 아니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '📈',
      title: 'Model Explainability (PDP)',
      desc: [
        '특성 변화에 따른 예측 변화량을 시각화',
        '이해관계자에게 모델 근거를 설명하기 용이',
        '투명성/설명가능성 보고서 핵심 자료',
      ],
      subTitle: '설명가능성 요구를 직접 충족',
    },
    others: [
      {
        title: 'Training Code',
        items: ['구현/재현 관점 문서에는 유용', '비즈니스 설명 자료로는 직접성 낮음'],
        warning: 'Explainability 요구와 직접 매칭되지 않음',
      },
      {
        title: 'Sample Data',
        items: ['데이터 분포 확인 가능', '예측 근거 설명에는 한계'],
      },
      {
        title: 'Convergence Tables',
        items: ['학습 안정성 확인', '특성 영향 설명 자료로는 부적합'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 설명가능성 문제에서 코드/로그보다 특성 영향 시각화(PDP, SHAP)가 우선이다.
      </p>
    ),
  },
  deepDive: (
    <>
      <div className="space-y-5">
        <h3 className="text-lg font-bold">비교 테이블</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b dark:border-slate-700">
                <th className="p-3 font-bold whitespace-nowrap">옵션</th>
                <th className="p-3 font-bold whitespace-nowrap">적합 상황</th>
                <th className="p-3 font-bold whitespace-nowrap">한계</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="p-3 font-bold text-green-700 dark:text-green-400">B. PDP</td>
                <td className="p-3">특성 값 변화가 예측에 미치는 영향 시각화</td>
                <td className="p-3">투명성/설명가능성 요구를 직접 충족</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">A. Training Code</td>
                <td className="p-3">모델 구현 방식 공유</td>
                <td className="p-3">예측 근거 설명 자료로는 직접성이 낮음</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">C. Sample Data</td>
                <td className="p-3">데이터 예시 확인</td>
                <td className="p-3">모델이 왜 그렇게 예측했는지 설명 불가</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. Convergence Table</td>
                <td className="p-3">학습 수렴/안정성 확인</td>
                <td className="p-3">훈련 상태 지표일 뿐 설명가능성 결과물이 아님</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">시험장 치트키 (Cheat Sheet)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-l-4 border-l-green-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">정답 신호</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>키워드: transparency, explainability, stakeholder report</li>
              <li>특성 영향 시각화(PDP/SHAP)를 요구하면 정답 후보</li>
              <li>비기술 이해관계자가 해석 가능한 산출물인지 확인</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 신호</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>코드/로그/수렴표처럼 학습 과정 정보만 제공</li>
              <li>설명가능성 대신 구현 상세를 강조하는 선택지</li>
              <li>예측 근거를 시각적으로 전달하지 못하는 경우</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
