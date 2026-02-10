'use client';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Database,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function S3OrganizationsAccessDiagram() {
  const [accessType, setAccessType] = useState<'internal' | 'external' | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'allow' | 'deny' | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const startVerification = (type: 'internal' | 'external') => {
    if (isVerifying) return;
    setAccessType(type);
    setIsVerifying(true);
    setResult(null);
    setAnimationKey((prev) => prev + 1);

    setTimeout(() => {
      setResult(type === 'internal' ? 'allow' : 'deny');
      setIsVerifying(false);
    }, 1500);
  };

  const reset = () => {
    setAccessType(null);
    setResult(null);
    setIsVerifying(false);
  };

  const renderDiagram = (isMobile: boolean) => {
    // 1. ViewBox를 줄여서(Zoom-in 효과) 요소들이 상대적으로 커 보이게 함
    const width = isMobile ? 360 : 700; // 기존 800 -> 700
    const height = isMobile ? 600 : 380; // 기존 450 -> 380

    // 2. 요소 간 간격을 좁히고 중앙으로 밀집시킴
    const pos = isMobile
      ? {
          external: { x: 180, y: 80 },
          orgBox: { x: 10, y: 190, w: 340, h: 400 },
          internal: { x: 180, y: 280 },
          s3: { x: 180, y: 480 },
        }
      : {
          // 데스크톱 좌표 (더 촘촘하게 배치)
          external: { x: 80, y: 190 },
          orgBox: { x: 220, y: 40, w: 460, h: 300 }, // 조직 박스 크기 및 위치 조정
          internal: { x: 320, y: 190 },
          s3: { x: 580, y: 190 },
        };

    // 경로 계산
    const pathExternal = isMobile
      ? `M ${pos.external.x} ${pos.external.y + 50} L ${pos.s3.x} ${pos.s3.y - 60}`
      : `M ${pos.external.x + 60} ${pos.external.y} C ${pos.external.x + 180} ${pos.external.y}, ${pos.s3.x - 180} ${pos.s3.y}, ${pos.s3.x - 70} ${pos.s3.y}`;

    const pathInternal = isMobile
      ? `M ${pos.internal.x} ${pos.internal.y + 50} L ${pos.s3.x} ${pos.s3.y - 60}`
      : `M ${pos.internal.x + 60} ${pos.internal.y} L ${pos.s3.x - 70} ${pos.s3.y}`;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-auto select-none ${isMobile ? 'md:hidden' : 'hidden md:block'}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid-sm" width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-200 dark:text-slate-800"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-sm)" />

        {/* --- Connections --- */}
        <g className="transition-all duration-500">
          <path
            d={pathExternal}
            fill="none"
            strokeWidth="3"
            className={`stroke-slate-300 dark:stroke-slate-700 ${accessType === 'external' ? 'opacity-100' : 'opacity-40'}`}
            strokeDasharray="6,6"
          />
          <path
            d={pathInternal}
            fill="none"
            strokeWidth="3"
            className={`stroke-slate-300 dark:stroke-slate-700 ${accessType === 'internal' ? 'opacity-100' : 'opacity-40'}`}
            strokeDasharray="6,6"
          />
          {accessType === 'external' && (
            <path d={pathExternal} fill="none" strokeWidth="4" className="stroke-red-400/60" />
          )}
          {accessType === 'internal' && (
            <path d={pathInternal} fill="none" strokeWidth="4" className="stroke-indigo-400/60" />
          )}
        </g>

        {/* --- AWS Organization Boundary --- */}
        <g>
          <rect
            x={pos.orgBox.x}
            y={pos.orgBox.y}
            width={pos.orgBox.w}
            height={pos.orgBox.h}
            rx="24"
            className="fill-indigo-50/60 dark:fill-indigo-950/30 stroke-indigo-300 dark:stroke-indigo-700"
            strokeWidth="2.5"
            strokeDasharray="10 8"
          />
          <foreignObject x={pos.orgBox.x} y={pos.orgBox.y - 24} width={pos.orgBox.w} height="60">
            <div className="flex justify-center items-center h-full">
              <div className="bg-indigo-100 dark:bg-indigo-900 border-2 border-indigo-200 dark:border-indigo-700 rounded-full px-5 py-1.5 flex items-center gap-2 shadow-sm">
                <Building2 className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
                {/* 폰트 크기 증가 */}
                <span className="text-sm font-black text-indigo-800 dark:text-indigo-200">
                  AWS Organization (o-abcd123)
                </span>
              </div>
            </div>
          </foreignObject>
        </g>

        {/* --- Nodes (크기 및 폰트 대폭 확대) --- */}

        {/* 1. External User */}
        <foreignObject
          x={pos.external.x - 100}
          y={pos.external.y - 75}
          width="200"
          height="150"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            {/* 카드 크기 w-[140px]로 확대 */}
            <div
              className={`w-[140px] flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg
              ${accessType === 'external' ? 'border-red-500 scale-110 ring-4 ring-red-100 dark:ring-red-900/30' : 'border-slate-200 dark:border-slate-700 opacity-90'}
            `}
            >
              <div
                className={`p-3 rounded-full mb-2 ${accessType === 'external' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}
              >
                {/* 아이콘 크기 32px */}
                <ShieldAlert size={32} />
              </div>
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                외부 계정
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold mt-0.5">ID: 9999...</span>
            </div>
          </div>
        </foreignObject>

        {/* 2. Internal User */}
        <foreignObject
          x={pos.internal.x - 100}
          y={pos.internal.y - 75}
          width="200"
          height="150"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            <div
              className={`w-[140px] flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg
              ${accessType === 'internal' ? 'border-indigo-500 scale-110 ring-4 ring-indigo-100 dark:ring-indigo-900/30' : 'border-slate-200 dark:border-slate-700'}
            `}
            >
              <div
                className={`p-3 rounded-full mb-2 ${accessType === 'internal' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}
              >
                <User size={32} />
              </div>
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                내부 계정
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold mt-0.5">ID: 1111...</span>
            </div>
          </div>
        </foreignObject>

        {/* 3. S3 Bucket */}
        <foreignObject
          x={pos.s3.x - 110}
          y={pos.s3.y - 90}
          width="220"
          height="200"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            {/* S3 카드 크기 확대 */}
            <div className="w-[160px] flex flex-col items-center p-4 rounded-2xl border-[3px] border-orange-300 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-orange-100 dark:bg-orange-900/50 px-2.5 py-1 rounded-bl-xl">
                <LockKeyhole className="w-4 h-4 text-orange-600" />
              </div>

              <div className="p-3 rounded-full bg-orange-50 dark:bg-orange-900/20 mb-2 group-hover:scale-110 transition-transform">
                <Database size={40} className="text-orange-500" />
              </div>
              <span className="text-base font-black text-slate-800 dark:text-slate-100">
                Target S3
              </span>
              <div className="mt-2 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-center w-full">
                <span className="block text-slate-500 font-semibold mb-0.5 text-[10px] uppercase tracking-wider">
                  Condition
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">
                  PrincipalOrgID
                </span>
              </div>
            </div>
          </div>
        </foreignObject>

        {/* --- Animation Packet (조금 더 크게) --- */}
        {isVerifying && accessType && (
          <g>
            <circle
              r="8"
              className={accessType === 'internal' ? 'fill-indigo-500' : 'fill-red-500'}
            >
              <animateMotion dur="1.5s" repeatCount="1" fill="freeze" key={animationKey}>
                <mpath href={accessType === 'internal' ? '#p-internal' : '#p-external'} />
              </animateMotion>
            </circle>
            <circle
              r="16"
              className={accessType === 'internal' ? 'fill-indigo-500' : 'fill-red-500'}
              opacity="0.3"
            >
              <animate attributeName="r" values="10;20;10" dur="1.5s" repeatCount="indefinite" />
              <animateMotion dur="1.5s" fill="freeze" key={animationKey + 'glow'}>
                <mpath href={accessType === 'internal' ? '#p-internal' : '#p-external'} />
              </animateMotion>
            </circle>
          </g>
        )}

        <defs>
          <path id="p-external" d={pathExternal} />
          <path id="p-internal" d={pathInternal} />
        </defs>

        {/* --- Result Popup --- */}
        {result && (
          <foreignObject
            x={pos.s3.x - 140}
            y={isMobile ? pos.s3.y + 40 : pos.s3.y + 60}
            width="280"
            height="100"
            className="overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center p-2">
              <div
                className={`
                flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border-2 animate-in fade-in zoom-in slide-in-from-top-4 duration-300
                ${
                  result === 'allow'
                    ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/90 dark:border-green-700 dark:text-green-50'
                    : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/90 dark:border-red-700 dark:text-red-50'
                }
              `}
              >
                {result === 'allow' ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                <div>
                  <p className="font-black text-base">
                    {result === 'allow' ? '접근 허용 (Allow)' : '접근 거부 (Deny)'}
                  </p>
                  <p className="text-xs opacity-90 font-bold mt-0.5">
                    {result === 'allow' ? '조직 ID 일치 확인됨' : '조직 ID 불일치'}
                  </p>
                </div>
              </div>
            </div>
          </foreignObject>
        )}
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col items-center p-2 md:p-6">
      {/* 전체 박스 크기 max-w-5xl로 축소 */}
      <div className="w-full max-w-5xl bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row">
        {/* Left Area: Diagram (flex 비율 조정) */}
        <div className="flex-[1.8] relative bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 min-h-[400px]">
          <div className="absolute top-4 left-5">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              Simulation View
            </h3>
          </div>

          {renderDiagram(false)}
          {renderDiagram(true)}

          {!accessType && !result && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-950/30 backdrop-blur-[1px] pointer-events-none">
              <div className="bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold animate-bounce text-sm">
                <ArrowRight className="w-4 h-4" />
                우측 패널에서 테스트 시작
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Controls (Compact하게 조정) */}
        <div className="flex-1 p-6 md:p-8 flex flex-col bg-white dark:bg-slate-950">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              접근 제어 테스트
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              S3 버킷 정책의{' '}
              <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-600 font-mono font-bold">
                aws:PrincipalOrgID
              </code>{' '}
              조건을 검증합니다.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            <Button
              onClick={() => startVerification('internal')}
              disabled={isVerifying}
              className={`w-full h-auto p-3 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                accessType === 'internal'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 text-slate-700'
              }`}
              variant="ghost"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2.5 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="font-bold text-base">조직 내부 계정</div>
                <div className="text-xs opacity-70 font-medium">조직 ID 일치 (허용)</div>
              </div>
              {accessType === 'internal' && isVerifying && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
              )}
            </Button>

            <Button
              onClick={() => startVerification('external')}
              disabled={isVerifying}
              className={`w-full h-auto p-3 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                accessType === 'external'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-red-200 text-slate-700'
              }`}
              variant="ghost"
            >
              <div className="bg-red-100 dark:bg-red-900/50 p-2.5 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="font-bold text-base">조직 외부 계정</div>
                <div className="text-xs opacity-70 font-medium">조직 ID 불일치 (거부)</div>
              </div>
              {accessType === 'external' && isVerifying && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">
                💡 동작 원리
              </span>
              요청자의 AWS Organization ID가 버킷 소유자의 조직 ID와 일치해야 접근이 허용됩니다.
            </div>

            {result && (
              <Button
                onClick={reset}
                variant="outline"
                size="sm"
                className="w-full h-9 text-xs font-bold"
              >
                초기화
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
