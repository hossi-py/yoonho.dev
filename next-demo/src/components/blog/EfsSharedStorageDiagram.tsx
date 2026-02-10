"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Server,
  HardDrive,
  FolderOpen,
  Users,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowRight,
  FileText,
} from "lucide-react";

type Architecture = "ebs" | "efs" | null;

export function EfsSharedStorageDiagram() {
  const [architecture, setArchitecture] = useState<Architecture>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentServer, setCurrentServer] = useState<1 | 2>(1);
  const [refreshCount, setRefreshCount] = useState(0);

  const startSimulation = (arch: Architecture) => {
    if (isAnimating) return;
    setArchitecture(arch);
    setIsAnimating(true);
    setRefreshCount(0);
    setCurrentServer(1);

    // EBS: 서버가 번갈아가며 선택됨 (문제 상황)
    // EFS: 항상 전체 문서 표시
    if (arch === "ebs") {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setRefreshCount(count);
        setCurrentServer((prev) => (prev === 1 ? 2 : 1));
        if (count >= 4) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 800);
    } else {
      setTimeout(() => {
        setRefreshCount(1);
        setIsAnimating(false);
      }, 1000);
    }
  };

  const reset = () => {
    setArchitecture(null);
    setIsAnimating(false);
    setRefreshCount(0);
    setCurrentServer(1);
  };

  const renderDiagram = (isMobile: boolean) => {
    const width = isMobile ? 360 : 700;
    const height = isMobile ? 580 : 380;

    const pos = isMobile
      ? {
          user: { x: 180, y: 60 },
          alb: { x: 180, y: 150 },
          ec2_1: { x: 90, y: 280 },
          ec2_2: { x: 270, y: 280 },
          ebs_1: { x: 90, y: 400 },
          ebs_2: { x: 270, y: 400 },
          efs: { x: 180, y: 500 },
        }
      : {
          user: { x: 80, y: 190 },
          alb: { x: 200, y: 190 },
          ec2_1: { x: 380, y: 100 },
          ec2_2: { x: 380, y: 280 },
          ebs_1: { x: 540, y: 100 },
          ebs_2: { x: 540, y: 280 },
          efs: { x: 600, y: 190 },
        };

    // 현재 활성화된 서버 (EBS 모드)
    const activeServer = architecture === "ebs" ? currentServer : null;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-auto select-none ${isMobile ? "md:hidden" : "hidden md:block"}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid-efs" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-efs)" />

        {/* Connections */}
        <g className="transition-all duration-300">
          {/* User -> ALB */}
          <line
            x1={isMobile ? pos.user.x : pos.user.x + 50}
            y1={isMobile ? pos.user.y + 30 : pos.user.y}
            x2={isMobile ? pos.alb.x : pos.alb.x - 50}
            y2={isMobile ? pos.alb.y - 30 : pos.alb.y}
            strokeWidth="3"
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeDasharray="6,6"
          />

          {/* ALB -> EC2 instances */}
          <line
            x1={isMobile ? pos.alb.x - 40 : pos.alb.x + 50}
            y1={isMobile ? pos.alb.y + 30 : pos.alb.y - 40}
            x2={isMobile ? pos.ec2_1.x : pos.ec2_1.x - 50}
            y2={isMobile ? pos.ec2_1.y - 40 : pos.ec2_1.y}
            strokeWidth="3"
            className={`transition-all duration-300 ${activeServer === 1 ? "stroke-indigo-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
            strokeDasharray={activeServer === 1 ? "0" : "6,6"}
          />
          <line
            x1={isMobile ? pos.alb.x + 40 : pos.alb.x + 50}
            y1={isMobile ? pos.alb.y + 30 : pos.alb.y + 40}
            x2={isMobile ? pos.ec2_2.x : pos.ec2_2.x - 50}
            y2={isMobile ? pos.ec2_2.y - 40 : pos.ec2_2.y}
            strokeWidth="3"
            className={`transition-all duration-300 ${activeServer === 2 ? "stroke-indigo-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
            strokeDasharray={activeServer === 2 ? "0" : "6,6"}
          />

          {/* EC2 -> Storage */}
          {architecture === "ebs" || architecture === null ? (
            <>
              <line
                x1={pos.ec2_1.x}
                y1={isMobile ? pos.ec2_1.y + 40 : pos.ec2_1.y}
                x2={pos.ebs_1.x}
                y2={isMobile ? pos.ebs_1.y - 30 : pos.ebs_1.y}
                strokeWidth="3"
                className={`transition-all duration-300 ${activeServer === 1 ? "stroke-orange-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
                strokeDasharray={activeServer === 1 ? "0" : "6,6"}
              />
              <line
                x1={pos.ec2_2.x}
                y1={isMobile ? pos.ec2_2.y + 40 : pos.ec2_2.y}
                x2={pos.ebs_2.x}
                y2={isMobile ? pos.ebs_2.y - 30 : pos.ebs_2.y}
                strokeWidth="3"
                className={`transition-all duration-300 ${activeServer === 2 ? "stroke-orange-400" : "stroke-slate-300 dark:stroke-slate-700"}`}
                strokeDasharray={activeServer === 2 ? "0" : "6,6"}
              />
            </>
          ) : (
            <>
              <line
                x1={isMobile ? pos.ec2_1.x + 30 : pos.ec2_1.x + 50}
                y1={isMobile ? pos.ec2_1.y + 40 : pos.ec2_1.y + 20}
                x2={isMobile ? pos.efs.x - 30 : pos.efs.x - 60}
                y2={isMobile ? pos.efs.y - 40 : pos.efs.y - 20}
                strokeWidth="3"
                className="stroke-green-400"
              />
              <line
                x1={isMobile ? pos.ec2_2.x - 30 : pos.ec2_2.x + 50}
                y1={isMobile ? pos.ec2_2.y + 40 : pos.ec2_2.y - 20}
                x2={isMobile ? pos.efs.x + 30 : pos.efs.x - 60}
                y2={isMobile ? pos.efs.y - 40 : pos.efs.y + 20}
                strokeWidth="3"
                className="stroke-green-400"
              />
            </>
          )}
        </g>

        {/* User */}
        <foreignObject x={pos.user.x - 50} y={pos.user.y - 40} width="100" height="80" className="overflow-visible">
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-md">
              <Users size={24} className="text-blue-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">User</span>
            </div>
          </div>
        </foreignObject>

        {/* ALB */}
        <foreignObject x={pos.alb.x - 60} y={pos.alb.y - 35} width="120" height="70" className="overflow-visible">
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700 shadow-md">
              <RefreshCw size={20} className="text-purple-500" />
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1">ALB</span>
            </div>
          </div>
        </foreignObject>

        {/* EC2 Instance 1 */}
        <foreignObject x={pos.ec2_1.x - 55} y={pos.ec2_1.y - 40} width="110" height="80" className="overflow-visible">
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg
              ${activeServer === 1 ? "border-indigo-500 scale-105 ring-4 ring-indigo-100 dark:ring-indigo-900/30" : "border-slate-200 dark:border-slate-700"}
            `}
            >
              <Server size={24} className={activeServer === 1 ? "text-indigo-500" : "text-slate-500"} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">EC2 (AZ-1)</span>
            </div>
          </div>
        </foreignObject>

        {/* EC2 Instance 2 */}
        <foreignObject x={pos.ec2_2.x - 55} y={pos.ec2_2.y - 40} width="110" height="80" className="overflow-visible">
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg
              ${activeServer === 2 ? "border-indigo-500 scale-105 ring-4 ring-indigo-100 dark:ring-indigo-900/30" : "border-slate-200 dark:border-slate-700"}
            `}
            >
              <Server size={24} className={activeServer === 2 ? "text-indigo-500" : "text-slate-500"} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">EC2 (AZ-2)</span>
            </div>
          </div>
        </foreignObject>

        {/* EBS Volumes (shown when EBS mode or no mode) */}
        {(architecture === "ebs" || architecture === null) && (
          <>
            <foreignObject x={pos.ebs_1.x - 50} y={pos.ebs_1.y - 35} width="100" height="80" className="overflow-visible">
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-md
                  ${activeServer === 1 ? "border-orange-500 ring-2 ring-orange-100" : "border-orange-200 dark:border-orange-800"}
                `}
                >
                  <HardDrive size={20} className="text-orange-500" />
                  <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 mt-1">EBS Vol-1</span>
                  <div className="flex gap-0.5 mt-1">
                    <FileText size={10} className="text-slate-400" />
                    <FileText size={10} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </foreignObject>

            <foreignObject x={pos.ebs_2.x - 50} y={pos.ebs_2.y - 35} width="100" height="80" className="overflow-visible">
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-md
                  ${activeServer === 2 ? "border-orange-500 ring-2 ring-orange-100" : "border-orange-200 dark:border-orange-800"}
                `}
                >
                  <HardDrive size={20} className="text-orange-500" />
                  <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 mt-1">EBS Vol-2</span>
                  <div className="flex gap-0.5 mt-1">
                    <FileText size={10} className="text-slate-400" />
                    <FileText size={10} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </foreignObject>
          </>
        )}

        {/* EFS (shown when EFS mode) */}
        {architecture === "efs" && (
          <foreignObject x={pos.efs.x - 70} y={pos.efs.y - 50} width="140" height="110" className="overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center p-3 rounded-xl border-[3px] border-green-400 bg-white dark:bg-slate-900 shadow-xl">
                <FolderOpen size={28} className="text-green-500" />
                <span className="text-xs font-bold text-green-700 dark:text-green-300 mt-1">Amazon EFS</span>
                <span className="text-[9px] text-green-600 font-medium">Shared Storage</span>
                <div className="flex gap-1 mt-1">
                  <FileText size={12} className="text-green-400" />
                  <FileText size={12} className="text-green-400" />
                  <FileText size={12} className="text-green-400" />
                  <FileText size={12} className="text-green-400" />
                </div>
              </div>
            </div>
          </foreignObject>
        )}

        {/* Result Display */}
        {architecture && refreshCount > 0 && !isAnimating && (
          <foreignObject x={isMobile ? 30 : 10} y={isMobile ? 500 : 320} width={isMobile ? 300 : 200} height="60" className="overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg border-2 animate-in fade-in zoom-in duration-300
                ${architecture === "efs" ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/90 dark:border-green-700 dark:text-green-50" : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/90 dark:border-red-700 dark:text-red-50"}
              `}
              >
                {architecture === "efs" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                <div>
                  <p className="font-bold text-sm">{architecture === "efs" ? "모든 문서 표시! ✓" : "일부 문서만 표시 ✕"}</p>
                  <p className="text-[10px] opacity-80">{architecture === "efs" ? "EFS 공유 스토리지" : "EBS는 인스턴스별 분리"}</p>
                </div>
              </div>
            </div>
          </foreignObject>
        )}

        {/* EBS Problem indicator during animation */}
        {architecture === "ebs" && isAnimating && (
          <foreignObject x={isMobile ? 80 : 10} y={isMobile ? 500 : 320} width="200" height="50" className="overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200">
                <RefreshCw size={16} className="animate-spin" />
                <span className="text-xs font-bold">새로고침 #{refreshCount} → 서버 {currentServer}</span>
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
        <div className="flex-[1.8] relative bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 min-h-[450px]">
          <div className="absolute top-4 left-5">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-wider">
              <HardDrive className="w-4 h-4" />
              Storage 아키텍처
            </h3>
          </div>

          {renderDiagram(false)}
          {renderDiagram(true)}

          {!architecture && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-950/30 backdrop-blur-[1px] pointer-events-none">
              <div className="bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm">
                <ArrowRight className="w-4 h-4" />
                스토리지 아키텍처 선택
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Controls */}
        <div className="flex-1 p-6 md:p-8 flex flex-col bg-white dark:bg-slate-950">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">공유 스토리지 테스트</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              다중 AZ 환경에서 EBS와 EFS의 차이를 확인하세요.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            <Button
              onClick={() => startSimulation("ebs")}
              disabled={isAnimating}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                architecture === "ebs"
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-200 text-slate-700"
              }`}
              variant="ghost"
            >
              <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <HardDrive className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="font-bold text-base">EBS (인스턴스별 분리)</div>
                <div className="text-xs opacity-70 font-medium">문제 상황: 일부 문서만 보임 ✕</div>
              </div>
            </Button>

            <Button
              onClick={() => startSimulation("efs")}
              disabled={isAnimating}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                architecture === "efs"
                  ? "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-green-200 text-slate-700"
              }`}
              variant="ghost"
            >
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <FolderOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-bold text-base">EFS (공유 스토리지)</div>
                <div className="text-xs opacity-70 font-medium">해결책: 모든 문서 표시 ✓</div>
              </div>
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">💡 핵심 차이점</span>
              <strong>EBS</strong>는 단일 EC2에만 연결 가능 →{" "}
              <strong>EFS</strong>는 여러 EC2가 동시에 마운트 가능!
            </div>

            {architecture && !isAnimating && (
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
