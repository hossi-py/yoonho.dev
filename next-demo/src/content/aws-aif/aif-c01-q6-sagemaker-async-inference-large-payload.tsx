import { AifSageMakerAsyncInferenceDiagram } from '@/components/blog/AifSageMakerAsyncInferenceDiagram';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'SageMaker Inference',
    date: '2026. 02. 27',
    title: 'SageMaker 대용량/장시간 추론: 비동기 추론 선택',
    description:
      '입력 데이터 최대 1GB, 처리 시간 최대 1시간, 근실시간 지연 요구를 동시에 만족하는 SageMaker 추론 옵션을 정리합니다.',
  },
  diagram: <AifSageMakerAsyncInferenceDiagram />,
  analyze: {
    scenario: {
      english:
        'A company uses Amazon SageMaker for its ML pipeline in a production environment. The company has large input data sizes up to 1 GB and processing times up to 1 hour. The company needs near real-time latency. Which SageMaker inference option meets these requirements?',
      korean:
        '회사가 프로덕션 ML 파이프라인에 Amazon SageMaker를 사용한다. 입력 데이터는 최대 1GB이고 처리 시간은 최대 1시간까지 걸린다. 또한 근실시간 지연이 필요하다. 어떤 SageMaker 추론 옵션이 요구사항에 맞을까?',
    },
    requirements: [
      {
        num: 1,
        title: '대용량 입력',
        desc: '요청 페이로드가 최대 1GB까지 가능해야 한다.',
        keyword: 'Large Payload',
      },
      {
        num: 2,
        title: '장시간 처리',
        desc: '추론 처리 시간이 최대 1시간까지 허용되어야 한다.',
        keyword: 'Long Processing Time',
      },
      {
        num: 3,
        title: '근실시간 요구',
        desc: '완전 오프라인 배치가 아닌 근실시간 수준의 응답 패턴이 필요하다.',
        keyword: 'Near Real-time',
      },
      {
        num: 4,
        title: '옵션 매칭',
        desc: '실시간/서버리스 한계를 넘고 배치 추론보다 지연 요건에 맞는 선택이 필요하다.',
        keyword: 'Asynchronous Inference',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '실시간 추론 (Real-time Inference)',
        isCorrect: false,
        explanation: '실시간 추론은 대용량 입력(1GB)과 장시간 처리(1시간) 요구를 만족하기 어렵다.',
      },
      {
        id: 'B',
        text: '서버리스 추론 (Serverless Inference)',
        isCorrect: false,
        explanation: '서버리스 추론은 간편하지만 페이로드/처리 시간 제한 때문에 요구사항과 맞지 않는다.',
      },
      {
        id: 'C',
        text: '비동기 추론 (Asynchronous Inference)',
        isCorrect: true,
        explanation:
          '정답이다. Asynchronous Inference는 최대 1GB 입력과 최대 1시간 처리 요구를 지원하며 근실시간 워크로드에 적합하다.',
      },
      {
        id: 'D',
        text: '배치 변환 (Batch Transform)',
        isCorrect: false,
        explanation: 'Batch Transform은 대규모 오프라인 처리에 적합하며 근실시간 지연 요구와는 맞지 않는다.',
      },
    ],
  },
  services: {
    main: {
      icon: '⚙️',
      title: 'Asynchronous Inference',
      desc: [
        '대용량 요청 페이로드(최대 1GB) 처리에 적합',
        '장시간 추론 작업(최대 1시간) 지원',
        '근실시간 응답 패턴에 맞춘 운영 가능',
      ],
      subTitle: '대용량 + 장시간 + 근실시간 요구의 교집합',
    },
    others: [
      {
        title: 'Real-time Inference',
        items: ['짧은 응답 시간 중심', '대용량/장시간 처리 요구에는 부적합'],
      },
      {
        title: 'Serverless Inference',
        items: ['인프라 운영 부담이 낮음', '입력 크기/처리 시간 제한이 큼'],
      },
      {
        title: 'Batch Transform',
        items: ['오프라인 대량 처리에 강점', '근실시간 응답 요구와 불일치'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        <strong>핵심 인사이트:</strong> SageMaker 옵션 선택에서 페이로드 크기와 처리 시간 제한을 먼저 확인하면 Asynchronous Inference가 빠르게 도출된다.
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
                <td className="p-3 font-bold text-green-700 dark:text-green-400">C. Asynchronous Inference</td>
                <td className="p-3">대용량 요청 + 긴 처리시간에 최적화</td>
                <td className="p-3">1GB/1시간/near real-time 요구를 가장 잘 충족</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">A. Real-time Inference</td>
                <td className="p-3">짧은 요청-응답 지연에 적합</td>
                <td className="p-3">대용량/장시간 처리에서는 비효율 가능</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">B. Serverless Inference</td>
                <td className="p-3">간헐적 트래픽에 운영 편의성</td>
                <td className="p-3">요청 크기/실행 시간 제약으로 시나리오와 충돌</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">D. Batch Transform</td>
                <td className="p-3">오프라인 일괄 처리</td>
                <td className="p-3">near real-time 요구와 거리가 있음</td>
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
              <li>키워드: large payload, long processing, near real-time</li>
              <li>SageMaker에서 대용량+장시간이면 Async 우선 검토</li>
              <li>결과를 비동기로 받아도 되는 요구인지 확인</li>
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-700 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 신호</h4>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li>Real-time을 무조건 정답으로 보는 패턴</li>
              <li>Serverless 제약(크기/시간) 무시</li>
              <li>Batch Transform을 near real-time에 적용하는 선택</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ),
};

export default content;
