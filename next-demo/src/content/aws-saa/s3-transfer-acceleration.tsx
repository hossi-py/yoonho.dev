import { TransferAccelerationDiagram } from '@/components/blog/TransferAccelerationDiagram';
import { Card, CardContent } from '@/components/ui/card';
import type { AwsSaaPostContent } from '@/lib/post-types';

const content: AwsSaaPostContent = {
  meta: {
    tagId: 'TAG #1',
    date: '2026. 02. 09',
    title: (
      <>
        AWS SAA 합격으로 가는 길 #1 <br />
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          글로벌 데이터 수집과 S3 Transfer Acceleration
        </span>
      </>
    ),
    description:
      '전 세계 여러 대륙에서 발생하는 대용량 데이터를 빠르게 S3로 집계하는 최적의 솔루션을 알아봅니다.',
  },
  diagram: <TransferAccelerationDiagram />,
  analyze: {
    scenario: {
      english:
        'A company collects data for temperature, humidity, and atmospheric pressure in cities across multiple continents. The average volume of data that the company collects from each site daily is 500 GB. Each site has a high-speed Internet connection. The company wants to aggregate the data from all these global sites as quickly as possible in a single Amazon S3 bucket. The solution must minimize operational complexity.',
      korean:
        '한 회사가 여러 대륙의 도시에서 온도, 습도, 기압 데이터를 수집합니다. 각 사이트에서 매일 평균 500GB의 데이터가 발생하며, 모든 사이트에 고속 인터넷이 연결되어 있습니다. 회사는 모든 글로벌 사이트의 데이터를 최대한 빠르게 단일 S3 버킷으로 집계하려고 합니다. 솔루션은 운영 복잡성을 최소화해야 합니다.',
    },
    requirements: [
      {
        num: 1,
        title: '여러 대륙에 걸친 글로벌 사이트',
        desc: '전 세계 여러 대륙에 데이터 수집 지점이 분산되어 있어요.',
        keyword: '글로벌',
      },
      {
        num: 2,
        title: '각 사이트에서 매일 500GB 데이터 발생',
        desc: '대용량이지만 Snowball을 쓸 정도로 거대하지는 않아요.',
        keyword: '500GB/일',
      },
      {
        num: 3,
        title: '고속 인터넷 연결 보유',
        desc: '네트워크 인프라가 좋으므로 온라인 전송이 가능해요.',
        keyword: '고속 인터넷',
      },
      {
        num: 4,
        title: '단일 S3 버킷으로 최대한 빠르게 집계',
        desc: '여러 버킷이 아닌 하나의 버킷으로 데이터를 모아야 해요.',
        keyword: '빠른 집계',
      },
    ],
    quiz: [
      {
        id: 'A',
        text: 'S3 Transfer Acceleration을 켜고 Multipart Upload로 직접 업로드',
        isCorrect: true,
        explanation:
          '가장 간단하면서도 빠른 솔루션입니다! Transfer Acceleration은 글로벌 엣지 로케이션과 AWS 백본 네트워크를 활용해 업로드 속도를 크게 향상시킵니다. Multipart Upload는 대용량 파일(500GB)을 효율적으로 처리합니다. 버킷 설정만 바꾸면 되므로 운영 복잡성이 최소입니다.',
      },
      {
        id: 'B',
        text: '각 사이트에서 가장 가까운 리전의 S3에 업로드 → Cross-Region Replication → 원본 삭제',
        isCorrect: false,
        explanation:
          "여러 S3 버킷을 관리해야 하고, 복제 후 원본을 삭제하는 추가 작업이 필요합니다. 이는 '운영 복잡성 최소화' 요구사항에 맞지 않습니다.",
      },
      {
        id: 'C',
        text: '매일 Snowball Edge로 데이터 전송 → 가까운 리전에 저장 → Cross-Region Replication',
        isCorrect: false,
        explanation:
          '500GB는 고속 인터넷으로 충분히 전송 가능한 양입니다. 매일 Snowball 장비를 배송/회수하는 것은 운영 복잡성을 크게 높입니다.',
      },
      {
        id: 'D',
        text: 'EC2에 업로드 → EBS에 저장 → 스냅샷 복사 → 다른 리전에서 EBS 복원',
        isCorrect: false,
        explanation:
          'S3로 직접 전송하는 것이 아닌 EC2/EBS를 거치는 불필요하게 복잡한 경로입니다. 전혀 적합하지 않은 아키텍처입니다.',
      },
    ],
  },
  services: {
    main: {
      icon: '⚡',
      title: 'S3 Transfer Acceleration',
      subTitle: '⭐ 이 문제의 핵심 서비스',
      desc: [
        'AWS 엣지 로케이션을 활용하여 업로드 속도 향상',
        '전 세계 어디서든 가장 가까운 엣지로 업로드',
        'AWS 전용 백본 네트워크로 빠르게 S3에 전달',
        '버킷에서 기능을 켜기만 하면 바로 사용 가능',
      ],
    },
    others: [
      {
        title: '📦 Multipart Upload',
        items: [
          '대용량 파일을 여러 조각으로 나누어 병렬 업로드',
          '100MB 이상 파일에 권장, 5GB 이상은 필수',
          '네트워크 오류 시 해당 부분만 재전송 가능',
          'Transfer Acceleration과 함께 사용하면 시너지 효과',
        ],
      },
      {
        title: '🔄 S3 Cross-Region Replication',
        items: ['버킷 간 객체를 자동으로 복제', '복제 후 원본 삭제가 필요하면 추가 작업 발생'],
        warning: '이 문제에서는 복잡성 증가 (여러 버킷 관리 + 삭제 작업)',
      },
      {
        title: '📮 AWS Snowball Edge',
        items: ['물리적 장치를 통한 대용량 데이터 전송', '수십~수백 TB 규모에 적합'],
        warning: '500GB/일은 고속 인터넷으로 충분 → Snowball 불필요',
      },
    ],
    insight: (
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
        ✨ <strong>핵심 인사이트:</strong> 고속 인터넷이 있고 데이터가 &quot;극단적으로 크지
        않다면&quot; S3 Transfer Acceleration이 가장 간단하고 효과적인 솔루션입니다!
      </p>
    ),
  },
  deepDive: (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">🆚</span> 서비스 비교 정리
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          비슷해 보이지만 다른 가속화 서비스들, 확실하게 구분해봅시다!
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b dark:border-slate-700">
                <th className="p-3 font-bold whitespace-nowrap">Service</th>
                <th className="p-3 font-bold whitespace-nowrap">Use Case</th>
                <th className="p-3 font-bold whitespace-nowrap">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="p-3 font-bold text-green-700 dark:text-green-400">
                  S3 Transfer Acceleration
                </td>
                <td className="p-3">
                  S3로의 <strong>업로드 속도</strong> 향상 (장거리)
                </td>
                <td className="p-3">HTTPS (Over UDP possibility)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">CloudFront</td>
                <td className="p-3">
                  S3 등에서의 <strong>다운로드(캐싱)</strong> 속도 향상
                </td>
                <td className="p-3">HTTP/HTTPS</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Global Accelerator</td>
                <td className="p-3">
                  TCP/UDP 기반 애플리케이션의 <strong>글로벌 성능</strong> 향상 (IP 고정)
                </td>
                <td className="p-3">TCP/UDP</td>
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
                S3 Transfer Acceleration
              </h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>Global (글로벌 사용자/지점)</li>
                <li>Upload Speed (업로드 속도)</li>
                <li>Long Distance (장거리 전송)</li>
                <li>S3 Bucket Destination</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Multipart Upload</h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>Large Objects (대용량 파일)</li>
                <li>Parallel Upload (병렬 업로드)</li>
                <li>Pause/Resume needed</li>
                <li>High Bandwidth Utilization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  ),
};

export default content;
