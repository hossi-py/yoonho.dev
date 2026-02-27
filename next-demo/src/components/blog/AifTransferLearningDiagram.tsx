'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Layers3, RefreshCw, Timer } from 'lucide-react';
import { useMemo, useState } from 'react';

type StrategyId = 'fromScratch' | 'transfer' | 'unsupervised';

const strategyData: Record<
  StrategyId,
  {
    label: string;
    reuse: number;
    timeToDeploy: number;
    dataEfficiency: number;
    taskFit: number;
    summary: string;
  }
> = {
  fromScratch: {
    label: '새 모델 처음부터 학습',
    reuse: 10,
    timeToDeploy: 25,
    dataEfficiency: 30,
    taskFit: 55,
    summary: '새 작업에는 가능하지만 시간/비용이 크게 증가',
  },
  transfer: {
    label: '전이학습 (Transfer Learning)',
    reuse: 95,
    timeToDeploy: 88,
    dataEfficiency: 85,
    taskFit: 92,
    summary: '사전학습 모델을 재사용해 관련 작업에 빠르게 적응',
  },
  unsupervised: {
    label: '비지도 학습 (Unsupervised)',
    reuse: 35,
    timeToDeploy: 45,
    dataEfficiency: 52,
    taskFit: 40,
    summary: '라벨 없는 패턴 탐색에는 유효하지만 요구와 불일치',
  },
};

function barColor(value: number) {
  if (value >= 80) return 'bg-emerald-500';
  if (value >= 60) return 'bg-cyan-500';
  return 'bg-amber-500';
}

export function AifTransferLearningDiagram() {
  const [active, setActive] = useState<StrategyId>('transfer');
  const current = useMemo(() => strategyData[active], [active]);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <Layers3 className="w-4 h-4" />
          <p className="text-sm font-semibold">모델 재사용 전략 비교</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Transfer Learning</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-3 items-stretch md:items-center">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">전략 선택</p>
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
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <ArrowRight className="w-5 h-5 text-cyan-500" />
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3"
        >
          <div className="mb-3 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">요구사항 적합도</p>
          </div>

          {[
            ['사전학습 모델 재사용', current.reuse],
            ['적용 속도', current.timeToDeploy],
            ['데이터 효율', current.dataEfficiency],
            ['신규 유사 태스크 적합성', current.taskFit],
          ].map(([label, value]) => (
            <div key={label} className="mb-2 last:mb-0">
              <div className="mb-0.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-300">{label}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
                <motion.div
                  className={`h-full ${barColor(Number(value))}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </div>
          ))}

          <div className="mt-3 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-1">
              <Timer className="h-3.5 w-3.5" />
              결론
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{current.summary}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
