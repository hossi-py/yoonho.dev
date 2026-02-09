"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Server,
  HardDrive,
  Cloud,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  Package,
  Wifi,
  WifiOff,
} from "lucide-react";

type MigrationMethod = "cli" | "snowball" | null;

export function SnowballMigrationDiagram() {
  const [method, setMethod] = useState<MigrationMethod>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const startSimulation = (m: MigrationMethod) => {
    if (isAnimating) return;
    setMethod(m);
    setIsAnimating(true);
    setProgress(0);
    setStage(0);

    if (m === "cli") {
      // CLI: 느린 진행 (네트워크 대역폭 사용)
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 30) {
          clearInterval(interval);
          setIsAnimating(false);
          setStage(-1); // 실패/비효율
        }
      }, 200);
    } else {
      // Snowball: 단계별 진행
      const stages = [1, 2, 3, 4];
      let i = 0;
      const interval = setInterval(() => {
        setStage(stages[i]);
        i++;
        if (i >= stages.length) {
          clearInterval(interval);
          setIsAnimating(false);
          setProgress(100);
        }
      }, 1000);
    }
  };

  const reset = () => {
    setMethod(null);
    setIsAnimating(false);
    setProgress(0);
    setStage(0);
  };

  const getStageText = () => {
    if (method === "snowball") {
      switch (stage) {
        case 1: return "📦 Snowball Edge 디바이스 수령";
        case 2: return "💾 로컬에서 데이터 복사 중...";
        case 3: return "🚚 디바이스 AWS로 반송";
        case 4: return "✅ S3로 데이터 임포트 완료!";
        default: return "시작 대기...";
      }
    } else if (method === "cli") {
      if (stage === -1) return "❌ 70TB 전송 - 수 주 소요 예상";
      return `📡 네트워크 전송 중... ${progress}%`;
    }
    return "";
  };

  const renderDiagram = (isMobile: boolean) => {
    const width = isMobile ? 360 : 700;
    const height = isMobile ? 500 : 350;

    const pos = isMobile
      ? {
          onPrem: { x: 180, y: 80 },
          network: { x: 180, y: 200 },
          snowball: { x: 180, y: 320 },
          s3: { x: 180, y: 440 },
        }
      : {
          onPrem: { x: 100, y: 175 },
          network: { x: 280, y: 100 },
          snowball: { x: 280, y: 250 },
          s3: { x: 580, y: 175 },
        };

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-auto select-none ${isMobile ? "md:hidden" : "hidden md:block"}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid-snow" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-snow)" />

        {/* Connection Lines */}
        <g className="transition-all duration-500">
          {/* CLI Path: OnPrem -> Network -> S3 */}
          {(method === "cli" || method === null) && (
            <>
              <path
                d={isMobile
                  ? `M ${pos.onPrem.x} ${pos.onPrem.y + 40} Q ${pos.onPrem.x} ${pos.network.y} ${pos.network.x} ${pos.network.y}`
                  : `M ${pos.onPrem.x + 60} ${pos.onPrem.y - 30} Q ${pos.network.x - 50} ${pos.network.y} ${pos.network.x} ${pos.network.y}`
                }
                fill="none"
                strokeWidth="3"
                className={`${method === "cli" ? "stroke-red-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
                strokeDasharray={method === "cli" ? "0" : "6,6"}
              />
              <path
                d={isMobile
                  ? `M ${pos.network.x} ${pos.network.y + 40} L ${pos.s3.x} ${pos.s3.y - 40}`
                  : `M ${pos.network.x + 60} ${pos.network.y} Q ${pos.s3.x - 100} ${pos.network.y} ${pos.s3.x - 70} ${pos.s3.y - 30}`
                }
                fill="none"
                strokeWidth="3"
                className={`${method === "cli" ? "stroke-red-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
                strokeDasharray={method === "cli" ? "0" : "6,6"}
              />
            </>
          )}

          {/* Snowball Path: OnPrem -> Snowball -> S3 */}
          {method === "snowball" && (
            <>
              <path
                d={isMobile
                  ? `M ${pos.onPrem.x} ${pos.onPrem.y + 40} L ${pos.snowball.x} ${pos.snowball.y - 50}`
                  : `M ${pos.onPrem.x + 60} ${pos.onPrem.y + 30} Q ${pos.snowball.x - 50} ${pos.snowball.y} ${pos.snowball.x - 50} ${pos.snowball.y}`
                }
                fill="none"
                strokeWidth="4"
                className={`transition-all duration-300 ${stage >= 2 ? "stroke-cyan-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
              />
              <path
                d={isMobile
                  ? `M ${pos.snowball.x} ${pos.snowball.y + 50} L ${pos.s3.x} ${pos.s3.y - 40}`
                  : `M ${pos.snowball.x + 50} ${pos.snowball.y} Q ${pos.s3.x - 100} ${pos.snowball.y} ${pos.s3.x - 70} ${pos.s3.y + 30}`
                }
                fill="none"
                strokeWidth="4"
                className={`transition-all duration-300 ${stage >= 3 ? "stroke-cyan-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
              />
            </>
          )}
        </g>

        {/* On-Premises */}
        <foreignObject x={pos.onPrem.x - 70} y={pos.onPrem.y - 50} width="140" height="100" className="overflow-visible">
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-lg">
              <div className="flex items-center gap-2">
                <Server size={24} className="text-slate-600" />
                <HardDrive size={24} className="text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2">On-Premises NFS</span>
              <span className="text-[10px] text-slate-500 font-bold">70TB Video Files</span>
            </div>
          </div>
        </foreignObject>

        {/* Network (CLI path) */}
        {(method === "cli" || method === null) && (
          <foreignObject x={pos.network.x - 55} y={pos.network.y - 35} width="110" height="70" className="overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <div className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-md
                ${method === "cli" ? "border-red-400 ring-2 ring-red-100" : "border-slate-200 dark:border-slate-700 opacity-60"}
              `}>
                {method === "cli" ? <Wifi size={20} className="text-red-500 animate-pulse" /> : <WifiOff size={20} className="text-slate-400" />}
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mt-1">Internet</span>
                {method === "cli" && <span className="text-[9px] text-red-500 font-bold">대역폭 사용 중</span>}
              </div>
            </div>
          </foreignObject>
        )}

        {/* Snowball Device */}
        {method === "snowball" && (
          <foreignObject x={pos.snowball.x - 70} y={pos.snowball.y - 50} width="140" height="100" className="overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <div className={`flex flex-col items-center p-3 rounded-xl border-[3px] transition-all duration-300 bg-white dark:bg-slate-900 shadow-xl
                ${stage >= 1 ? "border-cyan-400 scale-105" : "border-slate-200"}
              `}>
                <div className="flex items-center gap-2">
                  <Package size={24} className="text-cyan-500" />
                  {stage >= 3 && <Truck size={20} className="text-cyan-600 animate-pulse" />}
                </div>
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 mt-1">Snowball Edge</span>
                <span className="text-[9px] text-cyan-600 font-medium">80TB 용량</span>
              </div>
            </div>
          </foreignObject>
        )}

        {/* S3 */}
        <foreignObject x={pos.s3.x - 70} y={pos.s3.y - 50} width="140" height="100" className="overflow-visible">
          <div className="w-full h-full flex items-center justify-center">
            <div className={`flex flex-col items-center p-3 rounded-xl border-[3px] transition-all duration-300 bg-white dark:bg-slate-900 shadow-xl
              ${(method === "snowball" && stage >= 4) ? "border-green-400 ring-4 ring-green-100" : "border-orange-300"}
            `}>
              <Cloud size={28} className={`${(method === "snowball" && stage >= 4) ? "text-green-500" : "text-orange-500"}`} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">Amazon S3</span>
              {method === "snowball" && stage >= 4 && (
                <span className="text-[9px] text-green-600 font-bold flex items-center gap-1">
                  <CheckCircle2 size={10} /> 70TB 완료
                </span>
              )}
            </div>
          </div>
        </foreignObject>

        {/* Status Display */}
        {method && (
          <foreignObject x={isMobile ? 30 : 200} y={isMobile ? 460 : 300} width={isMobile ? 300 : 300} height="50" className="overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg border-2 text-sm font-bold
                ${method === "snowball" && stage >= 4
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200"
                  : method === "cli" && stage === -1
                    ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200"
                    : "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/50 dark:border-cyan-700 dark:text-cyan-200"
                }
              `}>
                {isAnimating && <Clock size={16} className="animate-spin" />}
                {getStageText()}
              </div>
            </div>
          </foreignObject>
        )}
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col items-center p-2 md:p-6">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row">
        {/* Left Area: Diagram */}
        <div className="flex-[1.8] relative bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 min-h-[420px]">
          <div className="absolute top-4 left-5 z-10">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-wider">
              <Upload className="w-4 h-4" />
              데이터 마이그레이션
            </h3>
          </div>

          {renderDiagram(false)}
          {renderDiagram(true)}

          {!method && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-950/30 backdrop-blur-[1px] pointer-events-none">
              <div className="bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm">
                <ArrowRight className="w-4 h-4" />
                마이그레이션 방식 선택
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Controls */}
        <div className="flex-1 p-6 md:p-8 flex flex-col bg-white dark:bg-slate-950 relative z-20">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">70TB 마이그레이션</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              대용량 데이터를 S3로 이전하는 최적의 방법을 비교하세요.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            <Button
              onClick={() => startSimulation("cli")}
              disabled={isAnimating}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                method === "cli"
                  ? "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-red-200 text-slate-700"
              }`}
              variant="ghost"
            >
              <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <Wifi className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="font-bold text-base">AWS CLI (네트워크 전송)</div>
                <div className="text-xs opacity-70 font-medium">대역폭 사용, 수 주 소요 ✕</div>
              </div>
            </Button>

            <Button
              onClick={() => startSimulation("snowball")}
              disabled={isAnimating}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                method === "snowball"
                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-200 text-slate-700"
              }`}
              variant="ghost"
            >
              <div className="bg-cyan-100 dark:bg-cyan-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <Package className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-base">AWS Snowball Edge</div>
                <div className="text-xs opacity-70 font-medium">오프라인 전송, 빠르고 경제적 ✓</div>
              </div>
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">💡 Snowball Edge 선택 기준</span>
              일반적으로 <strong>10TB 이상</strong>의 데이터를 이전할 때, 또는 네트워크 대역폭이 제한적일 때 Snowball이 더 효율적입니다.
            </div>

            {method && !isAnimating && (
              <Button onClick={reset} variant="outline" size="sm" className="w-full h-9 text-xs font-bold">
                초기화
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
