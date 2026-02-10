'use client';

import { CSSProperties, PointerEvent, useCallback, useMemo, useRef, useState } from 'react';

type GridItemProps = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;

  // 부모가 계산한 "스냅된" 픽셀 좌표와 크기
  left: number;
  top: number;
  width: number;
  height: number;

  // 1칸의 px 크기 + 마진(참고용)
  colWidth: number;
  rowHeight: number;
  mx: number;
  my: number;

  isDragging?: boolean;

  // 드래그 라이프사이클
  onDragStart: (id: string) => void;
  onDrag: (id: string, left: number, top: number) => void;
  onDragStop: () => void;

  children?: React.ReactNode;
};
/**
 * GridItem: 개별 아이템
 * - 화면 좌표 = "그리드 단위 좌표(x,y) * 칸 크기(px)"
 * - 드래그 중에는 픽셀 단위 좌표를 따로 관리하여 부드럽게 이동
 * - 드롭 순간에는 그리드 좌표로 스냅시켜 부모에게 최종 위치 전달
 */
export function GridItem({
  id,
  left,
  top,
  width,
  height,
  colWidth,
  rowHeight,
  mx,
  my,
  isDragging,
  onDragStart,
  onDrag,
  onDragStop,
  children,
}: GridItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [pixelPos, setPixelPos] = useState<null | {
    x: number;
    y: number;
  }>(null);

  // 드래그 상태
  const dragRef = useRef<null | {
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>(null);

  const style = useMemo<CSSProperties>(() => {
    const baseX = pixelPos ? pixelPos.x : left;
    const baseY = pixelPos ? pixelPos.y : top;

    return {
      position: 'absolute',
      transform: `translate(${baseX}px, ${baseY}px)`,
      width,
      height,
      touchAction: 'none',
      userSelect: 'none',
      cursor: pixelPos ? 'grabbing' : 'grab',
      transition: pixelPos ? 'none' : 'transform 120ms ease',
      zIndex: pixelPos ? 20 : 1,
    };
  }, [pixelPos, left, top, width, height]);

  /**
   * 누른 순간 실행
   * - 드래그 시작 상태를 저장
   */
  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (e.button !== 0) return; // 좌클릭만
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      dragRef.current = {
        startX: left,
        startY: top,
        baseX: e.clientX,
        baseY: e.clientY,
      };
      setPixelPos({ x: left, y: top });
      onDragStart(id);
    },
    [id, left, top, onDragStart]
  );

  /**
   * 드래그 중 실행
   * - 마우스 이동 거리(dx, dy) 계산
   * - 픽셀 단위 좌표 업데이트 → state에 넣어서 즉시 화면 반영
   */
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.baseX;
      const dy = e.clientY - dragRef.current.baseY;

      const nextX = dragRef.current.startX + dx;
      const nextY = dragRef.current.startY + dy;

      setPixelPos({ x: nextX, y: nextY });
      onDrag(id, nextX, nextY);
    },
    [onDrag, id]
  );

  /**
   * 드래그 종료
   */
  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

      dragRef.current = null;
      setPixelPos(null);
      onDragStop();
    },
    [onDragStop]
  );

  return (
    <div
      ref={ref}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`rounded-2xl ${isDragging ? 'opacity-80 ring-2 ring-black/5' : ''}`}
    >
      {children}
    </div>
  );
}
