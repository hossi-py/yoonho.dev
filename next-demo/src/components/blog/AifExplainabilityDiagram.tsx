'use client';

import { motion } from 'framer-motion';
import { BarChart3, Eye, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

type FeatureId = 'price' | 'promo' | 'seasonality';

const featureMeta: Record<
  FeatureId,
  {
    label: string;
    description: string;
    effect: string;
    values: number[];
  }
> = {
  price: {
    label: 'Price',
    description: '가격이 오를수록 수요 예측값이 낮아지는 패턴',
    effect: 'Negative Effect',
    values: [84, 75, 66, 57, 49, 42, 36],
  },
  promo: {
    label: 'Promotion',
    description: '프로모션 강도가 높아질수록 수요 예측값이 상승',
    effect: 'Positive Effect',
    values: [35, 42, 48, 59, 67, 78, 86],
  },
  seasonality: {
    label: 'Seasonality',
    description: '시즌 지수에 따라 수요가 변동하는 비선형 패턴',
    effect: 'Non-linear Effect',
    values: [44, 55, 67, 74, 65, 52, 46],
  },
};

const order: FeatureId[] = ['price', 'promo', 'seasonality'];

function buildPath(values: number[]) {
  return values
    .map((value, index) => {
      const x = 40 + index * 52;
      const y = 190 - value * 1.4;
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
      <div className="flex items-center gap-2 mb-4 text-cyan-800 dark:text-cyan-200">
        <Eye className="w-4 h-4" />
        <p className="text-sm font-semibold">Model Explainability Simulator (PDP)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    ? 'border-cyan-500 bg-white/80 dark:bg-slate-900/70 shadow-sm'
                    : 'border-cyan-200/80 dark:border-cyan-800/70 bg-white/40 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {meta.label}
                  </span>
                  <BarChart3
                    className={`w-4 h-4 ${selected ? 'text-cyan-600' : 'text-slate-400 dark:text-slate-500'}`}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{meta.effect}</p>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-2 rounded-xl border border-cyan-200/80 dark:border-cyan-800/80 bg-white/80 dark:bg-slate-900/70 p-3 md:p-4">
          <svg viewBox="0 0 390 210" className="w-full h-auto">
            <line x1="30" y1="190" x2="370" y2="190" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="20" x2="30" y2="190" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="330" y="205" fontSize="10" fill="#475569">
              Feature Value
            </text>
            <text x="5" y="25" fontSize="10" fill="#475569">
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
              const x = 40 + idx * 52;
              const y = 190 - value * 1.4;
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
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">
                {activeMeta.label} PDP Insight
              </p>
            </div>
            <p className="text-xs md:text-sm text-cyan-700 dark:text-cyan-300">
              {activeMeta.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
