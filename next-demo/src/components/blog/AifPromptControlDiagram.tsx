'use client';

import { motion } from 'framer-motion';
import { Languages, MessageSquareText, SlidersHorizontal, Target } from 'lucide-react';
import { useMemo, useState } from 'react';

type StrategyId = 'prompt' | 'size' | 'sampling';

const strategyData: Record<
  StrategyId,
  {
    label: string;
    constraintFit: number;
    languageFit: number;
    speed: number;
    cost: number;
    prompt: string;
    outputPreview: string;
    verdict: string;
  }
> = {
  prompt: {
    label: '프롬프트 조정 (권장)',
    constraintFit: 95,
    languageFit: 95,
    speed: 92,
    cost: 90,
    prompt: '한국어로 2문장 이내로 제품 1개를 추천하고, 이유 1개를 포함해 답변해줘.',
    outputPreview: '추천 제품은 A입니다. 가격 대비 성능이 좋아 첫 구매자에게 적합합니다.',
    verdict: '길이/언어 요구를 가장 직접적으로 충족',
  },
  size: {
    label: '모델 크기 변경',
    constraintFit: 45,
    languageFit: 58,
    speed: 40,
    cost: 35,
    prompt: '기본 프롬프트 유지 + 다른 파라미터 모델 교체',
    outputPreview: '출력 길이와 언어가 일정하지 않아 운영 정책과 자주 충돌할 수 있음.',
    verdict: '효과가 간접적이고 비용 영향이 큼',
  },
  sampling: {
    label: 'Temperature/Top-K 조정',
    constraintFit: 38,
    languageFit: 42,
    speed: 88,
    cost: 92,
    prompt: '샘플링 파라미터만 변경해 다양성 제어',
    outputPreview: '창의성은 바뀌지만 길이와 언어 형식을 안정적으로 고정하기 어려움.',
    verdict: '다양성 제어에는 유효하지만 형식 제어엔 부적합',
  },
};

function scoreColor(value: number) {
  if (value >= 80) return 'bg-emerald-500';
  if (value >= 60) return 'bg-cyan-500';
  return 'bg-rose-500';
}

export function AifPromptControlDiagram() {
  const [active, setActive] = useState<StrategyId>('prompt');
  const current = useMemo(() => strategyData[active], [active]);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <MessageSquareText className="w-4 h-4" />
          <p className="text-sm font-semibold">LLM 응답 품질 정렬 전략 비교</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Prompting</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-3 items-stretch md:items-center">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">제어 전략</p>
          </div>
          <div className="space-y-2">
            {(Object.keys(strategyData) as StrategyId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`w-full rounded-lg border px-2 py-1.5 text-left text-xs transition-colors ${
                  active === id
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {strategyData[id].label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="hidden md:flex justify-center"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <Target className="w-5 h-5 text-cyan-500" />
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3"
        >
          <div className="mb-3 flex items-center gap-2">
            <Languages className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">요구사항 적합도</p>
          </div>

          {[
            ['길이 제약 적합도', current.constraintFit],
            ['언어 제약 적합도', current.languageFit],
            ['적용 속도', current.speed],
            ['운영 비용 효율', current.cost],
          ].map(([label, value]) => (
            <div key={label} className="mb-2 last:mb-0">
              <div className="mb-0.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-300">{label}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
                <motion.div
                  className={`h-full ${scoreColor(Number(value))}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </div>
          ))}

          <div className="mt-3 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <p className="mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">입력 프롬프트 예시</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">{current.prompt}</p>
          </div>

          <div className="mt-2 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 p-2">
            <p className="mb-1 text-[11px] font-semibold text-cyan-800 dark:text-cyan-200">출력 미리보기</p>
            <p className="text-xs text-cyan-700 dark:text-cyan-300">{current.outputPreview}</p>
          </div>

          <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">결론: {current.verdict}</p>
        </motion.div>
      </div>
    </div>
  );
}
