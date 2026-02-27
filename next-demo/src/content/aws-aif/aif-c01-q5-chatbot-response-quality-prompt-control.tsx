import { AifPromptControlDiagram } from '@/components/blog/AifPromptControlDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Prompt Engineering',
    date: '2026. 02. 27',
    title: 'LLM 답변 길이/언어 제어: Prompt 조정',
    description:
      '사전학습 LLM 출력을 짧게 만들고 특정 언어로 고정해야 할 때 가장 먼저 선택해야 하는 방법을 정리합니다.',
  },
  diagram: <AifPromptControlDiagram />,
  analyze: {
    scenario: {
      english:
        'A company is using a pre-trained large language model (LLM) to build a chatbot for product recommendations. The company needs the LLM outputs to be short and written in a specific language. Which solution will align the LLM response quality with the company\'s expectations?',
      korean:
        '회사가 사전학습 LLM으로 상품 추천 챗봇을 만든다. 답변은 짧고 특정 언어로 출력되어야 한다. 어떤 방법이 요구사항을 가장 잘 맞출까?',
    },
    requirements: [
      {
        num: 1,
        title: '출력 형식 제어',
        desc: '답변 길이와 언어를 직접 제어해야 한다.',
        keyword: 'Output Control',
      },
      {
        num: 2,
        title: '빠른 적용',
        desc: '모델 재학습/교체보다 즉시 적용 가능한 방법이 유리하다.',
        keyword: 'Fast Iteration',
      },
      {
        num: 3,
        title: '일관성',
        desc: '랜덤성 증가보다 일관된 응답 품질이 중요하다.',
        keyword: 'Consistency',
      },
      {
        num: 4,
        title: '오답 선지 구분',
        desc: 'temperature/top-k는 형식 제어보다 다양성에 영향을 준다.',
        keyword: 'Sampling Params',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '프롬프트를 조정한다. (Adjust the prompt)',
        isCorrect: true,
        explanation:
          '정답이다. 프롬프트에 길이/언어 제약을 명시하면 출력 형식을 가장 직접적으로 제어할 수 있다.',
      },
      {
        id: 'B',
        text: '다른 크기의 LLM을 선택한다. (Choose a different model size)',
        isCorrect: false,
        explanation: '모델 크기 변경은 비용/성능 변화가 크고, 길이/언어 제어의 1차 해법이 아니다.',
      },
      {
        id: 'C',
        text: 'Temperature를 높인다. (Increase temperature)',
        isCorrect: false,
        explanation: 'temperature 증가는 창의성과 랜덤성을 높여 일관된 짧은 답변 요구와 충돌할 수 있다.',
      },
      {
        id: 'D',
        text: 'Top K 값을 높인다. (Increase Top K)',
        isCorrect: false,
        explanation: 'top-k 증가는 토큰 다양성 관련 제어이며, 특정 언어/짧은 길이 고정과 직접 연결되지 않는다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🧩',
      title: 'Prompt Engineering',
      subTitle: '출력 형식 요구를 가장 빠르게 만족',
      desc: [
        '프롬프트에서 언어, 길이, 톤을 명시적으로 제한',
        '모델 교체 없이 즉시 실험/개선 가능',
        '운영 중 요구사항 변경에도 대응이 빠름',
      ],
    },
    others: [
      {
        title: 'Model Size Change',
        items: ['성능/비용/지연 전체에 영향', '형식 제어의 직접 수단이 아님'],
        warning: '요구가 형식일 때는 과한 해법',
      },
      {
        title: 'Temperature',
        items: ['창의성/무작위성 조절', '일관성 있는 출력에는 불리할 수 있음'],
      },
      {
        title: 'Top K',
        items: ['샘플링 후보 다양성 조절', '언어/길이 고정에는 한계'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> “무엇을 말할지”보다
        {' '}
        <strong>“어떤 형식으로 말할지”</strong>
        {' '}
        요구가 강하면 프롬프트 제어를 먼저 본다.
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
                <th className="p-3 font-bold whitespace-nowrap">주요 효과</th>
                <th className="p-3 font-bold whitespace-nowrap">판단 포인트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="p-3 font-bold text-green-700 dark:text-green-400">A. Prompt 조정</td>
                <td className="p-3">출력 길이/언어/톤을 직접 제어</td>
                <td className="p-3">문제 요구를 가장 빠르고 정확하게 반영</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">B. 모델 크기 변경</td>
                <td className="p-3">모델 역량/비용 변화</td>
                <td className="p-3">형식 제어 문제에 비해 과도한 조치</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">C. Temperature 증가</td>
                <td className="p-3">랜덤성/다양성 증가</td>
                <td className="p-3">짧고 일관된 출력 요구와 충돌 가능</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. Top K 증가</td>
                <td className="p-3">토큰 후보 다양성 증가</td>
                <td className="p-3">특정 언어/길이 고정 요구를 직접 해결하지 못함</td>
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
              <li>키워드: short output, specific language</li>
              <li>Prompt에 형식 제약을 명시하면 즉시 반영 가능</li>
              <li>예: &quot;한국어로 2문장 이내로 답변&quot;</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 패턴</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>모델 크기 변경으로 형식 문제를 해결하려는 접근</li>
              <li>temperature/top-k 조정으로 오히려 출력 변동성 증가</li>
              <li>문제의 핵심이 품질이 아닌 형식 제어라는 점을 놓침</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
