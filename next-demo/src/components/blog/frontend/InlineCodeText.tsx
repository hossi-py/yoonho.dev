interface InlineCodeTextProps {
  text: string;
  glossaryTerms?: string[];
  shownTerms?: Set<string>;
}

const AUTO_CODE_REGEX =
  /(<\/?[A-Za-z][^>]*>)|(\{[^{}]+\})|(\b[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$.]*\([^)]*\))|(\b[A-Za-z_$][\w$.]*\([^)]*\))|(\b[A-Za-z_$][\w$]*(?:\/[A-Za-z_$][\w$]+)+\b)|(\b[A-Za-z_$][\w$]*=[^,\s]+)|(\b[A-Z]{2,}(?:\/[A-Z]{2,})*\b)|(\b(?:use[A-Z][A-Za-z0-9]*|className|htmlFor|props|children|key|index|revalidate|generateStaticParams|parseSections|Strict Mode)\b)/g;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeTerm(value: string) {
  return value.trim().toLowerCase();
}

function getMatchingGlossaryTerm(value: string, glossaryTerms: string[]): string | null {
  if (!glossaryTerms.length) return null;
  const lowerValue = value.toLowerCase();
  const sortedTerms = [...glossaryTerms].sort((a, b) => b.length - a.length);
  const matched = sortedTerms.find((term) => lowerValue.includes(term.toLowerCase()));
  return matched ?? null;
}

function renderRefBadge(key: string) {
  return (
    <span
      key={key}
      className="ml-1 inline-flex items-center rounded border border-emerald-300 bg-emerald-100 px-1 py-0 text-[10px] font-semibold leading-none text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
      title={'\uC544\uB798 \uCC38\uACE0 \uC6A9\uC5B4\uC5D0\uC11C \uC124\uBA85'}
    >
      ref
    </span>
  );
}

function renderCodeSpan(value: string, key: string, showRef: boolean) {
  return (
    <span key={key} className="inline">
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-800 dark:bg-slate-800 dark:text-slate-100">
        {value}
      </code>
      {showRef ? renderRefBadge(`${key}-ref`) : null}
    </span>
  );
}

function shouldShowRef(term: string, shownTerms: Set<string>) {
  const normalized = normalizeTerm(term);
  if (shownTerms.has(normalized)) return false;
  shownTerms.add(normalized);
  return true;
}

function renderGlossaryText(
  text: string,
  seed: string,
  glossaryTerms: string[],
  shownTerms: Set<string>
) {
  if (!glossaryTerms.length) {
    return [<span key={`${seed}-plain`}>{text}</span>];
  }

  const sortedTerms = [...glossaryTerms].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sortedTerms.map(escapeRegExp).join('|')})`, 'gi');
  const pieces = text.split(regex);

  return pieces.map((piece, index) => {
    if (!piece) return <span key={`${seed}-piece-${index}`} />;

    const exactTerm = glossaryTerms.find((term) => term.toLowerCase() === piece.toLowerCase());

    if (!exactTerm) {
      return <span key={`${seed}-piece-${index}`}>{piece}</span>;
    }

    const showRef = shouldShowRef(exactTerm, shownTerms);
    if (!showRef) {
      return <span key={`${seed}-term-plain-${index}`}>{piece}</span>;
    }

    return (
      <span
        key={`${seed}-term-${index}`}
        className="underline decoration-dotted decoration-emerald-500 underline-offset-4"
        title={'\uC544\uB798 \uCC38\uACE0 \uC6A9\uC5B4\uC5D0\uC11C \uC124\uBA85'}
      >
        {piece}
        {renderRefBadge(`${seed}-term-${index}-ref`)}
      </span>
    );
  });
}

function renderAutoCodeText(
  text: string,
  seed: string,
  glossaryTerms: string[],
  shownTerms: Set<string>
) {
  const chunks: Array<{ type: 'text' | 'code'; value: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = AUTO_CODE_REGEX.exec(text);

  while (match) {
    const matchedText = match[0];
    const start = match.index;

    if (start > lastIndex) {
      chunks.push({ type: 'text', value: text.slice(lastIndex, start) });
    }

    chunks.push({ type: 'code', value: matchedText });
    lastIndex = start + matchedText.length;
    match = AUTO_CODE_REGEX.exec(text);
  }

  if (lastIndex < text.length) {
    chunks.push({ type: 'text', value: text.slice(lastIndex) });
  }

  AUTO_CODE_REGEX.lastIndex = 0;

  return chunks.map((chunk, index) => {
    if (chunk.type === 'text') {
      return (
        <span key={`${seed}-auto-text-${index}`}>
          {renderGlossaryText(
            chunk.value,
            `${seed}-auto-text-${index}`,
            glossaryTerms,
            shownTerms
          )}
        </span>
      );
    }

    const term = getMatchingGlossaryTerm(chunk.value, glossaryTerms);
    const showRef = Boolean(term) && shouldShowRef(term!, shownTerms);
    return renderCodeSpan(chunk.value, `${seed}-auto-code-${index}`, showRef);
  });
}

export function InlineCodeText({
  text,
  glossaryTerms = [],
  shownTerms,
}: InlineCodeTextProps) {
  const parts = text.split(/(`[^`]+`)/g);
  const localShownTerms = shownTerms ?? new Set<string>();

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          const codeValue = part.slice(1, -1);
          const term = getMatchingGlossaryTerm(codeValue, glossaryTerms);
          const showRef = Boolean(term) && shouldShowRef(term!, localShownTerms);
          return renderCodeSpan(codeValue, `${part}-${index}`, showRef);
        }

        return (
          <span key={`${part}-${index}`}>
            {renderAutoCodeText(part, `${part}-${index}`, glossaryTerms, localShownTerms)}
          </span>
        );
      })}
    </>
  );
}
