export type QuestionRequirement = {
  num: number;
  title: string;
  desc: string;
  keyword: string;
};

export type QuestionChoice = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

export type QuestionServiceMain = {
  icon: string;
  title: string;
  subTitle?: string;
  desc: string[];
};

export type QuestionServiceOther = {
  title: string;
  items: string[];
  warning?: string;
};

export type QuestionDeepDiveRow = {
  option: string;
  fit: string;
  why: string;
  correct?: boolean;
};

export type QuestionCheatSheet = {
  positive: string[];
  negative: string[];
};

export type QuestionContent = {
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
  requirements: QuestionRequirement[];
  choices: QuestionChoice[];
  answerId: string;
  serviceMain: QuestionServiceMain;
  serviceOthers: QuestionServiceOther[];
  insight: string;
  deepDiveTable: QuestionDeepDiveRow[];
  cheatSheet: QuestionCheatSheet;
};
