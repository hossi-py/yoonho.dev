import type { QuizChoice } from '@/components/blog/QuizChoiceCard';

/** 각 AWS SAA 콘텐츠 파일이 default export하는 타입 */
export interface AwsSaaPostContent {
  meta: {
    tagId: string;
    title: React.ReactNode;
    description: string;
    date: string;
  };
  diagram: React.ReactNode;
  analyze: {
    scenario: {
      english: string;
      korean: string;
    };
    requirements: {
      num: number;
      title: string;
      desc: string;
      keyword: string;
    }[];
    quiz: QuizChoice[];
  };
  services: {
    main: {
      icon: string;
      title: string;
      desc: string[];
      subTitle?: string;
      colorClass?: string;
    };
    others: {
      title: string;
      items: string[];
      warning?: string;
    }[];
    insight: React.ReactNode;
  };
  deepDive: React.ReactNode;
}
