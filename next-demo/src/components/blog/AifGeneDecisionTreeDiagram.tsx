'use client';

import { motion } from 'framer-motion';
import { Dna, FlaskConical, GitBranch, Microscope } from 'lucide-react';
import { useMemo, useState } from 'react';

type PathId = 'expression' | 'mutation' | 'length';

const pathData: Record<
  PathId,
  {
    label: string;
    rule1: string;
    rule2: string;
    result: string;
    confidence: number;
    baselineScore: number;
    treeScore: number;
  }
> = {
  expression: {
    label: '유전자 발현 (Gene Expression)',
    rule1: 'Expression > 0.72',
    rule2: 'Promoter Region = Active',
    result: 'Category 4',
    confidence: 91,
    baselineScore: 74,
    treeScore: 88,
  },
  mutation: {
    label: '돌연변이 패턴 (Mutation Pattern)',
    rule1: 'Mutation Count <= 2',
    rule2: 'Conserved Domain = Yes',
    result: 'Category 11',
    confidence: 89,
    baselineScore: 76,
    treeScore: 87,
  },
  length: {
    label: '서열 길이 (Sequence Length)',
    rule1: 'Length > 1200bp',
    rule2: 'GC Content > 60%',
    result: 'Category 17',
    confidence: 86,
    baselineScore: 73,
    treeScore: 85,
  },
};

export function AifGeneDecisionTreeDiagram() {
  const [active, setActive] = useState<PathId>('expression');
  const current = useMemo(() => pathData[active], [active]);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <Dna className="w-4 h-4" />
          <p className="text-sm font-semibold">유전자 분류 의사결정 경로 분석</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Explainability</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-3 items-stretch md:items-center">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Microscope className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">특성 기준 선택</p>
          </div>
          <div className="space-y-2">
            {(Object.keys(pathData) as PathId[]).map((id) => (
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
                {pathData[id].label}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="hidden md:flex justify-center" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <GitBranch className="w-5 h-5 text-cyan-500" />
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">규칙 추적 결과</p>
          </div>

          <div className="mb-3 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2 text-xs text-slate-600 dark:text-slate-300">
            <p>Rule 1: {current.rule1}</p>
            <p>Rule 2: {current.rule2}</p>
            <p className="font-semibold text-cyan-700 dark:text-cyan-300">Output: {current.result}</p>
          </div>

          <div className="mb-3">
            <p className="mb-1 text-[11px] text-slate-600 dark:text-slate-300">분류 신뢰도</p>
            <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <motion.div
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${current.confidence}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
            <p className="mt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">{current.confidence}%</p>
          </div>

          <div className="rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <p className="mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">모델 선택 비교</p>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <div className="mb-1 flex items-center justify-between">
                <span>기준 모델 (Logistic Regression)</span>
                <span>{current.baselineScore}%</span>
              </div>
              <div className="h-1.5 mb-2 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div className="h-full bg-slate-500" initial={{ width: 0 }} animate={{ width: `${current.baselineScore}%` }} transition={{ duration: 0.45 }} />
              </div>

              <div className="mb-1 flex items-center justify-between">
                <span>의사결정나무 (Decision Tree)</span>
                <span>{current.treeScore}%</span>
              </div>
              <div className="h-1.5 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div className="h-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: `${current.treeScore}%` }} transition={{ duration: 0.45 }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
