"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

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
 * - 화면 좌표 = "그리드 단위 좌표(x,y) * 칸 크기(px)"
 * - 드래그 중에는 픽셀 단위 좌표를 따로 관리하여 부드럽게 이동
 * - 드롭 순간에는 그리드 좌표로 스냅시켜 부모에게 최종 위치 전달
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
  const colWidth = 300;
  const rowHeight = 200;
  const margin = 16;

  const [pixelPos, setPixelPos] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const pixelPosRef = useRef<{ x: number; y: number } | null>(null);

  // 드래그 상태
  const dragRef = useRef<null | {
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>(null);

  /**
   * 누른 순간 실행
   * - 드래그 시작 상태를 저장
   */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 현재 아이템의 px 좌표 계산
    const startPxX = x * (colWidth + margin);
    const startPxY = y * (rowHeight + margin);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: startPxX,
      baseY: startPxY,
    };

    pixelPosRef.current = { x: startPxX, y: startPxY };
    setPixelPos({ x: startPxX, y: startPxY });

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  /**
   * 드래그 중 실행
   * - 마우스 이동 거리(dx, dy) 계산
   * - 픽셀 단위 좌표 업데이트 → state에 넣어서 즉시 화면 반영
   */
  const handlePointerMove = (e: PointerEvent) => {
    if (!dragRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    const newPos = {
      x: dragRef.current.baseX + dx,
      y: dragRef.current.baseY + dy,
    };

    pixelPosRef.current = newPos;
    setPixelPos(newPos);
  };

  /**
   * 드래그 종료
   * - 드래그 중 임시 좌표(pixelPos)를 grid 단위로 스냅
   * - 부모(GridStage)에 최종 좌표 전달 (setLayout 갱신)
   * - 상태 초기화 및 전역 이벤트 해제
   */
  const handlePointerUp = () => {
    if (pixelPosRef.current) {
      const stageWidth = window.innerWidth;
      const stageHeight = window.innerHeight;

      const maxCols = Math.floor(stageWidth / colWidth);
      const maxRows = Math.floor(stageHeight / rowHeight);

      let snappedX = Math.round(pixelPosRef.current.x / (colWidth + margin));
      let snappedY = Math.round(pixelPosRef.current.y / (rowHeight + margin));

      snappedX = Math.max(0, Math.min(snappedX, maxCols - w));
      snappedY = Math.max(0, Math.min(snappedY, maxRows - h));

      onUpdate(id, { x: snappedX, y: snappedY });
    }

    dragRef.current = null;
    pixelPosRef.current = null;
    setPixelPos(null);

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className={cn(
        "absolute cursor-grab select-none touch-none",
        pixelPos ? "" : "transition-transform duration-150 ease-in-out"
      )}
      style={{
        transform: `translate(${
          pixelPos ? pixelPos.x : x * (colWidth + margin)
        }px, ${pixelPos ? pixelPos.y : y * (rowHeight + margin)}px)`,
        width: w * colWidth,
        height: h * rowHeight,
      }}
    >
      {children}
    </div>
  );
}
