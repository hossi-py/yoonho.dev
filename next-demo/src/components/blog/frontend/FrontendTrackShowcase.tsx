'use client';

import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type TrackId = 'react' | 'vue' | 'nextjs';

type Track = {
  id: TrackId;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tone: string;
};

const TRACKS: Track[] = [
  {
    id: 'react',
    title: 'React',
    subtitle: 'UI Engineering',
    description: '문서 개념을 실무 설계 기준으로 재해석합니다.',
    href: '/blog/frontend/react',
    tone: 'from-sky-500/15 to-blue-500/5 border-sky-200/70 dark:border-sky-800/70',
  },
  {
    id: 'vue',
    title: 'Vue',
    subtitle: 'Composition Patterns',
    description: '컴포지션 API 중심의 유지보수 패턴을 다룹니다.',
    href: '/blog/frontend/vue',
    tone: 'from-emerald-500/15 to-teal-500/5 border-emerald-200/70 dark:border-emerald-800/70',
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    subtitle: 'Production Runtime',
    description: 'App Router와 서버 경계 설계를 실전 기준으로 정리합니다.',
    href: '/blog/frontend/nextjs',
    tone: 'from-slate-500/15 to-slate-900/5 border-slate-300/80 dark:border-slate-700/70',
  },
];

type Props = {
  total: number;
  counts: Record<TrackId, number>;
};

export function FrontendTrackShowcase({ total, counts }: Props) {
  const [activeTrack, setActiveTrack] = useState<TrackId | null>(null);

  return (
    <>
      <div className="grid items-start gap-7 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <Badge className="bg-sky-600 text-white hover:bg-sky-700">Frontend Archive</Badge>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <TrendingUp className="h-3.5 w-3.5" />
              Weekly updated
            </span>
          </div>
          <h1 className="text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-900 md:text-[3.2rem] dark:text-slate-100">
            읽기 쉬운 구조로,
            <br />
            오래 남는 프론트엔드 기록
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
            React, Vue, Next.js를 각각의 트랙으로 분리해 누적합니다. 문법 요약보다 설계 기준과 디버깅 판단력에 초점을 둡니다.
          </p>
        </div>

        <Card className="rounded-3xl border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Coverage</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <MetricPill label="Total" value={total} />
              <MetricPill
                label="React"
                value={counts.react}
                onEnter={() => setActiveTrack('react')}
                onLeave={() => setActiveTrack(null)}
              />
              <MetricPill
                label="Vue"
                value={counts.vue}
                onEnter={() => setActiveTrack('vue')}
                onLeave={() => setActiveTrack(null)}
              />
              <MetricPill
                label="Next.js"
                value={counts.nextjs}
                onEnter={() => setActiveTrack('nextjs')}
                onLeave={() => setActiveTrack(null)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {TRACKS.map((track) => {
          const isActive = activeTrack === track.id;
          const isDimmed = activeTrack !== null && activeTrack !== track.id;
          return (
            <Link key={track.id} href={track.href}>
              <Card
                className={[
                  `h-full rounded-2xl border bg-gradient-to-br ${track.tone} bg-white shadow-sm dark:bg-slate-900`,
                  'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
                  isActive ? 'scale-[1.01] ring-2 ring-sky-300/80 dark:ring-sky-700' : '',
                  isDimmed ? 'opacity-80' : '',
                ].join(' ')}
              >
                <CardContent className="p-5">
                  <div className="mb-2.5 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">{track.subtitle}</p>
                    <Badge
                      variant="secondary"
                      className="bg-white/80 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {counts[track.id]}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">{track.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{track.description}</p>
                  <div className="mt-3.5 inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                    트랙 보기
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function MetricPill({
  label,
  value,
  onEnter,
  onLeave,
}: {
  label: string;
  value: number;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  return (
    <button
      type="button"
      className="rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-left transition-colors hover:border-sky-200 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-sky-800 dark:hover:bg-sky-950/30"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    </button>
  );
}
