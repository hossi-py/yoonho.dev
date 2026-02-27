import {
  Activity,
  Bot,
  CheckCircle2,
  Database,
  GitBranch,
  Languages,
  Leaf,
  Scale,
  Target,
} from 'lucide-react';

import type { QuestionContent } from '@/lib/question-types';

interface AifQuestionSummaryDiagramProps {
  question: QuestionContent;
}

function scoreBar(label: string, value: number) {
  const color =
    value >= 85 ? 'bg-emerald-500' : value >= 70 ? 'bg-cyan-500' : 'bg-amber-500';
  return (
    <div key={label}>
      <div className="mb-0.5 flex items-center justify-between text-[11px]">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function renderQuestionSpecificBlock(question: QuestionContent) {
  switch (question.number) {
    case 7:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <GitBranch className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">전략 적합도</p>
          </div>
          <div className="space-y-2">
            {scoreBar('Transfer Learning', 92)}
            {scoreBar('Epoch 조정', 34)}
            {scoreBar('Unsupervised Learning', 41)}
          </div>
        </div>
      );
    case 6:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <Activity className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">SageMaker 옵션 비교</p>
          </div>
          <div className="space-y-2">
            {scoreBar('Asynchronous Inference', 95)}
            {scoreBar('Real-time Inference', 48)}
            {scoreBar('Batch Transform', 35)}
          </div>
        </div>
      );
    case 5:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <Languages className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">출력 형식 제어</p>
          </div>
          <div className="space-y-2">
            {scoreBar('Prompt 조정', 94)}
            {scoreBar('Model size 변경', 44)}
            {scoreBar('Temperature/Top-K 증가', 39)}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <Leaf className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">분류 메트릭 맵</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-emerald-200 dark:border-emerald-800 p-2">
              <p className="text-slate-500">Accuracy</p>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">정답 비율 직접 측정</p>
            </div>
            <div className="rounded border border-rose-200 dark:border-rose-800 p-2">
              <p className="text-slate-500">R2 / RMSE</p>
              <p className="font-semibold text-rose-700 dark:text-rose-300">회귀 지표</p>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <GitBranch className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">알고리즘 적합도</p>
          </div>
          <div className="space-y-2">
            {scoreBar('Decision Tree', 91)}
            {scoreBar('Linear Regression', 24)}
            {scoreBar('K-means / PCA', 30)}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <Bot className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">LLM 태스크 매칭</p>
          </div>
          <div className="space-y-2">
            {scoreBar('Summarization Chatbot', 93)}
            {scoreBar('NER', 52)}
            {scoreBar('Translation / Recommendation', 28)}
          </div>
        </div>
      );
    case 1:
    default:
      return (
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <Scale className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">설명가능성 산출물</p>
          </div>
          <div className="space-y-2">
            {scoreBar('PDP/SHAP', 92)}
            {scoreBar('Training code', 38)}
            {scoreBar('Convergence table', 33)}
          </div>
        </div>
      );
  }
}

export function AifQuestionSummaryDiagram({ question }: AifQuestionSummaryDiagramProps) {
  const answer = question.choices.find((c) => c.id === question.answerId);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <Database className="w-4 h-4" />
          <p className="text-sm font-semibold">AIF 문제 다이어그램</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
          {question.examCode} #{question.number}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
            <Target className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold">핵심 요구</p>
          </div>
          <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 list-disc pl-4">
            {question.requirements.slice(0, 3).map((r) => (
              <li key={r.num}>
                <strong>{r.keyword}</strong>: {r.title}
              </li>
            ))}
          </ul>
        </div>

        {renderQuestionSpecificBlock(question)}

        <div className="md:col-span-2 rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-cyan-50/70 dark:bg-cyan-900/20 p-3">
          <div className="flex items-center gap-2 mb-1 text-slate-700 dark:text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <p className="text-xs font-bold">정답 축</p>
          </div>
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
            {question.answerId}. {answer?.text ?? '정답 데이터 없음'}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">{question.insight}</p>
        </div>
      </div>
    </div>
  );
}
