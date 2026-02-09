"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function AthenaArchitectureDiagram() {
  const [isQuerying, setIsQuerying] = useState(false);
  const [dataFlow, setDataFlow] = useState(0); // 0: Idle, 1: Scanning, 2: Result

  const startQuery = () => {
    if (isQuerying) return;
    setIsQuerying(true);
    setDataFlow(1);

    // Simulation of query processing
    setTimeout(() => {
      setDataFlow(2);
      setTimeout(() => {
        setIsQuerying(false);
        setDataFlow(0);
      }, 3000); // Show result for 3s
    }, 2000); // Scanning for 2s
  };

  // SVG Render Helper
    const renderSVG = (isMobile: boolean) => {
    const width = isMobile ? 320 : 800;
    const height = isMobile ? 500 : 350;
    const viewBox = `0 0 ${width} ${height}`;

    // Coordinates (Desktop vs Mobile)
    const pos = isMobile
      ? {
          user: { x: 160, y: 50 },
          athena: { x: 160, y: 200 },
          s3: { x: 160, y: 400 },
        }
      : {
          user: { x: 100, y: 175 },
          athena: { x: 400, y: 175 },
          s3: { x: 700, y: 175 },
        };

    return (
      <svg
        viewBox={viewBox}
        className={`w-full h-auto ${isMobile ? "md:hidden" : "hidden md:block"}`}
        style={{ maxHeight: isMobile ? "none" : "350px" }}
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
        
        {/* User / Analyst */}
         <g transform={`translate(${pos.user.x}, ${pos.user.y})`}>
            <circle r="40" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fontSize="30">🧑‍💻</text>
            <text x="0" y="60" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">User (SQL)</text>
         </g>

        {/* Athena Service */}
        <g transform={`translate(${pos.athena.x}, ${pos.athena.y})`}>
            <circle r="50" className={`transition-all duration-300 ${isQuerying ? "stroke-indigo-500 fill-indigo-50 dark:fill-indigo-900/30" : "stroke-slate-300 dark:stroke-slate-600 fill-white dark:fill-slate-800"}`} strokeWidth="3" />
            <text x="0" y="10" textAnchor="middle" fontSize="40">🔍</text>
            <text x="0" y="75" textAnchor="middle" className="text-sm font-bold fill-indigo-600 dark:fill-indigo-400">Amazon Athena</text>
             <text x="0" y="90" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">(Serverless)</text>
             
             {/* Scanning Animation Spinner */}
             {dataFlow === 1 && (
                 <circle r="56" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="20 20" className="animate-spin-slow opacity-70" />
             )}
        </g>

        {/* S3 Bucket */}
        <g transform={`translate(${pos.s3.x}, ${pos.s3.y})`}>
            <rect x="-40" y="-30" width="80" height="60" rx="4" className="fill-white dark:fill-slate-800 stroke-orange-400" strokeWidth="2" />
            <path d="M-40 -30 Q0 -45 40 -30" fill="none" stroke="#fb923c" strokeWidth="2" />
            <text x="0" y="10" textAnchor="middle" fontSize="30">🗂️</text>
            <text x="0" y="50" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">S3 Bucket</text>
            <text x="0" y="65" textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">(JSON Logs)</text>
        </g>

        {/* --- Connections & Data Flow --- */}

        {/* User -> Athena (SQL Query) */}
        <line 
            x1={isMobile ? pos.user.x : pos.user.x + 40} 
            y1={isMobile ? pos.user.y + 40 : pos.user.y} 
            x2={isMobile ? pos.athena.x : pos.athena.x - 50} 
            y2={isMobile ? pos.athena.y - 50 : pos.athena.y} 
            className="stroke-slate-300 dark:stroke-slate-600" 
            strokeWidth="2" 
            markerEnd={`url(#arrowhead-slate-${isMobile ? "m" : "d"})`} 
            strokeDasharray="5,5"
        />
        {isQuerying && dataFlow < 2 && (
             <text x={isMobile ? pos.user.x + 10 : (pos.user.x + pos.athena.x)/2} y={isMobile ? (pos.user.y + pos.athena.y)/2 : pos.user.y - 10} textAnchor="middle" className="text-xs fill-indigo-500 font-bold animate-pulse">SQL Query</text>
        )}

        {/* Athena <-> S3 (Scan) */}
        <line 
            x1={isMobile ? pos.athena.x : pos.athena.x + 50} 
            y1={isMobile ? pos.athena.y + 50 : pos.athena.y} 
            x2={isMobile ? pos.s3.x : pos.s3.x - 40} 
            y2={isMobile ? pos.s3.y - 30 : pos.s3.y} 
            className="stroke-slate-300 dark:stroke-slate-600" 
            strokeWidth="2" 
        />
        
        {/* Scanning Flow Animation */}
        {dataFlow === 1 && (
            <circle r="4" fill="#fb923c">
                <animateMotion 
                    dur="1s" 
                    repeatCount="indefinite"
                    path={`M${isMobile ? pos.athena.x : pos.athena.x + 50},${isMobile ? pos.athena.y + 50 : pos.athena.y} L${isMobile ? pos.s3.x : pos.s3.x - 40},${isMobile ? pos.s3.y - 30 : pos.s3.y}`}
                />
            </circle>
        )}
        
        {/* Result Flow Animation (Athena -> User) */}
         {dataFlow === 2 && (
            <>
                <circle r="4" fill="#6366f1">
                    <animateMotion 
                        dur="0.5s" 
                        repeatCount="1"
                        path={`M${isMobile ? pos.athena.x : pos.athena.x - 50},${isMobile ? pos.athena.y - 50 : pos.athena.y} L${isMobile ? pos.user.x : pos.user.x + 40},${isMobile ? pos.user.y + 40 : pos.user.y}`}
                        fill="freeze"
                    />
                </circle>
                <text x={isMobile ? pos.user.x - 60 : pos.user.x} y={isMobile ? pos.user.y : pos.user.y - 50} className="text-sm font-bold fill-indigo-600 animate-bounce">📊 Results!</text>
            </>
        )}

      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
        <div className="w-full relative cursor-pointer" onClick={startQuery}>
             {renderSVG(true)} {/* Mobile Vertical */}
             {renderSVG(false)} {/* Desktop Horizontal */}
             
             {!isQuerying && dataFlow !== 2 && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 shadow-lg animate-bounce flex items-center gap-2">
                        <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Click to Run Query</span>
                     </div>
                 </div>
             )}
        </div>
        
        <div className="mt-4 text-center">
             <Button onClick={startQuery} disabled={isQuerying} variant={isQuerying ? "secondary" : "default"}>
                 {isQuerying ? "Scanning S3..." : "Run SQL Query"}
             </Button>
             <p className="text-xs text-slate-500 mt-2">
                 * Athena는 데이터를 로드하지 않고 S3를 직접 스캔합니다.
             </p>
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
