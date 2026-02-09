"use client";

import Link from "next/link";
import { TransferAccelerationDiagram } from "@/components/blog/TransferAccelerationDiagram";
import { ProblemScenario } from "@/components/blog/ProblemScenario";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

function ChoiceCard({
  letter,
  title,
  services,
  isCorrect,
  reason,
}: {
  letter: string;
  title: string;
  services: string[];
  isCorrect: boolean;
  reason: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
          <CardHeader className="pb-2">
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isOpen
                    ? isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              >
                {letter}
              </span>
              <div className="flex-1">
                <CardTitle className="text-sm font-medium leading-snug">
                  {title}
                </CardTitle>
                <div className="flex flex-wrap gap-1 mt-2">
                  {services.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isOpen && (
                  isCorrect ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <span className="text-red-500 font-bold text-lg">X</span>
                  )
                )}
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="pt-3 border-t">
              <p
                className={`text-sm ${
                  isCorrect
                    ? "text-green-700 dark:text-green-300"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                <strong>
                  {isCorrect ? "✅ 정답인 이유:" : "❌ 오답인 이유:"}
                </strong>{" "}
                {reason}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

const choices = [
  {
    letter: "A",
    title: "S3 Transfer Acceleration을 켜고 Multipart Upload로 직접 업로드",
    services: ["S3 Transfer Acceleration", "Multipart Upload"],
    isCorrect: true,
    reason:
      "가장 간단하면서도 빠른 솔루션입니다! Transfer Acceleration은 글로벌 엣지 로케이션과 AWS 백본 네트워크를 활용해 업로드 속도를 크게 향상시킵니다. Multipart Upload는 대용량 파일(500GB)을 효율적으로 처리합니다. 버킷 설정만 바꾸면 되므로 운영 복잡성이 최소입니다.",
  },
  {
    letter: "B",
    title:
      "각 사이트에서 가장 가까운 리전의 S3에 업로드 → Cross-Region Replication → 원본 삭제",
    services: ["S3", "Cross-Region Replication"],
    isCorrect: false,
    reason:
      "여러 S3 버킷을 관리해야 하고, 복제 후 원본을 삭제하는 추가 작업이 필요합니다. 이는 '운영 복잡성 최소화' 요구사항에 맞지 않습니다.",
  },
  {
    letter: "C",
    title:
      "매일 Snowball Edge로 데이터 전송 → 가까운 리전에 저장 → Cross-Region Replication",
    services: ["Snowball Edge", "Cross-Region Replication"],
    isCorrect: false,
    reason:
      "500GB는 고속 인터넷으로 충분히 전송 가능한 양입니다. 매일 Snowball 장비를 배송/회수하는 것은 운영 복잡성을 크게 높입니다.",
  },
  {
    letter: "D",
    title:
      "EC2에 업로드 → EBS에 저장 → 스냅샷 복사 → 다른 리전에서 EBS 복원",
    services: ["EC2", "EBS", "EBS Snapshot"],
    isCorrect: false,
    reason:
      "S3로 직접 전송하는 것이 아닌 EC2/EBS를 거치는 불필요하게 복잡한 경로입니다. 전혀 적합하지 않은 아키텍처입니다.",
  },
];

export default function S3TransferAccelerationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Content */}
      <section className="relative pt-8 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog/aws-saa"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-8 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all">
              <ChevronDown className="w-4 h-4 rotate-90 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>AWS SAA 시리즈로 돌아가기</span>
          </Link>

          <div className="mb-6">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-wide">
              TAG #1
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            AWS SAA 합격으로 가는 길 #1
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              글로벌 데이터 수집과 S3 Transfer Acceleration
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            전 세계 여러 대륙에서 발생하는 대용량 데이터를 빠르게 S3로 집계하는
            최적의 솔루션을 알아봅니다.
          </p>
        </div>
      </section>

      {/* Interactive Diagram */}
      <section className="px-4 md:px-6 mb-8 md:mb-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-4 md:p-6 overflow-hidden">
            <TransferAccelerationDiagram />
          </Card>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="px-4 md:px-6 pb-20">
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
                    english="A company collects data for temperature, humidity, and atmospheric pressure in cities across multiple continents. The average volume of data that the company collects from each site daily is 500 GB. Each site has a high-speed Internet connection. The company wants to aggregate the data from all these global sites as quickly as possible in a single Amazon S3 bucket. The solution must minimize operational complexity."
                    korean="한 회사가 여러 대륙의 도시에서 온도, 습도, 기압 데이터를 수집합니다. 각 사이트에서 매일 평균 500GB의 데이터가 발생하며, 모든 사이트에 고속 인터넷이 연결되어 있습니다. 회사는 모든 글로벌 사이트의 데이터를 최대한 빠르게 단일 S3 버킷으로 집계하려고 합니다. 솔루션은 운영 복잡성을 최소화해야 합니다."
                  />

                  <h3 className="text-lg md:text-xl font-bold mt-8 mb-4">
                    🎯 핵심 요구사항 4가지 (힌트 💡)
                  </h3>

                  <div className="grid gap-3">
                    {[
                      {
                        num: 1,
                        title: "여러 대륙에 걸친 글로벌 사이트",
                        desc: "전 세계 여러 대륙에 데이터 수집 지점이 분산되어 있어요.",
                        keyword: "글로벌",
                      },
                      {
                        num: 2,
                        title: "각 사이트에서 매일 500GB 데이터 발생",
                        desc: "대용량이지만 Snowball을 쓸 정도로 거대하지는 않아요.",
                        keyword: "500GB/일",
                      },
                      {
                        num: 3,
                        title: "고속 인터넷 연결 보유",
                        desc: "네트워크 인프라가 좋으므로 온라인 전송이 가능해요.",
                        keyword: "고속 인터넷",
                      },
                      {
                        num: 4,
                        title: "단일 S3 버킷으로 최대한 빠르게 집계",
                        desc: "여러 버킷이 아닌 하나의 버킷으로 데이터를 모아야 해요.",
                        keyword: "빠른 집계",
                      },
                    ].map((req) => (
                      <Card key={req.num} className="p-3 md:p-4">
                        <div className="flex gap-3 md:gap-4 items-start">
                          <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {req.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium text-sm md:text-base">
                                {req.title}
                              </p>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white">
                                {req.keyword}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 mt-1">
                              → {req.desc}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2 text-sm md:text-base">
                        ⚠️ 추가 조건: 운영 복잡성 최소화
                      </h4>
                      <p className="text-xs md:text-sm text-amber-600 dark:text-amber-400">
                        "minimize operational complexity" - 관리 부담이 적은
                        솔루션을 선택해야 해요.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="py-6 border-t border-slate-200 dark:border-slate-800 mt-6">
                    <h3 className="text-lg md:text-xl font-bold mb-4">
                      🤔 정답을 골라보세요
                    </h3>
                    <div className="grid gap-3">
                      {choices.map((choice) => (
                        <ChoiceCard
                          key={choice.letter}
                          letter={choice.letter}
                          title={choice.title}
                          services={choice.services}
                          isCorrect={choice.isCorrect}
                          reason={choice.reason}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="mt-0 space-y-6">
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    이 문제와 관련된 핵심 AWS 서비스들을 알아볼게요.
                  </p>

                  {/* S3 Transfer Acceleration */}
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl md:text-3xl">⚡</span>
                        <div>
                          <h3 className="font-bold text-green-700 dark:text-green-300 text-sm md:text-base">
                            S3 Transfer Acceleration
                          </h3>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            ⭐ 이 문제의 핵심 서비스
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-green-700 dark:text-green-300">
                        <li>• AWS 엣지 로케이션을 활용하여 업로드 속도 향상</li>
                        <li>• 전 세계 어디서든 가장 가까운 엣지로 업로드</li>
                        <li>• AWS 전용 백본 네트워크로 빠르게 S3에 전달</li>
                        <li>• 버킷에서 기능을 켜기만 하면 바로 사용 가능</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Other services */}
                  {[
                    {
                      title: "📦 Multipart Upload",
                      items: [
                        "• 대용량 파일을 여러 조각으로 나누어 병렬 업로드",
                        "• 100MB 이상 파일에 권장, 5GB 이상은 필수",
                        "• 네트워크 오류 시 해당 부분만 재전송 가능",
                        "• Transfer Acceleration과 함께 사용하면 시너지 효과",
                      ],
                    },
                    {
                      title: "🔄 S3 Cross-Region Replication",
                      items: [
                        "• 버킷 간 객체를 자동으로 복제",
                        "• 복제 후 원본 삭제가 필요하면 추가 작업 발생",
                      ],
                      warning:
                        "이 문제에서는 복잡성 증가 (여러 버킷 관리 + 삭제 작업)",
                    },
                    {
                      title: "📮 AWS Snowball Edge",
                      items: [
                        "• 물리적 장치를 통한 대용량 데이터 전송",
                        "• 수십~수백 TB 규모에 적합",
                      ],
                      warning:
                        "500GB/일은 고속 인터넷으로 충분 → Snowball 불필요",
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

                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
                        ✨ <strong>핵심 인사이트:</strong> 고속 인터넷이 있고
                        데이터가 "극단적으로 크지 않다면" S3 Transfer
                        Acceleration이 가장 간단하고 효과적인 솔루션입니다!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="deep-dive" className="mt-0 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span className="text-2xl">🆚</span> 서비스 비교 정리
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      비슷해 보이지만 다른 가속화 서비스들, 확실하게 구분해봅시다!
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 border-b dark:border-slate-700">
                            <th className="p-3 font-bold whitespace-nowrap">Service</th>
                            <th className="p-3 font-bold whitespace-nowrap">Use Case</th>
                            <th className="p-3 font-bold whitespace-nowrap">Protocol</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr className="bg-green-50/50 dark:bg-green-900/10">
                            <td className="p-3 font-bold text-green-700 dark:text-green-400">S3 Transfer Acceleration</td>
                            <td className="p-3">S3로의 <strong>업로드 속도</strong> 향상 (장거리)</td>
                            <td className="p-3">HTTPS (Over UDP possibility)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-bold">CloudFront</td>
                            <td className="p-3">S3 등에서의 <strong>다운로드(캐싱)</strong> 속도 향상</td>
                            <td className="p-3">HTTP/HTTPS</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-bold">Global Accelerator</td>
                            <td className="p-3">TCP/UDP 기반 애플리케이션의 <strong>글로벌 성능</strong> 향상 (IP 고정)</td>
                            <td className="p-3">TCP/UDP</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                       <span className="text-2xl">📝</span> 시험장 치트키 (Cheat Sheet)
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                       문제에서 이 단어가 나오면 바로 정답을 떠올리세요.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-l-4 border-l-green-500">
                         <CardContent className="p-4">
                            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">S3 Transfer Acceleration</h4>
                            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                               <li>Gloabl (글로벌 사용자/지점)</li>
                               <li>Upload Speed (업로드 속도)</li>
                               <li>Long Distance (장거리 전송)</li>
                               <li>S3 Bucket Destination</li>
                            </ul>
                         </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-blue-500">
                         <CardContent className="p-4">
                            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Multipart Upload</h4>
                            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                               <li>Large Objects (대용량 파일)</li>
                               <li>Parallel Upload (병렬 업로드)</li>
                               <li>Pause/Resume needed</li>
                               <li>High Bandwidth Utilization</li>
                            </ul>
                         </CardContent>
                      </Card>
                    </div>
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
