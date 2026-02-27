import { Card, CardContent } from '@/components/ui/card';
import type { AwsSaaPostContent } from '@/lib/post-types';
import type { QuestionContent } from '@/lib/question-types';

export function toAwsPostContent(question: QuestionContent): AwsSaaPostContent {
  return {
    meta: {
      tagId: question.tagId,
      title: question.title,
      description: question.description,
      date: question.dateLabel,
    },
    diagram: null,
    analyze: {
      scenario: {
        english: question.scenarioEnglish,
        korean: question.scenarioKorean,
      },
      requirements: question.requirements,
      quiz: question.choices,
    },
    services: {
      main: question.serviceMain,
      others: question.serviceOthers,
      insight: (
        <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
          <strong>핵심 인사이트:</strong> {question.insight}
        </p>
      ),
    },
    deepDive: (
      <>
        <div className="space-y-5">
          <h3 className="text-lg font-bold">비교 테이블</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b dark:border-slate-700">
                  <th className="p-3 font-bold whitespace-nowrap">선지</th>
                  <th className="p-3 font-bold whitespace-nowrap">적합성</th>
                  <th className="p-3 font-bold whitespace-nowrap">판단 포인트</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {question.deepDiveTable.map((row) => (
                  <tr
                    key={row.option}
                    className={row.correct ? 'bg-green-50/50 dark:bg-green-900/10' : undefined}
                  >
                    <td
                      className={`p-3 font-bold ${
                        row.correct ? 'text-green-700 dark:text-green-400' : ''
                      }`}
                    >
                      {row.option}
                    </td>
                    <td className="p-3">{row.fit}</td>
                    <td className="p-3">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">시험장 치트키 (Cheat Sheet)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">정답 신호</h4>
                <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                  {question.cheatSheet.positive.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">오답 신호</h4>
                <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-300">
                  {question.cheatSheet.negative.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    ),
  };
}
