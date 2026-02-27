import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type QuestionSeed = {
  id: string;
  category: string;
  examCode: string;
  number: number;
  title: string;
  description: string;
  tagId: string;
  dateLabel: string;
  publishedAt: Date;
  frequency: 'High' | 'Medium' | 'Low';
  tags: string[];
  scenarioEnglish: string;
  scenarioKorean: string;
  requirements: Prisma.JsonArray;
  choices: Prisma.JsonArray;
  answerId: string;
  serviceMain: Prisma.JsonObject;
  serviceOthers: Prisma.JsonArray;
  insight: string;
  deepDiveTable: Prisma.JsonArray;
  cheatSheet: Prisma.JsonObject;
};

const AIF_QUESTIONS: QuestionSeed[] = [
  {
    id: 'aif-c01-q7-transfer-learning-domain-specific-model-adaptation',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 7,
    title: 'AWS AIF-C01 합격으로 가는 길 #7: 도메인 모델 확장과 Transfer Learning',
    description:
      '새 모델을 처음부터 만들지 않고, 사전학습 모델을 유사한 신규 태스크에 적응시키는 전략을 묻는 문제입니다.',
    tagId: 'Model Adaptation',
    dateLabel: '2026. 02. 27',
    publishedAt: new Date('2026-02-27'),
    frequency: 'High',
    tags: ['Transfer Learning', 'Model Adaptation', 'Pre-trained Model'],
    scenarioEnglish:
      'A company is using domain-specific models. The company wants to avoid creating new models from the beginning. The company instead wants to adapt pre-trained models to create models for new, related tasks. Which ML strategy meets these requirements?',
    scenarioKorean:
      '회사는 도메인 특화 모델을 사용 중이며, 새 모델을 처음부터 만들고 싶지 않다. 대신 사전학습 모델을 새로운 유사 태스크에 맞게 적응시키고자 한다. 어떤 ML 전략이 적합한가?',
    requirements: [
      {
        num: 1,
        title: '처음부터 학습 회피',
        desc: 'from scratch 방식은 시간/비용이 커서 피하고 싶다.',
        keyword: 'Avoid from scratch',
      },
      {
        num: 2,
        title: '사전학습 모델 재사용',
        desc: '이미 학습된 지식(가중치)을 기반으로 시작해야 한다.',
        keyword: 'Pre-trained reuse',
      },
      {
        num: 3,
        title: '유사 태스크 적응',
        desc: '완전히 다른 도메인이 아니라 관련 태스크 확장이다.',
        keyword: 'Related task adaptation',
      },
      {
        num: 4,
        title: '전략 vs 하이퍼파라미터 구분',
        desc: 'epoch 증감은 학습 길이 조절일 뿐 전략 선택이 아니다.',
        keyword: 'Strategy vs tuning',
      },
    ],
    choices: [
      {
        id: 'A',
        text: '에폭 수 증가 (Increase the number of epochs)',
        isCorrect: false,
        explanation: 'epoch는 학습 반복 횟수 조절이며, 모델 재사용 전략을 뜻하지 않는다.',
      },
      {
        id: 'B',
        text: '전이학습 사용 (Use transfer learning)',
        isCorrect: true,
        explanation:
          '정답이다. Transfer Learning은 사전학습 모델을 기반으로 유사 태스크에 빠르게 적응시키는 대표 전략이다.',
      },
      {
        id: 'C',
        text: '에폭 수 감소 (Decrease the number of epochs)',
        isCorrect: false,
        explanation: 'epoch 감소도 튜닝 파라미터 조정일 뿐, 적응 전략 자체는 아니다.',
      },
      {
        id: 'D',
        text: '비지도학습 사용 (Use unsupervised learning)',
        isCorrect: false,
        explanation: '비지도학습은 라벨 없는 패턴 탐색 목적이 중심이라 문제 요구와 다르다.',
      },
    ],
    answerId: 'B',
    serviceMain: {
      icon: '🔁',
      title: 'Transfer Learning',
      subTitle: '사전학습 모델 재사용 + 신규 유사 태스크 적응',
      desc: [
        '기존 가중치를 활용해 초기 학습 비용 절감',
        '적은 데이터로도 빠르게 성능 확보 가능',
        '유사 도메인 확장 시 실무적으로 가장 효율적',
      ],
    },
    serviceOthers: [
      {
        title: 'Epoch 조정 (A/C)',
        items: ['학습 길이 조절 파라미터', '전략 선택 문제의 정답 근거가 되기 어려움'],
        warning: '튜닝 옵션과 학습 전략을 혼동하면 오답',
      },
      {
        title: 'Unsupervised Learning (D)',
        items: ['패턴 탐색에는 유효', 'pre-trained adaptation 요구와 직접 불일치'],
      },
    ],
    insight:
      '문제에 pre-trained + adapt + related task가 동시에 나오면 Transfer Learning 정답 확률이 매우 높다.',
    deepDiveTable: [
      {
        option: 'B. Transfer Learning',
        fit: '사전학습 지식 재사용 후 태스크 전이',
        why: '문제 요구(재사용 + 유사 태스크 적응)와 1:1 매칭',
        correct: true,
      },
      {
        option: 'A/C. Epoch 조정',
        fit: '학습 반복 횟수 증감',
        why: '전략이 아니라 하이퍼파라미터 조정',
        correct: false,
      },
      {
        option: 'D. Unsupervised',
        fit: '라벨 없는 데이터 패턴 학습',
        why: '요구의 핵심인 pre-trained adaptation과 불일치',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: pre-trained, adapt, related task',
        '“from scratch를 피한다” 문장이 보이면 전이학습 우선',
        '전략 문제인지 튜닝 문제인지 먼저 구분',
      ],
      negative: [
        'epoch 증감을 전략 정답으로 고르는 패턴',
        '학습 패러다임(지도/비지도)과 전략(전이학습) 혼동',
        '문장 동사(adapt/reuse)를 놓침',
      ],
    },
  },
  {
    id: 'aif-c01-q6-sagemaker-async-inference-large-payload',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 6,
    title: 'AWS AIF-C01 합격으로 가는 길 #6: SageMaker 대용량 추론과 비동기 옵션',
    description:
      '입력 1GB, 처리 1시간, near real-time 요구를 동시에 만족하는 SageMaker 추론 옵션을 묻는 문제입니다.',
    tagId: 'SageMaker Inference',
    dateLabel: '2026. 02. 27',
    publishedAt: new Date('2026-02-27'),
    frequency: 'High',
    tags: ['SageMaker', 'Asynchronous Inference', 'MLOps'],
    scenarioEnglish:
      'A company uses Amazon SageMaker for its ML pipeline in production. Input size is up to 1 GB and processing time is up to 1 hour. The company needs near real-time latency. Which SageMaker inference option meets these requirements?',
    scenarioKorean:
      '프로덕션 ML 파이프라인에서 입력 최대 1GB, 처리 최대 1시간이며 near real-time 응답이 필요하다. 어떤 SageMaker 추론 옵션이 적합한가?',
    requirements: [
      {
        num: 1,
        title: '대용량 입력',
        desc: 'payload가 크므로 일반 실시간 경로 제약을 먼저 점검해야 한다.',
        keyword: 'Large payload',
      },
      {
        num: 2,
        title: '장시간 처리',
        desc: '처리 시간이 길어 동기식 응답의 타임아웃 리스크가 있다.',
        keyword: 'Long processing',
      },
      {
        num: 3,
        title: '근실시간 요구',
        desc: '완전 배치 오프라인보다는 빠른 결과 수신이 필요하다.',
        keyword: 'Near real-time',
      },
      {
        num: 4,
        title: '옵션 제약 비교',
        desc: 'Real-time/Serverless/Batch와 Async의 제약 차이를 구분해야 한다.',
        keyword: 'Option fit',
      },
    ],
    choices: [
      {
        id: 'A',
        text: '실시간 추론 (Real-time inference)',
        isCorrect: false,
        explanation: '짧은 요청-응답엔 좋지만 대용량/장시간 처리 요구와 충돌 가능성이 크다.',
      },
      {
        id: 'B',
        text: '서버리스 추론 (Serverless inference)',
        isCorrect: false,
        explanation: '운영 편의성은 높지만 요청 크기/실행 시간 제약 측면에서 불리하다.',
      },
      {
        id: 'C',
        text: '비동기 추론 (Asynchronous inference)',
        isCorrect: true,
        explanation:
          '정답이다. Async inference는 대용량 payload와 긴 처리 시간을 지원하며 near real-time 요구와 가장 잘 맞는다.',
      },
      {
        id: 'D',
        text: '배치 변환 (Batch transform)',
        isCorrect: false,
        explanation: '대량 오프라인 일괄 처리에는 적합하지만 near real-time 요구와는 거리가 있다.',
      },
    ],
    answerId: 'C',
    serviceMain: {
      icon: '📦',
      title: 'Asynchronous Inference',
      subTitle: '대용량 + 장시간 + 근실시간 요구의 교집합',
      desc: [
        '요청/응답 분리로 긴 처리시간 워크로드 대응',
        '큰 payload 처리에 유리',
        '운영 시 결과 저장/콜백 흐름 설계 가능',
      ],
    },
    serviceOthers: [
      {
        title: 'Real-time / Serverless',
        items: ['짧은 요청 중심', '대용량/장시간 요구에서 제약 확인 필요'],
        warning: '“실시간” 단어만 보고 A 고르면 오답 빈도 높음',
      },
      {
        title: 'Batch Transform',
        items: ['오프라인 일괄 처리 강점', 'near real-time 요구와 부조화'],
      },
    ],
    insight:
      'SageMaker 문제에서 payload가 크고 처리 시간이 길면 Async inference를 먼저 올려두고 나머지를 제거한다.',
    deepDiveTable: [
      {
        option: 'C. Asynchronous inference',
        fit: '대용량/장시간 처리 + 빠른 결과 수신 패턴',
        why: '문제의 3개 제약을 동시에 만족',
        correct: true,
      },
      {
        option: 'A. Real-time',
        fit: '저지연 동기 응답',
        why: '1GB/1시간 요구에서 비효율·제약 가능',
        correct: false,
      },
      {
        option: 'B. Serverless',
        fit: '간헐 트래픽 운영 간소화',
        why: '요청 크기/실행 시간 조건과 충돌 가능',
        correct: false,
      },
      {
        option: 'D. Batch transform',
        fit: '오프라인 일괄 처리',
        why: 'near real-time 요구와 불일치',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: large payload + long processing + near real-time',
        '동기 실시간이 아니라 비동기 수신 구조가 핵심',
        '제약 조건을 먼저 읽고 서비스 이름은 나중에 본다',
      ],
      negative: [
        '“real-time” 단어에 반사적으로 A 선택',
        'Serverless를 제약 확인 없이 선택',
        'Batch를 near real-time 문제에 적용',
      ],
    },
  },
  {
    id: 'aif-c01-q5-chatbot-response-quality-prompt-control',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 5,
    title: 'AWS AIF-C01 합격으로 가는 길 #5: 추천 챗봇 응답 품질과 Prompt 조정',
    description:
      'LLM 출력 길이와 언어를 제어해야 할 때 어떤 방식이 가장 직접적인지 묻는 문제입니다.',
    tagId: 'Prompt Engineering',
    dateLabel: '2026. 02. 27',
    publishedAt: new Date('2026-02-27'),
    frequency: 'High',
    tags: ['LLM', 'Prompt Engineering', 'Chatbot'],
    scenarioEnglish:
      'A company uses a pre-trained LLM for a recommendation chatbot. The company needs outputs to be short and in a specific language. Which solution aligns response quality with expectations?',
    scenarioKorean:
      '사전학습 LLM 기반 추천 챗봇에서 응답은 짧고 특정 언어여야 한다. 어떤 방법이 가장 직접적인 해결책인가?',
    requirements: [
      {
        num: 1,
        title: '출력 형식 제어',
        desc: '길이/언어 제약을 명시적으로 통제해야 한다.',
        keyword: 'Format control',
      },
      {
        num: 2,
        title: '즉시 적용성',
        desc: '모델 교체보다 빠르게 반복 실험 가능한 수단이 유리하다.',
        keyword: 'Fast iteration',
      },
      {
        num: 3,
        title: '일관성',
        desc: '랜덤성보다 일관된 출력이 중요한 요구다.',
        keyword: 'Consistency',
      },
      {
        num: 4,
        title: '파라미터 역할 구분',
        desc: 'temperature/top-k는 다양성 제어지 형식 고정 도구가 아니다.',
        keyword: 'Sampling params',
      },
    ],
    choices: [
      {
        id: 'A',
        text: '프롬프트를 조정한다 (Adjust the prompt)',
        isCorrect: true,
        explanation:
          '정답이다. 프롬프트에서 길이·언어·톤을 명시하면 형식 제어 요구를 가장 직접적으로 만족할 수 있다.',
      },
      {
        id: 'B',
        text: '다른 크기의 LLM을 선택한다 (Choose different model size)',
        isCorrect: false,
        explanation: '모델 크기 변경은 비용/지연/성능 전반 영향이며 형식 제어의 1차 해법이 아니다.',
      },
      {
        id: 'C',
        text: 'Temperature를 높인다 (Increase temperature)',
        isCorrect: false,
        explanation: 'temperature 증가는 다양성과 랜덤성을 올려 오히려 일관성 요구를 해칠 수 있다.',
      },
      {
        id: 'D',
        text: 'Top K를 높인다 (Increase Top K)',
        isCorrect: false,
        explanation: 'Top-K는 후보 다양성 조절이며 언어/길이 고정을 직접 보장하지 않는다.',
      },
    ],
    answerId: 'A',
    serviceMain: {
      icon: '🧩',
      title: 'Prompt Engineering',
      subTitle: '출력 형식 요구를 가장 빠르게 만족',
      desc: [
        '언어·길이 제약을 프롬프트에 명시',
        '모델 교체 없이 즉시 테스트 가능',
        '운영 정책 변경 시 대응 속도가 빠름',
      ],
    },
    serviceOthers: [
      {
        title: 'Model size 변경',
        items: ['간접 효과는 있을 수 있음', '형식 제어 문제엔 과한 접근'],
      },
      {
        title: 'Temperature / Top-K',
        items: ['다양성 조절 목적', '형식 고정 문제와 직접 불일치'],
        warning: '샘플링 파라미터는 품질/창의성 조절에 가깝다',
      },
    ],
    insight:
      '요구가 “무엇을 말하나”가 아니라 “어떻게 말하나(형식)”일 때는 Prompt 조정이 정답 축이다.',
    deepDiveTable: [
      {
        option: 'A. Adjust the prompt',
        fit: '길이/언어/톤 직접 제어',
        why: '형식 제약 요구와 가장 직접적으로 연결',
        correct: true,
      },
      {
        option: 'B. Model size change',
        fit: '모델 역량/비용 전반 조정',
        why: '출력 형식 제어 문제의 직접 해법 아님',
        correct: false,
      },
      {
        option: 'C/D. Temperature/Top-K increase',
        fit: '토큰 샘플링 다양성 제어',
        why: '짧고 일관된 특정 언어 출력과 충돌 가능',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: short response, specific language',
        '형식 제약은 Prompt에 명시',
        '예: “한국어로 2문장 이내”',
      ],
      negative: [
        '모델 크기 변경을 1순위로 선택',
        'temperature/top-k 증가를 형식 제어로 오해',
        '품질 문제와 형식 문제를 구분하지 않음',
      ],
    },
  },
  {
    id: 'aif-c01-q4-plant-disease-image-classification-accuracy',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 4,
    title: 'AWS AIF-C01 합격으로 가는 길 #4: 식물 잎 질병 이미지 분류와 Accuracy',
    description:
      '이미지 분류에서 정답 개수/비율을 직접 측정할 메트릭을 고르는 기본 문제입니다.',
    tagId: 'Classification Metrics',
    dateLabel: '2026. 02. 27',
    publishedAt: new Date('2026-02-27'),
    frequency: 'High',
    tags: ['Classification', 'Accuracy', 'Evaluation Metric'],
    scenarioEnglish:
      'A company built an image classification model for plant disease prediction. They want to evaluate how many images are classified correctly. Which metric should they use?',
    scenarioKorean:
      '식물 잎 질병 이미지 분류 모델에서 “얼마나 많이 맞췄는지”를 평가하려면 어떤 지표를 써야 하는가?',
    requirements: [
      {
        num: 1,
        title: '문제 유형 확인',
        desc: '연속값 예측이 아닌 분류(Classification) 문제다.',
        keyword: 'Classification',
      },
      {
        num: 2,
        title: '평가 대상 확인',
        desc: '맞춘 샘플 수 또는 비율이 핵심이다.',
        keyword: 'Correct ratio',
      },
      {
        num: 3,
        title: '메트릭 적합성',
        desc: '정답 비율을 직접 계산하는 지표를 선택해야 한다.',
        keyword: 'Direct metric',
      },
      {
        num: 4,
        title: '회귀 지표 배제',
        desc: 'R2/RMSE는 회귀(Regression) 지표다.',
        keyword: 'Regression mismatch',
      },
    ],
    choices: [
      {
        id: 'A',
        text: 'R-squared score',
        isCorrect: false,
        explanation: 'R-squared는 회귀 설명력 지표로 분류 정답 비율을 직접 나타내지 못한다.',
      },
      {
        id: 'B',
        text: 'Accuracy',
        isCorrect: true,
        explanation: '정답이다. Accuracy는 전체 샘플 중 정답 샘플 비율을 직접 계산한다.',
      },
      {
        id: 'C',
        text: 'Root mean squared error (RMSE)',
        isCorrect: false,
        explanation: 'RMSE는 회귀 오차 지표이며 분류 라벨 정오 평가와 목적이 다르다.',
      },
      {
        id: 'D',
        text: 'Learning rate',
        isCorrect: false,
        explanation: 'learning rate는 학습 하이퍼파라미터이며 평가 지표가 아니다.',
      },
    ],
    answerId: 'B',
    serviceMain: {
      icon: '🎯',
      title: 'Accuracy',
      subTitle: '정답 개수/비율을 직접 반영하는 분류 메트릭',
      desc: [
        '맞춘 샘플 / 전체 샘플 비율 계산',
        '문제 문장과 직접 매칭 (“how many correctly classified”)',
        '분류 문제의 기본 선택지',
      ],
    },
    serviceOthers: [
      {
        title: 'R2 / RMSE',
        items: ['회귀 지표', '분류 정오 평가에는 목적 불일치'],
      },
      {
        title: 'Learning rate',
        items: ['학습 과정 파라미터', '평가 메트릭과 무관'],
        warning: '메트릭 문제에서 하이퍼파라미터를 고르면 오답',
      },
    ],
    insight:
      'classification 문제에서 “correctly classified/how many correct” 표현이 보이면 Accuracy가 우선이다.',
    deepDiveTable: [
      {
        option: 'B. Accuracy',
        fit: '분류 정답 비율 직접 측정',
        why: '질문 요구와 정확히 일치',
        correct: true,
      },
      {
        option: 'A. R-squared',
        fit: '회귀 설명력',
        why: '분류 문제와 목적 불일치',
        correct: false,
      },
      {
        option: 'C. RMSE',
        fit: '회귀 오차',
        why: '연속값 예측에서 사용하는 지표',
        correct: false,
      },
      {
        option: 'D. Learning rate',
        fit: '학습 제어 변수',
        why: '평가 지표 아님',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: correctly classified, number of correct',
        '분류 문제의 기본 메트릭은 Accuracy',
        '문제 유형(분류/회귀) 먼저 확정',
      ],
      negative: [
        'R2/RMSE를 분류 문제에 사용',
        'learning rate를 성능 지표로 오해',
        '공식만 외우고 문제 문장 해석 생략',
      ],
    },
  },
  {
    id: 'aif-c01-q3-gene-classification-decision-tree',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 3,
    title: 'AWS AIF-C01 합격으로 가는 길 #3: 유전자 20개 범주 분류와 Decision Tree',
    description:
      '다중 분류와 설명가능성 요구를 함께 만족하는 알고리즘 선택 문제입니다.',
    tagId: 'ML Algorithm Selection',
    dateLabel: '2026. 02. 26',
    publishedAt: new Date('2026-02-26'),
    frequency: 'High',
    tags: ['Decision Tree', 'Classification', 'Explainability'],
    scenarioEnglish:
      'A company wants to classify human genes into 20 categories based on gene characteristics. They need an algorithm that can document how inner mechanism affects output. Which algorithm fits?',
    scenarioKorean:
      '유전자 특성으로 20개 범주 분류를 수행하고, 모델 내부 메커니즘이 결과에 미치는 영향을 문서화해야 한다. 어떤 알고리즘이 적합한가?',
    requirements: [
      {
        num: 1,
        title: '다중 분류',
        desc: '20개 클래스 라벨을 예측하는 문제다.',
        keyword: 'Multi-class classification',
      },
      {
        num: 2,
        title: '해석 가능성',
        desc: '결정 근거를 사람이 추적 가능해야 한다.',
        keyword: 'Interpretability',
      },
      {
        num: 3,
        title: '문서화 용이성',
        desc: '규칙/분기 형태로 설명 가능한 모델이 유리하다.',
        keyword: 'Traceability',
      },
      {
        num: 4,
        title: '모델 역할 구분',
        desc: '회귀/군집화/차원축소를 분류기와 혼동하면 안 된다.',
        keyword: 'Role distinction',
      },
    ],
    choices: [
      {
        id: 'A',
        text: '선형 회귀 (Linear Regression)',
        isCorrect: false,
        explanation: '회귀 모델로 연속값 예측에 적합하며 분류 목적과 다르다.',
      },
      {
        id: 'B',
        text: 'K-means clustering',
        isCorrect: false,
        explanation: '비지도 군집화 알고리즘으로 라벨 분류 정답과 목적이 다르다.',
      },
      {
        id: 'C',
        text: 'Decision Tree',
        isCorrect: true,
        explanation:
          '정답이다. Decision Tree는 분류에 적합하고 분기 규칙으로 내부 의사결정 과정을 설명/문서화하기 쉽다.',
      },
      {
        id: 'D',
        text: 'Principal Component Analysis (PCA)',
        isCorrect: false,
        explanation: 'PCA는 차원 축소 전처리 기법이며 단독 분류기 정답으로 보기 어렵다.',
      },
    ],
    answerId: 'C',
    serviceMain: {
      icon: '🌳',
      title: 'Decision Tree',
      subTitle: '분류 + 설명가능성 동시 만족',
      desc: [
        '분기 노드로 예측 근거 추적 가능',
        '다중 클래스 분류에 직접 적용 가능',
        '문서화 요구가 있을 때 강점',
      ],
    },
    serviceOthers: [
      {
        title: 'Linear Regression / K-means / PCA',
        items: ['회귀/군집/전처리 역할', '문제의 분류+설명 요구와 직접 불일치'],
        warning: '모델 타입 구분 실수는 고빈도 오답 포인트',
      },
    ],
    insight:
      'classify + explain mechanism 조합 문제는 Decision Tree가 가장 직관적인 정답 축이다.',
    deepDiveTable: [
      {
        option: 'C. Decision Tree',
        fit: '규칙 기반 분류기',
        why: '다중 분류 + 설명가능성 요구 동시 충족',
        correct: true,
      },
      {
        option: 'A. Linear Regression',
        fit: '회귀 모델',
        why: '분류 라벨 예측 목적과 불일치',
        correct: false,
      },
      {
        option: 'B. K-means',
        fit: '비지도 군집화',
        why: '라벨 분류 문제의 정답 모델 아님',
        correct: false,
      },
      {
        option: 'D. PCA',
        fit: '차원 축소',
        why: '전처리 기법이지 최종 분류기 아님',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: classify + explain/document mechanism',
        '해석 가능한 규칙 모델이면 Decision Tree 우선',
        '분류인지 회귀인지 먼저 분기',
      ],
      negative: [
        'PCA를 모델 정답으로 착각',
        'K-means를 지도 분류 문제에 적용',
        '회귀 알고리즘을 라벨 분류에 사용',
      ],
    },
  },
  {
    id: 'aif-c01-q2-legal-document-summarization-chatbot',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 2,
    title: 'AWS AIF-C01 합격으로 가는 길 #2: 법률 문서 핵심 포인트 추출과 요약 챗봇',
    description:
      '법률 문서를 읽고 핵심 포인트를 추출하는 요구에 가장 적합한 LLM 애플리케이션 유형을 묻는 문제입니다.',
    tagId: 'LLM Application',
    dateLabel: '2026. 02. 26',
    publishedAt: new Date('2026-02-26'),
    frequency: 'High',
    tags: ['LLM', 'Summarization', 'Chatbot'],
    scenarioEnglish:
      'A law firm wants to build an LLM-based application that reads legal documents and extracts key points. Which solution meets these requirements?',
    scenarioKorean:
      '로펌이 법률 문서를 읽고 핵심 포인트를 추출하는 LLM 애플리케이션을 만들고자 한다. 어떤 솔루션이 적합한가?',
    requirements: [
      {
        num: 1,
        title: '문서 이해',
        desc: '긴 문서 맥락을 유지하며 내용을 해석해야 한다.',
        keyword: 'Long context',
      },
      {
        num: 2,
        title: '핵심 추출',
        desc: '엔티티 식별이 아니라 핵심 내용 요약이 목적이다.',
        keyword: 'Summarization',
      },
      {
        num: 3,
        title: '대화형 전달',
        desc: '챗 인터페이스로 빠르게 확인 가능한 형태가 유리하다.',
        keyword: 'Chat UX',
      },
      {
        num: 4,
        title: '오답 유형 구분',
        desc: 'NER/추천/번역은 부분 기능 혹은 다른 문제 유형이다.',
        keyword: 'Task fit',
      },
    ],
    choices: [
      {
        id: 'A',
        text: 'Named entity recognition (NER)',
        isCorrect: false,
        explanation: '엔티티 추출에는 강하지만 문서 전체 핵심 요약 요구를 직접 만족하지 못한다.',
      },
      {
        id: 'B',
        text: 'Recommendation engine',
        isCorrect: false,
        explanation: '추천 문제 유형으로, 문서 핵심 추출 목적과 무관하다.',
      },
      {
        id: 'C',
        text: 'Summarization chatbot',
        isCorrect: true,
        explanation:
          '정답이다. 문서를 읽고 핵심 포인트를 요약해 전달하는 요구와 가장 직접적으로 맞는다.',
      },
      {
        id: 'D',
        text: 'Translation system',
        isCorrect: false,
        explanation: '언어 변환이 목적이며 핵심 포인트 추출 자체를 보장하지 않는다.',
      },
    ],
    answerId: 'C',
    serviceMain: {
      icon: '📝',
      title: 'Summarization Chatbot',
      subTitle: '문서 이해 + 핵심 추출 + 대화형 전달',
      desc: [
        '긴 문서 요약과 핵심 포인트 추출에 직접 적합',
        '질문-응답으로 조항별 검토 가능',
        '법률 문서 검토 워크플로우와 연결이 쉬움',
      ],
    },
    serviceOthers: [
      {
        title: 'NER / Translation',
        items: ['부분 기능(개체/언어 변환)', '핵심 요약 요구와 직접 차이'],
      },
      {
        title: 'Recommendation',
        items: ['사용자 선호 기반 추천 문제', '문서 분석 문제와 도메인 불일치'],
      },
    ],
    insight:
      '문장에 read documents + extract key points가 보이면 Summarization 계열을 우선 선택한다.',
    deepDiveTable: [
      {
        option: 'C. Summarization chatbot',
        fit: '문서 요약 + 핵심 포인트 추출',
        why: '문제 목적과 직접 일치',
        correct: true,
      },
      {
        option: 'A. NER',
        fit: '개체명 추출',
        why: '문서 전체 요약 요구를 직접 해결하지 못함',
        correct: false,
      },
      {
        option: 'B. Recommendation',
        fit: '추천 시스템',
        why: '문제 유형 자체가 다름',
        correct: false,
      },
      {
        option: 'D. Translation',
        fit: '언어 변환',
        why: '핵심 추출 요구와 불일치',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: read docs, extract key points, summarize',
        '요약 목적이면 Summarization이 1순위',
        'LLM + Chat UI 요구는 정답 확률 상승',
      ],
      negative: [
        'NER를 요약 전체 해법으로 착각',
        '번역/추천 같은 다른 문제 유형 선택',
        '문장 동사 중심 해석을 생략',
      ],
    },
  },
  {
    id: 'aif-c01-q1-model-explainability-pdp',
    category: 'aws-aif',
    examCode: 'AIF-C01',
    number: 1,
    title: 'AWS AIF-C01 합격으로 가는 길 #1: 예측 모델 설명 가능성 보고서와 PDP',
    description:
      '이해관계자 보고서에서 투명성/설명가능성 요구를 충족하려면 무엇을 포함해야 하는지 묻는 문제입니다.',
    tagId: 'Explainability',
    dateLabel: '2026. 02. 26',
    publishedAt: new Date('2026-02-26'),
    frequency: 'High',
    tags: ['Explainability', 'PDP', 'SageMaker Clarify'],
    scenarioEnglish:
      'An AI practitioner is writing a report about trained forecasting models to provide transparency and explainability to stakeholders. What should be included in the report?',
    scenarioKorean:
      '수요 예측 모델 보고서에서 이해관계자에게 투명성과 설명가능성을 제공하려면 어떤 항목을 포함해야 하는가?',
    requirements: [
      {
        num: 1,
        title: '비기술 이해관계자 대상',
        desc: '코드가 아니라 해석 가능한 근거 시각화가 중요하다.',
        keyword: 'Stakeholder readability',
      },
      {
        num: 2,
        title: '설명가능성',
        desc: '특성이 예측에 미치는 영향이 드러나야 한다.',
        keyword: 'Feature impact',
      },
      {
        num: 3,
        title: '투명성',
        desc: '결과가 어떻게 도출됐는지 설명할 수 있어야 한다.',
        keyword: 'Transparency',
      },
      {
        num: 4,
        title: '학습 로그와 구분',
        desc: '수렴표/코드/샘플데이터는 보조자료이지 핵심 설명 산출물이 아니다.',
        keyword: 'Explain vs train',
      },
    ],
    choices: [
      {
        id: 'A',
        text: '모델 학습 코드 (Training code)',
        isCorrect: false,
        explanation: '구현 재현에는 유용하지만 예측 근거 설명용 산출물로는 직접성이 낮다.',
      },
      {
        id: 'B',
        text: '부분 의존도 플롯 (Partial Dependence Plots, PDPs)',
        isCorrect: true,
        explanation:
          '정답이다. PDP는 특성 변화가 예측값에 미치는 영향을 시각화해 설명가능성과 투명성 요구를 직접 충족한다.',
      },
      {
        id: 'C',
        text: '학습 샘플 데이터 (Sample training data)',
        isCorrect: false,
        explanation: '데이터 예시는 참고자료일 뿐 모델의 의사결정 근거를 직접 설명하지 못한다.',
      },
      {
        id: 'D',
        text: '모델 수렴 테이블 (Model convergence tables)',
        isCorrect: false,
        explanation: '학습 안정성 지표로는 의미 있으나 설명가능성 보고서 핵심은 아니다.',
      },
    ],
    answerId: 'B',
    serviceMain: {
      icon: '🔍',
      title: 'PDP (Partial Dependence Plot)',
      subTitle: '특성 영향도 시각화로 설명가능성 충족',
      desc: [
        '입력 특성과 출력 예측의 관계를 직관적으로 제시',
        '이해관계자 보고서에서 해석 가능성 향상',
        '투명성/설명가능성 요구와 직접 연결',
      ],
    },
    serviceOthers: [
      {
        title: 'Training artifacts (Code/Data/Convergence)',
        items: ['학습 과정 정보 제공', '설명가능성 핵심 산출물로는 한계'],
        warning: '보고서의 대상이 비기술 사용자라면 시각적 근거가 우선',
      },
    ],
    insight:
      'Explainability 문제는 “학습을 잘했는가”가 아니라 “왜 그렇게 예측했는가”를 보여주는 자료를 찾는 문제다.',
    deepDiveTable: [
      {
        option: 'B. PDP',
        fit: '특성-예측 관계 시각화',
        why: 'explainability/transparency 요구를 직접 충족',
        correct: true,
      },
      {
        option: 'A. Training code',
        fit: '구현 상세',
        why: '보고서 독자에게 예측 근거 전달력이 낮음',
        correct: false,
      },
      {
        option: 'C. Sample data',
        fit: '데이터 예시',
        why: '모델 의사결정 근거를 직접 설명하지 못함',
        correct: false,
      },
      {
        option: 'D. Convergence table',
        fit: '학습 안정성',
        why: '설명가능성 산출물 아님',
        correct: false,
      },
    ],
    cheatSheet: {
      positive: [
        '키워드: explainability, transparency, stakeholder report',
        '특성 영향 시각화(PDP/SHAP) 계열 우선',
        '비기술 독자가 이해 가능한 결과물인지 점검',
      ],
      negative: [
        '코드/로그/수렴표를 정답으로 선택',
        '“학습 품질 지표”와 “설명 산출물”을 혼동',
        '문제 독자(stakeholder) 맥락을 무시',
      ],
    },
  },
];

export async function seedQuestions() {
  const questionModel = (prisma as any).question;
  if (!questionModel?.upsert) return;

  for (const q of AIF_QUESTIONS) {
    await questionModel.upsert({
      where: { id: q.id },
      update: q,
      create: q,
    });
  }
}
