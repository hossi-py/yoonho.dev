import { SnsSqsFanoutDiagram } from '@/components/blog/SnsSqsFanoutDiagram';
import { Card, CardContent } from '@/components/ui/card';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Messaging & Decoupling',
    date: '2026. 02. 10',
    title: (
      <>
        100,000 msg/s를 처리하는 <br className="md:hidden" />
        <span className="text-orange-600 dark:text-orange-400">SNS + SQS Fan-out 패턴</span>
      </>
    ),
    description:
      '수십 개의 마이크로서비스가 메시지를 동시에 소비해야 할 때, SNS + SQS Fan-out 패턴으로 완전한 디커플링과 무한 확장성을 달성하는 방법을 알아봅니다.',
  },
  diagram: <SnsSqsFanoutDiagram />,
  analyze: {
    scenario: {
      english:
        'A company has an application that ingests incoming messages. Dozens of other applications and microservices then quickly consume these messages. The number of messages varies drastically and sometimes increases suddenly to 100,000 each second. The company wants to decouple the solution and increase scalability. Which solution meets these requirements?',
      korean:
        '한 회사에 들어오는 메시지를 수집하는 애플리케이션이 있습니다. 수십 개의 다른 애플리케이션과 마이크로서비스가 이 메시지를 빠르게 소비합니다. 메시지 수는 급격히 변동하며 때때로 초당 100,000건까지 갑자기 증가합니다. 회사는 솔루션을 디커플링하고 확장성을 높이고 싶습니다. 어떤 솔루션이 요구사항을 충족합니까?',
    },
    requirements: [
      {
        num: 1,
        title: '수십 개의 Consumer',
        desc: '하나의 메시지를 여러 애플리케이션이 동시에 소비해야 합니다.',
        keyword: 'Dozens of consumers',
      },
      {
        num: 2,
        title: '초당 100,000건 급증',
        desc: '트래픽이 급격히 변동하므로 탄력적인 처리가 필요합니다.',
        keyword: '100,000 msg/s burst',
      },
      {
        num: 3,
        title: '디커플링 (Decoupling)',
        desc: '생산자와 소비자가 서로에 대해 알 필요가 없어야 합니다.',
        keyword: 'Decouple',
      },
      {
        num: 4,
        title: '확장성 (Scalability)',
        desc: 'Consumer 추가 시 기존 시스템 변경 없이 확장 가능해야 합니다.',
        keyword: 'Increase scalability',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'Amazon Kinesis Data Analytics에 메시지를 저장하고, Consumer 애플리케이션이 메시지를 읽어서 처리합니다.',
        isCorrect: false,
        explanation:
          'Kinesis Data Analytics는 실시간 데이터 분석 서비스이지, 메시지 브로커가 아닙니다. 메시지를 여러 Consumer에게 팬아웃하는 용도에 적합하지 않습니다.',
      },
      {
        id: 'B',
        text: '수집 애플리케이션을 Auto Scaling 그룹의 EC2 인스턴스에 배포하고, CPU 메트릭을 기반으로 EC2 수를 조절합니다.',
        isCorrect: false,
        explanation:
          "EC2 Auto Scaling은 수집(Ingestion) 측의 처리량을 늘릴 수 있지만, '디커플링'과 '다수 Consumer에게 메시지 배포'라는 핵심 요구사항을 해결하지 못합니다.",
      },
      {
        id: 'C',
        text: 'Amazon Kinesis Data Streams(단일 샤드)에 메시지를 기록하고, Lambda로 전처리 후 DynamoDB에 저장합니다. Consumer가 DynamoDB에서 읽습니다.',
        isCorrect: false,
        explanation:
          "단일 샤드의 Kinesis는 초당 1,000건이 한계입니다(100,000건 처리 불가). DynamoDB를 중간에 두는 것은 불필요한 복잡성을 추가하며, 진정한 '팬아웃'이 아닙니다.",
      },
      {
        id: 'D',
        text: 'Amazon SNS 토픽에 메시지를 발행하고, 여러 Amazon SQS 큐를 구독으로 연결합니다. Consumer 애플리케이션이 각자의 큐에서 메시지를 처리합니다.',
        isCorrect: true,
        explanation:
          '정답입니다! SNS + SQS Fan-out 패턴은 AWS 메시지 아키텍처의 베스트 프랙티스입니다. SNS가 모든 구독자에게 메시지를 동시에 전달하고, 각 SQS 큐가 Consumer별 버퍼 역할을 합니다. 완전한 디커플링과 무한 확장성을 제공합니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '🔔',
      title: 'SNS + SQS Fan-out',
      subTitle: '⭐ 이 문제의 핵심 패턴',
      desc: [
        'SNS Topic: 1개의 메시지 → 모든 구독자에게 동시 전달 (Fan-out)',
        'SQS Queue: Consumer별 독립 큐로 메시지 버퍼링 & 재시도',
        '완전한 디커플링: Producer ↔ Consumer 서로 모름',
        '새 Consumer 추가 = SQS 큐 1개 + SNS 구독 추가 → 끝!',
      ],
    },
    others: [
      {
        title: '❌ Kinesis Data Analytics',
        items: ['실시간 스트리밍 데이터 분석 서비스', '메시지 브로커/큐잉 용도가 아님'],
        warning: '메시지 팬아웃에 부적합',
      },
      {
        title: '❌ EC2 Auto Scaling (단독)',
        items: ['수집 서버의 수평 확장만 가능', '디커플링 문제를 해결하지 못함'],
        warning: 'Decoupling 요건 미충족',
      },
      {
        title: '❌ Kinesis Data Streams (단일 샤드)',
        items: ['단일 샤드 = 초당 1,000건 한계', '100,000건/초 처리 불가'],
        warning: '성능 한계 + 복잡한 아키텍처',
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        ✨ <strong>핵심 인사이트:</strong> &quot;여러 Consumer&quot; + &quot;디커플링&quot; +
        &quot;확장성&quot; 키워드가 나오면?
        <br />
        고민할 것도 없이 <strong>SNS + SQS Fan-out</strong> 패턴을 찾으세요!
      </p>
    ),
  },
  deepDive: (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🔀</span> 메시징 서비스 비교
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b dark:border-slate-700">
                <th className="p-3 font-bold whitespace-nowrap">서비스</th>
                <th className="p-3 font-bold whitespace-nowrap">패턴</th>
                <th className="p-3 font-bold whitespace-nowrap">핵심 특징</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-orange-50/50 dark:bg-orange-900/10">
                <td className="p-3 font-bold text-orange-700 dark:text-orange-400">Amazon SNS</td>
                <td className="p-3">Pub/Sub (Fan-out)</td>
                <td className="p-3">
                  1개 메시지 → <strong>모든 구독자</strong>에게 전달
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Amazon SQS</td>
                <td className="p-3">Point-to-Point (Queue)</td>
                <td className="p-3">
                  1개 메시지 → <strong>1명의 Consumer</strong>만 처리
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Kinesis Data Streams</td>
                <td className="p-3">Streaming</td>
                <td className="p-3">
                  순서 보장, 샤드당 <strong>1,000 TPS</strong>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Amazon EventBridge</td>
                <td className="p-3">Event Bus</td>
                <td className="p-3">
                  규칙 기반 <strong>이벤트 라우팅</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">📝</span> 시험장 치트키 (Cheat Sheet)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          문제에서 이 단어가 나오면 바로 정답을 떠올리세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
                SNS + SQS Fan-out
              </h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>Multiple Consumers (다수 소비자)</li>
                <li>Decouple / Decoupling (디커플링)</li>
                <li>Fan-out (팬아웃)</li>
                <li>Scalability + Burst Traffic</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
                다른 서비스 선택 기준
              </h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>순서 보장 필요 → Kinesis / SQS FIFO</li>
                <li>1:1 처리 → SQS (단독)</li>
                <li>이벤트 라우팅 → EventBridge</li>
                <li>실시간 분석 → Kinesis Analytics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  ),
};

export default content;
