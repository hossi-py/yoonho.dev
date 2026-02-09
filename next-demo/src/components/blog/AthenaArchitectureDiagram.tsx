"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function AthenaArchitectureDiagram() {
  const [isQuerying, setIsQuerying] = useState(false);
  const [dataFlow, setDataFlow] = useState(0); // 0: Idle, 1: Scanning, 2: Result
  const [typedText, setTypedText] = useState("");
  const [showResult, setShowResult] = useState(false);

  const processSteps = [
    "[시스템] S3 데이터 직접 스캔 시작...",
    "[진행] 스캔 완료 (45.2 MB 스캔됨)",
    "[쿼리] 표준 SQL 기반 분석 실행 중...",
    "[완료] 분석 결과 전송 완료! (1,420건)"
  ].join("\n");

  useEffect(() => {
    if (dataFlow === 2) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(processSteps.slice(0, i));
        i++;
        if (i > processSteps.length) {
          clearInterval(timer);
          setIsQuerying(false); 
          setShowResult(true); // Typing finished -> Show result in diagram
        }
      }, 25);
      return () => clearInterval(timer);
    }
  }, [dataFlow]);

  const startQuery = () => {
    if (isQuerying) return;
    
    setTypedText("");
    setShowResult(false);
    setIsQuerying(true);
    setDataFlow(1);

    // Simulation of query processing
    setTimeout(() => {
      setDataFlow(2);
    }, 2000); // Scanning for 2s
  };

  // SVG Render Helper (Nodes & Flow ONLY)
  const renderSVG = (isMobile: boolean) => {
    const width = isMobile ? 320 : 500;
    const height = isMobile ? 400 : 300;
    const viewBox = `0 0 ${width} ${height}`;

    // Coordinates (Desktop vs Mobile)
    const pos = isMobile
      ? {
          user: { x: 160, y: 50 },
          athena: { x: 160, y: 200 },
          s3: { x: 160, y: 350 },
        }
      : {
          user: { x: 100, y: 150 },
          athena: { x: 250, y: 150 },
          s3: { x: 400, y: 150 },
        };

    return (
      <svg
        viewBox={viewBox}
        className={`w-full h-auto ${isMobile ? "md:hidden" : "hidden md:block"}`}
      >
        <defs>
          <marker
            id={`arrowhead-purple-${isMobile ? "m" : "d"}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-indigo-500" />
          </marker>
          <marker
            id={`arrowhead-slate-${isMobile ? "m" : "d"}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-400" />
          </marker>
        </defs>

        <rect
          width={width}
          height={height}
          className="fill-slate-50 dark:fill-slate-900"
          rx="16"
        />

        {/* --- Nodes --- */}
        <g transform={`translate(${pos.user.x}, ${pos.user.y})`}>
          <circle r="35" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="25">🧑‍💻</text>
          <text x="0" y="55" textAnchor="middle" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">User</text>
        </g>

        <g transform={`translate(${pos.athena.x}, ${pos.athena.y})`}>
          <circle r="45" className={`transition-all duration-300 ${isQuerying ? "stroke-indigo-500 fill-indigo-50 dark:fill-indigo-900/30" : "stroke-slate-300 dark:stroke-slate-600 fill-white dark:fill-slate-800"}`} strokeWidth="3" />
          <text x="0" y="8" textAnchor="middle" fontSize="35">🔍</text>
          <text x="0" y="70" textAnchor="middle" className="text-[10px] font-bold fill-indigo-600 dark:fill-indigo-400">Athena</text>
          {dataFlow === 1 && (
            <circle r="52" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="15 15" className="animate-spin-slow opacity-70" />
          )}
        </g>

        <g transform={`translate(${pos.s3.x}, ${pos.s3.y})`}>
          <rect x="-35" y="-25" width="70" height="50" rx="4" className="fill-white dark:fill-slate-800 stroke-orange-400" strokeWidth="2" />
          <path d="M-35 -25 Q0 -35 35 -25" fill="none" stroke="#fb923c" strokeWidth="2" />
          <text x="0" y="8" textAnchor="middle" fontSize="25">🗂️</text>
          <text x="0" y="45" textAnchor="middle" className="text-[10px] font-bold fill-orange-600 dark:fill-orange-400">S3 Logs</text>
        </g>

        {/* --- Connections --- */}
        <line 
          x1={isMobile ? pos.user.x : pos.user.x + 35} 
          y1={isMobile ? pos.user.y + 35 : pos.user.y} 
          x2={isMobile ? pos.athena.x : pos.athena.x - 45} 
          y2={isMobile ? pos.athena.y - 45 : pos.athena.y} 
          className="stroke-slate-300 dark:stroke-slate-600" 
          strokeWidth="2" 
          markerEnd={`url(#arrowhead-slate-${isMobile ? "m" : "d"})`} 
          strokeDasharray="5,5"
        />

        <line 
          x1={isMobile ? pos.athena.x : pos.athena.x + 45} 
          y1={isMobile ? pos.athena.y + 45 : pos.athena.y} 
          x2={isMobile ? pos.s3.x : pos.s3.x - 35} 
          y2={isMobile ? pos.s3.y - 25 : pos.s3.y} 
          className="stroke-slate-300 dark:stroke-slate-600" 
          strokeWidth="2" 
        />
        
        {dataFlow === 1 && (
          <circle r="4" fill="#fb923c">
            <animateMotion dur="1s" repeatCount="indefinite"
              path={`M${isMobile ? pos.athena.x : pos.athena.x + 45},${isMobile ? pos.athena.y + 45 : pos.athena.y} L${isMobile ? pos.s3.x : pos.s3.x - 35},${isMobile ? pos.s3.y - 25 : pos.s3.y}`}
            />
          </circle>
        )}
        
        {showResult && (
          <>
            <circle r="4" fill="#6366f1">
              <animateMotion dur="0.5s" repeatCount="1"
                path={`M${isMobile ? pos.athena.x : pos.athena.x - 45},${isMobile ? pos.athena.y - 45 : pos.athena.y} L${isMobile ? pos.user.x : pos.user.x + 35},${isMobile ? pos.user.y + 35 : pos.user.y}`}
                fill="freeze"
              />
            </circle>
            <text x={pos.user.x} y={pos.user.y - 50} textAnchor="middle" className="text-xs font-bold fill-indigo-600 animate-bounce">📊 Results!</text>
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row gap-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
        {/* Left: Diagram */}
        <div className="w-full md:w-3/5 lg:w-2/3 relative cursor-pointer group" onClick={startQuery}>
          {renderSVG(true)}
          {renderSVG(false)}
          
          {!isQuerying && dataFlow !== 2 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-700 shadow-xl flex items-center gap-2">
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Click to Run Query</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Separate Terminal Console */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col h-[200px] md:h-auto min-h-[180px]">
          <div className="flex-1 bg-slate-950 dark:bg-black rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">athena-query.log</span>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">
              <div className="text-[11px] md:text-xs text-green-400 font-mono whitespace-pre-line leading-relaxed">
                {typedText || (isQuerying ? "" : "> SQL 실행 대기 중...")}
                {isQuerying && (
                  <span className="inline-block w-1.5 h-3 bg-green-400 animate-pulse ml-1 align-middle" />
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button onClick={startQuery} disabled={isQuerying} className="w-full h-10 font-bold" variant={isQuerying ? "outline" : "default"}>
              {isQuerying ? "Processing..." : "Run SQL Query"}
            </Button>
            <p className="text-[10px] text-slate-500 mt-2 text-center italic">
              * Amazon Athena는 서버리스로 S3 데이터를 직접 스캔합니다.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
