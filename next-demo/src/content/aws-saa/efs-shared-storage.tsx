import { EfsSharedStorageDiagram } from '@/components/blog/EfsSharedStorageDiagram';
import { Card, CardContent } from '@/components/ui/card';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Storage',
    date: '2026. 02. 09',
    title: (
      <>
        다중 AZ 환경에서 <br className="md:hidden" />
        <span className="text-green-600 dark:text-green-400">공유 스토리지 구성하기</span>
      </>
    ),
    description:
      '여러 EC2 인스턴스가 동일한 파일에 접근해야 할 때, EBS가 아닌 EFS를 사용해야 하는 이유를 알아봅니다.',
  },
  diagram: <EfsSharedStorageDiagram />,
  analyze: {
    scenario: {
      english:
        'A company is hosting a web application on AWS using a single Amazon EC2 instance that stores user-uploaded documents in an Amazon EBS volume. For better scalability and availability, the company duplicated the architecture and created a second EC2 instance and EBS volume in another Availability Zone, placing both behind an Application Load Balancer. After completing this change, users reported that, each time they refreshed the website, they could see one subset of their documents or the other, but never all of the documents at the same time. What should a solutions architect propose to ensure users see all of their documents at once?',
      korean:
        '한 회사가 AWS에서 단일 Amazon EC2 인스턴스를 사용해 웹 애플리케이션을 호스팅하고 있으며, 사용자가 업로드한 문서를 Amazon EBS 볼륨에 저장합니다. 확장성과 가용성을 높이기 위해 회사는 아키텍처를 복제하여 다른 가용 영역에 두 번째 EC2 인스턴스와 EBS 볼륨을 생성하고, 두 인스턴스를 Application Load Balancer 뒤에 배치했습니다. 이 변경 후 사용자들은 웹사이트를 새로고침할 때마다 문서의 일부만 보이고, 전체 문서를 한꺼번에 볼 수 없다고 보고했습니다. 사용자가 모든 문서를 한꺼번에 볼 수 있도록 솔루션 아키텍트는 무엇을 제안해야 합니까?',
    },
    requirements: [
      {
        num: 1,
        title: '다중 AZ 구성',
        desc: '두 개의 EC2 인스턴스가 서로 다른 가용 영역에 배치되어 있습니다.',
        keyword: 'Multiple Availability Zones',
      },
      {
        num: 2,
        title: '일관된 데이터 접근',
        desc: '어느 서버에 연결되든 모든 문서를 볼 수 있어야 합니다.',
        keyword: 'All documents at once',
      },
      {
        num: 3,
        title: '파일 기반 스토리지',
        desc: '사용자 업로드 문서를 저장하는 파일 시스템이 필요합니다.',
        keyword: 'User-uploaded documents',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: '두 EBS 볼륨이 모든 문서를 포함하도록 데이터를 복사합니다.',
        isCorrect: false,
        explanation:
          '수동 복사는 지속 가능한 해결책이 아닙니다. 새로운 문서가 업로드될 때마다 동기화가 필요하며, 이는 복잡성과 운영 오버헤드를 크게 증가시킵니다.',
      },
      {
        id: 'B',
        text: 'Application Load Balancer가 사용자를 해당 문서가 있는 서버로 연결하도록 구성합니다.',
        isCorrect: false,
        explanation:
          'Sticky Session을 사용할 수 있지만, 이는 문서가 분산된 근본적인 문제를 해결하지 못합니다. 사용자는 여전히 특정 서버에 업로드된 문서만 볼 수 있습니다.',
      },
      {
        id: 'C',
        text: '두 EBS 볼륨의 데이터를 Amazon EFS로 복사하고, 새 문서를 EFS에 저장하도록 애플리케이션을 수정합니다.',
        isCorrect: true,
        explanation:
          '정답입니다! Amazon EFS는 여러 EC2 인스턴스가 동시에 마운트할 수 있는 공유 파일 시스템입니다. 다중 AZ를 지원하므로 어느 서버에서도 동일한 파일에 접근할 수 있습니다.',
      },
      {
        id: 'D',
        text: 'Application Load Balancer가 양쪽 서버에 요청을 보내고 각 서버에서 해당 문서를 반환하도록 구성합니다.',
        isCorrect: false,
        explanation:
          'ALB는 이런 방식으로 동작하지 않습니다. 각 요청은 하나의 타겟으로만 라우팅됩니다. 병렬 요청 및 결과 병합은 ALB의 기능이 아닙니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '📂',
      title: 'Amazon EFS',
      desc: [
        '여러 EC2 인스턴스가 동시에 마운트 가능한 공유 파일 시스템',
        '다중 AZ에서 자동 복제, 고가용성 보장',
        'NFS 프로토콜 기반, Linux 워크로드에 최적화',
        '용량 자동 확장, 사용한 만큼만 과금',
      ],
    },
    others: [
      {
        title: '💽 Amazon EBS',
        items: [
          '단일 EC2 인스턴스에만 연결 가능 (io1/io2 Multi-Attach 예외)',
          '동일 AZ 내에서만 사용, AZ간 공유 불가',
        ],
      },
      {
        title: '🪣 Amazon S3',
        items: ['객체 스토리지 (파일 시스템 X)', '대용량 파일 저장에 적합, 직접 마운트 불가'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        ✨ <strong>핵심 인사이트:</strong> &quot;다중 EC2&quot; + &quot;파일 공유&quot; +
        &quot;일관된 데이터&quot; = <br />
        고민할 것도 없이 <strong>Amazon EFS</strong>를 찾으세요!
      </p>
    ),
  },
  deepDive: (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🔀</span> 스토리지 유형 비교
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-2">EBS</h4>
              <ul className="text-sm space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>블록 스토리지</li>
                <li>단일 AZ 내 단일 EC2</li>
                <li>고성능 DB에 적합</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">EFS</h4>
              <ul className="text-sm space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>파일 스토리지 (NFS)</li>
                <li>다중 AZ, 다중 EC2</li>
                <li>공유 콘텐츠에 적합</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">S3</h4>
              <ul className="text-sm space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>객체 스토리지</li>
                <li>무제한 확장</li>
                <li>정적 파일, 백업에 적합</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4 pt-8">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">🔧</span> 문제 해결 과정
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center font-bold text-red-600 shrink-0">
              !
            </div>
            <div>
              <p className="font-bold text-red-800 dark:text-red-200">문제 상황</p>
              <p className="text-sm text-red-700 dark:text-red-300">
                EBS는 각 EC2에 독립적으로 연결 → 문서가 분산 저장됨
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center font-bold text-green-600 shrink-0">
              ✓
            </div>
            <div>
              <p className="font-bold text-green-800 dark:text-green-200">해결책</p>
              <p className="text-sm text-green-700 dark:text-green-300">
                EFS로 마이그레이션 → 모든 EC2가 동일한 파일 시스템 공유
              </p>
            </div>
          </div>
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
                🔹 <strong>다중 EC2 + 파일 공유</strong> → EFS
              </li>
              <li>
                🔹 <strong>Windows 파일 공유</strong> → FSx for Windows
              </li>
              <li>
                🔹 <strong>고성능 HPC/ML</strong> → FSx for Lustre
              </li>
              <li>
                🔹 <strong>단일 EC2 + 고IOPS</strong> → EBS io1/io2
              </li>
              <li>
                🔹 <strong>정적 파일 배포</strong> → S3 + CloudFront
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  ),
};

export default content;
