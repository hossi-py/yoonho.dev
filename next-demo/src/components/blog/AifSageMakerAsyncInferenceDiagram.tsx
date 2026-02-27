'use client';

import { motion } from 'framer-motion';
import { Clock3, Database, Gauge, Layers3 } from 'lucide-react';
import { useMemo, useState } from 'react';

type OptionId = 'realtime' | 'serverless' | 'async' | 'batch';

const optionData: Record<
  OptionId,
  {
    label: string;
    payloadLimit: string;
    maxProcessing: string;
    latencyType: string;
    fitScore: number;
    note: string;
  }
> = {
  realtime: {
    label: '실시간 추론 (Real-time Inference)',
    payloadLimit: '~6 MB',
    maxProcessing: '~60 sec',
    latencyType: '즉시 응답',
    fitScore: 25,
    note: '1 GB 입력/1시간 처리 요구를 충족하지 못합니다.',
  },
  serverless: {
    label: '서버리스 추론 (Serverless Inference)',
    payloadLimit: '~4 MB',
    maxProcessing: '~15 min',
    latencyType: '짧은 응답',
    fitScore: 35,
    note: '운영은 간편하지만 대용량/장시간 처리 한계가 있습니다.',
  },
  async: {
    label: '비동기 추론 (Asynchronous Inference)',
    payloadLimit: 'Up to 1 GB',
    maxProcessing: 'Up to 1 hour',
    latencyType: '근실시간 (Near real-time)',
    fitScore: 95,
    note: '문제의 입력 크기와 처리 시간 요구를 모두 만족하는 선택지입니다.',
  },
  batch: {
    label: '배치 변환 (Batch Transform)',
    payloadLimit: '대용량 일괄 처리',
    maxProcessing: '긴 처리 가능',
    latencyType: '오프라인',
    fitScore: 40,
    note: '대규모 오프라인 처리용으로 근실시간 요구와 맞지 않습니다.',
  },
};

function barColor(score: number) {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-cyan-500';
  return 'bg-rose-500';
}

export function AifSageMakerAsyncInferenceDiagram() {
  const [active, setActive] = useState<OptionId>('async');
  const current = useMemo(() => optionData[active], [active]);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <Layers3 className="h-4 w-4" />
          <p className="text-sm font-semibold">SageMaker 추론 옵션 적합도 비교</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Inference</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-3 items-stretch md:items-center">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <p className="mb-2 text-xs font-bold text-slate-800 dark:text-slate-100">옵션 선택</p>
          <div className="space-y-2">
            {(Object.keys(optionData) as OptionId[]).map((id) => (
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
                {optionData[id].label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="hidden md:flex justify-center"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <Gauge className="h-5 w-5 text-cyan-500" />
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3"
        >
          <div className="mb-2 flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">요구사항 매칭 결과</p>
          </div>

          <div className="mb-2 grid grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-2">
              <span className="font-medium">입력 크기:</span> {current.payloadLimit}
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-2">
              <span className="font-medium">최대 처리 시간:</span> {current.maxProcessing}
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-2">
              <span className="font-medium">지연 특성:</span> {current.latencyType}
            </div>
          </div>

          <div className="mb-2 rounded-lg border border-cyan-200 dark:border-cyan-800 p-2">
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 dark:text-slate-300">적합도 점수</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{current.fitScore}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <motion.div
                className={`h-full ${barColor(current.fitScore)}`}
                initial={{ width: 0 }}
                animate={{ width: `${current.fitScore}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 p-2">
            <div className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-cyan-800 dark:text-cyan-200">
              <Clock3 className="h-3.5 w-3.5" />
              해설
            </div>
            <p className="text-xs text-cyan-700 dark:text-cyan-300">{current.note}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
