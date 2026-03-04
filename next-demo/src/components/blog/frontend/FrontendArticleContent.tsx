import { Clock3, SignalHigh, SignalLow, SignalMedium } from 'lucide-react';

import { InlineCodeText } from '@/components/blog/frontend/InlineCodeText';
import { LearningCheckpoint } from '@/components/blog/frontend/LearningCheckpoint';
import { ReactDescribingUiAnimation } from '@/components/blog/frontend/ReactDescribingUiAnimation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FrontendArticle } from '@/lib/frontend-article-types';

interface FrontendArticleContentProps {
  article: FrontendArticle;
}

const TERM_NOTES: Array<{ pattern: RegExp; label: string; description: string }> = [
  {
    pattern: /\btranspiler\b|트랜스파일러/i,
    label: '트랜스파일러',
    description: '한 언어/문법의 코드를 다른 형태의 코드로 변환하는 도구입니다. (예: JSX -> JavaScript)',
  },
  {
    pattern: /\bbarrel\b|index\.ts/i,
    label: 'barrel file',
    description: '여러 모듈 export를 한 파일(index.ts 등)에서 재수출해 import 경로를 단순화하는 패턴입니다.',
  },
  {
    pattern: /\bVirtual DOM\b/i,
    label: 'Virtual DOM',
    description: '실제 DOM 자체가 아니라, 화면 상태를 비교하기 위한 메모리상의 UI 표현입니다.',
  },
  {
    pattern: /\bReconciliation\b|재조정/i,
    label: 'Reconciliation',
    description: '이전 UI와 새 UI를 비교해 실제 DOM 변경을 최소화하는 React의 diff 과정입니다.',
  },
  {
    pattern: /\bJSX\b/i,
    label: 'JSX',
    description: 'HTML이 아니라 React Element 생성을 위한 JavaScript 문법 확장입니다.',
  },
  {
    pattern: /\bReact Element\b|createElement|jsx-runtime/i,
    label: 'React Element',
    description: 'DOM 노드가 아닌 UI 설명 객체이며, React가 비교(diff)할 기본 단위입니다.',
  },
  {
    pattern: /\bprops?\b/i,
    label: 'props',
    description: '부모 컴포넌트가 자식 컴포넌트에 전달하는 읽기 전용 입력값입니다.',
  },
  {
    pattern: /\bkey\b/i,
    label: 'key',
    description: '리스트 항목의 정체성을 추적해 상태 보존/초기화에 영향을 주는 식별자입니다.',
  },
  {
    pattern: /\bStrict Mode\b/i,
    label: 'Strict Mode',
    description: '개발 중 잠재 버그를 빨리 드러내기 위해 추가 검사를 수행하는 React 모드입니다.',
  },
  {
    pattern: /\bConcurrent\b/i,
    label: 'Concurrent Rendering',
    description: '렌더링을 중단/재개/폐기할 수 있게 하여 반응성을 높이는 React 실행 모델입니다.',
  },
  {
    pattern: /short-circuit|단축 평가|\b&&\b/i,
    label: 'Short-circuit Evaluation',
    description: '논리 연산에서 조건이 확정되면 나머지 평가를 생략하는 JavaScript 규칙입니다.',
  },
  {
    pattern: /\bdiff(?:ing)?\b/i,
    label: 'Diffing',
    description: '이전/다음 트리를 비교해 변경점을 찾는 과정으로 Reconciliation의 핵심 단계입니다.',
  },
  {
    pattern: /tree shaking|트리 쉐이킹/i,
    label: 'Tree Shaking',
    description: '번들러가 사용되지 않는 export를 제거해 번들 크기를 줄이는 최적화입니다.',
  },
  {
    pattern: /colocation|가까이에 두는 것/i,
    label: 'State Colocation',
    description: '상태를 실제로 사용하는 컴포넌트 가까이에 두어 불필요한 리렌더를 줄이는 원칙입니다.',
  },
  {
    pattern: /\bServer Component\b/i,
    label: 'Server Component',
    description: '브라우저가 아닌 서버에서 렌더되어 클라이언트 번들을 줄일 수 있는 컴포넌트입니다.',
  },
  {
    pattern: /\bClient Component\b|\"use client\"/i,
    label: 'Client Component',
    description: '브라우저에서 실행되며 상태/이벤트 같은 인터랙션을 처리하는 컴포넌트입니다.',
  },
];

function normalizeTermLabel(value: string) {
  return value.trim().toLowerCase();
}

function getSectionSearchText(section: FrontendArticle['sections'][number]): string {
  const chunks = [section.heading];
  if (section.body) chunks.push(section.body);
  if (section.paragraphs?.length) chunks.push(...section.paragraphs);
  if (section.bullets?.length) chunks.push(...section.bullets);
  if (section.items?.length) chunks.push(...section.items);
  if (section.tasks?.length) chunks.push(...section.tasks);
  if (section.questions?.length) {
    chunks.push(...section.questions.map((q) => q.q));
    chunks.push(...section.questions.map((q) => q.a));
  }
  return chunks.join('\n');
}

function getSectionInlineText(section: FrontendArticle['sections'][number]): string {
  const chunks: string[] = [];
  if (section.body) chunks.push(section.body);
  if (section.paragraphs?.length) chunks.push(...section.paragraphs);
  if (section.bullets?.length) chunks.push(...section.bullets);
  if (section.items?.length) chunks.push(...section.items);
  if (section.tasks?.length) chunks.push(...section.tasks);
  if (section.misconceptions?.length) chunks.push(...section.misconceptions);
  return chunks.join('\n');
}

function getSectionTermNotes(section: FrontendArticle['sections'][number]) {
  const text = getSectionSearchText(section);
  const uniqueByLabel = new Map<string, (typeof TERM_NOTES)[number]>();
  TERM_NOTES.forEach((term) => {
    if (!term.pattern.test(text)) return;
    uniqueByLabel.set(normalizeTermLabel(term.label), term);
  });
  return Array.from(uniqueByLabel.values());
}

export function FrontendArticleContent({ article }: FrontendArticleContentProps) {
  const isEditorialLayout = article.id === 'react-describing-the-ui';
  const shownRefTerms = new Set<string>();
  const DifficultyIcon =
    article.difficulty === 'Advanced'
      ? SignalHigh
      : article.difficulty === 'Intermediate'
        ? SignalMedium
        : SignalLow;

  return (
    <div className="space-y-6 md:space-y-8">
      <Card
        className={
          isEditorialLayout
            ? 'overflow-hidden rounded-3xl border-slate-200 bg-[#f8fbff] shadow-sm dark:border-slate-800 dark:bg-slate-900'
            : undefined
        }
      >
        <CardContent className={isEditorialLayout ? 'pt-7 space-y-5' : 'pt-6 space-y-4'}>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={
                  isEditorialLayout
                    ? 'text-xs rounded-full border-slate-200 bg-white px-2.5 py-1 text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300'
                    : 'text-xs'
                }
              >
                #{tag}
              </Badge>
            ))}
          </div>
          <div
            className={
              isEditorialLayout
                ? 'flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400'
                : 'flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400'
            }
          >
            <span className={isEditorialLayout ? 'inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-600 dark:bg-slate-950/60 dark:text-slate-300' : 'inline-flex items-center gap-1'}>
              <Clock3 className="w-4 h-4" />
              {article.readTimeMinutes} min
            </span>
            <span className={isEditorialLayout ? 'inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-600 dark:bg-slate-950/60 dark:text-slate-300' : 'inline-flex items-center gap-1'}>
              <DifficultyIcon className="w-4 h-4" />
              {article.difficulty}
            </span>
          </div>
          <p className={isEditorialLayout ? 'text-slate-700 dark:text-slate-200 leading-relaxed text-[15px]' : 'text-slate-700 dark:text-slate-200 leading-relaxed'}>
            <InlineCodeText text={article.summary} />
          </p>
          {isEditorialLayout ? (
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded-2xl border border-sky-100 bg-white px-3 py-2.5 text-sm font-medium text-sky-700 shadow-sm dark:border-sky-900 dark:bg-slate-950/60 dark:text-sky-300">
                컴포넌트 경계 설계
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-3 py-2.5 text-sm font-medium text-blue-700 shadow-sm dark:border-blue-900 dark:bg-slate-950/60 dark:text-blue-300">
                key/정체성 디버깅
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-white px-3 py-2.5 text-sm font-medium text-cyan-700 shadow-sm dark:border-cyan-900 dark:bg-slate-950/60 dark:text-cyan-300">
                순수 렌더링 체크
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {article.sections.map((section) => {
        const termNotes = getSectionTermNotes(section);
        const inlineText = getSectionInlineText(section);
        const visibleTerms = termNotes.filter((term) => {
          const normalized = normalizeTermLabel(term.label);
          if (shownRefTerms.has(normalized)) return false;
          return term.pattern.test(inlineText);
        });
        visibleTerms.forEach((term) => shownRefTerms.add(normalizeTermLabel(term.label)));
        const glossaryTerms = visibleTerms.map((term) => term.label);
        const sectionShownRefTerms = new Set<string>();

        if (section.type === 'checkpoint' && section.questions?.length) {
          return (
            <section key={section.heading} className="space-y-3">
              <LearningCheckpoint heading={section.heading} questions={section.questions} />
            </section>
          );
        }

        if (section.type === 'practice' && section.tasks?.length) {
          return (
            <section key={section.heading} className="space-y-3">
              <Card
                className={
                  isEditorialLayout
                    ? 'rounded-3xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
                    : 'border-violet-200 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/20'
                }
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {section.heading}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditorialLayout ? (
                    <ol className="space-y-2">
                      {section.tasks.map((task, index) => (
                        <li key={task} className="flex gap-3 text-slate-700 dark:text-slate-200 leading-relaxed">
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
                            {index + 1}
                          </span>
                          <span>
                            <InlineCodeText
                              text={task}
                              glossaryTerms={glossaryTerms}
                              shownTerms={sectionShownRefTerms}
                            />
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="space-y-2">
                      {section.tasks.map((task) => (
                        <li key={task} className="text-slate-700 dark:text-slate-200 leading-relaxed">
                          -{' '}
                          <InlineCodeText
                            text={task}
                            glossaryTerms={glossaryTerms}
                            shownTerms={sectionShownRefTerms}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              {visibleTerms.length ? (
                <Card className="rounded-2xl border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20">
                  <CardContent className="pt-0">
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">참고 용어</p>
                    <ul className="mt-2 space-y-1.5">
                      {visibleTerms.map((term) => (
                        <li key={term.label} className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                          <strong>{term.label}</strong>: {term.description}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : null}
            </section>
          );
        }

        if (section.type === 'animation' && section.animationKey === 'react-describing-ui-core') {
          return (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{section.heading}</h2>
              {section.body ? (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <InlineCodeText
                    text={section.body}
                    glossaryTerms={glossaryTerms}
                    shownTerms={sectionShownRefTerms}
                  />
                </p>
              ) : null}
              <ReactDescribingUiAnimation />
            </section>
          );
        }

        if (isEditorialLayout && section.type === 'concept') {
          return (
            <section key={section.heading} className="space-y-3">
              <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-[1.65rem] font-semibold tracking-[-0.01em] leading-tight text-slate-900 dark:text-slate-100">
                    {section.heading}
                  </h2>
                  <div className="h-px bg-slate-100 dark:bg-slate-800" />
                  {section.body ? (
                    <p className="text-[16px] leading-8 text-slate-700 dark:text-slate-200">
                      <InlineCodeText
                        text={section.body}
                        glossaryTerms={glossaryTerms}
                        shownTerms={sectionShownRefTerms}
                      />
                    </p>
                  ) : null}
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-8 text-slate-700 dark:text-slate-200">
                      <InlineCodeText
                        text={paragraph}
                        glossaryTerms={glossaryTerms}
                        shownTerms={sectionShownRefTerms}
                      />
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="text-[16px] leading-8 text-slate-700 dark:text-slate-200">
                          <InlineCodeText
                            text={bullet}
                            glossaryTerms={glossaryTerms}
                            shownTerms={sectionShownRefTerms}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.misconceptions?.length ? (
                    <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-3 dark:border-sky-900 dark:bg-sky-950/20">
                      <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">심화 포인트</p>
                      <ul className="mt-2 space-y-1.5">
                        {section.misconceptions.map((item) => (
                          <li key={item} className="text-sm text-sky-700 dark:text-sky-300">
                            -{' '}
                            <InlineCodeText
                              text={item}
                              glossaryTerms={glossaryTerms}
                              shownTerms={sectionShownRefTerms}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {section.code ? (
                    <Card className="bg-slate-950 border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-slate-200 text-sm">Example</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs md:text-sm text-slate-100 overflow-x-auto">
                          <code>{section.code}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  ) : null}
                  {visibleTerms.length ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900 dark:bg-amber-950/20">
                      <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">참고 용어</p>
                      <ul className="mt-2 space-y-1.5">
                        {visibleTerms.map((term) => (
                          <li key={term.label} className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                            <strong>{term.label}</strong>: {term.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </section>
          );
        }

        return (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{section.heading}</h2>
            {section.body ? (
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                <InlineCodeText
                  text={section.body}
                  glossaryTerms={glossaryTerms}
                  shownTerms={sectionShownRefTerms}
                />
              </p>
            ) : null}
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="text-slate-700 dark:text-slate-200 leading-relaxed">
                <InlineCodeText
                  text={paragraph}
                  glossaryTerms={glossaryTerms}
                  shownTerms={sectionShownRefTerms}
                />
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="text-slate-700 dark:text-slate-200 leading-relaxed">
                    -{' '}
                    <InlineCodeText
                      text={bullet}
                      glossaryTerms={glossaryTerms}
                      shownTerms={sectionShownRefTerms}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
            {section.misconceptions?.length ? (
              <Card className="border-rose-200 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20">
                <CardHeader>
                  <CardTitle className="text-sm text-rose-700 dark:text-rose-300">
                    자주 하는 오해
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.misconceptions.map((item) => (
                      <li key={item} className="text-sm text-rose-700 dark:text-rose-300">
                        -{' '}
                        <InlineCodeText
                          text={item}
                          glossaryTerms={glossaryTerms}
                          shownTerms={sectionShownRefTerms}
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
            {section.items?.length ? (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-slate-700 dark:text-slate-200 leading-relaxed">
                    -{' '}
                    <InlineCodeText
                      text={item}
                      glossaryTerms={glossaryTerms}
                      shownTerms={sectionShownRefTerms}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
            {section.code ? (
              <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-200 text-sm">Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs md:text-sm text-slate-100 overflow-x-auto">
                    <code>{section.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ) : null}
            {visibleTerms.length ? (
              <Card className="rounded-2xl border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20">
                <CardContent className="pt-0">
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">참고 용어</p>
                  <ul className="mt-2 space-y-1.5">
                    {visibleTerms.map((term) => (
                      <li key={term.label} className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                        <strong>{term.label}</strong>: {term.description}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}



