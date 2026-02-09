"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemScenario } from "@/components/blog/ProblemScenario";
import { QuizChoice, QuizChoiceCard } from "@/components/blog/QuizChoiceCard";

export interface AwsSaaPostLayoutProps {
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
      colorClass?: string; // e.g. "green", "indigo" default generic
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

export function AwsSaaPostLayout({
  meta,
  diagram,
  analyze,
  services,
  deepDive,
}: AwsSaaPostLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Content */}
      <section className="relative pt-8 pb-12 px-3 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog/aws-saa"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-6 md:mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to List
          </Link>

          {/* Title Area */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                AWS SAA
              </Badge>
              <Badge variant="outline" className="text-slate-500">
                {meta.tagId}
              </Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {meta.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {meta.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {meta.description}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Diagram */}
      <section className="px-3 md:px-6 mb-8 md:mb-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-3 md:p-6 overflow-hidden">
             {diagram}
          </Card>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="px-3 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="analyze" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex">
              <TabsTrigger value="analyze" className="text-xs md:text-sm">
                1️⃣ 요구사항 분석
              </TabsTrigger>
              <TabsTrigger value="services" className="text-xs md:text-sm">
                2️⃣ AWS 서비스
              </TabsTrigger>
              <TabsTrigger value="deep-dive" className="text-xs md:text-sm">
                3️⃣ 심화 학습
              </TabsTrigger>
            </TabsList>

            <Card className="mt-4">
              <CardContent className="p-4 md:p-6">
                
                {/* 1. Analyze Tab */}
                <TabsContent value="analyze" className="mt-0 space-y-6">
                  <ProblemScenario
                    english={analyze.scenario.english}
                    korean={analyze.scenario.korean}
                  />

                  <h3 className="text-lg md:text-xl font-bold mt-8 mb-4">
                    🎯 핵심 요구사항
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analyze.requirements.map((req) => (
                      <Card key={req.num} className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-3 md:p-5">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {req.num}
                          </span>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">
                            {req.title}
                          </h4>
                        </div>
                         <div className="mb-2">
                             <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white">
                                {req.keyword}
                              </span>
                         </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {req.desc}
                        </p>
                      </CardContent>
                    </Card>
                    ))}
                  </div>

                  <div className="py-6 border-y border-slate-200 dark:border-slate-800 my-6">
                    <h3 className="text-lg md:text-xl font-bold mb-4">🤔 정답을 골라보세요</h3>
                    <div className="grid gap-3">
                      {analyze.quiz.map((choice) => (
                        <QuizChoiceCard
                          key={choice.id}
                          {...choice}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* 2. Services Tab */}
                <TabsContent value="services" className="mt-0 space-y-8">
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    이 문제와 관련된 핵심 AWS 서비스들을 알아볼게요.
                  </p>

                  {/* Main Service */}
                   <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl md:text-3xl">{services.main.icon}</span>
                         <div>
                          <h3 className="font-bold text-indigo-700 dark:text-indigo-300 text-sm md:text-base">
                            {services.main.title}
                          </h3>
                          <span className="text-xs text-indigo-600 dark:text-indigo-400">
                            {services.main.subTitle || "⭐ 이 문제의 핵심 서비스"}
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-indigo-700 dark:text-indigo-300">
                        {services.main.desc.map((item, idx) => (
                           <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Comparative Services */}
                  <div className="space-y-4">
                      {services.others.map((service, idx) => (
                        <Card key={idx}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm md:text-base">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {service.items.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                              {service.warning && (
                                <li className="text-amber-600 dark:text-amber-400 mt-2 font-medium">
                                  ⚠️ {service.warning}
                                </li>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                   </div>
                   
                   {/* Insight */}
                   <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                        {services.insight}
                    </CardContent>
                   </Card>
                </TabsContent>

                {/* 3. Deep Dive Tab */}
                <TabsContent value="deep-dive" className="mt-0 space-y-8">
                  {deepDive}
                </TabsContent>

              </CardContent>
            </Card>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
