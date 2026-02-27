import { AifLegalSummarizationDiagram } from '@/components/blog/AifLegalSummarizationDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'LLM Application',
    date: '2026. 02. 26',
    title: '법률 문서 핵심 포인트 추출: Summarization Chatbot',
    description:
      'LLM 기반 애플리케이션에서 긴 법률 문서를 읽고 핵심 내용을 추출해야 할 때 어떤 접근이 맞는지 정리합니다.',
  },
  diagram: <AifLegalSummarizationDiagram />,
  analyze: {
    scenario: {
      english:
        'A law firm wants to build an AI application by using large language models (LLMs). The application will read legal documents and extract key points from the documents. Which solution meets these requirements?',
      korean:
        '로펌이 LLM 기반 AI 애플리케이션을 만들려고 한다. 애플리케이션은 법률 문서를 읽고 핵심 포인트를 추출해야 한다. 어떤 솔루션이 가장 적합한가?',
    },
    requirements: [
      {
        num: 1,
        title: '문서 이해',
        desc: '긴 문서를 읽고 맥락을 유지한 채 핵심을 뽑아야 한다.',
        keyword: 'Document Understanding',
      },
      {
        num: 2,
        title: '핵심 추출',
        desc: '개별 엔티티가 아니라 문서 단위 요약이 필요하다.',
        keyword: 'Summarization',
      },
      {
        num: 3,
        title: 'LLM 활용',
        desc: '자연어 이해/생성 능력을 직접 활용해야 한다.',
        keyword: 'LLM-based App',
      },
      {
        num: 4,
        title: '대화형 사용성',
        desc: '질문-응답 형태로 핵심 내용을 확인할 수 있으면 유리하다.',
        keyword: 'Chatbot UX',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '개체명 인식 시스템 (Named Entity Recognition, NER)',
        isCorrect: false,
        explanation:
          'NER은 인물/조직/장소 같은 엔티티 추출에는 좋지만, 문서 전체 핵심 요약 요구를 직접 만족하지 못한다.',
      },
      {
        id: 'B',
        text: '추천 엔진 (Recommendation Engine)',
        isCorrect: false,
        explanation: '추천 엔진은 사용자 선호 기반 추천 문제에 맞고, 문서 요약/핵심 추출 목적과 다르다.',
      },
      {
        id: 'C',
        text: '요약 챗봇 (Summarization Chatbot)',
        isCorrect: true,
        explanation:
          '정답이다. LLM 기반 요약 챗봇은 긴 문서를 읽고 핵심 포인트를 자연어로 요약/설명하는 요구를 직접 충족한다.',
      },
      {
        id: 'D',
        text: '다국어 번역 시스템 (Translation System)',
        isCorrect: false,
        explanation: '번역은 언어 변환이 목적이며, 문서 핵심 추출 자체를 보장하지 않는다.',
      },
    ],
  },
  services: {
    main: {
      icon: '📝',
      title: 'Summarization Chatbot (LLM)',
      subTitle: '긴 문서 핵심 추출에 가장 직접적인 선택',
      desc: [
        '법률 문서 전체 맥락을 유지하며 핵심 요약 제공',
        '질문-응답 형태로 조항별 포인트 확인 가능',
        '“읽고 요약하라” 요구와 정확히 매칭',
      ],
    },
    others: [
      {
        title: 'Named Entity Recognition (NER)',
        items: ['엔티티 태깅에는 강점', '문서 전체 요약과는 목적 차이'],
        warning: '요약(Summarization) 요구를 직접 해결하지 못함',
      },
      {
        title: 'Recommendation Engine',
        items: ['개인화 추천에 적합', '문서 이해 태스크와 무관'],
      },
      {
        title: 'Translation System',
        items: ['언어 변환에 적합', '핵심 포인트 추출을 보장하지 않음'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 문제에
        {' '}
        <strong>read documents + extract key points</strong>
        {' '}
        가 나오면 Summarization 계열을 우선 선택한다.
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
                <th className="p-3 font-bold whitespace-nowrap">핵심 기능</th>
                <th className="p-3 font-bold whitespace-nowrap">판단 포인트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="p-3 font-bold text-green-700 dark:text-green-400">C. Summarization Chatbot</td>
                <td className="p-3">문서 읽기 + 요약 + 핵심 추출</td>
                <td className="p-3">문제 요구와 1:1 일치</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">A. NER</td>
                <td className="p-3">개체명 태깅</td>
                <td className="p-3">부분 기능만 맞고 요약 기능이 부족</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">B. Recommendation</td>
                <td className="p-3">선호 기반 추천</td>
                <td className="p-3">문제 유형 자체가 다름</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. Translation</td>
                <td className="p-3">언어 변환</td>
                <td className="p-3">핵심 추출 요구를 직접 만족하지 못함</td>
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
              <li>키워드: legal documents, key points, summarize</li>
              <li>긴 문서 핵심 추출이면 Summarization 우선</li>
              <li>LLM + Chat UX 조합은 실무 사용성까지 충족</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 패턴</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>NER처럼 부분 태스크를 전체 해법으로 착각</li>
              <li>추천/번역처럼 도메인이 다른 선택지</li>
              <li>요구 문장에 있는 동사(read, extract, summarize)를 무시</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
