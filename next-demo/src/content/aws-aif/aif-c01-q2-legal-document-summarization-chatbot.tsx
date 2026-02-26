import { AifLegalSummarizationDiagram } from '@/components/blog/AifLegalSummarizationDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'LLM Application',
    date: '2026. 02. 26',
    title: '법률 문서 핵심 포인트 추출: Summarization Chatbot',
    description:
      '법률 문서를 읽고 핵심 내용을 추출하려는 요구사항에서 어떤 AI 애플리케이션 유형이 맞는지 정리합니다.',
  },
  diagram: <AifLegalSummarizationDiagram />,
  analyze: {
    scenario: {
      english:
        'A law firm wants to build an AI application by using large language models (LLMs). The application will read legal documents and extract key points from the documents. Which solution meets these requirements?',
      korean:
        '로펌이 LLM 기반 AI 애플리케이션을 구축하려고 합니다. 이 애플리케이션은 법률 문서를 읽고 핵심 포인트를 추출해야 합니다. 어떤 솔루션이 요구사항에 가장 적합할까요?',
    },
    requirements: [
      {
        num: 1,
        title: 'Document Understanding',
        desc: '긴 텍스트 문서를 읽고 맥락을 유지한 채 핵심을 뽑아야 합니다.',
        keyword: 'Long-form Text',
      },
      {
        num: 2,
        title: 'Key Point Extraction',
        desc: '엔티티 식별을 넘어서 핵심 내용을 요약/정리해야 합니다.',
        keyword: 'Summarization',
      },
      {
        num: 3,
        title: 'LLM-based App',
        desc: 'LLM의 자연어 이해/생성 능력을 직접 활용하는 구성이 적합합니다.',
        keyword: 'Generative AI',
      },
      {
        num: 4,
        title: 'Practical UX',
        desc: '실무자는 대화형으로 문서 요약 결과를 확인하는 흐름을 선호합니다.',
        keyword: 'Chatbot',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'Build an automatic named entity recognition system.',
        isCorrect: false,
        explanation: 'NER은 개체 식별 중심이라 문서 전체의 핵심 포인트 요약 요구를 완전히 만족하지 못합니다.',
      },
      {
        id: 'B',
        text: 'Create a recommendation engine.',
        isCorrect: false,
        explanation: '추천 엔진은 사용자 선호 기반 추천 문제에 적합하며 문서 요약/핵심 추출과는 목적이 다릅니다.',
      },
      {
        id: 'C',
        text: 'Develop a summarization chatbot.',
        isCorrect: true,
        explanation:
          '정답입니다. 법률 문서를 읽고 핵심 포인트를 추출하는 요구에는 LLM 기반 요약 챗봇이 가장 직접적으로 부합합니다.',
      },
      {
        id: 'D',
        text: 'Develop a multi-language translation system.',
        isCorrect: false,
        explanation: '번역 시스템은 언어 변환이 목적이며 핵심 요약/추출 자체를 해결하지는 않습니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🧾',
      title: 'Summarization Chatbot (LLM)',
      desc: [
        '장문 법률 문서를 문맥 유지한 채 요약',
        '핵심 조항/리스크 포인트를 자연어로 정리',
        '질문-응답 형태로 추가 확인 가능',
      ],
      subTitle: '문서 핵심 추출 요구에 가장 직접적',
    },
    others: [
      {
        title: 'Named Entity Recognition (NER)',
        items: ['인물/조직/날짜 등 엔티티 태깅에 강점', '핵심 논지 요약에는 한계'],
        warning: '요약 중심 요구사항과 불일치',
      },
      {
        title: 'Recommendation Engine',
        items: ['개인화 추천에 적합', '문서 이해/요약과는 문제 유형이 다름'],
      },
      {
        title: 'Translation System',
        items: ['다국어 변환에 적합', '핵심 포인트 추출 자체를 대신하지 않음'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> 문제에서 “문서를 읽고 핵심 포인트를 추출”한다고 하면,
        분류/추천/번역보다 요약(Summarization) 유형을 먼저 선택해야 합니다.
      </p>
    ),
  },
  deepDive: (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">빠른 복습 포인트</h3>
      <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <li>NER은 “개체 찾기”, Summarization은 “핵심 내용 정리”입니다.</li>
        <li>LLM 문서 앱 문제에서 “key points”는 요약 정답 패턴입니다.</li>
        <li>법률/정책/계약서처럼 장문 문서는 챗봇 UX와 결합 시 활용도가 높습니다.</li>
      </ul>
    </div>
  ),
};

export default content;
