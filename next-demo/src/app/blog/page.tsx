"use client";

import Link from "next/link";
import { 
  Cloud, 
  Code2, 
  Layout, 
  Server, 
  Sparkles, 
  ArrowRight,
  Calendar
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "aws-saa",
    title: "AWS SAA",
    description: "Solution Architect Associate 자격증 완벽 대비",
    icon: <Cloud className="w-8 h-8" />,
    posts: 1,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "React, Vue, Next.js 등 모던 프론트엔드",
    icon: <Layout className="w-8 h-8" />,
    posts: 0,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "backend",
    title: "Backend",
    description: "NestJS, Spring Boot, System Design",
    icon: <Server className="w-8 h-8" />,
    posts: 0,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
];

const recentPosts = [
  {
    id: "athena-log-analysis",
    category: "aws-saa",
    title: "AWS SAA 합격으로 가는 길 #2: S3 로그 분석과 Athena",
    description:
      "S3에 저장된 대량의 로그 데이터를 별도 인프라 구축 없이 표준 SQL로 즉시 분석하는 방법을 알아봅니다.",
    date: "2026-02-09",
    tags: ["Athena", "S3", "Serverless"],
  },
  {
    id: "s3-transfer-acceleration",
    category: "aws-saa",
    title: "AWS SAA 합격으로 가는 길 #1: 글로벌 데이터 수집과 S3 Transfer Acceleration",
    description:
      "전 세계 여러 대륙에서 발생하는 대용량 데이터를 빠르게 S3로 집계하는 최적의 솔루션에 대해 알아봅니다.",
    date: "2026-02-09",
    tags: ["AWS", "S3", "Network"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-3 md:px-6 mb-8 md:mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 dark:bg-white/10 dark:border-white/20">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2 text-yellow-500" />
            Tech Blog & Portfolio
          </Badge>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight font-nunito">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dev
            </span>
            <span className="text-slate-800 dark:text-slate-100">Log</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            코딩 파트너 AI와 함께하는 FE 개발자의 블로그
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-3 md:px-6 pb-20 md:pb-24">
        {/* Categories */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
              Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/blog/${cat.id}`}>
                <Card className={`h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.bgColor} ${cat.borderColor} group overflow-hidden`}>
                  <CardHeader className="p-5 md:p-6">
                    <div className={`mb-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold font-nunito flex items-center justify-between">
                      {cat.title}
                      <Badge variant="secondary" className="bg-white/80 dark:bg-slate-900/80 text-xs md:text-sm">
                        {cat.posts}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-2">
                      {cat.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              Recent Posts
            </h2>
            <Link href="/blog/all" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid gap-6">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.category}/${post.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail Placeholder */}
                    <div className="w-full md:w-64 h-40 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900/50 flex items-center justify-center shrink-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700">
                       <span className="text-4xl group-hover:scale-125 transition-transform duration-500 select-none grayscale group-hover:grayscale-0">
                         {post.category === 'aws-saa' ? '☁️' : '📝'}
                       </span>
                    </div>
                    
                    <CardContent className="p-4 md:p-8 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                        <Badge className={`text-xs ${
                          post.category === 'aws-saa' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-500 hover:bg-indigo-600'
                        }`}>
                          {post.category.toUpperCase().replace('-', ' ')}
                        </Badge>
                        <span className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium ml-2">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                        </span>
                      </div>
                      
                      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs font-medium px-2 py-0.5 md:px-2.5 md:py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
