"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Cloud, Calendar, ArrowRight, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getPostsByCategory } from "@/lib/blog-posts";

const POSTS_PER_PAGE = 5;
const posts = getPostsByCategory("aws-saa");
const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

export default function AwsSaaPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Category Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-6 md:mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Categories
          </Link>

          <div className="flex items-start md:items-center gap-4 md:gap-6 flex-col md:flex-row">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
              <Cloud className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-nunito">
                  AWS SAA
                </h1>
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 text-xs md:text-sm">
                  {posts.length} Posts
                </Badge>
              </div>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                AWS Solutions Architect Associate 자격증 준비를 위한 핵심 개념과 아키텍처 패턴을<br />정리합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-6 md:gap-8">
          {currentPosts.map((post) => (
            <Link key={post.id} href={`/blog/aws-saa/${post.id}`}>
              <Card className="group relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] dark:hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)] hover:border-orange-200 dark:hover:border-orange-800">
                
                {/* Background Pattern & Icon */}
                <div className="absolute -right-10 -top-10 opacity-5 dark:opacity-[0.02] transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Cloud className="w-64 h-64 text-slate-900 dark:text-white" />
                </div>
                
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
                  {/* Left: Sticker & Meta */}
                  <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-4 flex-shrink-0 min-w-[120px]">
                    <div className="flex items-center gap-3 md:gap-0 md:flex-col md:items-start md:space-y-4 w-full">
                       {/* Number Sticker - Typography Style */}
                       <span className="text-5xl md:text-6xl font-black text-slate-200/80 dark:text-slate-700/50 group-hover:text-orange-400/80 dark:group-hover:text-orange-600/80 transition-colors duration-500 font-nunito select-none -ml-1">
                         #{post.number}
                       </span>

                       {/* Frequency Badge */}
                       <div className="flex flex-col items-start gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                            출제빈도
                          </span>
                          <Badge variant="outline" className={`
                            ${post.frequency === 'High' ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''}
                            ${post.frequency === 'Medium' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : ''}
                            ${post.frequency === 'Low' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                            px-2 py-1 gap-1 text-xs
                          `}>
                            {post.frequency === 'High' && "🔥🔥🔥 높음"}
                            {post.frequency === 'Medium' && "🔥🔥 보통"}
                            {post.frequency === 'Low' && "🔥 낮음"}
                          </Badge>
                       </div>
                    </div>

                    <div className="md:mt-auto hidden md:block w-full">
                       <span className="text-xs font-medium text-slate-400 flex items-center">
                         <Calendar className="w-3.5 h-3.5 mr-1.5" />
                         {post.date}
                       </span>
                    </div>
                  </div>

                  {/* Divider (Mobile Only) */}
                  <div className="h-px w-full bg-slate-100 dark:bg-slate-800 md:hidden" />
                  
                  {/* Right: Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="mb-4">
                       <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-3 leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-nunito">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-3">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                         {/* Mobile Date */}
                         <span className="md:hidden text-xs font-medium text-slate-400 flex items-center">
                           <Calendar className="w-3.5 h-3.5 mr-1.5" />
                           {post.date}
                         </span>
                         
                         <div className="flex items-center text-sm font-bold text-orange-500 group-hover:translate-x-1 transition-transform">
                          Read Story <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-800">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 px-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">이전</span>
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 px-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                <span className="hidden sm:inline">다음</span>
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="mt-4 text-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              총 <strong className="text-orange-500">{posts.length}</strong>개의 포스트 중{" "}
              <strong>{startIndex + 1}-{Math.min(endIndex, posts.length)}</strong>번째
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
