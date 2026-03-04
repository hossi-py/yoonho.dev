'use client';

import { useState } from 'react';

import { InlineCodeText } from '@/components/blog/frontend/InlineCodeText';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LearningCheckpointProps {
  heading: string;
  questions: Array<{ q: string; a: string }>;
  glossaryTerms?: string[];
}

export function LearningCheckpoint({
  heading,
  questions,
  glossaryTerms = [],
}: LearningCheckpointProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card className="rounded-3xl border-slate-200 bg-[#f8fbff] shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900 dark:text-slate-100">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q} className="rounded-2xl border border-slate-200 p-3 bg-white dark:border-slate-700 dark:bg-slate-950/60">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 text-left font-semibold text-slate-800 dark:text-slate-100"
              >
                <span>
                  Q{index + 1}.{' '}
                  <InlineCodeText
                    text={item.q}
                    glossaryTerms={index === 0 ? glossaryTerms : []}
                  />
                </span>
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                  {isOpen ? '-' : '+'}
                </span>
              </button>
              {isOpen ? (
                <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                  A.{' '}
                  <InlineCodeText
                    text={item.a}
                  />
                </p>
              ) : null}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
