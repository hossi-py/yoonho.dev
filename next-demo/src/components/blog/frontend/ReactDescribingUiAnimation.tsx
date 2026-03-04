'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SceneKey = 'purity' | 'keys' | 'tree';

type Todo = {
  id: string;
  label: string;
};

const SCENE_META: Record<SceneKey, { title: string; description: string }> = {
  purity: {
    title: '순수 컴포넌트',
    description: '같은 입력이면 같은 출력이어야 합니다. 렌더링 중 외부 상태를 바꾸면 같은 입력에서도 출력이 흔들립니다.',
  },
  keys: {
    title: '리스트 key 안정성',
    description: '고유 key가 없으면 항목 정체성이 깨져 입력 상태가 다른 행으로 이동합니다.',
  },
  tree: {
    title: 'UI 트리 vs 데이터 흐름',
    description: '트리 구조(부모-자식)와 흐름(데이터 하향, 이벤트 상향)은 다른 관점입니다.',
  },
};

let impureSerial = 0;

function pureView(input: number) {
  return `등급: ${input >= 80 ? 'PASS' : 'RETRY'}`;
}

function impureView(input: number) {
  impureSerial += 1;
  return `등급: ${input >= 80 ? 'PASS' : 'RETRY'} (#${impureSerial})`;
}

export function ReactDescribingUiAnimation() {
  const [scene, setScene] = useState<SceneKey>('purity');

  return (
    <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">어려운 개념 3분 시각화</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['purity', 'keys', 'tree'] as const).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={scene === key ? 'default' : 'outline'}
              onClick={() => setScene(key)}
              className={scene === key ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
            >
              {SCENE_META[key].title}
            </Button>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-white dark:bg-slate-900 p-4 md:p-6 min-h-[320px]">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{SCENE_META[scene].description}</p>
          <AnimatePresence mode="wait">
            {scene === 'purity' && <PurityScene key="purity" />}
            {scene === 'keys' && <KeyScene key="keys" />}
            {scene === 'tree' && <TreeScene key="tree" />}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

function PurityScene() {
  const [input, setInput] = useState(82);
  const [runCount, setRunCount] = useState(0);

  const pureResult = useMemo(() => pureView(input), [input, runCount]);
  const impureResult = useMemo(() => impureView(input), [input, runCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-slate-700 text-white">입력 score: {input}</Badge>
        <Badge variant="outline">재렌더 횟수: {runCount}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Pure: 같은 입력 = 같은 출력</p>
          <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200 font-mono">{pureResult}</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 dark:border-rose-900 dark:bg-rose-950/20">
          <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">Impure: 외부 변수 변경</p>
          <p className="mt-2 text-sm text-rose-800 dark:text-rose-200 font-mono">{impureResult}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setRunCount((v) => v + 1)}>
          같은 입력으로 재렌더
        </Button>
        <Button size="sm" variant="outline" onClick={() => setInput((v) => (v === 82 ? 76 : 82))}>
          입력 바꾸기 (82 ↔ 76)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            impureSerial = 0;
            setRunCount(0);
          }}
        >
          초기화
        </Button>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300">
        포인트: 같은 입력에서도 오른쪽은 호출 횟수에 따라 출력 문자열이 변합니다. 이게 "렌더링 중 부수효과" 문제입니다.
      </p>
    </motion.div>
  );
}

function KeyScene() {
  const initialItems: Todo[] = [
    { id: 'a', label: 'A Task' },
    { id: 'b', label: 'B Task' },
    { id: 'c', label: 'C Task' },
  ];

  const [items, setItems] = useState<Todo[]>(initialItems);
  const [nextCode, setNextCode] = useState('d');

  const prependItem = () => {
    const nextId = nextCode;
    const label = `${nextCode.toUpperCase()} Task`;
    setItems((prev) => [{ id: nextId, label }, ...prev]);
    setNextCode(String.fromCharCode(nextCode.charCodeAt(0) + 1));
  };

  const reset = () => {
    setItems(initialItems);
    setNextCode('d');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={prependItem}>
          맨 앞에 항목 추가
        </Button>
        <Button size="sm" variant="outline" onClick={reset}>
          초기화
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ListDemo title="안정적 key (id)" kind="stable" items={items} />
        <ListDemo title="불안정 key (index)" kind="unstable" items={items} />
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300">
        먼저 첫 행 input에 메모를 입력하고 "맨 앞에 항목 추가"를 눌러보세요. 오른쪽(index key)에서 메모가 다른 항목으로 이동합니다.
      </p>
    </motion.div>
  );
}

function ListDemo({ title, kind, items }: { title: string; kind: 'stable' | 'unstable'; items: Todo[] }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">{title}</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <EditableRow key={kind === 'stable' ? item.id : index} item={item} rowKey={kind === 'stable' ? item.id : String(index)} />
        ))}
      </div>
    </div>
  );
}

function EditableRow({ item, rowKey }: { item: Todo; rowKey: string }) {
  const [memo, setMemo] = useState('');

  return (
    <motion.div layout className="rounded-lg border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-950/50">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{item.label}</span>
        <span>key: {rowKey}</span>
      </div>
      <input
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="행 로컬 상태(메모)"
        className="mt-1 w-full rounded border border-slate-300 dark:border-slate-600 bg-transparent px-2 py-1 text-xs"
      />
    </motion.div>
  );
}

function TreeScene() {
  const [pulse, setPulse] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setPulse((v) => v + 1)}>
          CommentItem 에서 Like 이벤트 발생
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 p-3 bg-indigo-50/40 dark:bg-indigo-950/20">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2">UI 트리 (구조)</p>
          <div className="space-y-2 text-sm">
            <TreeChip label="Page" depth={0} />
            <TreeChip label="PostDetail" depth={1} />
            <TreeChip label="CommentList" depth={1} />
            <TreeChip label="CommentItem" depth={2} active={pulse % 2 === 1} />
          </div>
        </div>

        <div className="rounded-xl border border-cyan-200 dark:border-cyan-900 p-3 bg-cyan-50/40 dark:bg-cyan-950/20">
          <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-2">흐름 (방향)</p>
          <FlowRow
            label="Data ↓ Page -> CommentList -> CommentItem (props)"
            color="blue"
            active={pulse % 2 === 0}
          />
          <FlowRow
            label="Event ↑ CommentItem -> CommentList -> Page (onLike)"
            color="amber"
            active={pulse % 2 === 1}
          />
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300">
        트리는 "누가 누구의 자식인가"를 보여주고, 흐름은 "값이 어디로 이동하는가"를 보여줍니다. 두 개를 분리해서 봐야 디버깅이 쉬워집니다.
      </p>
    </motion.div>
  );
}

function TreeChip({ label, depth, active = false }: { label: string; depth: number; active?: boolean }) {
  return (
    <motion.div
      animate={{ scale: active ? 1.03 : 1, opacity: active ? 1 : 0.9 }}
      className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white/80 dark:bg-slate-900 px-3 py-1.5"
      style={{ marginLeft: `${depth * 18}px` }}
    >
      {label}
    </motion.div>
  );
}

function FlowRow({ label, color, active }: { label: string; color: 'blue' | 'amber'; active: boolean }) {
  const base =
    color === 'blue'
      ? 'border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-300'
      : 'border-amber-200 text-amber-700 dark:border-amber-900 dark:text-amber-300';

  return (
    <motion.div
      animate={{ x: active ? 4 : 0, opacity: active ? 1 : 0.75 }}
      className={`mb-2 rounded-lg border px-3 py-2 text-xs ${base}`}
    >
      {label}
    </motion.div>
  );
}
