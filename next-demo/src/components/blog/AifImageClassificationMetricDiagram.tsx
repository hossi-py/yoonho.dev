'use client';

import { motion } from 'framer-motion';
import { Activity, BarChart3, CheckCircle2, Image as ImageIcon, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

type SampleId = 'sample1' | 'sample2' | 'sample3';

const sampleData: Record<
  SampleId,
  {
    title: string;
    total: number;
    tp: number;
    tn: number;
    fp: number;
    fn: number;
    correct: number;
    wrong: number;
    precision: number;
    recall: number;
    f1: number;
    note: string;
  }
> = {
  sample1: {
    title: 'Leaf Batch A',
    total: 20,
    tp: 9,
    tn: 9,
    fp: 1,
    fn: 1,
    correct: 18,
    wrong: 2,
    precision: 90,
    recall: 90,
    f1: 90,
    note: '정확도 중심 평가는 맞춘 개수/전체 개수로 계산합니다.',
  },
  sample2: {
    title: 'Leaf Batch B',
    total: 30,
    tp: 13,
    tn: 11,
    fp: 3,
    fn: 3,
    correct: 24,
    wrong: 6,
    precision: 81,
    recall: 81,
    f1: 81,
    note: '분류 문제에서 정답 비율을 직접 보는 지표는 Accuracy입니다.',
  },
  sample3: {
    title: 'Leaf Batch C',
    total: 40,
    tp: 18,
    tn: 14,
    fp: 4,
    fn: 4,
    correct: 32,
    wrong: 8,
    precision: 82,
    recall: 82,
    f1: 82,
    note: '회귀 지표(RMSE, R2) 대신 분류 지표를 선택해야 합니다.',
  },
};

function metricColorClass(value: number) {
  if (value >= 85) return 'bg-emerald-500';
  if (value >= 75) return 'bg-cyan-500';
  return 'bg-amber-500';
}

export function AifImageClassificationMetricDiagram() {
  const [active, setActive] = useState<SampleId>('sample1');

  const current = useMemo(() => sampleData[active], [active]);
  const accuracy = Math.round((current.correct / current.total) * 100);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <ImageIcon className="w-4 h-4" />
          <p className="text-sm font-semibold">식물 잎 분류 성능 평가 대시보드</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Metric Choice</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-3 md:gap-2 items-stretch md:items-center">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">샘플 선택</p>
          <div className="space-y-2">
            {(Object.keys(sampleData) as SampleId[]).map((id) => {
              const selected = id === active;
              const item = sampleData[id];

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`w-full text-left rounded-lg border px-2 py-1.5 text-xs transition-colors ${
                    selected
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{item.title}</span>
                    <span className="text-[10px] text-slate-500">{item.total}장</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          className="hidden md:flex justify-center"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <Activity className="w-5 h-5 text-cyan-500" />
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3"
        >
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">분류 성능 대시보드</p>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-2 text-center">
              <p className="text-[11px] text-slate-500">전체</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{current.total}</p>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800 p-2 text-center">
              <p className="text-[11px] text-green-600 dark:text-green-300 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 정답
              </p>
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">{current.correct}</p>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 p-2 text-center">
              <p className="text-[11px] text-red-600 dark:text-red-300 flex items-center justify-center gap-1">
                <XCircle className="w-3 h-3" /> 오답
              </p>
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">{current.wrong}</p>
            </div>
          </div>

          <div className="mb-3 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <p className="mb-2 text-[11px] font-semibold text-slate-700 dark:text-slate-200">혼동행렬 (Confusion Matrix)</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-emerald-200 dark:border-emerald-800 p-2">
                <p className="text-slate-500">TP</p>
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">{current.tp}</p>
              </div>
              <div className="rounded border border-sky-200 dark:border-sky-800 p-2">
                <p className="text-slate-500">TN</p>
                <p className="font-semibold text-sky-700 dark:text-sky-300">{current.tn}</p>
              </div>
              <div className="rounded border border-amber-200 dark:border-amber-800 p-2">
                <p className="text-slate-500">FP</p>
                <p className="font-semibold text-amber-700 dark:text-amber-300">{current.fp}</p>
              </div>
              <div className="rounded border border-rose-200 dark:border-rose-800 p-2">
                <p className="text-slate-500">FN</p>
                <p className="font-semibold text-rose-700 dark:text-rose-300">{current.fn}</p>
              </div>
            </div>
          </div>

          <div className="mb-3 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
              <BarChart3 className="h-3.5 w-3.5" />
              주요 지표 비교
            </div>
            {[
              ['Accuracy', accuracy],
              ['Precision', current.precision],
              ['Recall', current.recall],
              ['F1', current.f1],
            ].map(([label, value]) => (
              <div key={label} className="mb-1.5 last:mb-0">
                <div className="mb-0.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-300">{label}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
                  <motion.div
                    className={`h-full ${metricColorClass(Number(value))}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 px-3 py-2">
            <p className="text-xs text-cyan-800 dark:text-cyan-200 font-semibold">
              Accuracy = {current.correct} / {current.total} = {accuracy}%
            </p>
            <p className="mt-1 text-xs text-cyan-700 dark:text-cyan-300">{current.note}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
