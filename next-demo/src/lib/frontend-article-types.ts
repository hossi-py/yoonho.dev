export type FrontendFramework = 'react' | 'vue' | 'nextjs';

export type ArticleDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type FrontendArticleSection = {
  type:
    | 'intro'
    | 'concept'
    | 'checkpoint'
    | 'practice'
    | 'animation'
    | 'checklist'
    | 'nextjs'
    | 'conclusion';
  heading: string;
  body?: string;
  paragraphs?: string[];
  bullets?: string[];
  misconceptions?: string[];
  code?: string;
  items?: string[];
  animationKey?: string;
  questions?: Array<{ q: string; a: string }>;
  tasks?: string[];
};

export interface FrontendArticle {
  id: string;
  category: 'frontend';
  framework: FrontendFramework;
  title: string;
  description: string;
  summary: string;
  date: string;
  readTimeMinutes: number;
  difficulty: ArticleDifficulty;
  tags: string[];
  sections: FrontendArticleSection[];
}

export interface FrontendArticleListItem {
  id: string;
  category: 'frontend';
  framework: FrontendFramework;
  title: string;
  description: string;
  date: string;
  readTimeMinutes: number;
  difficulty: ArticleDifficulty;
  tags: string[];
}

