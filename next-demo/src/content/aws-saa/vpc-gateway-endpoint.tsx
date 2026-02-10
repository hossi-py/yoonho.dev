import { VpcEndpointDiagram } from '@/components/blog/VpcEndpointDiagram';
import { Card, CardContent } from '@/components/ui/card';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Networking',
    date: '2026. 02. 09',
    title: (
      <>
        인터넷 없이 <br className="md:hidden" />
        <span className="text-indigo-600 dark:text-indigo-400">S3에 Private 접근하기</span>
      </>
    ),
    description:
      'VPC 내 EC2 인스턴스가 인터넷 연결 없이 S3 버킷에 접근해야 할 때, VPC Gateway Endpoint가 정답입니다.',
  },
  diagram: <VpcEndpointDiagram />,
  analyze: {
    scenario: {
      english:
        'An application runs on an Amazon EC2 instance in a VPC. The application processes logs that are stored in an Amazon S3 bucket. The EC2 instance needs to access the S3 bucket without connectivity to the internet. Which solution will provide private network connectivity to Amazon S3?',
      korean:
        'VPC 내 Amazon EC2 인스턴스에서 애플리케이션이 실행되고 있습니다. 이 애플리케이션은 Amazon S3 버킷에 저장된 로그를 처리합니다. EC2 인스턴스는 인터넷 연결 없이 S3 버킷에 접근해야 합니다. Amazon S3에 대한 프라이빗 네트워크 연결을 제공하는 솔루션은 무엇입니까?',
    },
    requirements: [
      {
        num: 1,
        title: 'VPC 내 EC2에서 S3 접근',
        desc: 'EC2 인스턴스가 S3 버킷에 저장된 로그 파일을 읽어야 합니다.',
        keyword: 'EC2 → S3 Access',
      },
      {
        num: 2,
        title: '인터넷 연결 없이',
        desc: '보안상 인터넷 게이트웨이나 NAT를 사용할 수 없는 환경입니다.',
        keyword: 'Without internet connectivity',
      },
      {
        num: 3,
        title: '프라이빗 네트워크 연결',
        desc: 'AWS 내부 네트워크만을 사용하는 연결 방식이 필요합니다.',
        keyword: 'Private network connectivity',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'S3 버킷에 대한 Gateway VPC Endpoint를 생성합니다.',
        isCorrect: true,
        explanation:
          '정답입니다! Gateway VPC Endpoint를 사용하면 인터넷을 거치지 않고 AWS 내부 네트워크를 통해 S3에 접근할 수 있습니다. 추가 비용 없이 사용 가능합니다.',
      },
      {
        id: 'B',
        text: '로그를 Amazon CloudWatch Logs로 스트리밍한 다음 S3 버킷으로 내보냅니다.',
        isCorrect: false,
        explanation:
          'CloudWatch Logs를 거치는 것은 문제의 요구사항과 맞지 않으며, 여전히 별도의 VPC Endpoint가 필요합니다.',
      },
      {
        id: 'C',
        text: 'Amazon EC2에 인스턴스 프로파일을 생성하여 S3 접근을 허용합니다.',
        isCorrect: false,
        explanation:
          "인스턴스 프로파일(IAM Role)은 '권한' 문제를 해결합니다. 네트워크 연결 방식과는 무관합니다.",
      },
      {
        id: 'D',
        text: 'S3 엔드포인트에 대한 Private Link가 있는 Amazon API Gateway API를 생성합니다.',
        isCorrect: false,
        explanation: 'Gateway Endpoint라는 간단하고 무료인 솔루션이 있습니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '⚡',
      title: 'VPC Gateway Endpoint',
      desc: [
        'S3, DynamoDB 전용 VPC Endpoint (무료)',
        'VPC 라우팅 테이블에 경로를 추가하여 동작',
        '인터넷을 거치지 않고 AWS 내부 네트워크 사용',
        '보안 강화 및 데이터 전송 비용 절감',
      ],
    },
    others: [
      {
        title: '🔗 Interface Endpoint',
        items: ['대부분의 AWS 서비스 지원 (ENI 기반)', '프라이빗 IP로 접근, 시간당 비용 발생'],
      },
      {
        title: '🌐 NAT Gateway',
        items: [
          '프라이빗 서브넷의 인터넷 아웃바운드 제공',
          '인터넷을 거치므로 이 문제의 요구사항 불충족',
        ],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        ✨ <strong>핵심 인사이트:</strong> &quot;S3/DynamoDB&quot; + &quot;인터넷 없이&quot; +
        &quot;프라이빗 연결&quot; = <br />
        고민할 것도 없이 <strong>Gateway VPC Endpoint</strong>를 찾으세요!
      </p>
    ),
  },
  deepDive: (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🔀</span> Endpoint 유형 비교
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                Gateway Endpoint
              </h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>
                  <strong>지원 서비스:</strong> S3, DynamoDB만
                </li>
                <li>
                  <strong>구현 방식:</strong> 라우팅 테이블 항목 추가
                </li>
                <li>
                  <strong>비용:</strong> 무료! 💰
                </li>
                <li>
                  <strong>접근:</strong> 퍼블릭 엔드포인트 DNS 사용
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
                Interface Endpoint
              </h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>
                  <strong>지원 서비스:</strong> 대부분의 AWS 서비스
                </li>
                <li>
                  <strong>구현 방식:</strong> ENI (프라이빗 IP) 생성
                </li>
                <li>
                  <strong>비용:</strong> 시간당 + 데이터 요금 발생
                </li>
                <li>
                  <strong>접근:</strong> 프라이빗 DNS 이름 가능
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4 pt-8">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">📝</span> 시험장 치트키
        </h3>
        <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                🔹 <strong>S3/DynamoDB + Private 접근</strong> → Gateway Endpoint
              </li>
              <li>
                🔹 <strong>다른 AWS 서비스 + Private 접근</strong> → Interface Endpoint
                (PrivateLink)
              </li>
              <li>
                🔹 <strong>Instance Profile</strong> → 권한(Permission), 네트워크(X)
              </li>
              <li>
                🔹 <strong>NAT Gateway</strong> → 인터넷 필요, Private 연결 아님
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  ),
};

export default content;
