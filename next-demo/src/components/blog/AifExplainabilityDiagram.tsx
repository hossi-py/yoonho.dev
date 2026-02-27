'use client';

import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, Eye, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

type FeatureId = 'price' | 'promo' | 'seasonality';

const featureMeta: Record<
  FeatureId,
  {
    label: string;
    description: string;
    effect: string;
    values: number[];
    shap: number;
    confidence: number;
  }
> = {
  price: {
    label: '가격 (Price)',
    description: '가격이 높아질수록 수요 예측값이 하락하는 음의 영향',
    effect: 'Negative Effect',
    values: [86, 78, 70, 61, 53, 45, 39],
    shap: -0.42,
    confidence: 92,
  },
  promo: {
    label: '프로모션 (Promotion)',
    description: '프로모션 강도가 높아질수록 수요 예측값이 상승',
    effect: 'Positive Effect',
    values: [34, 41, 49, 58, 67, 76, 85],
    shap: 0.37,
    confidence: 89,
  },
  seasonality: {
    label: '계절성 (Seasonality)',
    description: '성수기/비수기 전환 구간에서 비선형 패턴이 관찰됨',
    effect: 'Non-linear Effect',
    values: [46, 55, 66, 74, 65, 54, 47],
    shap: 0.11,
    confidence: 84,
  },
};

const order: FeatureId[] = ['price', 'promo', 'seasonality'];

function buildPath(values: number[]) {
  return values
    .map((value, index) => {
      const x = 34 + index * 52;
      const y = 188 - value * 1.45;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

export function AifExplainabilityDiagram() {
  const [active, setActive] = useState<FeatureId>('price');
  const activeMeta = featureMeta[active];

  const path = useMemo(() => buildPath(activeMeta.values), [activeMeta.values]);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <Eye className="w-4 h-4" />
          <p className="text-sm font-semibold">모델 설명가능성 대시보드 (PDP + SHAP)</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Explainability</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr] gap-4">
        <div className="space-y-3">
          {order.map((id) => {
            const meta = featureMeta[id];
            const selected = id === active;
            return (
              <button
                key={id}
                type="button"
                onMouseEnter={() => setActive(id)}
                onFocus={() => setActive(id)}
                onClick={() => setActive(id)}
                className={`w-full text-left rounded-xl border px-3 py-3 transition-all ${
                  selected
                    ? 'border-cyan-500 bg-white/85 dark:bg-slate-900/70 shadow-sm'
                    : 'border-cyan-200/80 dark:border-cyan-800/70 bg-white/45 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{meta.label}</span>
                  <span className="text-[11px] font-medium text-cyan-700 dark:text-cyan-300">{meta.effect}</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{meta.description}</p>
              </button>
            );
          })}

          <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
            <div className="mb-2 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <BarChart3 className="h-3.5 w-3.5" />
              SHAP 기여도 (현재 선택)
            </div>
            <div className="h-2 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <motion.div
                key={activeMeta.label}
                className={activeMeta.shap >= 0 ? 'h-full bg-emerald-500' : 'h-full bg-rose-500'}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(activeMeta.shap) * 180, 100)}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">SHAP: {activeMeta.shap.toFixed(2)}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">설명 신뢰도: {activeMeta.confidence}%</p>
          </div>
        </div>

        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-800/80 bg-white/80 dark:bg-slate-900/70 p-3 md:p-4">
          <svg viewBox="0 0 390 210" className="w-full h-auto">
            <line x1="26" y1="188" x2="368" y2="188" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="26" y1="18" x2="26" y2="188" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="304" y="204" fontSize="10" fill="#475569">
              Feature Value
            </text>
            <text x="4" y="24" fontSize="10" fill="#475569">
              Prediction
            </text>

            <motion.path
              key={active}
              d={path}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.6 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />

            {activeMeta.values.map((value, idx) => {
              const x = 34 + idx * 52;
              const y = 188 - value * 1.45;
              return (
                <motion.circle
                  key={`${active}-${idx}`}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#0891b2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                />
              );
            })}
          </svg>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 px-3 py-2"
          >
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">{activeMeta.label} 해석 요약</p>
            </div>
            <p className="text-xs md:text-sm text-cyan-700 dark:text-cyan-300">{activeMeta.description}</p>
          </motion.div>

          <div className="mt-2 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <p className="mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">리포트 포함 체크리스트</p>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 주요 변수 영향 시각화</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 해석 문구와 수치 동시 제공</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 이해관계자용 요약 포함</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
