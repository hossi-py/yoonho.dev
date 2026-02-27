'use client';

import { motion } from 'framer-motion';
import { FileSearch, FileText, Gavel, MessageSquareText, ShieldCheck, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const docs = [
  {
    id: 'contract',
    title: '공급업체 계약서',
    summary: '위약 조항, 책임 한도, 지급 마일스톤을 핵심 포인트로 요약했습니다.',
    quality: 91,
  },
  {
    id: 'nda',
    title: '비밀유지계약 (NDA)',
    summary: '비밀정보 범위, 예외 조건, 계약 종료 후 효력 기간을 정리했습니다.',
    quality: 88,
  },
  {
    id: 'policy',
    title: '컴플라이언스 정책',
    summary: '개인정보 보관 의무와 감사 대응 절차를 우선순위로 추출했습니다.',
    quality: 86,
  },
] as const;

type DocId = (typeof docs)[number]['id'];

export function AifLegalSummarizationDiagram() {
  const [selected, setSelected] = useState<DocId>('contract');
  const active = useMemo(() => docs.find((d) => d.id === selected) ?? docs[0], [selected]);

  return (
    <div className="w-full rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/20 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
          <Gavel className="w-4 h-4" />
          <p className="text-sm font-semibold">법률 문서 요약 파이프라인</p>
        </div>
        <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">AIF-C01 Summarization</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-2 items-stretch md:items-center">
        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">입력 문서</p>
          </div>
          <div className="space-y-2">
            {docs.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelected(doc.id)}
                className={`w-full text-left rounded-lg px-2 py-1.5 text-xs border transition-colors ${
                  selected === doc.id
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="hidden md:flex justify-center" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <Sparkles className="w-4 h-4 text-cyan-500" />
        </motion.div>

        <div className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquareText className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">LLM 처리</p>
          </div>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-1"><FileSearch className="h-3.5 w-3.5 text-cyan-500" /> 문서 청크 분리</li>
            <li className="flex items-center gap-1"><FileSearch className="h-3.5 w-3.5 text-cyan-500" /> 핵심 조항 추출</li>
            <li className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-cyan-500" /> 법률 톤 가드레일 적용</li>
          </ul>
        </div>

        <motion.div className="hidden md:flex justify-center" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>
          <Sparkles className="w-4 h-4 text-cyan-500" />
        </motion.div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0.55, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-200/80 dark:border-cyan-700 bg-white/80 dark:bg-slate-900/70 p-3"
        >
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">요약 출력</p>
          <p className="text-xs text-cyan-700 dark:text-cyan-300 leading-relaxed">{active.summary}</p>
          <div className="mt-2">
            <p className="mb-1 text-[11px] text-slate-600 dark:text-slate-300">요약 품질 점수</p>
            <div className="h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <motion.div
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${active.quality}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
            <p className="mt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">{active.quality}/100</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
