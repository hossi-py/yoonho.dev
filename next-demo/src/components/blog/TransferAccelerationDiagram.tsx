"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceNodeProps {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  isHighlighted?: boolean;
  onClick: () => void;
  onHover: (id: string | null) => void;
}

function ServiceNode({
  id,
  name,
  icon,
  x,
  y,
  isHighlighted,
  onClick,
  onHover,
}: ServiceNodeProps) {
  return (
    <g
      className="cursor-pointer"
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <rect
        x="-55"
        y="-30"
        width="110"
        height="60"
        rx="10"
        className={`transition-all duration-300 ${
          isHighlighted
            ? "fill-blue-100 dark:fill-blue-900/50 stroke-blue-500"
            : "fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-600"
        }`}
        strokeWidth="2"
        style={{
          filter: isHighlighted
            ? "drop-shadow(0 8px 16px rgba(59, 130, 246, 0.3))"
            : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
        }}
      />
      <text
        x="0"
        y="-5"
        textAnchor="middle"
        className="select-none"
        style={{ fontSize: "20px" }}
      >
        {icon}
      </text>
      <text
        x="0"
        y="15"
        textAnchor="middle"
        className={`text-xs font-semibold select-none transition-colors ${
          isHighlighted
            ? "fill-blue-700 dark:fill-blue-300"
            : "fill-slate-700 dark:fill-slate-200"
        }`}
        style={{ fontSize: "10px" }}
      >
        {name}
      </text>
    </g>
  );
}

const services = [
  {
    id: "sites",
    name: "글로벌 사이트",
    icon: "🌍",
    description: "전 세계 데이터 수집 지점",
    details: [
      "여러 대륙에 걸친 데이터 수집 사이트",
      "각 사이트에서 매일 500GB 데이터 발생",
      "고속 인터넷 연결 보유",
    ],
    useCase: "온도, 습도, 기압 데이터를 수집하는 글로벌 관측소들입니다.",
    x: 100,
    y: 150,
  },
  {
    id: "edge",
    name: "Edge Locations",
    icon: "⚡",
    description: "AWS 엣지 로케이션",
    details: [
      "전 세계 450+ 엣지 로케이션",
      "사용자와 가장 가까운 위치에서 데이터 수신",
      "최적화된 네트워크 경로로 전송 가속",
    ],
    useCase:
      "S3 Transfer Acceleration이 활용하는 엣지 로케이션으로, 각 사이트에서 가장 가까운 위치에서 데이터를 수신합니다.",
    x: 300,
    y: 150,
  },
  {
    id: "backbone",
    name: "AWS Backbone",
    icon: "🔗",
    description: "AWS 전용 네트워크",
    details: [
      "AWS 글로벌 백본 네트워크 활용",
      "일반 인터넷보다 빠르고 안정적",
      "최적화된 라우팅으로 지연 시간 최소화",
    ],
    useCase:
      "엣지 로케이션에서 수신한 데이터를 AWS 전용 네트워크를 통해 빠르게 전송합니다.",
    x: 500,
    y: 150,
  },
  {
    id: "s3",
    name: "S3 Bucket",
    icon: "📦",
    description: "최종 목적지",
    details: [
      "단일 S3 버킷으로 데이터 통합",
      "Multipart Upload로 대용량 파일 효율적 업로드",
      "자동 데이터 무결성 검증",
    ],
    useCase:
      "모든 글로벌 사이트의 데이터가 최종적으로 저장되는 단일 S3 버킷입니다.",
    x: 700,
    y: 150,
  },
];

export function TransferAccelerationDiagram() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 280"
        className="w-full min-w-[700px] h-auto"
        style={{ maxHeight: "350px" }}
      >
        <defs>
          <marker
            id="arrowhead-blue"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-blue-500" />
          </marker>
          <linearGradient id="flowGradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect
          width="800"
          height="280"
          className="fill-slate-50 dark:fill-slate-900"
          rx="16"
        />

        <text
          x="400"
          y="35"
          textAnchor="middle"
          className="fill-slate-700 dark:fill-slate-200 font-bold"
          style={{ fontSize: "15px" }}
        >
          S3 Transfer Acceleration 아키텍처
        </text>
        <text
          x="400"
          y="52"
          textAnchor="middle"
          className="fill-slate-500 dark:fill-slate-400"
          style={{ fontSize: "10px" }}
        >
          각 서비스를 클릭하면 상세 정보를 볼 수 있습니다
        </text>

        {/* Connection lines */}
        {services.slice(0, -1).map((service, idx) => {
          const nextService = services[idx + 1];
          const isActive =
            hoveredService === service.id || hoveredService === nextService.id;

          return (
            <g key={`line-${idx}`}>
              <line
                x1={service.x + 55}
                y1={service.y}
                x2={nextService.x - 55}
                y2={nextService.y}
                className={`transition-all duration-300 ${
                  isActive ? "stroke-blue-500" : "stroke-slate-300"
                }`}
                strokeWidth="2"
                markerEnd="url(#arrowhead-blue)"
              />
              <line
                x1={service.x + 55}
                y1={service.y}
                x2={nextService.x - 55}
                y2={nextService.y}
                stroke="url(#flowGradientBlue)"
                strokeWidth="3"
                style={{
                  strokeDasharray: "20 80",
                  animation: "flowAnimation 2s linear infinite",
                  animationDelay: `${idx * 0.3}s`,
                }}
              />
            </g>
          );
        })}

        {/* Labels */}
        <text
          x="200"
          y="120"
          textAnchor="middle"
          className="fill-slate-500 dark:fill-slate-300"
          style={{ fontSize: "9px" }}
        >
          Upload
        </text>
        <text
          x="400"
          y="120"
          textAnchor="middle"
          className="fill-slate-500 dark:fill-slate-300"
          style={{ fontSize: "9px" }}
        >
          AWS Network
        </text>
        <text
          x="600"
          y="120"
          textAnchor="middle"
          className="fill-slate-500 dark:fill-slate-300"
          style={{ fontSize: "9px" }}
        >
          Store
        </text>

        {/* Service nodes */}
        {services.map((service) => (
          <ServiceNode
            key={service.id}
            id={service.id}
            name={service.name}
            icon={service.icon}
            x={service.x}
            y={service.y}
            isHighlighted={hoveredService === service.id}
            onClick={() => setSelectedService(service)}
            onHover={setHoveredService}
          />
        ))}

        {/* Info badge */}
        <g transform="translate(400, 230)">
          <rect
            x="-90"
            y="-15"
            width="180"
            height="30"
            rx="15"
            className="fill-blue-100 dark:fill-blue-900/30"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            className="fill-blue-600 dark:fill-blue-400 font-bold"
            style={{ fontSize: "11px" }}
          >
            🚀 최대 50-500% 속도 향상
          </text>
        </g>
      </svg>

      {/* shadcn Dialog */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-3xl">{selectedService?.icon}</span>
              <span>{selectedService?.name}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-600 dark:text-blue-400">
                  🔹 핵심 기능
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {selectedService?.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="text-blue-500 mt-0.5">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-800/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-600 dark:text-blue-400">
                  💡 이 문제에서의 역할
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                  {selectedService?.useCase}
                </p>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes flowAnimation {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
