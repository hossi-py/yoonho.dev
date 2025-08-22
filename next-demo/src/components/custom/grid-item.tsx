"use client";

import { useRef } from "react";

type GridItemProps = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  onUpdate: (id: string, patch: { x: number; y: number }) => void;
  children: React.ReactNode;
};

/**
 * GridItem: 개별 아이템
 * - 위치(x, y)와 크기(w, h)는 "그리드 단위"로 관리
 * - 드래그해서 움직이는 기능 구현
 */
export function GridItem({
  id,
  x,
  y,
  w,
  h,
  onUpdate,
  children,
}: GridItemProps) {
  // 한 칸 크기 정의 (px)
  const colWidth = 100; // 가로
  const rowHeight = 80; // 세로

  // 드래그 상태
  const dragRef = useRef<null | {
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>(null);

  /**
   * 누른 순간 실행
   * - 현재 마우스 좌표와 Item의 원래 grid 좌표 기억
   */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: x,
      baseY: y,
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  /**
   * 드래그 중 실행
   * - dx, dy를 계산해서 몇 칸 이동했는지 구함
   * - 부모(GridStage)에 업데이트 요청
   */
  const handlePointerMove = (e: PointerEvent) => {
    if (!dragRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    // 이동한 칸 단위 계산
    const dCols = Math.round(dx / colWidth);
    const dRows = Math.round(dy / rowHeight);

    onUpdate(id, {
      x: dragRef.current.baseX + dCols,
      y: dragRef.current.baseY + dRows,
    });
  };

  /**
   * 드래그 종료
   * - 상태 초기화
   */
  const handlePointerUp = () => {
    dragRef.current = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{
        position: "absolute",
        transform: `translate(${x * colWidth}px, ${y * rowHeight}px)`,
        width: w * colWidth,
        height: h * rowHeight,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "white",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}
