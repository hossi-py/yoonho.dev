"use client";

import { Children, useState } from "react";
import { GridItem } from "./grid-item";

type LayoutItem = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
};

/**
 * GridStage: 전체 그리드 영역
 * - layout 배열로 모든 카드의 위치/크기 관리
 * - GridItem이 움직일 때 setLayout으로 상태 갱신
 */
export function GridStage({ children }: { children: React.ReactNode }) {
  const childArray = Children.toArray(children);

  // 초기 레이아웃
  const [layout, setLayout] = useState(
    childArray.map((_, i) => ({
      id: i.toString(),
      x: i % 3,
      y: Math.floor(i / 3),
      w: 1,
      h: 1,
    }))
  );

  // 특정 Item 업데이트
  const handleUpdate = (id: string, patch: { x: number; y: number }) => {
    setLayout((prev) => {
      const newLayout = [...prev];

      const draggedItem = newLayout.find((item) => item.id === id);
      if (!draggedItem) return prev;

      const originalPos = { x: draggedItem.x, y: draggedItem.y };
      const targetPos = patch;

      // 드롭 위치에 다른 아이템 있는 지 확인
      const collidedItem = newLayout.find(
        (item) =>
          item.id !== id && item.x === targetPos.x && item.y === targetPos.y
      );

      // 충돌이 일어나지 않으면 간단히 위치만 변경
      if (!collidedItem) {
        draggedItem.x = targetPos.x;
        draggedItem.y = targetPos.y;
        return newLayout;
      }

      // 충돌이 일어났다면, 레이아웃 전체 재정렬
      return newLayout.map((item) => {
        // 드래그한 아이템은 드랍 위치로 이동
        if (item.id === id) {
          return { ...item, ...targetPos };
        }
        // 밀려나는 아이템들 처리: 목표 지점과 같거나 아래에 있는 아이템들을 한 칸씩 아래로 민다.
        if (item.y >= targetPos.y) {
          return { ...item, y: item.y + 1 };
        }
        return item;
      });
    });
  };

  return (
    <div className="relative w-full">
      {layout.map((it, i) => (
        <GridItem key={it.id} {...it} onUpdate={handleUpdate}>
          {childArray[i]}
        </GridItem>
      ))}
    </div>
  );
}
