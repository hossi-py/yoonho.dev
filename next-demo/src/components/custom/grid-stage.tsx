"use client";

import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GridItem } from "./grid-item";

export type LayoutItem = {
  id: string;
  x: number; // 열 기준 좌표
  y: number; // 행 기준 좌표
  w: number; // 가로로 차지 하는 크기
  h: number; // 세로로 차지하는 크기
  static?: boolean; // true 면 고정
};

type GridStageProps = {
  children: ReactNode;
  cols?: number; // 총 열 수
  rowHeight?: number; // 한 칸의 px 높이
  margin?: [number, number];
  preventCollision?: boolean; // true면 겹치면 이동 불가
  compactType?: "vertical" | "none";
  className?: string;
};

/**
 * GridStage: 전체 그리드 영역
 * - layout 배열로 모든 카드의 위치/크기 관리
 * - GridItem이 움직일 때 setLayout으로 상태 갱신
 */
export function GridStage({
  children,
  cols = 3,
  rowHeight = 160,
  margin = [16, 16],
  preventCollision = false,
  compactType = "vertical",
  className,
}: GridStageProps) {
  const childArray = Children.toArray(children);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 컨테이너 폭을 측정하여 colWidth 동적 계산
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const [mx, my] = margin;

  /** colWidth 계산
   * - 총 폭에서 (cols - 1)개의 가로 마진을 빼고 등분 (요소 실제 폭만)
   */
  const colWidth = useMemo(() => {
    if (cols <= 0) return 0;
    return (containerWidth - (cols - 1) * mx) / cols;
  }, [containerWidth, cols, mx]);

  // 초기 레이아웃
  const [layout, setLayout] = useState(
    childArray.map((_, i) => ({
      id: i.toString(),
      x: i % cols,
      y: Math.floor(i / cols),
      w: 1,
      h: 1,
    }))
  );

  // 드래그 프리뷰 레이아웃(확정 전 임시)
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragLayout, setDragLayout] = useState<LayoutItem[] | null>(null);

  // y우선, x다음(위→아래, 좌→우) 정렬: 컴팩션/높이계산에 유용
  const sortLayout = (items: LayoutItem[]) =>
    [...items].sort((a, b) => a.y - b.y || a.x - b.x);

  // 충돌 검사
  const collides = (a: LayoutItem, b: LayoutItem) => {
    if (a.id === b.id) return false;
    return !(
      a.x + a.w <= b.x ||
      b.x + b.w <= a.x ||
      a.y + a.h <= b.y ||
      b.y + b.h <= a.y
    );
  };

  const getAllCollisions = (items: LayoutItem[], item: LayoutItem) =>
    items.filter((it) => collides(item, it));

  // 경계 보정: 열 범위를 벗어나지 않게, y는 0 이상
  const clampItem = (it: LayoutItem) => {
    it.w = Math.min(it.w, cols);
    it.x = Math.max(0, Math.min(it.x, cols - it.w));
    it.y = Math.max(0, it.y);
    return it;
  };

  /**
   * 충돌 해소(푸시다운):
   * - moving을 새 좌표에 두고, 부딪히는 애들을 아래로 보냄.
   * - 각 반복에서 적어도 하나의 y가 증가 → 유한 단계 후 종료.
   */
  const resolveCollisions = (items: LayoutItem[], moving: LayoutItem) => {
    let out = items.map((x) => ({ ...x }));
    const itemRef = out.find((x) => x.id === moving.id)!;
    clampItem(itemRef);

    let collisions = getAllCollisions(out, itemRef);
    if (preventCollision && collisions.length) {
      // 충돌 금지 모드면 이동 불허 → 기존 상태 유지
      return items;
    }

    while (collisions.length) {
      for (const c of collisions) {
        if (c.static) continue;
        // 핵심: M 아래로 즉시 이동(한 번에 h_M 만큼 내리기)
        c.y = itemRef.y + itemRef.h;
        clampItem(c);
      }
      collisions = getAllCollisions(out, itemRef);
    }
    return out;
  };

  /**
   * 수직 컴팩션:
   * - 각 아이템을 가능한 위쪽 최소 y로 끌어올려 빈칸 제거.
   * - 0,1,2,... 순으로 충돌 없는 최소 y를 탐색.
   */
  const compactVertical = (items: LayoutItem[]) => {
    if (compactType !== "vertical") return items;
    const out = sortLayout(items).map((x) => ({ ...x }));

    for (const it of out) {
      if (it.static) continue;

      let targetY = 0;
      const probe: LayoutItem = { ...it, y: targetY };

      // "첫 충돌 없는 y"를 찾을 때까지 1씩 증가
      while (true) {
        probe.y = targetY;
        const hasCollision = out.some(
          (o) => o.id !== it.id && collides(probe, o)
        );
        if (!hasCollision) {
          it.y = targetY;
          break;
        }
        targetY += 1;
      }
    }
    return sortLayout(out);
  };

  // 픽셀 → 그리드 좌표(라운드 스냅). 마진 포함 칸 간격으로 나눔.
  const pxToGrid = (left: number, top: number, w: number, h: number) => {
    const cellW = colWidth + mx;
    const cellH = rowHeight + my;
    const x = Math.round(left / cellW);
    const y = Math.round(top / cellH);
    return clampItem({ id: "", x, y, w, h });
  };

  const handleDragStart = useCallback(
    (id: string) => {
      setDraggingId(id);
      setDragLayout(layout); // 현재 레이아웃을 프리뷰로 복제
    },
    [layout]
  );

  const handleDrag = useCallback(
    (id: string, left: number, top: number) => {
      setDragLayout((prev) => {
        const base = (prev ?? layout).map((x) => ({ ...x }));
        const it = base.find((x) => x.id === id);
        if (!it) return prev ?? layout;

        // 1) 픽셀 → 후보 격자 좌표
        const target = pxToGrid(left, top, it.w, it.h);
        it.x = target.x;
        it.y = target.y;

        // 2) 충돌 해소(푸시다운) → 3) 수직 컴팩션
        const after = resolveCollisions(base, it);
        const compacted = compactVertical(after);
        return compacted;
      });
    },
    [layout, colWidth, mx, rowHeight, my]
  );

  const handleDragStop = useCallback(() => {
    if (dragLayout) setLayout(dragLayout); // 프리뷰 확정
    setDraggingId(null);
    setDragLayout(null);
  }, [dragLayout]);

  // 실제 렌더링에 사용할 스냅된 레이아웃
  const current = dragLayout ?? layout;

  // 컨테이너 높이: Ymax*(rowHeight+my) - my
  const containerHeight = useMemo(() => {
    const bottom = Math.max(0, ...current.map((i) => i.y + i.h)); // Ymax
    return bottom > 0 ? bottom * (rowHeight + my) - my : 0;
  }, [current, rowHeight, my]);

  return (
    <div
      ref={containerRef}
      className={className ?? "relative w-full"}
      style={{ height: containerHeight }}
    >
      {current.map((it) => {
        // 격자 좌표 → 픽셀: 마진 포함 간격으로 변환
        const left = it.x * (colWidth + mx);
        const top = it.y * (rowHeight + my);
        const width = it.w * colWidth + (it.w - 1) * mx;
        const height = it.h * rowHeight + (it.h - 1) * my;

        const isDragging = draggingId === it.id;

        return (
          <GridItem
            key={it.id}
            id={it.id}
            x={it.x}
            y={it.y}
            w={it.w}
            h={it.h}
            left={left}
            top={top}
            width={width}
            height={height}
            colWidth={colWidth}
            rowHeight={rowHeight}
            mx={mx}
            my={my}
            isDragging={isDragging}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragStop={handleDragStop}
          >
            {childArray[Number(it.id)]}
          </GridItem>
        );
      })}
    </div>
  );
}
