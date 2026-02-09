"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemScenario } from "@/components/blog/ProblemScenario";
import { AthenaArchitectureDiagram } from "@/components/blog/AthenaArchitectureDiagram";


function ChoiceCard({
  id,
  text,
  isCorrect,
  explanation,
  selectedId,
  onSelect,
}: {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedId === id;

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onSelect(id);
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`w-full transition-all duration-500 ease-in-out ${
        isOpen ? "my-4" : "my-2"
      }`}
    >
      <Card
        className={`cursor-pointer transition-all ${
          isOpen
            ? isCorrect
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-red-200 bg-red-50 dark:bg-red-900/10"
            : "hover:border-slate-400"
        }`}
      >
        <CollapsibleTrigger asChild>
          <CardHeader
            className="p-3 pb-2 md:p-6 md:pb-2"
            onClick={handleClick}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isOpen
                    ? isCorrect
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {id}
              </span>
              <div className="space-y-1 flex-1 text-left">
                <CardTitle
                  className={`text-base md:text-lg leading-snug ${
                    isOpen
                       ? isCorrect
                         ? "text-green-800 dark:text-green-200"
                         : "text-red-800 dark:text-red-200"
                       : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {text}
                </CardTitle>
              </div>
              <div className="shrink-0 text-slate-400">
                {isOpen ? (
                  isCorrect ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <span className="text-red-500 font-bold text-lg">X</span>
                  )
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="pt-3 border-t">
              <p
                className={`text-sm ${
                  isCorrect
                    ? "text-green-700 dark:text-green-300"
                    : "text-red-700 dark:text-red-300"
                }`}
              >
                {explanation}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default function AthenaLogAnalysisPage() {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const choices = [
      {
        id: "A",
        text: "Amazon Redshift를 사용하여 모든 데이터를 한곳에 로드하고 필요할 때 SQL 쿼리를 실행합니다.",
        isCorrect: false,
        explanation:
          "Redshift는 데이터 웨어하우스로, 데이터를 로드하는 과정이 필요하며 비용과 운영 오버헤드가 큽니다. '최소한의 변경'과 'On-demand' 요구사항에 적합하지 않습니다.",
      },
      {
        id: "B",
        text: "Amazon CloudWatch Logs에 로그를 저장하고 Amazon CloudWatch 콘솔에서 필요할 때 SQL 쿼리를 실행합니다.",
        isCorrect: false,
        explanation:
          "CloudWatch Logs Insights로 쿼리할 수 있지만, 이미 S3에 저장된 로그를 CloudWatch로 옮겨야 하므로 아키텍처 변경이 발생합니다.",
      },
      {
        id: "C",
        text: "Amazon Athena를 Amazon S3와 직접 연동하여 필요할 때 쿼리를 실행합니다.",
        isCorrect: true,
        explanation:
          "정답입니다! Athena는 S3에 있는 데이터를 그대로 두고 표준 SQL로 쿼리할 수 있는 서버리스 서비스입니다. 별도의 인프라 구축이나 데이터 로딩(ETL)이 필요 없어 운영 오버헤드가 가장 적습니다.",
      },
      {
        id: "D",
        text: "AWS Glue로 로그를 카탈로그화하고 Amazon EMR의 임시 Apache Spark 클러스터를 사용하여 필요할 때 SQL 쿼리를 실행합니다.",
        isCorrect: false,
        explanation:
          "EMR은 Spark 클러스터를 프로비저닝하고 관리해야 하므로 '최소 운영 오버헤드' 요건을 충족하지 못합니다. Athena보다 복잡성이 훨씬 높습니다.",
      },
  ];

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
                Data Analytics
              </Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                2026. 02. 10
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              S3 로그 분석과 <br className="md:hidden" />
              <span className="text-indigo-600 dark:text-indigo-400">
                Amazon Athena
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              수테라바이트의 로그 파일이 S3에 쌓여있습니다. 별도의 DB 구축 없이
              지금 당장 SQL로 분석하려면 어떻게 해야 할까요?
            </p>
          </div>
        </div>
      </section>

       {/* Interactive Diagram */}
      <section className="px-3 md:px-6 mb-8 md:mb-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-3 md:p-6 overflow-hidden">
             <AthenaArchitectureDiagram />
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
                <TabsContent value="analyze" className="mt-0 space-y-6">
                  
                  <ProblemScenario
                    english="A company needs the ability to analyze the log files of its proprietary application. The logs are stored in JSON format in an Amazon S3 bucket. Queries will be simple and will run on-demand. A solutions architect needs to perform the analysis with minimal changes to the existing architecture. What should the solutions architect do to meet these requirements with the LEAST amount of operational overhead?"
                    korean="한 기업이 자체 애플리케이션의 로그 파일을 분석해야 합니다. 로그는 Amazon S3 버킷에 JSON 형식으로 저장되어 있습니다. 쿼리는 간단하며 온디맨드(필요할 때마다)로 실행될 것입니다. 솔루션 아키텍트는 기존 아키텍처변경을 최소화하면서 분석을 수행해야 합니다. 운영 오버헤드가 가장 적은 방법은 무엇입니까?"
                  />

                  <h3 className="text-lg md:text-xl font-bold mt-8 mb-4">
                    🎯 핵심 요구사항 4가지 (힌트 💡)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-3 md:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">📂</span>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">
                            S3 & JSON
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          데이터가 이미 S3에 있습니다. 이를 다른 곳(DB 등)으로 옮기지 않고 분석하면 베스트입니다.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-3 md:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">⚡</span>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">
                            On-demand
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          항상 켜져 있을 필요가 없습니다. 쿼리 할 때만 잠깐 실행되면 됩니다.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-3 md:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🛠️</span>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">
                            Minimal Changes
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          새로운 파이프라인이나 복잡한 아키텍처 도입을 피해야 합니다.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                       <CardContent className="p-3 md:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">📉</span>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">
                            Least Overhead
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          서버 관리? 프로비저닝? NO! 운영 부담이 '0'에 수렴해야 합니다.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                   <div className="py-6 border-y border-slate-200 dark:border-slate-800 my-6">
                    {/* Quiz Section */}
                    <h3 className="text-lg md:text-xl font-bold mb-4">🤔 정답을 골라보세요</h3>
                    <div className="grid gap-3">
                      {choices.map((choice) => (
                        <ChoiceCard
                          key={choice.id}
                          {...choice}
                          selectedId={selectedChoice}
                          onSelect={setSelectedChoice}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="mt-0 space-y-8">
                  {/* Interactive Diagram needs to be inside Content Card or above Tabs? 
                      In S3 Transfer, it was separate section. 
                      User requested "AWS 서비스 탭도 다르고".
                      Let's put diagram inside "AWS 서비스" tab as requested or make it similar to S3 Transfer Page stucture?
                      Wait, user said "구조가 다르잖아. 1) ... 2) AWS 서비스 탭도 다르고".
                      
                      In S3 Transfer Page: 
                      - Hero
                      - Interactive Diagram (Section) !!! It is OUTSIDE tabs in S3 Transfer Page. 
                      - Tabs (Section)
                        - Analyze: Scenario -> Requirements -> Quiz
                        - Services: S3 TA Card -> Other Services -> Insight
                        - Deep Dive: Table -> Cheat Sheet

                      The user complained "Structure is different".
                      My previous implementation:
                      - Hero
                      - Interactive Diagram (Section) -> OUTSIDE tabs.
                      - Tabs
                        - Analyze: Scenario -> Quiz -> Requirements (Order was wrong!)
                        - Services: Athena Description -> Cards -> Wrong Answers
                        - Deep Dive: ...
                      
                      So:
                      1. "핵심 요구사항 4가지가 먼저 와야하고": 
                         In S3 Transfer Page, actually Scenario is first, THEN Requirements.
                         Let me check S3 Transfer Page code again.
                         Line 213: ProblemScenario
                         Line 218: Requirements
                         Line 284: Quiz
                         
                         So order is: Scenario -> Requirements -> Quiz.
                         
                         In my Athena page previous code:
                         Line 236: ProblemScenario
                         Line 241: Quiz (Wrong! Quiz was before Requirements)
                         Line 256: Requirements
                         
                         So I need to move Quiz to the bottom of Analyze tab.

                      2. "AWS 서비스 탭도 다르고":
                         In S3 Transfer Page:
                         - Main Service Card (Green)
                         - Other Services List (Multipart, Cross-Region, Snowball)
                         - Insight Card (Blue)
                         
                         In my Athena page:
                         - Text Description
                         - Grid Cards (Serverless, Direct Query...)
                         - Wrong Answers Section
                         
                         I should change Athena Services tab to look like S3 Transfer Services tab.
                         - Athena Main Card (Green)
                         - Other Services List (Redshift, EMR, CloudWatch)
                         - Insight Card (Blue)
                  */}
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    이 문제와 관련된 핵심 AWS 서비스들을 알아볼게요.
                  </p>

                  <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl md:text-3xl">🔍</span>
                         <div>
                          <h3 className="font-bold text-indigo-700 dark:text-indigo-300 text-sm md:text-base">
                            Amazon Athena
                          </h3>
                          <span className="text-xs text-indigo-600 dark:text-indigo-400">
                            ⭐ 이 문제의 핵심 서비스
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-indigo-700 dark:text-indigo-300">
                        <li>• 표준 SQL을 사용하여 S3 데이터 직접 분석</li>
                        <li>• 서버리스 (Serverless) - 인프라 관리 0</li>
                        <li>• 데이터 로딩(ETL) 없이 즉시 쿼리 가능</li>
                        <li>• 실행한 쿼리당 비용 지불 (On-demand)</li>
                      </ul>
                    </CardContent>
                  </Card>
                    
                  {/* Interactive Diagram moved INSIDE Services tab? 
                      User said "AWS 서비스 탭도 다르고".
                      If I follow S3 Transfer Page STRICTLY, the diagram is OUTSIDE the tabs.
                      But maybe user wants it inside? 
                      "1)핵심 요구사항 4가지가 먼저 와야하고 2) AWS 서비스 탭도 다르고"
                      
                      Actually, S3 Transfer Page has Requirements AFTER Scenario.
                      "핵심 요구사항 4가지가 먼저 와야하고" might mean "Before Quiz"?
                      Yes, previously I put Quiz before Requirements.
                      
                      Let's stick to S3 Transfer Page structure for Services tab content style.
                      And Keep Diagram OUTSIDE as S3 Transfer Page has it outside. 
                      Wait, if user says "Structure is different", maybe they WANT diagram inside?
                      But usually consistent layout means diagram at top.
                      I will keep diagram at top but fix the Tab contents.
                   */}

                   {/* Comparative Services */}
                   <div className="space-y-4">
                      {[
                        {
                          title: "❌ Amazon Redshift",
                          items: [
                            "• 강력한 데이터 웨어하우스",
                            "• S3 데이터를 Redshift로 'Load'해야 함 (데이터 이동 발생)",
                            "• 클러스터 관리가 필요하며 비용이 높음",
                          ],
                          warning: "Minimal Changes & Least Overhead 위배",
                        },
                        {
                          title: "❌ Amazon EMR (Spark)",
                          items: [
                            "• 빅데이터 처리를 위한 하둡/스파크 클러스터",
                            "• 클러스터 프로비저닝, 설정, 튜닝 필요",
                            "• 단순 로그 분석에는 과도한 오버헤드",
                          ],
                          warning: "Least Overhead 위배",
                        },
                        {
                          title: "⚠️ Amazon CloudWatch Logs",
                          items: [
                            "• 로그 수집 및 모니터링 서비스",
                            "• S3에 있는 로그를 CloudWatch로 다시 수집해야 함",
                            "• 아키텍처 변경 발생",
                          ],
                          warning: "Minimal Changes 위배",
                        },
                      ].map((service) => (
                        <Card key={service.title}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm md:text-base">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {service.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                              {service.warning && (
                                <li className="text-amber-600 dark:text-amber-400">
                                  ⚠️ {service.warning}
                                </li>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                   </div>

                   <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
                        ✨ <strong>핵심 인사이트:</strong> "S3에 있는 데이터"를 "SQL"로 분석하고 싶고 "인프라 관리"가 싫다면? <br/>
                        무조건 <strong>Amazon Athena</strong>가 정답입니다!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="deep-dive" className="mt-0 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-6">📊 서비스 비교: Athena vs Redshift vs EMR</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                          <tr>
                            <th className="px-4 py-3 rounded-tl-lg">기능</th>
                            <th className="px-4 py-3 text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-900/20">Amazon Athena</th>
                            <th className="px-4 py-3">Amazon Redshift</th>
                            <th className="px-4 py-3 rounded-tr-lg">Amazon EMR</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          <tr className="bg-white dark:bg-slate-900">
                            <td className="px-4 py-3 font-medium">주요 특징</td>
                            <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">Serverless Query</td>
                            <td className="px-4 py-3">Data Warehouse</td>
                            <td className="px-4 py-3">Big Data Platform</td>
                          </tr>
                          <tr className="bg-white dark:bg-slate-900">
                            <td className="px-4 py-3 font-medium">데이터 저장소</td>
                            <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">S3 직접 연결</td>
                            <td className="px-4 py-3">Redshift 로컬 스토리지 (or Spectrum)</td>
                            <td className="px-4 py-3">HDFS / S3</td>
                          </tr>
                          <tr className="bg-white dark:bg-slate-900">
                            <td className="px-4 py-3 font-medium">사용 시점</td>
                            <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">간헐적, On-demand 분석</td>
                            <td className="px-4 py-3">복잡한, 지속적인 BI/분석</td>
                            <td className="px-4 py-3">복잡한 데이터 가공(ETL), ML</td>
                          </tr>
                           <tr className="bg-white dark:bg-slate-900">
                            <td className="px-4 py-3 font-medium">운영 오버헤드</td>
                            <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">매우 낮음 (Zero)</td>
                            <td className="px-4 py-3">중간 (클러스터 관리 필요)</td>
                            <td className="px-4 py-3">높음 (세밀한 튜닝 필요)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                     <h3 className="text-xl font-bold mb-4">📝 Exam Cheat Sheet</h3>
                     <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-4 md:p-6">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                                    <span className="text-slate-800 dark:text-slate-200">
                                        <strong>"S3에 있는 데이터" + "Standard SQL" + "Serverless"</strong> <br/>👉 무조건 <strong>Athena</strong>를 떠올리세요.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                                    <span className="text-slate-800 dark:text-slate-200">
                                        <strong>"Minimal operational overhead" (최소 운영 오버헤드)</strong> <br/>👉 서버 관리가 없는 Athena가 정답일 확률이 매우 높습니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                                    <span className="text-slate-800 dark:text-slate-200">
                                        <strong>"Infrequent / On-demand queries" (간헐적 쿼리)</strong> <br/>👉 항상 켜져있는 Redshift/RDS보다 Athena가 비용 효율적입니다.
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                     </Card>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
