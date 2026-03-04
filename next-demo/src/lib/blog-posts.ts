export interface BlogPost {
  id: string;
  category: 'aws-saa' | 'aws-aif' | 'frontend' | 'backend';
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  frequency?: 'High' | 'Medium' | 'Low';
  number?: number;
}

export const allPosts: BlogPost[] = [
  {
    id: 'aif-c01-q7-transfer-learning-domain-specific-model-adaptation',
    category: 'aws-aif',
    number: 7,
    title: 'AWS AIF-C01 합격으로 가는 길 #7: 도메인 모델 확장과 Transfer Learning',
    description:
      '새 모델을 처음부터 만들지 않고 사전학습 모델을 유사한 신규 태스크에 맞게 적응시키는 전이학습 전략을 정리합니다.',
    tags: ['Transfer Learning', 'Model Adaptation', 'Pre-trained Model'],
    date: '2026-02-27',
    frequency: 'High',
  },
  {
    id: 'aif-c01-q6-sagemaker-async-inference-large-payload',
    category: 'aws-aif',
    number: 6,
    title: 'AWS AIF-C01 합격으로 가는 길 #6: SageMaker 대용량 추론과 비동기 옵션',
    description:
      '입력 최대 1GB, 처리 최대 1시간, 근실시간 요구에서 어떤 SageMaker 추론 옵션이 맞는지 정리합니다.',
    tags: ['SageMaker', 'Asynchronous Inference', 'MLOps'],
    date: '2026-02-27',
    frequency: 'High',
  },
  {
    id: 'aif-c01-q5-chatbot-response-quality-prompt-control',
    category: 'aws-aif',
    number: 5,
    title: 'AWS AIF-C01 합격으로 가는 길 #5: 추천 챗봇 응답 품질과 Prompt 조정',
    description:
      '사전 학습 LLM 추천 챗봇에서 응답을 짧고 특정 언어로 맞추려면 어떤 방법이 가장 직접적인지 정리합니다.',
    tags: ['LLM', 'Prompt Engineering', 'Chatbot'],
    date: '2026-02-27',
    frequency: 'High',
  },
  {
    id: 'aif-c01-q4-plant-disease-image-classification-accuracy',
    category: 'aws-aif',
    number: 4,
    title: 'AWS AIF-C01 합격으로 가는 길 #4: 식물 잎 질병 이미지 분류와 Accuracy',
    description:
      '식물 잎 사진 분류 문제에서 모델이 얼마나 많이 정답을 맞췄는지 평가하려면 어떤 지표를 써야 하는지 정리합니다.',
    tags: ['Classification', 'Accuracy', 'Evaluation Metric'],
    date: '2026-02-27',
    frequency: 'High',
  },
  {
    id: 'aif-c01-q3-gene-classification-decision-tree',
    category: 'aws-aif',
    number: 3,
    title: 'AWS AIF-C01 합격으로 가는 길 #3: 유전자 20개 범주 분류와 Decision Tree',
    description:
      '유전자 분류 문제에서 모델 내부 작동 원리를 문서화해야 할 때 왜 Decision Tree가 정답인지 설명합니다.',
    tags: ['Decision Tree', 'Classification', 'Explainability'],
    date: '2026-02-26',
    frequency: 'High',
  },
  {
    id: 'aif-c01-q2-legal-document-summarization-chatbot',
    category: 'aws-aif',
    number: 2,
    title: 'AWS AIF-C01 합격으로 가는 길 #2: 법률 문서 핵심 포인트 추출과 요약 챗봇',
    description:
      '법률 문서를 읽어 핵심 포인트를 추출해야 할 때 NER/추천/번역이 아닌 Summarization Chatbot을 선택하는 이유를 설명합니다.',
    tags: ['LLM', 'Summarization', 'Chatbot'],
    date: '2026-02-26',
    frequency: 'High',
  },
  {
    id: 'aif-c01-q1-model-explainability-pdp',
    category: 'aws-aif',
    number: 1,
    title: 'AWS AIF-C01 합격으로 가는 길 #1: 예측 모델 설명 가능성 보고서와 PDP',
    description:
      '분기 수요 예측 모델의 투명성과 설명가능성 요구를 만족하려면 보고서에 무엇을 넣어야 하는지 설명합니다.',
    tags: ['Explainability', 'PDP', 'SageMaker Clarify'],
    date: '2026-02-26',
    frequency: 'High',
  },
  {
    id: 'sns-sqs-fanout',
    category: 'aws-saa',
    number: 7,
    title: 'AWS SAA 합격으로 가는 길 #7: 100,000 msg/s를 처리하는 SNS + SQS Fan-out 패턴',
    description:
      '여러 마이크로서비스에 메시지를 동시에 전달해야 할 때 SNS + SQS Fan-out으로 확장성과 결합도 문제를 해결하는 방법을 설명합니다.',
    tags: ['SNS', 'SQS', 'Decoupling', 'Messaging'],
    date: '2026-02-10',
    frequency: 'High',
  },
  {
    id: 'snowball-migration',
    category: 'aws-saa',
    number: 6,
    title: 'AWS SAA 합격으로 가는 길 #6: 70TB 대용량 데이터 마이그레이션 (Snowball Edge)',
    description:
      '네트워크 대역폭이 제한된 환경에서 대용량 데이터를 AWS로 이전할 때 Snowball Edge를 선택하는 기준을 설명합니다.',
    tags: ['Snowball', 'Migration', 'S3'],
    date: '2026-02-09',
    frequency: 'High',
  },
  {
    id: 'efs-shared-storage',
    category: 'aws-saa',
    number: 5,
    title: 'AWS SAA 합격으로 가는 길 #5: 다중 AZ 공유 스토리지 (EBS vs EFS)',
    description:
      '여러 EC2 인스턴스가 동시에 파일 시스템을 공유해야 할 때 EBS가 아닌 EFS를 선택해야 하는 이유를 설명합니다.',
    tags: ['EFS', 'EBS', 'Storage'],
    date: '2026-02-09',
    frequency: 'High',
  },
  {
    id: 'vpc-gateway-endpoint',
    category: 'aws-saa',
    number: 4,
    title: 'AWS SAA 합격으로 가는 길 #4: 인터넷 없이 S3 Private 접근 (VPC Gateway Endpoint)',
    description:
      'VPC 내의 EC2가 인터넷 연결 없이 S3에 안전하게 접근해야 할 때 Gateway Endpoint를 적용하는 방법을 다룹니다.',
    tags: ['VPC', 'S3', 'Networking'],
    date: '2026-02-09',
    frequency: 'High',
  },
  {
    id: 's3-organizations-access',
    category: 'aws-saa',
    number: 3,
    title: 'AWS SAA 합격으로 가는 길 #3: 조직 단위 S3 접근 제어 (PrincipalOrgID)',
    description:
      'AWS Organizations 기반으로 같은 조직 계정만 S3 버킷에 접근하도록 제한하는 정책 패턴을 설명합니다.',
    tags: ['S3', 'AWS Organizations', 'IAM'],
    date: '2026-02-09',
    frequency: 'Medium',
  },
  {
    id: 'athena-log-analysis',
    category: 'aws-saa',
    number: 2,
    title: 'AWS SAA 합격으로 가는 길 #2: S3 로그 분석과 Amazon Athena',
    description:
      'S3에 저장된 JSON 로그를 서버리스 방식으로 분석할 때 Athena를 선택하는 근거를 설명합니다.',
    tags: ['Athena', 'S3', 'Serverless'],
    date: '2026-02-09',
    frequency: 'Medium',
  },
  {
    id: 's3-transfer-acceleration',
    category: 'aws-saa',
    number: 1,
    title: 'AWS SAA 합격으로 가는 길 #1: 글로벌 업로드 성능과 S3 Transfer Acceleration',
    description:
      '여러 리전에서 대용량 업로드를 빠르게 해야 할 때 S3 Transfer Acceleration을 고려하는 이유를 설명합니다.',
    tags: ['AWS', 'S3', 'Network'],
    date: '2026-02-09',
    frequency: 'High',
  },
];

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

export function getAdjacentPosts(category: string, currentId: string) {
  const posts = getPostsByCategory(category);
  const currentIndex = posts.findIndex((p) => p.id === currentId);

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

export function getTagsByCategory(category: string): string[] {
  const posts = getPostsByCategory(category);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}
