import { AifGeneDecisionTreeDiagram } from '@/components/blog/AifGeneDecisionTreeDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'ML Algorithm Selection',
    date: '2026. 02. 26',
    title: '유전자 20개 범주 분류: 설명 가능한 알고리즘 선택',
    description:
      '다중 분류 문제에서 모델 내부 동작을 문서화해야 할 때 어떤 알고리즘이 맞는지 비교합니다.',
  },
  diagram: <AifGeneDecisionTreeDiagram />,
  analyze: {
    scenario: {
      english:
        'A company wants to classify human genes into 20 categories based on gene characteristics. The company needs an ML algorithm to document how the inner mechanism of the model affects the output. Which ML algorithm meets these requirements?',
      korean:
        '회사가 유전자 특성으로 사람 유전자를 20개 범주로 분류하려고 한다. 또한 모델 내부 메커니즘이 출력에 어떤 영향을 주는지 문서화해야 한다. 어떤 ML 알고리즘이 가장 적합한가?',
    },
    requirements: [
      {
        num: 1,
        title: '다중 분류',
        desc: '20개 클래스를 예측하는 분류(Classification) 문제다.',
        keyword: 'Multi-class Classification',
      },
      {
        num: 2,
        title: '설명 가능성',
        desc: '모델 내부 의사결정 과정을 사람이 이해할 수 있어야 한다.',
        keyword: 'Interpretability',
      },
      {
        num: 3,
        title: '문서화 용이성',
        desc: '출력 근거를 규칙/분기로 설명 가능해야 한다.',
        keyword: 'Traceability',
      },
      {
        num: 4,
        title: '오답 유형 구분',
        desc: '회귀/군집화/차원축소와 분류 모델을 구분해야 한다.',
        keyword: 'Algorithm Fit',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '선형 회귀 (Linear Regression)',
        isCorrect: false,
        explanation: '선형 회귀는 연속값 예측 모델로 분류 라벨 예측 목적과 맞지 않는다.',
      },
      {
        id: 'B',
        text: 'K-means 클러스터링',
        isCorrect: false,
        explanation: 'K-means는 비지도 학습으로 라벨이 있는 분류 문제의 정답 모델이 아니다.',
      },
      {
        id: 'C',
        text: '의사결정 트리 (Decision Tree)',
        isCorrect: true,
        explanation:
          '정답이다. Decision Tree는 분류에 적합하며, 분기 규칙을 통해 예측 근거를 문서화하기 쉬워 설명가능성 요구를 충족한다.',
      },
      {
        id: 'D',
        text: '주성분 분석 (PCA)',
        isCorrect: false,
        explanation: 'PCA는 차원 축소 기법으로 단독 분류 알고리즘이 아니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🌳',
      title: 'Decision Tree',
      subTitle: '분류 + 설명가능성 요구를 동시에 만족',
      desc: [
        '분류 경로가 규칙 형태로 명확하게 드러남',
        '예측 근거를 문서화하기 쉬움',
        '다중 클래스 분류 문제에 자연스럽게 적용 가능',
      ],
    },
    others: [
      {
        title: 'Linear Regression',
        items: ['연속형 값 예측', '분류 라벨 예측과 목적 불일치'],
        warning: 'Classification 문제에서는 1차적으로 제외',
      },
      {
        title: 'K-means',
        items: ['비지도 군집화', '정답 라벨 기반 분류가 아님'],
      },
      {
        title: 'PCA',
        items: ['차원 축소/전처리', '단독 분류 모델이 아님'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 문제에
        {' '}
        <strong>classify + explain/document mechanism</strong>
        {' '}
        이 동시에 나오면 Decision Tree를 우선 검토한다.
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
                <th className="p-3 font-bold whitespace-nowrap">선지</th>
                <th className="p-3 font-bold whitespace-nowrap">역할</th>
                <th className="p-3 font-bold whitespace-nowrap">판단 포인트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="p-3 font-bold text-green-700 dark:text-green-400">C. Decision Tree</td>
                <td className="p-3">지도학습 분류 + 규칙 기반 분기</td>
                <td className="p-3">분류 정확성과 설명 가능성을 함께 만족</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">A. Linear Regression</td>
                <td className="p-3">회귀(Regression)</td>
                <td className="p-3">문제 유형 자체가 다름</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">B. K-means</td>
                <td className="p-3">비지도 군집화</td>
                <td className="p-3">라벨 기반 분류 문제에 부적합</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. PCA</td>
                <td className="p-3">차원 축소</td>
                <td className="p-3">전처리 기법이지 최종 분류기가 아님</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">시험장 치트키 (Cheat Sheet)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-l-4 border-l-green-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">정답 트리거</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>키워드: classification, interpretable, document mechanism</li>
              <li>규칙 기반 설명이 필요하면 Decision Tree 우선</li>
              <li>분류 문제인지 먼저 확정한 뒤 모델 고르기</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 패턴</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>Regression/Clustering/PCA를 분류 모델로 착각</li>
              <li>설명가능성 요구를 무시하고 정확도만 보는 접근</li>
              <li>전처리 기법을 최종 해법으로 오해</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
