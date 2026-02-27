import { AifImageClassificationMetricDiagram } from '@/components/blog/AifImageClassificationMetricDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Classification Metrics',
    date: '2026. 02. 27',
    title: '식물 잎 질병 이미지 분류에서 정답 개수 평가 지표',
    description:
      '이미지 분류 문제에서 모델이 올바르게 분류한 비율을 직접 측정하는 지표가 무엇인지 확인합니다.',
  },
  diagram: <AifImageClassificationMetricDiagram />,
  analyze: {
    scenario: {
      english:
        'A company has built an image classification model to predict plant diseases from photos of plant leaves. The company wants to evaluate how many images the model classified correctly. Which evaluation metric should the company use to measure the model\'s performance?',
      korean:
        '회사에서 식물 잎 사진으로 질병을 예측하는 이미지 분류 모델을 만들었다. 모델이 얼마나 많은 이미지를 올바르게 분류했는지 평가하려면 어떤 지표를 사용해야 할까?',
    },
    requirements: [
      {
        num: 1,
        title: '문제 유형',
        desc: '문제는 연속값 예측이 아니라 클래스 라벨을 맞히는 분류 문제다.',
        keyword: 'Classification',
      },
      {
        num: 2,
        title: '측정 대상',
        desc: '관심사는 예측이 맞은 이미지 개수(혹은 비율) 자체다.',
        keyword: 'Correct Predictions',
      },
      {
        num: 3,
        title: '지표 적합성',
        desc: '정답 개수 비율을 가장 직접적으로 나타내는 지표가 필요하다.',
        keyword: 'Accuracy',
      },
      {
        num: 4,
        title: '오답 선지 점검',
        desc: 'R2/RMSE는 회귀용 지표이며, learning rate는 학습 하이퍼파라미터다.',
        keyword: 'Not Regression',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '결정계수 (R-squared score)',
        isCorrect: false,
        explanation: 'R-squared는 회귀 모델의 설명력을 평가하는 지표라서 분류 정답 개수를 직접 측정하지 못한다.',
      },
      {
        id: 'B',
        text: '정확도 (Accuracy)',
        isCorrect: true,
        explanation:
          '정답이다. Accuracy는 전체 이미지 중 모델이 맞게 분류한 비율을 직접 측정하므로 요구사항과 정확히 일치한다.',
      },
      {
        id: 'C',
        text: '평균제곱근오차 (Root Mean Squared Error, RMSE)',
        isCorrect: false,
        explanation: 'RMSE는 연속값 오차를 다루는 회귀 지표이며 분류의 정답 비율을 표현하지 않는다.',
      },
      {
        id: 'D',
        text: '학습률 (Learning Rate)',
        isCorrect: false,
        explanation: 'Learning rate는 모델 학습 속도에 관한 하이퍼파라미터로 평가 지표가 아니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '📊',
      title: 'Accuracy',
      desc: [
        '분류에서 가장 기본적인 성능 지표',
        '전체 샘플 중 맞춘 샘플의 비율을 계산',
        '질문의 “몇 개를 맞췄는가” 요구를 직접 반영',
      ],
      subTitle: '정답 개수/비율 평가에 가장 직접적인 지표',
    },
    others: [
      {
        title: 'R-squared score',
        items: ['회귀 문제에서 적합도 판단에 사용', '분류 정확 개수 평가에는 부적합'],
      },
      {
        title: 'RMSE',
        items: ['연속형 예측 오차 크기 측정', '분류 라벨 정오판단과 목적 불일치'],
      },
      {
        title: 'Learning rate',
        items: ['학습 과정 제어용 하이퍼파라미터', '모델 성능 평가 지표가 아님'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 문제에서 “몇 개를 맞췄는지”를 묻는다면 분류에서는 우선 Accuracy를 떠올리면 된다.
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
                <td className="p-3 font-bold text-green-700 dark:text-green-400">B. Accuracy</td>
                <td className="p-3">전체 샘플 중 정답 비율 측정</td>
                <td className="p-3">&quot;몇 개를 맞췄는가&quot; 요구와 정확히 일치</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">A. R-squared</td>
                <td className="p-3">회귀 모델 설명력 지표</td>
                <td className="p-3">분류 정오 판단 지표가 아님</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">C. RMSE</td>
                <td className="p-3">회귀 오차 크기 측정</td>
                <td className="p-3">연속값 예측용이라 분류 문제에 부적합</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. Learning Rate</td>
                <td className="p-3">학습 하이퍼파라미터</td>
                <td className="p-3">평가 메트릭이 아니므로 오답</td>
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
              <li>키워드: classification, correctly classified</li>
              <li>정답 개수/비율을 묻는 문장은 Accuracy 우선</li>
              <li>문제 유형이 분류인지 회귀인지 먼저 확정</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 신호</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>회귀 지표(R2, RMSE)를 분류에 가져오는 실수</li>
              <li>학습 파라미터를 평가 지표로 착각</li>
              <li>메트릭 정의를 묻는데 튜닝 파라미터를 고르는 경우</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
