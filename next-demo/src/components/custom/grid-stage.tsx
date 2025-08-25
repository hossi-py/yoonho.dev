"use client";

import React, { useState } from "react";
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
  const childArray = React.Children.toArray(children);

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
    setLayout((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  return (
    <div className="relative w-full h-full">
      {layout.map((it, i) => (
        <GridItem key={it.id} {...it} onUpdate={handleUpdate}>
          {childArray[i]}
        </GridItem>
      ))}
    </div>
  );
}
