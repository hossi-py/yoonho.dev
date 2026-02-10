'use client';

import { Children, useRef, useState } from 'react';

type LayoutItem = { i: string; x: number; y: number; w: number; h: number };
type GridLayoutProps = { children: React.ReactNode };
type Dir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export function GridLayout({ children }: GridLayoutProps) {
  const childArray = Children.toArray(children);

  // Grid 설정 값
  const cols = 3;
  const colWidth = 300;
  const rowHeight = 200;
  const gap = 16;
  const hysteresis = 8; // 최소 이만큼 넘어야 1칸 변화로 인정

  const initialLayout: LayoutItem[] = childArray.map((_, idx) => {
    const x = idx % cols;
    const y = Math.floor(idx / cols);
    return { i: String(idx + 1), x, y, w: 1, h: 1 };
  });

  const [layout, setLayout] = useState(initialLayout);

  const gridToPx = (item: LayoutItem) => {
    const unitX = colWidth + gap;
    const unitY = rowHeight + gap;
    const left = item.x * unitX;
    const top = item.y * unitY;
    const width = item.w * colWidth + (item.w - 1) * gap;
    const height = item.h * rowHeight + (item.h - 1) * gap;
    return { left, top, width, height, unitX, unitY };
  };

  const [ghost, setGhost] = useState<{
    id: string;
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const resizingRef = useRef<{
    id: string;
    dir: Dir;
    startX: number;
    startY: number;
    baseLeft: number;
    baseTop: number;
    baseWidthPx: number;
    baseHeightPx: number;
    baseW: number;
    baseH: number;
    x: number;
    y: number;
    unitX: number;
    unitY: number;
  } | null>(null);

  const stepBy = (deltaPx: number, unit: number, hys: number) => {
    if (Math.abs(deltaPx) <= hys) return 0;
    return deltaPx > 0
      ? Math.floor((deltaPx - hys) / unit)
      : -Math.floor((Math.abs(deltaPx) - hys) / unit);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, item: LayoutItem, dir: Dir) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);

    const { left, top, width, height, unitX, unitY } = gridToPx(item);

    resizingRef.current = {
      id: item.i,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      baseLeft: left,
      baseTop: top,
      baseWidthPx: width,
      baseHeightPx: height,
      baseW: item.w,
      baseH: item.h,
      x: item.x,
      y: item.y,
      unitX,
      unitY,
    };

    setGhost({ id: item.i, left, top, width, height });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    const r = resizingRef.current;
    if (!r) return;

    const dx = e.clientX - r.startX;
    const dy = e.clientY - r.startY;

    const right = r.baseLeft + r.baseWidthPx;
    const bottom = r.baseTop + r.baseHeightPx;

    let left = r.baseLeft;
    let top = r.baseTop;
    let width = r.baseWidthPx;
    let height = r.baseHeightPx;

    // 가로 방향
    if (r.dir.includes('e')) {
      width = Math.max(colWidth, r.baseWidthPx + dx);
    }
    if (r.dir.includes('w')) {
      // 왼쪽 엣지 이동: left를 옮기며 width 재계산
      const minLeft = 0;
      const maxLeft = r.baseLeft + r.baseWidthPx - colWidth; // 최소 1칸 보장
      left = Math.min(Math.max(r.baseLeft + dx, minLeft), maxLeft);
      width = right - left;
    }

    // 세로 방향
    if (r.dir.includes('s')) {
      height = Math.max(rowHeight, r.baseHeightPx + dy);
    }
    if (r.dir.includes('n')) {
      const minTop = 0;
      const maxTop = r.baseTop + r.baseHeightPx - rowHeight; // 최소 1칸
      top = Math.min(Math.max(r.baseTop + dy, minTop), maxTop);
      height = bottom - top;
    }

    setGhost((g) => (g ? { ...g, left, top, width, height } : g));
  };

  const handlePointerUp = () => {
    const r = resizingRef.current;
    if (!r || !ghost) return cleanup();

    let nextX = r.x;
    let nextY = r.y;
    let nextW = r.baseW;
    let nextH = r.baseH;

    // 가로 계산
    if (r.dir.includes('e')) {
      const dw = stepBy(ghost.width - r.baseWidthPx, r.unitX, hysteresis);
      nextW = Math.max(1, Math.min(r.baseW + dw, cols - r.x));
    }
    if (r.dir.includes('w')) {
      // 왼쪽으로 얼마나 이동했는지(기준보다 왼쪽으로 늘리면 +)
      const movedLeftPx = r.baseLeft - ghost.left;
      const dColsLeft = stepBy(movedLeftPx, r.unitX, hysteresis);
      nextX = Math.max(0, r.x - dColsLeft);
      nextW = Math.max(1, Math.min(r.baseW + dColsLeft, cols - nextX));
    }

    // 세로 계산
    if (r.dir.includes('s')) {
      const dh = stepBy(ghost.height - r.baseHeightPx, r.unitY, hysteresis);
      nextH = Math.max(1, r.baseH + dh);
    }
    if (r.dir.includes('n')) {
      const movedTopPx = r.baseTop - ghost.top;
      const dRowsUp = stepBy(movedTopPx, r.unitY, hysteresis);
      nextY = Math.max(0, r.y - dRowsUp);
      nextH = Math.max(1, r.baseH + dRowsUp);
    }

    // 우측 경계 재확인(좌측에서 움직였을 수도 있으므로)
    nextW = Math.max(1, Math.min(nextW, cols - nextX));

    setLayout((prev) =>
      prev.map((it) => (it.i === r.id ? { ...it, x: nextX, y: nextY, w: nextW, h: nextH } : it))
    );

    cleanup();
  };

  const cleanup = () => {
    resizingRef.current = null;
    setGhost(null);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);
  };

  // 핸들 공통 스타일(작은 핸들)
  const handleBase = 'absolute z-10 bg-blue-600 rounded-sm opacity-90 hover:opacity-100';

  return (
    <div className="relative select-none touch-none">
      {/* grid 트랙을 px로 고정해서 고스트와 정확히 맞춤 */}
      <div
        className="grid gap-4 relative"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${colWidth}px)`,
          gridAutoRows: `${rowHeight}px`,
        }}
      >
        {layout.map((item, idx) => {
          const style = {
            gridColumn: `${item.x + 1} / span ${item.w}`,
            gridRow: `${item.y + 1} / span ${item.h}`,
          };
          const isResizing = ghost?.id === item.i;

          return (
            <div
              key={item.i}
              style={style}
              className={`relative flex items-center justify-center rounded-md bg-rose-500 text-white font-bold ${
                isResizing ? 'opacity-60 outline outline-2 outline-blue-400' : ''
              }`}
            >
              {childArray[idx] ?? item.i}

              {/* === 8방향 리사이즈 핸들 === */}
              {/* N */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'n')}
                className={`${handleBase} cursor-n-resize top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-2`}
              />
              {/* S */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 's')}
                className={`${handleBase} cursor-s-resize bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-2`}
              />
              {/* E */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'e')}
                className={`${handleBase} cursor-e-resize right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-6 w-2`}
              />
              {/* W */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'w')}
                className={`${handleBase} cursor-w-resize left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-2`}
              />
              {/* NW */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'nw')}
                className={`${handleBase} cursor-nwse-resize top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3`}
              />
              {/* NE */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'ne')}
                className={`${handleBase} cursor-nesw-resize top-0 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3`}
              />
              {/* SW */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'sw')}
                className={`${handleBase} cursor-nesw-resize bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-3 h-3`}
              />
              {/* SE */}
              <div
                onPointerDown={(e) => handlePointerDown(e, item, 'se')}
                className={`${handleBase} cursor-nwse-resize bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-3 h-3`}
              />
            </div>
          );
        })}
      </div>

      {/* 리사이즈 프리뷰(고스트): px로 부드럽게 보여줌 */}
      {ghost && (
        <div
          className="pointer-events-none absolute z-50 rounded-md border-2 border-blue-500/70 bg-blue-500/10"
          style={{
            left: ghost.left,
            top: ghost.top,
            width: ghost.width,
            height: ghost.height,
          }}
        />
      )}
    </div>
  );
}
