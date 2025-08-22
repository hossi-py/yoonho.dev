"use client";

import { useState } from "react";
import { GridItem } from "./grid-item";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
export function GridStage() {
  // 초기 레이아웃
  const [layout, setLayout] = useState<LayoutItem[]>([
    {
      id: "1",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      title: "Hello",
    },
    {
      id: "2",
      x: 1,
      y: 0,
      w: 1,
      h: 1,
      title: "World",
    },
  ]);

  // 특정 Item 업데이트
  const handleUpdate = (id: string, patch: { x: number; y: number }) => {
    setLayout((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 400,
        border: "2px dashed #ddd",
      }}
    >
      {layout.map((it) => (
        <GridItem key={it.id} {...it} onUpdate={handleUpdate}>
          <Card className="w-full h-full flex items-center justify-center">
            <CardHeader>
              <CardTitle>{it.title}</CardTitle>
            </CardHeader>
            <CardContent>
              Grid: ({it.x}, {it.y})
            </CardContent>
          </Card>
        </GridItem>
      ))}
    </div>
  );
}
