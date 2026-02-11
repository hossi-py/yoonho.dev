export interface SearchablePost {
  title: string;
  description: string;
  slug: string;
  category: string;
}

export const AWS_SAA_POSTS: SearchablePost[] = [
  {
    title: '다중 AZ 환경에서 공유 스토리지 구성하기',
    description:
      '여러 EC2 인스턴스가 동일한 파일에 접근해야 할 때, EBS가 아닌 EFS를 사용해야 하는 이유를 알아봅니다.',
    slug: 'efs-shared-storage',
    category: 'AWS SAA',
  },
  {
    title: 'Athena를 활용한 S3 로그 분석 가이드',
    description:
      'S3 버킷 로그를 Athena로 쿼리하여 데이터 분석을 수행하는 방법을 상세히 살펴봅니다.',
    slug: 'athena-log-analysis',
    category: 'AWS SAA',
  },
  {
    title: 'S3 Organizations Access 제어 최적화',
    description:
      'AWS Organizations ID를 사용하여 S3 버킷 액세스를 제한하고 보안을 강화하는 구성입니다.',
    slug: 's3-organizations-access',
    category: 'AWS SAA',
  },
  {
    title: 'S3 Transfer Acceleration으로 전송 속도 향상',
    description:
      '글로벌 전송 성능을 극대화하기 위해 S3 Transfer Acceleration을 적용하는 방법과 원리입니다.',
    slug: 's3-transfer-acceleration',
    category: 'AWS SAA',
  },
  {
    title: 'Snowball을 이용한 대규모 데이터 마이그레이션',
    description:
      '수십 테라바이트 이상의 데이터를 AWS로 신속하고 안전하게 옮기기 위한 Snowball 활용법입니다.',
    slug: 'snowball-migration',
    category: 'AWS SAA',
  },
  {
    title: 'SNS + SQS Fan-out 패턴 아키텍처 구현',
    description:
      '하나의 메시지를 여러 구독자에게 동시에 전달하는 Fan-out 패턴의 설계와 구현입니다.',
    slug: 'sns-sqs-fanout',
    category: 'AWS SAA',
  },
  {
    title: 'VPC Gateway Endpoint로 보안 강화하기',
    description: '인터넷 게이트웨이 없이 VPC 내에서 S3에 안전하게 접근하는 Endpoint 활용법입니다.',
    slug: 'vpc-gateway-endpoint',
    category: 'AWS SAA',
  },
];

export function searchPosts(query: string): SearchablePost[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  return AWS_SAA_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery)
  );
}
