import { SnowballMigrationDiagram } from '@/components/blog/SnowballMigrationDiagram';
import { Card, CardContent } from '@/components/ui/card';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'Migration & Transfer',
    date: '2026. 02. 09',
    title: (
      <>
        70TB 대용량 데이터를 <br className="md:hidden" />
        <span className="text-cyan-600 dark:text-cyan-400">최소 대역폭으로 마이그레이션</span>
      </>
    ),
    description:
      '대용량 데이터를 AWS로 마이그레이션할 때, 네트워크 대역폭을 사용하지 않는 AWS Snowball Edge 활용법을 알아봅니다.',
  },
  diagram: <SnowballMigrationDiagram />,
  analyze: {
    scenario: {
      english:
        'A company uses NFS to store large video files in on-premises network attached storage. Each video file ranges in size from 1 MB to 500 GB. The total storage is 70 TB and is no longer growing. The company decides to migrate the video files to Amazon S3. The company must migrate the video files as soon as possible while using the least possible network bandwidth. Which solution will meet these requirements?',
      korean:
        '한 회사가 온프레미스 네트워크 연결 스토리지에 NFS를 사용하여 대용량 비디오 파일을 저장하고 있습니다. 각 비디오 파일의 크기는 1MB에서 500GB까지 다양합니다. 총 스토리지는 70TB이며 더 이상 증가하지 않습니다. 회사는 비디오 파일을 Amazon S3로 마이그레이션하기로 결정했습니다. 회사는 가능한 한 빨리, 그리고 최소한의 네트워크 대역폭을 사용하여 비디오 파일을 마이그레이션해야 합니다.',
    },
    requirements: [
      {
        num: 1,
        title: '대용량 데이터 (70TB)',
        desc: 'NFS에 저장된 대용량 비디오 파일들을 S3로 이전해야 합니다.',
        keyword: '70 TB total storage',
      },
      {
        num: 2,
        title: '최소 네트워크 대역폭',
        desc: '네트워크 대역폭 사용을 최소화하는 것이 핵심 요구사항입니다.',
        keyword: 'Least possible network bandwidth',
      },
      {
        num: 3,
        title: '빠른 마이그레이션',
        desc: '가능한 한 빨리 마이그레이션을 완료해야 합니다.',
        keyword: 'As soon as possible',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'S3 버킷을 생성하고 AWS CLI를 사용하여 모든 파일을 S3로 복사합니다.',
        isCorrect: false,
        explanation:
          'AWS CLI는 네트워크를 통해 데이터를 전송합니다. 70TB를 인터넷으로 전송하면 수 주가 소요됩니다.',
      },
      {
        id: 'B',
        text: 'AWS Snowball Edge 작업을 생성하여 물리적으로 데이터를 전송합니다.',
        isCorrect: true,
        explanation:
          '정답입니다! Snowball Edge는 네트워크 대역폭을 전혀 사용하지 않고, 70TB를 며칠 내에 마이그레이션할 수 있습니다.',
      },
      {
        id: 'C',
        text: '온프레미스에 S3 File Gateway를 배포합니다.',
        isCorrect: false,
        explanation: 'S3 File Gateway는 여전히 네트워크를 통해 데이터를 전송합니다.',
      },
      {
        id: 'D',
        text: 'AWS Direct Connect를 설정하고 S3 File Gateway를 배포합니다.',
        isCorrect: false,
        explanation: 'Direct Connect는 설정에 수 주가 걸리고 여전히 네트워크 대역폭을 사용합니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '📦',
      title: 'AWS Snowball Edge',
      desc: [
        '물리적 디바이스를 통한 오프라인 데이터 전송',
        '단일 디바이스당 80TB 용량 (사용 가능 72TB)',
        '네트워크 대역폭 제로 사용',
        '며칠 내에 페타바이트급 데이터 이전 가능',
      ],
    },
    others: [
      {
        title: '🚛 AWS Snowmobile',
        items: ['엑사바이트급 데이터 전송 (최대 100PB)', '컨테이너 트럭 형태의 초대형 장치'],
      },
      {
        title: '🌐 S3 Transfer Acceleration',
        items: ['CloudFront 엣지 활용 빠른 업로드', '네트워크 대역폭 사용 (이 문제와 맞지 않음)'],
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        ✨ <strong>핵심 인사이트:</strong> &quot;대용량 (10TB+)&quot; + &quot;최소 대역폭&quot; +
        &quot;빠른 전송&quot; = <br />
        고민할 것도 없이 <strong>AWS Snowball Edge</strong>를 찾으세요!
      </p>
    ),
  },
  deepDive: (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📊</span> Snow Family 비교
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Snowcone</h4>
              <ul className="text-sm space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>8TB HDD / 14TB SSD</li>
                <li>2.1kg 휴대용</li>
                <li>드론, 의료 기기 등</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-cyan-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Snowball Edge</h4>
              <ul className="text-sm space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>80TB (가용 72TB)</li>
                <li>Storage / Compute 옵션</li>
                <li>10TB~80TB 마이그레이션</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Snowmobile</h4>
              <ul className="text-sm space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>최대 100PB</li>
                <li>45피트 컨테이너 트럭</li>
                <li>엑사바이트급 데이터센터</li>
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
                🔹 <strong>10TB 이상 + 오프라인 전송</strong> → Snowball Edge
              </li>
              <li>
                🔹 <strong>10PB 이상</strong> → Snowmobile
              </li>
              <li>
                🔹 <strong>지속적 하이브리드 스토리지</strong> → Storage Gateway
              </li>
              <li>
                🔹 <strong>전 세계 빠른 업로드</strong> → S3 Transfer Acceleration
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  ),
};

export default content;
