'use client';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  Inbox,
  Mail,
  Server,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

type Architecture = 'direct' | 'fanout' | null;

export function SnsSqsFanoutDiagram() {
  const [arch, setArch] = useState<Architecture>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stage, setStage] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const startSimulation = (a: Architecture) => {
    if (isAnimating) return;
    setArch(a);
    setIsAnimating(true);
    setStage(0);
    setMessageCount(0);

    if (a === 'direct') {
      // Direct coupling: 메시지가 하나씩 처리되다가 과부하
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setMessageCount(count);
        setStage(count <= 2 ? 1 : 2);
        if (count >= 5) {
          clearInterval(interval);
          setIsAnimating(false);
          setStage(-1); // 실패
        }
      }, 600);
    } else {
      // Fan-out: SNS → SQS × N 으로 분산
      const stages = [1, 2, 3, 4];
      let i = 0;
      const interval = setInterval(() => {
        setStage(stages[i]);
        setMessageCount((i + 1) * 25000);
        i++;
        if (i >= stages.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 800);
    }
  };

  const reset = () => {
    setArch(null);
    setIsAnimating(false);
    setStage(0);
    setMessageCount(0);
  };

  const getStatusText = () => {
    if (arch === 'direct') {
      if (stage === -1) return '❌ 강결합 → 장애 전파, 확장 불가';
      return `⚠️ 직접 연결 처리 중... (${messageCount}건)`;
    }
    if (arch === 'fanout') {
      switch (stage) {
        case 1:
          return '📨 메시지 수신 → SNS Topic 발행';
        case 2:
          return '📬 SNS → 각 SQS 큐에 Fan-out';
        case 3:
          return '⚙️ 각 Consumer가 독립적으로 처리';
        case 4:
          return `✅ ${messageCount.toLocaleString()}건/초 안정 처리!`;
        default:
          return '시작 대기...';
      }
    }
    return '';
  };

  const renderDiagram = (isMobile: boolean) => {
    const width = isMobile ? 360 : 720;
    const height = isMobile ? 500 : 340;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-auto select-none ${isMobile ? 'md:hidden' : 'hidden md:block'}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid-fanout" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-200 dark:text-slate-800"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-fanout)" />

        {arch === 'fanout'
          ? renderFanout(isMobile, width, height)
          : renderDirect(isMobile, width, height)}
      </svg>
    );
  };

  const renderDirect = (isMobile: boolean, w: number, h: number) => {
    const cx = w / 2;
    const appY = isMobile ? 60 : h / 2;
    const consumerStartY = isMobile ? 200 : 60;
    const consumers = ['App A', 'App B', 'App C'];

    return (
      <g>
        {/* Ingestion App */}
        <foreignObject
          x={isMobile ? cx - 60 : 60}
          y={isMobile ? appY - 30 : appY - 35}
          width="120"
          height="70"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`flex flex-col items-center p-3 rounded-xl border-2 shadow-lg bg-white dark:bg-slate-900 transition-all
              ${arch === 'direct' && stage === -1 ? 'border-red-400 ring-2 ring-red-100' : 'border-amber-300'}`}
            >
              <Server size={22} className={`${stage === -1 ? 'text-red-500' : 'text-amber-500'}`} />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mt-1">
                Ingestion App
              </span>
              {arch === 'direct' && (
                <span className="text-[9px] text-red-500 font-bold">100k msg/s</span>
              )}
            </div>
          </div>
        </foreignObject>

        {/* Direct connections to consumers */}
        {consumers.map((name, i) => {
          const consumerX = isMobile ? cx : 400 + i * 110;
          const consumerY = isMobile ? consumerStartY + i * 100 : 60 + i * 110;
          const isOverloaded = arch === 'direct' && stage === -1;

          return (
            <g key={name}>
              <line
                x1={isMobile ? cx : 180}
                y1={isMobile ? appY + 35 + i * 10 : appY}
                x2={consumerX}
                y2={consumerY}
                strokeWidth="2"
                className={`transition-all duration-300 ${isOverloaded ? 'stroke-red-400' : 'stroke-slate-300 dark:stroke-slate-600'}`}
                strokeDasharray={isOverloaded ? '0' : '4,4'}
              />
              <foreignObject
                x={consumerX - 50}
                y={consumerY - 25}
                width="100"
                height="55"
                className="overflow-visible"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className={`flex flex-col items-center p-2 rounded-lg border-2 shadow-md bg-white dark:bg-slate-900 transition-all text-center
                    ${isOverloaded ? 'border-red-300 opacity-60' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <Users
                      size={16}
                      className={`${isOverloaded ? 'text-red-400' : 'text-slate-400'}`}
                    />
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400">
                      {name}
                    </span>
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </g>
    );
  };

  const renderFanout = (isMobile: boolean, w: number, h: number) => {
    const cx = w / 2;
    const consumers = [
      { name: 'Consumer A', color: 'text-blue-500', border: 'border-blue-300' },
      { name: 'Consumer B', color: 'text-green-500', border: 'border-green-300' },
      { name: 'Consumer C', color: 'text-purple-500', border: 'border-purple-300' },
    ];

    // Positions
    const appPos = isMobile ? { x: cx, y: 50 } : { x: 80, y: h / 2 };
    const snsPos = isMobile ? { x: cx, y: 160 } : { x: 240, y: h / 2 };
    const sqsBasePos = isMobile
      ? consumers.map((_, i) => ({ x: cx, y: 270 + i * 80 }))
      : consumers.map((_, i) => ({ x: 430, y: 55 + i * 120 }));
    const consumerPos = isMobile
      ? consumers.map((_, i) => ({ x: cx, y: 310 + i * 80 }))
      : consumers.map((_, i) => ({ x: 610, y: 55 + i * 120 }));

    return (
      <g>
        {/* App → SNS line */}
        <line
          x1={appPos.x + (isMobile ? 0 : 50)}
          y1={appPos.y + (isMobile ? 30 : 0)}
          x2={snsPos.x - (isMobile ? 0 : 50)}
          y2={snsPos.y - (isMobile ? 30 : 0)}
          strokeWidth="3"
          className={`transition-all duration-500 ${stage >= 1 ? 'stroke-amber-400' : 'stroke-slate-300 dark:stroke-slate-600'}`}
        />

        {/* SNS → SQS lines */}
        {sqsBasePos.map((pos, i) => (
          <line
            key={`sns-sqs-${i}`}
            x1={snsPos.x + (isMobile ? 0 : 40)}
            y1={snsPos.y + (isMobile ? 30 : 0)}
            x2={pos.x - (isMobile ? 50 : 40)}
            y2={pos.y}
            strokeWidth="2.5"
            className={`transition-all duration-500 ${stage >= 2 ? 'stroke-orange-400' : 'stroke-slate-300 dark:stroke-slate-600'}`}
          />
        ))}

        {/* SQS → Consumer lines */}
        {consumerPos.map((pos, i) => (
          <line
            key={`sqs-con-${i}`}
            x1={sqsBasePos[i].x + (isMobile ? 50 : 40)}
            y1={sqsBasePos[i].y}
            x2={pos.x - (isMobile ? 50 : 40)}
            y2={pos.y}
            strokeWidth="2"
            className={`transition-all duration-500 ${stage >= 3 ? 'stroke-green-400' : 'stroke-slate-300 dark:stroke-slate-600'}`}
          />
        ))}

        {/* Ingestion App */}
        <foreignObject
          x={appPos.x - 55}
          y={appPos.y - 30}
          width="110"
          height="60"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`flex flex-col items-center p-2 rounded-xl border-2 shadow-lg bg-white dark:bg-slate-900 transition-all
              ${stage >= 1 ? 'border-amber-400 scale-105' : 'border-slate-200 dark:border-slate-700'}`}
            >
              <Zap size={20} className="text-amber-500" />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                Ingestion App
              </span>
            </div>
          </div>
        </foreignObject>

        {/* SNS Topic */}
        <foreignObject
          x={snsPos.x - 55}
          y={snsPos.y - 32}
          width="110"
          height="64"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`flex flex-col items-center p-2.5 rounded-xl border-[3px] shadow-xl bg-white dark:bg-slate-900 transition-all
              ${stage >= 1 ? 'border-orange-400 ring-2 ring-orange-100 dark:ring-orange-900/50 scale-105' : 'border-slate-200 dark:border-slate-700'}`}
            >
              <Bell
                size={22}
                className={`transition-all ${stage >= 1 ? 'text-orange-500' : 'text-slate-400'}`}
              />
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mt-0.5">
                SNS Topic
              </span>
            </div>
          </div>
        </foreignObject>

        {/* SQS Queues + Consumers */}
        {consumers.map((c, i) => (
          <g key={c.name}>
            {/* SQS */}
            <foreignObject
              x={sqsBasePos[i].x - (isMobile ? 48 : 38)}
              y={sqsBasePos[i].y - 22}
              width={isMobile ? 96 : 76}
              height="44"
              className="overflow-visible"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className={`flex flex-col items-center p-1.5 rounded-lg border-2 shadow-md bg-white dark:bg-slate-900 transition-all
                  ${stage >= 2 ? `${c.border} scale-105` : 'border-slate-200 dark:border-slate-700'}`}
                >
                  <Inbox
                    size={16}
                    className={`transition-all ${stage >= 2 ? c.color : 'text-slate-400'}`}
                  />
                  <span className="text-[8px] font-bold text-slate-600 dark:text-slate-400">
                    SQS {String.fromCharCode(65 + i)}
                  </span>
                </div>
              </div>
            </foreignObject>
            {/* Consumer */}
            <foreignObject
              x={consumerPos[i].x - (isMobile ? 48 : 45)}
              y={consumerPos[i].y - 22}
              width={isMobile ? 96 : 90}
              height="44"
              className="overflow-visible"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className={`flex flex-col items-center p-1.5 rounded-lg border-2 shadow-md bg-white dark:bg-slate-900 transition-all
                  ${stage >= 3 ? `${c.border} scale-105` : 'border-slate-200 dark:border-slate-700'}`}
                >
                  <Users
                    size={14}
                    className={`transition-all ${stage >= 3 ? c.color : 'text-slate-400'}`}
                  />
                  <span className="text-[8px] font-bold text-slate-600 dark:text-slate-400">
                    {c.name}
                  </span>
                </div>
              </div>
            </foreignObject>
          </g>
        ))}

        {/* Status */}
        {arch && (
          <foreignObject
            x={isMobile ? 30 : 200}
            y={isMobile ? 470 : 295}
            width={isMobile ? 300 : 320}
            height="40"
            className="overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-lg border-2 text-xs font-bold
                ${
                  stage >= 4
                    ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200'
                    : 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/50 dark:border-orange-700 dark:text-orange-200'
                }`}
              >
                {isAnimating && <Clock size={14} className="animate-spin" />}
                {stage >= 4 && <CheckCircle2 size={14} />}
                {getStatusText()}
              </div>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  return (
    <div className="w-full flex flex-col items-center p-2 md:p-6">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row">
        {/* Left: Diagram */}
        <div className="flex-[1.8] relative bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 min-h-[420px]">
          <div className="absolute top-4 left-5 text-slate-500 dark:text-slate-400">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              메시지 아키텍처
            </h3>
          </div>

          {renderDiagram(false)}
          {renderDiagram(true)}

          {!arch && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-950/30 backdrop-blur-[1px] pointer-events-none">
              <div className="bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm">
                <ArrowRight className="w-4 h-4" />
                아키텍처 비교 선택
              </div>
            </div>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex-1 p-6 md:p-8 flex flex-col bg-white dark:bg-slate-950">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              메시지 브로커 패턴
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              수십 개의 앱이 메시지를 소비해야 할 때, 직접 연결 vs Fan-out 패턴을 비교하세요.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            <Button
              onClick={() => startSimulation('direct')}
              disabled={isAnimating}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all group ${
                arch === 'direct'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-red-200 text-slate-700'
              }`}
              variant="ghost"
            >
              <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <Server className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="font-bold text-base">직접 연결 (Tight Coupling)</div>
                <div className="text-xs opacity-70 font-medium">강결합, 확장 불가 ✕</div>
              </div>
            </Button>

            <Button
              onClick={() => startSimulation('fanout')}
              disabled={isAnimating}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all group ${
                arch === 'fanout'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-200 text-slate-700'
              }`}
              variant="ghost"
            >
              <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="font-bold text-base">SNS + SQS Fan-out</div>
                <div className="text-xs opacity-70 font-medium">완전 디커플링, 무한 확장 ✓</div>
              </div>
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">
                💡 SNS + SQS Fan-out 패턴
              </span>
              SNS Topic으로 발행하면 구독된 <strong>모든 SQS 큐</strong>에 동시 전달. 각 Consumer는
              독립적으로 자기 큐에서 메시지를 소비합니다.
            </div>

            {arch && !isAnimating && (
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
