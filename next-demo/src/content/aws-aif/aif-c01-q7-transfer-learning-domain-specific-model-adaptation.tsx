import { AifTransferLearningDiagram } from '@/components/blog/AifTransferLearningDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Model Adaptation',
    date: '2026. 02. 27',
    title: '도메인 특화 모델 확장: Transfer Learning 선택',
    description:
      '새 모델을 처음부터 만들지 않고 사전학습 모델을 유사한 신규 태스크에 빠르게 적응시키는 전략을 정리합니다.',
  },
  diagram: <AifTransferLearningDiagram />,
  analyze: {
    scenario: {
      english:
        'A company is using domain-specific models. The company wants to avoid creating new models from the beginning. The company instead wants to adapt pre-trained models to create models for new, related tasks. Which ML strategy meets these requirements?',
      korean:
        '회사가 도메인 특화 모델을 사용 중이다. 회사는 새 모델을 처음부터 만들고 싶지 않고, 사전학습 모델을 유사한 신규 태스크에 맞게 적응시키고 싶다. 어떤 ML 전략이 가장 적합한가?',
    },
    requirements: [
      {
        num: 1,
        title: '처음부터 재학습 회피',
        desc: '새 모델을 full training으로 처음부터 만드는 방식은 피해야 한다.',
        keyword: 'Avoid Training from Scratch',
      },
      {
        num: 2,
        title: '사전학습 모델 재사용',
        desc: '이미 학습된 가중치를 활용해 개발 시간과 비용을 줄여야 한다.',
        keyword: 'Pre-trained Model Reuse',
      },
      {
        num: 3,
        title: '유사 태스크 적응',
        desc: '관련성이 있는 신규 작업에 모델을 빠르게 맞춰야 한다.',
        keyword: 'Related Task Adaptation',
      },
      {
        num: 4,
        title: '오답 구분',
        desc: 'epoch 증감은 학습 길이 조정일 뿐 전략 자체가 아니며, 비지도학습은 목적이 다르다.',
        keyword: 'Strategy vs Hyperparameter',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '에폭 수 증가 (Increase the number of epochs)',
        isCorrect: false,
        explanation: '에폭 증가는 학습 반복 횟수 조정일 뿐, 사전학습 모델 재사용 전략을 의미하지 않는다.',
      },
      {
        id: 'B',
        text: '전이학습 사용 (Use transfer learning)',
        isCorrect: true,
        explanation:
          '정답이다. Transfer Learning은 사전학습 모델을 기반으로 유사한 신규 태스크에 빠르게 적응시키는 대표 전략이다.',
      },
      {
        id: 'C',
        text: '에폭 수 감소 (Decrease the number of epochs)',
        isCorrect: false,
        explanation: '에폭 감소 역시 학습 길이 조절일 뿐이며, 모델 재사용/적응 전략을 제공하지 않는다.',
      },
      {
        id: 'D',
        text: '비지도학습 사용 (Use unsupervised learning)',
        isCorrect: false,
        explanation: '비지도학습은 라벨 없는 패턴 탐색에 초점이 있어 요구사항의 핵심과 다르다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🔁',
      title: 'Transfer Learning',
      subTitle: '사전학습 모델 재사용 + 신규 유사 태스크 적응',
      desc: [
        '기존 모델의 지식을 재사용해 학습 시간 단축',
        '적은 데이터로도 빠르게 성능 확보 가능',
        '도메인 유사 태스크 확장에 실무적으로 가장 효율적',
      ],
    },
    others: [
      {
        title: 'Increase/Decrease Epochs',
        items: ['학습 반복 횟수 조절 하이퍼파라미터', '전략이 아니라 튜닝 옵션'],
        warning: '요구사항의 핵심(재사용/적응)을 해결하지 못함',
      },
      {
        title: 'Unsupervised Learning',
        items: ['라벨 없는 데이터에서 패턴 탐색', '유사 태스크 적응 전략과 목적 차이'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 문제에
        {' '}
        <strong>pre-trained model adapt to new related task</strong>
        {' '}
        가 나오면 Transfer Learning을 우선 선택한다.
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
                <th className="p-3 font-bold whitespace-nowrap">의미</th>
                <th className="p-3 font-bold whitespace-nowrap">판단 포인트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="p-3 font-bold text-green-700 dark:text-green-400">B. Transfer Learning</td>
                <td className="p-3">사전학습 모델을 유사 태스크로 전이</td>
                <td className="p-3">문제 요구(재사용 + 신규 적응)와 1:1 일치</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">A. Epoch 증가</td>
                <td className="p-3">학습 반복 횟수 증가</td>
                <td className="p-3">하이퍼파라미터 조정일 뿐 전략 아님</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">C. Epoch 감소</td>
                <td className="p-3">학습 반복 횟수 감소</td>
                <td className="p-3">재사용/적응 요구를 해결하지 못함</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. Unsupervised Learning</td>
                <td className="p-3">라벨 없이 패턴 학습</td>
                <td className="p-3">문제의 핵심 목적과 직접 연결되지 않음</td>
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
              <li>키워드: pre-trained, adapt, related task</li>
              <li>처음부터 새 모델 학습을 피하고 싶다는 문장</li>
              <li>개발 시간/데이터를 절약하며 성능 확보가 목표</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 패턴</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>하이퍼파라미터(epoch)를 전략으로 착각</li>
              <li>학습 방식(unsupervised)과 적응 전략을 혼동</li>
              <li>문제의 핵심 동사 adapt/reuse를 놓치는 경우</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
