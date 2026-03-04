import { Calendar, Cloud, Code2, Layout, Server, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryCount, getRecentPosts } from '@/lib/blog-posts';
import {
  getFrontendArticlesByFramework,
  getFrontendFrameworkCounts,
} from '@/lib/frontend-articles-repository';

export const metadata: Metadata = {
  title: 'Tech Blog',
  description: 'AWS, Frontend, Backend 주제의 기술 블로그',
};

const categoryMeta = {
  'aws-saa': {
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    gradient:
      'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/20',
    iconBg: 'bg-orange-500/10',
  },
  'aws-aif': {
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    gradient:
      'bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-950/30 dark:to-sky-950/20',
    iconBg: 'bg-cyan-500/10',
  },
  frontend: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    gradient:
      'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/20',
    iconBg: 'bg-blue-500/10',
  },
  backend: {
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    gradient:
      'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/20',
    iconBg: 'bg-green-500/10',
  },
} as const;

const categoryIcons = {
  'aws-saa': Cloud,
  'aws-aif': Sparkles,
  frontend: Layout,
  backend: Server,
} as const;

type BlogCategory = keyof typeof categoryMeta;

type RecentPostItem = {
  id: string;
  category: BlogCategory;
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
};

export default async function BlogPage() {
  const [frontendCounts, reactPosts, vuePosts, nextPosts] = await Promise.all([
    getFrontendFrameworkCounts(),
    getFrontendArticlesByFramework('react'),
    getFrontendArticlesByFramework('vue'),
    getFrontendArticlesByFramework('nextjs'),
  ]);

  const staticRecentPosts: RecentPostItem[] = getRecentPosts(50).map((post) => ({
    id: post.id,
    category: post.category,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    href: `/blog/${post.category}/${post.id}`,
  }));

  const frontendRecentPosts: RecentPostItem[] = [...reactPosts, ...vuePosts, ...nextPosts].map((post) => ({
    id: post.id,
    category: 'frontend',
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    href: `/blog/frontend/${post.framework}/${post.id}`,
  }));

  const recentPosts = [...staticRecentPosts, ...frontendRecentPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const categories = [
    {
      id: 'aws-saa' as const,
      title: 'AWS SAA',
      description: 'Solutions Architect Associate 문제 풀이',
      icon: <Cloud className="w-8 h-8" />,
      posts: getCategoryCount('aws-saa'),
    },
    {
      id: 'aws-aif' as const,
      title: 'AWS AIF-C01',
      description: 'AI Practitioner 문제 풀이',
      icon: <Sparkles className="w-8 h-8" />,
      posts: getCategoryCount('aws-aif'),
    },
    {
      id: 'frontend' as const,
      title: 'Frontend',
      description: 'React, Vue, Next.js 프론트엔드 글',
      icon: <Layout className="w-8 h-8" />,
      posts: frontendCounts.total,
    },
    {
      id: 'backend' as const,
      title: 'Backend',
      description: 'NestJS, Spring Boot, System Design',
      icon: <Server className="w-8 h-8" />,
      posts: getCategoryCount('backend'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden py-16 md:py-24 px-3 md:px-6 mb-8 md:mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 dark:bg-white/10 dark:border-white/20"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2 text-yellow-500" />
            Tech Blog &amp; Portfolio
          </Badge>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight font-nunito">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dev
            </span>
            <span className="text-slate-800 dark:text-slate-100">Log</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            클라우드와 AI, 그리고 FE/BE를 연결해서 기록합니다.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-3 md:px-6 pb-20 md:pb-24">
        <section className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
              Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => {
              const meta = categoryMeta[cat.id];
              return (
                <Link key={cat.id} href={`/blog/${cat.id}`}>
                  <Card
                    className={`h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${meta.bgColor} ${meta.borderColor} group overflow-hidden`}
                  >
                    <CardHeader className="p-5 md:p-6">
                      <div
                        className={`mb-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${meta.color}`}
                      >
                        {cat.icon}
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold font-nunito flex items-center justify-between">
                        {cat.title}
                        <Badge
                          variant="secondary"
                          className="bg-white/80 dark:bg-slate-900/80 text-xs md:text-sm"
                        >
                          {cat.posts}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-2">
                        {cat.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              Recent Posts
            </h2>
          </div>

          <div className="grid gap-6">
            {recentPosts.map((post) => {
              const meta = categoryMeta[post.category];
              const IconComponent = categoryIcons[post.category];
              return (
                <Link key={`${post.category}-${post.id}`} href={post.href}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div
                        className={`w-full md:w-64 h-40 md:h-auto flex flex-col items-center justify-center shrink-0 border-b md:border-b-0 md:border-r gap-2 ${meta.gradient} border-slate-100 dark:border-slate-700`}
                      >
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 ${meta.iconBg} ${meta.color}`}
                        >
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${meta.color} opacity-70`}
                        >
                          {post.category.replace('-', ' ')}
                        </span>
                      </div>

                      <CardContent className="p-4 md:p-8 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                          <Badge
                            className={`text-xs ${
                              post.category === 'aws-saa'
                                ? 'bg-orange-500 hover:bg-orange-600'
                                : post.category === 'aws-aif'
                                  ? 'bg-cyan-500 hover:bg-cyan-600'
                                  : post.category === 'frontend'
                                    ? 'bg-blue-500 hover:bg-blue-600'
                                    : 'bg-green-500 hover:bg-green-600'
                            }`}
                          >
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
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2 py-0.5 md:px-2.5 md:py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
