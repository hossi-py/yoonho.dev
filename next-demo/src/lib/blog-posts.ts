import { ReactNode } from "react";

export interface BlogPost {
  id: string; // slug
  category: "aws-saa" | "frontend" | "backend";
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  frequency?: "High" | "Medium" | "Low"; // For AWS SAA
  number?: number; // For series numbering
}

export const allPosts: BlogPost[] = [
  {
    id: "s3-organizations-access",
    category: "aws-saa",
    number: 3,
    title: "AWS SAA 합격으로 가는 길 #3: 조직 내 S3 버킷 액세스 제한 (PrincipalOrgID)",
    description:
      "AWS Organizations를 활용하여 특정 조직(Organization) 내의 계정들만 S3 버킷에 접근할 수 있도록 제한하는 가장 효율적인 방법을 알아봅니다.",
    tags: ["S3", "AWS Organizations", "IAM"],
    date: "2026-02-09",
    frequency: "Medium",
  },
  {
    id: "athena-log-analysis",
    category: "aws-saa",
    number: 2,
    title: "AWS SAA 합격으로 가는 길 #2: S3 로그 분석과 Athena",
    description:
      "S3에 저장된 JSON 로그 데이터를 별도 인프라 구축이나 데이터 로딩 없이 표준 SQL로 즉시 분석하는 서버리스 아키텍처를 알아봅니다.",
    tags: ["Athena", "S3", "Serverless"],
    date: "2026-02-09",
    frequency: "Medium",
  },
  {
    id: "s3-transfer-acceleration",
    category: "aws-saa",
    number: 1,
    title: "AWS SAA 합격으로 가는 길 #1: 글로벌 데이터 수집과 S3 Transfer Acceleration",
    description:
      "전 세계 여러 대륙에서 발생하는 대용량 데이터를 빠르게 S3로 집계하는 최적의 솔루션을 알아봅니다.",
    tags: ["AWS", "S3", "Network"],
    date: "2026-02-09",
    frequency: "High",
  },
];

export function getRecentPosts(limit: number = 5): BlogPost[] {
  // Sort by date desc
  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Filter by last 7 days (User Requirement 2-1)
  // But wait, user said "If no criteria, use within 7 days".
  // However, for a blog, showing the absolute latest posts is usually better than showing nothing if no posts in 7 days.
  // I will implement "Last 7 days" OR "Latest 5 posts" if none in last 7 days? 
  // User asked: "Recent Posts 노출 기준이 있니? 없다면 등록일 기준 일주일 내로 부탁"
  // STRICT INTERPRETATION: Filter posts within 7 days.
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recent = sorted.filter(post => new Date(post.date) >= sevenDaysAgo);
  
  // Fallback: If no posts in 7 days, maybe show at least the latest one?
  // Use user's preference strictly: "Register date within 1 week".
  
  return recent.slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return allPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCategoryCount(category: string): number {
  return allPosts.filter((post) => post.category === category).length;
}
