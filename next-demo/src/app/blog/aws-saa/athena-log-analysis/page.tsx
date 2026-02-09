"use client";

import { AthenaArchitectureDiagram } from "@/components/blog/AthenaArchitectureDiagram";
import { AwsSaaPostLayout } from "@/components/blog/AwsSaaPostLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function AthenaLogAnalysisPage() {
  return (
    <AwsSaaPostLayout
      meta={{
        tagId: "Data Analytics",
        date: "2026. 02. 10",
        title: (
          <>
            S3 로그 분석과 <br className="md:hidden" />
            <span className="text-indigo-600 dark:text-indigo-400">
              Amazon Athena
            </span>
          </>
        ),
        description:
          "수테라바이트의 로그 파일이 S3에 쌓여있습니다. 별도의 DB 구축 없이 지금 당장 SQL로 분석하려면 어떻게 해야 할까요?",
      }}
      diagram={<AthenaArchitectureDiagram />}
      analyze={{
        scenario: {
          english:
            "A company needs the ability to analyze the log files of its proprietary application. The logs are stored in JSON format in an Amazon S3 bucket. Queries will be simple and will run on-demand. A solutions architect needs to perform the analysis with minimal changes to the existing architecture. What should the solutions architect do to meet these requirements with the LEAST amount of operational overhead?",
          korean:
            "한 기업이 자체 애플리케이션의 로그 파일을 분석해야 합니다. 로그는 Amazon S3 버킷에 JSON 형식으로 저장되어 있습니다. 쿼리는 간단하며 온디맨드(필요할 때마다)로 실행될 것입니다. 솔루션 아키텍트는 기존 아키텍처 변경을 최소화하면서 분석을 수행해야 합니다. 운영 오버헤드가 가장 적은 방법은 무엇입니까?",
        },
        requirements: [
          {
            num: 1,
            title: "S3 & JSON",
            desc: "데이터가 이미 S3에 있습니다. 이를 다른 곳(DB 등)으로 옮기지 않고 분석하면 베스트입니다.",
            keyword: "Data in S3",
          },
          {
            num: 2,
            title: "On-demand",
            desc: "항상 켜져 있을 필요가 없습니다. 쿼리 할 때만 잠깐 실행되면 됩니다.",
            keyword: "On-demand",
          },
          {
            num: 3,
            title: "Minimal Changes",
            desc: "새로운 파이프라인이나 복잡한 아키텍처 도입을 피해야 합니다.",
            keyword: "Minimal Changes",
          },
          {
            num: 4,
            title: "Least Overhead",
            desc: "서버 관리? 프로비저닝? NO! 운영 부담이 '0'에 수렴해야 합니다.",
            keyword: "Least Overhead",
          },
        ],
        quiz: [
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
        ],
      }}
      services={{
        main: {
          icon: "🔍",
          title: "Amazon Athena",
          desc: [
            "표준 SQL을 사용하여 S3 데이터 직접 분석",
            "서버리스 (Serverless) - 인프라 관리 0",
            "데이터 로딩(ETL) 없이 즉시 쿼리 가능",
            "실행한 쿼리당 비용 지불 (On-demand)",
          ],
        },
        others: [
          {
            title: "❌ Amazon Redshift",
            items: [
              "강력한 데이터 웨어하우스",
              "S3 데이터를 Redshift로 'Load'해야 함 (데이터 이동 발생)",
              "클러스터 관리가 필요하며 비용이 높음",
            ],
            warning: "Minimal Changes & Least Overhead 위배",
          },
          {
            title: "❌ Amazon EMR (Spark)",
            items: [
              "빅데이터 처리를 위한 하둡/스파크 클러스터",
              "클러스터 프로비저닝, 설정, 튜닝 필요",
              "단순 로그 분석에는 과도한 오버헤드",
            ],
            warning: "Least Overhead 위배",
          },
          {
            title: "⚠️ Amazon CloudWatch Logs",
            items: [
              "로그 수집 및 모니터링 서비스",
              "S3에 있는 로그를 CloudWatch로 다시 수집해야 함",
              "아키텍처 변경 발생",
            ],
            warning: "Minimal Changes 위배",
          },
        ],
        insight: (
          <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
            ✨ <strong>핵심 인사이트:</strong> "S3에 있는 데이터"를 "SQL"로
            분석하고 싶고 "인프라 관리"가 싫다면? <br />
            무조건 <strong>Amazon Athena</strong>가 정답입니다!
          </p>
        ),
      }}
      deepDive={
        <>
          <div>
            <h3 className="text-xl font-bold mb-6">
              📊 서비스 비교: Athena vs Redshift vs EMR
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">기능</th>
                    <th className="px-4 py-3 text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-900/20">
                      Amazon Athena
                    </th>
                    <th className="px-4 py-3">Amazon Redshift</th>
                    <th className="px-4 py-3 rounded-tr-lg">Amazon EMR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-medium">주요 특징</td>
                    <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">
                      Serverless Query
                    </td>
                    <td className="px-4 py-3">Data Warehouse</td>
                    <td className="px-4 py-3">Big Data Platform</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-medium">데이터 저장소</td>
                    <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">
                      S3 직접 연결
                    </td>
                    <td className="px-4 py-3">
                      Redshift 로컬 스토리지 (or Spectrum)
                    </td>
                    <td className="px-4 py-3">HDFS / S3</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-medium">사용 시점</td>
                    <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">
                      간헐적, On-demand 분석
                    </td>
                    <td className="px-4 py-3">복잡한, 지속적인 BI/분석</td>
                    <td className="px-4 py-3">복잡한 데이터 가공(ETL), ML</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-medium">운영 오버헤드</td>
                    <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10">
                      매우 낮음 (Zero)
                    </td>
                    <td className="px-4 py-3">중간 (클러스터 관리 필요)</td>
                    <td className="px-4 py-3">높음 (세밀한 튜닝 필요)</td>
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
                  <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
                    Amazon Athena
                  </h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    <li>S3 Data + Standard SQL</li>
                    <li>Serverless (No Infra)</li>
                    <li>Minimal Operational Overhead</li>
                    <li>One-time / Ad-hoc / On-demand Query</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">
                    NOT Athena (오답 패턴)
                  </h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    <li>Complex ETL / ML {"->"} EMR/Glue</li>
                    <li>Real-time Streaming {"->"} Kinesis</li>
                    <li>Long-running Complex Analytics {"->"} Redshift</li>
                    <li>Sub-second Latency {"->"} DynamoDB/ElastiCache</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      }
    />
  );
}

