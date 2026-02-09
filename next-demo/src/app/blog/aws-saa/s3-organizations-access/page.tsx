"use client";

import { S3OrganizationsAccessDiagram } from "@/components/blog/S3OrganizationsAccessDiagram";
import { AwsSaaPostLayout } from "@/components/blog/AwsSaaPostLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function S3OrganizationsAccessPage() {
  return (
    <AwsSaaPostLayout
      meta={{
        tagId: "Security & IAM",
        date: "2026. 02. 09",
        title: (
          <>
            조직(Organization) 내 계정만 <br className="md:hidden" />
            <span className="text-indigo-600 dark:text-indigo-400">
              S3 버킷 접근 허용하기
            </span>
          </>
        ),
        description:
          "수십 개의 부서 계정이 있는 기업 환경에서, 우리 조직(AWS Organizations) 외부의 접근을 한 방에 차단하는 가장 깔끔한 방법을 소개합니다.",
      }}
      diagram={<S3OrganizationsAccessDiagram />}
      analyze={{
        scenario: {
          english:
            "A company uses AWS Organizations to manage multiple AWS accounts for different departments. The management account has an Amazon S3 bucket that contains project reports. The company wants to limit access to this S3 bucket to only users of accounts within the organization in AWS Organizations. Which solution meets these requirements with the LEAST amount of operational overhead?",
          korean:
            "한 회사가 여러 부서의 AWS 계정을 관리하기 위해 AWS Organizations를 사용하고 있습니다. 관리 계정에는 프로젝트 보고서가 담긴 Amazon S3 버킷이 있습니다. 회사는 이 S3 버킷에 대한 액세스를 AWS Organizations의 조직 내 계정 사용자들로만 제한하려고 합니다. 운영 오버헤드가 가장 적은 솔루션은 무엇입니까?",
        },
        requirements: [
          {
            num: 1,
            title: "AWS Organizations 사용",
            desc: "기업 내 모든 계정이 하나의 조직(Organization)으로 묶여 있는 상태입니다.",
            keyword: "AWS Organizations",
          },
          {
            num: 2,
            title: "조직 내 사용자만 접근 허용",
            desc: "특정 개별 계정이 아니라, 조직 전체에 속한 모든 계정을 대상으로 합니다.",
            keyword: "Accounts within the organization",
          },
          {
            num: 3,
            title: "운영 오버헤드 최소화",
            desc: "계정이 추가되거나 삭제될 때마다 버킷 정책을 일일이 수정하면 안 됩니다.",
            keyword: "LEAST operational overhead",
          },
        ],
        quiz: [
          {
            id: "A",
            text: "S3 버킷 정책에 조직 ID를 참조하는 aws:PrincipalOrgID 전역 조건 키를 추가합니다.",
            isCorrect: true,
            explanation:
              "정답입니다! aws:PrincipalOrgID 조건 키를 사용하면 특정 조직 ID(o-xxxxxxxx)를 지정하여, 해당 조직에 속한 모든 계정의 주체(Principal)에게만 접근을 허용할 수 있습니다. 계정이 추가되거나 삭제되어도 조직 ID는 변하지 않으므로 운영 오버헤드가 가장 적습니다.",
          },
          {
            id: "B",
            text: "각 부서별로 조직 단위(OU)를 생성하고, aws:PrincipalOrgPaths 전역 조건 키를 버킷 정책에 추가합니다.",
            isCorrect: false,
            explanation:
              "PrincipalOrgPaths는 특정 OU 경로를 지정할 때 유용하지만, 이 문제의 요구사항은 '조직 전체'이므로 PrincipalOrgID가 더 간단하고 직접적인 해결책입니다.",
          },
          {
            id: "C",
            text: "AWS CloudTrail을 사용하여 계정 생성/삭제 이벤트를 모니터링하고, 그에 따라 버킷 정책을 자동 업데이트합니다.",
            isCorrect: false,
            explanation:
              "이벤트 브릿지와 람다 등을 활용해 자동화할 수 있겠지만, PrincipalOrgID라는 표준 기능이 있는데 굳이 복잡한 코드를 짤 필요가 없습니다. 운영 오버헤드가 매우 높습니다.",
          },
          {
            id: "D",
            text: "접근이 필요한 각 사용자에 태그를 지정하고, aws:PrincipalTag 전역 조건 키를 버킷 정책에 추가합니다.",
            isCorrect: false,
            explanation:
              "조직 내 모든 사용자를 일일이 태깅하고 관리하는 것은 엄청난 운영 부담입니다. '최소 오버헤드' 요건에 전혀 맞지 않습니다.",
          },
        ],
      }}
      services={{
        main: {
          icon: "🆔",
          title: "aws:PrincipalOrgID",
          desc: [
            "IAM 정책 및 버킷 정책에서 사용 가능한 전역 조건 키",
            "특정 AWS 조직(Organization)에 속한 모든 주체를 식별",
            "개별 계정 ID를 나열할 필요 없이 조직 ID 하나로 관리",
            "동적 환경(계정 추가/삭제)에서 최적의 확장성 제공",
          ],
        },
        others: [
          {
            title: "🛡️ S3 Bucket Policy",
            items: [
              "버킷 레벨에서 접근 제어를 설정하는 리소스 기반 정책",
              "Condition 절을 통해 매우 세밀한 제어 가능",
            ],
          },
          {
            title: "🏢 AWS Organizations",
            items: [
              "여러 AWS 계정을 중앙에서 통합 관리하는 서비스",
              "조직 아이디(Org ID)는 'o-'로 시작하는 고유 식별자",
            ],
          },
        ],
        insight: (
          <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
            ✨ <strong>핵심 인사이트:</strong> "여러 계정" + "우리 조직 식구들만" + "최소 오버헤드" 키워드가 뭉치면? <br />
            고민할 것도 없이 <strong>aws:PrincipalOrgID</strong>를 찾으세요!
          </p>
        ),
      }}
      deepDive={
        <>
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">⌨️</span> 정책 코드 예시
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              실제 S3 버킷 정책에 적용되는 모습입니다. 계정 ID 대신 조직 ID(`o-12345678`)가 사용된 것에 주목하세요.
            </p>
            <Card className="bg-slate-900 border-0 dark:bg-black">
              <CardContent className="p-4 md:p-6 overflow-x-auto">
                <pre className="text-[10px] md:text-xs text-indigo-300 font-mono leading-relaxed">
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-org-bucket/*",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalOrgID": "o-12345678"
        }
      }
    }
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="text-2xl">📝</span> 시험장 치트키 (Cheat Sheet)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
                    aws:PrincipalOrgID
                  </h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    <li>AWS Organizations 전체를 통제</li>
                    <li>계정 ID들을 일일이 나열하지 않음</li>
                    <li>Scalable (계정 증설에 강함)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
                    aws:PrincipalOrgPaths
                  </h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    <li>특정 OU(조직 단위) 이하만 통제</li>
                    <li>계층 구조(o-xxx/ou-xxx/ou-yyy) 기반</li>
                    <li>더 세밀한 계열사/부서별 제어 시 사용</li>
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
