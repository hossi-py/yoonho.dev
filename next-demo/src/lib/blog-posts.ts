export interface BlogPost {
  id: string; // slug
  category: 'aws-saa' | 'frontend' | 'backend';
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  frequency?: 'High' | 'Medium' | 'Low'; // For AWS SAA
  number?: number; // For series numbering
}

export const allPosts: BlogPost[] = [
  {
    id: 'sns-sqs-fanout',
    category: 'aws-saa',
    number: 7,
    title: 'AWS SAA 합격으로 가는 길 #7: 100,000 msg/s를 처리하는 SNS + SQS Fan-out 패턴',
    description:
      '수십 개의 마이크로서비스가 메시지를 동시에 소비해야 할 때, SNS + SQS Fan-out 패턴으로 완전한 디커플링과 무한 확장성을 달성하는 방법을 알아봅니다.',
    tags: ['SNS', 'SQS', 'Decoupling', 'Messaging'],
    date: '2026-02-10',
    frequency: 'High',
  },
  {
    id: 'snowball-migration',
    category: 'aws-saa',
    number: 6,
    title:
      'AWS SAA 합격으로 가는 길 #6: 70TB 대용량 데이터를 최소 대역폭으로 마이그레이션 (Snowball Edge)',
    description:
      '대용량 데이터를 AWS로 마이그레이션할 때, 네트워크 대역폭을 사용하지 않는 AWS Snowball Edge 활용법을 알아봅니다.',
    tags: ['Snowball', 'Migration', 'S3'],
    date: '2026-02-09',
    frequency: 'High',
  },
  {
    id: 'efs-shared-storage',
    category: 'aws-saa',
    number: 5,
    title: 'AWS SAA 합격으로 가는 길 #5: 다중 AZ 환경에서 공유 스토리지 구성하기 (EBS vs EFS)',
    description:
      '여러 EC2 인스턴스가 동일한 파일에 접근해야 할 때, EBS가 아닌 EFS를 사용해야 하는 이유를 알아봅니다.',
    tags: ['EFS', 'EBS', 'Storage'],
    date: '2026-02-09',
    frequency: 'High',
  },
  {
    id: 'vpc-gateway-endpoint',
    category: 'aws-saa',
    number: 4,
    title: 'AWS SAA 합격으로 가는 길 #4: 인터넷 없이 S3에 Private 접근하기 (VPC Gateway Endpoint)',
    description:
      'VPC 내 EC2 인스턴스가 인터넷 연결 없이 S3 버킷에 접근해야 할 때, VPC Gateway Endpoint가 정답입니다.',
    tags: ['VPC', 'S3', 'Networking'],
    date: '2026-02-09',
    frequency: 'High',
  },
  {
    id: 's3-organizations-access',
    category: 'aws-saa',
    number: 3,
    title: 'AWS SAA 합격으로 가는 길 #3: 조직 내 S3 버킷 액세스 제한 (PrincipalOrgID)',
    description:
      'AWS Organizations를 활용하여 특정 조직(Organization) 내의 계정들만 S3 버킷에 접근할 수 있도록 제한하는 가장 효율적인 방법을 알아봅니다.',
    tags: ['S3', 'AWS Organizations', 'IAM'],
    date: '2026-02-09',
    frequency: 'Medium',
  },
  {
    id: 'athena-log-analysis',
    category: 'aws-saa',
    number: 2,
    title: 'AWS SAA 합격으로 가는 길 #2: S3 로그 분석과 Athena',
    description:
      'S3에 저장된 JSON 로그 데이터를 별도 인프라 구축이나 데이터 로딩 없이 표준 SQL로 즉시 분석하는 서버리스 아키텍처를 알아봅니다.',
    tags: ['Athena', 'S3', 'Serverless'],
    date: '2026-02-09',
    frequency: 'Medium',
  },
  {
    id: 's3-transfer-acceleration',
    category: 'aws-saa',
    number: 1,
    title: 'AWS SAA 합격으로 가는 길 #1: 글로벌 데이터 수집과 S3 Transfer Acceleration',
    description:
      '전 세계 여러 대륙에서 발생하는 대용량 데이터를 빠르게 S3로 집계하는 최적의 솔루션을 알아봅니다.',
    tags: ['AWS', 'S3', 'Network'],
    date: '2026-02-09',
    frequency: 'High',
  },
];

/** 최근 게시물. 7일 제한 없이 최신순 N개 반환 (fallback 포함) */
export function getRecentPosts(limit: number = 5): BlogPost[] {
  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sorted.slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return allPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCategoryCount(category: string): number {
  return allPosts.filter((post) => post.category === category).length;
}

/** 현재 게시물 기준 이전/다음 게시물 반환 (날짜 내림차순 기준) */
export function getAdjacentPosts(category: string, currentId: string) {
  const posts = getPostsByCategory(category);
  const currentIndex = posts.findIndex((p) => p.id === currentId);

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

/** 카테고리 내 모든 고유 태그 반환 */
export function getTagsByCategory(category: string): string[] {
  const posts = getPostsByCategory(category);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}
