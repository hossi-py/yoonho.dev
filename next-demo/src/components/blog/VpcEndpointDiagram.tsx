'use client';
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Database,
  Globe,
  Server,
  XCircle,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function VpcEndpointDiagram() {
  const [accessType, setAccessType] = useState<'endpoint' | 'internet' | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const startVerification = (type: 'endpoint' | 'internet') => {
    if (isVerifying) return;
    setAccessType(type);
    setIsVerifying(true);
    setResult(null);
    setAnimationKey((prev) => prev + 1);

    setTimeout(() => {
      setResult(type === 'endpoint' ? 'success' : 'fail');
      setIsVerifying(false);
    }, 2000);
  };

  const reset = () => {
    setAccessType(null);
    setResult(null);
    setIsVerifying(false);
  };

  const renderDiagram = (isMobile: boolean) => {
    const width = isMobile ? 360 : 700;
    const height = isMobile ? 650 : 400;

    const pos = isMobile
      ? {
          ec2: { x: 180, y: 120 },
          vpcBox: { x: 10, y: 50, w: 340, h: 360 },
          endpoint: { x: 180, y: 280 },
          internet: { x: 180, y: 500 },
          s3: { x: 180, y: 550 },
          awsCloud: { x: 10, y: 430, w: 340, h: 200 },
        }
      : {
          ec2: { x: 120, y: 200 },
          vpcBox: { x: 30, y: 50, w: 280, h: 300 },
          endpoint: { x: 380, y: 200 },
          internet: { x: 380, y: 80 },
          s3: { x: 580, y: 200 },
          awsCloud: { x: 320, y: 50, w: 360, h: 300 },
        };

    // 경로: EC2 -> Endpoint -> S3 (private)
    const pathEndpoint = isMobile
      ? `M ${pos.ec2.x} ${pos.ec2.y + 50} L ${pos.ec2.x} ${pos.endpoint.y - 50} L ${pos.endpoint.x} ${pos.endpoint.y - 50}`
      : `M ${pos.ec2.x + 70} ${pos.ec2.y} L ${pos.endpoint.x - 60} ${pos.endpoint.y}`;

    const pathEndpointToS3 = isMobile
      ? `M ${pos.endpoint.x} ${pos.endpoint.y + 50} L ${pos.s3.x} ${pos.s3.y - 50}`
      : `M ${pos.endpoint.x + 60} ${pos.endpoint.y} L ${pos.s3.x - 70} ${pos.s3.y}`;

    // 경로: EC2 -> Internet (blocked)
    const pathInternet = isMobile
      ? `M ${pos.ec2.x} ${pos.ec2.y + 50} L ${pos.internet.x} ${pos.internet.y - 50}`
      : `M ${pos.ec2.x + 70} ${pos.ec2.y - 30} C ${pos.ec2.x + 150} ${pos.ec2.y - 80}, ${pos.internet.x - 50} ${pos.internet.y + 30}, ${pos.internet.x - 50} ${pos.internet.y}`;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-auto select-none ${isMobile ? 'md:hidden' : 'hidden md:block'}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid-vpc" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-200 dark:text-slate-800"
            />
          </pattern>
          <linearGradient id="privateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-vpc)" />

        {/* AWS Cloud Boundary */}
        <g>
          <rect
            x={pos.awsCloud.x}
            y={pos.awsCloud.y}
            width={pos.awsCloud.w}
            height={pos.awsCloud.h}
            rx="20"
            className="fill-orange-50/50 dark:fill-orange-950/20 stroke-orange-300 dark:stroke-orange-700"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <foreignObject
            x={pos.awsCloud.x + pos.awsCloud.w / 2 - 80}
            y={pos.awsCloud.y - 18}
            width="160"
            height="40"
          >
            <div className="flex justify-center">
              <div className="bg-orange-100 dark:bg-orange-900 border-2 border-orange-200 dark:border-orange-700 rounded-full px-4 py-1 flex items-center gap-2 shadow-sm">
                <Cloud className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-bold text-orange-800 dark:text-orange-200">
                  AWS Cloud
                </span>
              </div>
            </div>
          </foreignObject>
        </g>

        {/* VPC Boundary */}
        <g>
          <rect
            x={pos.vpcBox.x}
            y={pos.vpcBox.y}
            width={pos.vpcBox.w}
            height={pos.vpcBox.h}
            rx="24"
            className="fill-cyan-50/60 dark:fill-cyan-950/30 stroke-cyan-400 dark:stroke-cyan-700"
            strokeWidth="3"
          />
          <foreignObject x={pos.vpcBox.x} y={pos.vpcBox.y - 22} width={pos.vpcBox.w} height="50">
            <div className="flex justify-center">
              <div className="bg-cyan-100 dark:bg-cyan-900 border-2 border-cyan-300 dark:border-cyan-700 rounded-full px-4 py-1 flex items-center gap-2 shadow-sm">
                <span className="text-sm font-black text-cyan-800 dark:text-cyan-200">
                  🔒 VPC (Private Subnet)
                </span>
              </div>
            </div>
          </foreignObject>
        </g>

        {/* Connections */}
        <g className="transition-all duration-500">
          {/* Private path (Endpoint) */}
          <path
            d={pathEndpoint}
            fill="none"
            strokeWidth="3"
            className={`stroke-slate-300 dark:stroke-slate-700 ${accessType === 'endpoint' ? 'opacity-100' : 'opacity-40'}`}
            strokeDasharray="6,6"
          />
          <path
            d={pathEndpointToS3}
            fill="none"
            strokeWidth="3"
            className={`stroke-slate-300 dark:stroke-slate-700 ${accessType === 'endpoint' ? 'opacity-100' : 'opacity-40'}`}
            strokeDasharray="6,6"
          />
          {accessType === 'endpoint' && (
            <>
              <path
                d={pathEndpoint}
                fill="none"
                strokeWidth="4"
                stroke="url(#privateGradient)"
                opacity={0.6}
              />
              <path
                d={pathEndpointToS3}
                fill="none"
                strokeWidth="4"
                stroke="url(#privateGradient)"
                opacity={0.6}
              />
            </>
          )}

          {/* Internet path (blocked) */}
          <path
            d={pathInternet}
            fill="none"
            strokeWidth="3"
            className={`stroke-slate-300 dark:stroke-slate-700 ${accessType === 'internet' ? 'opacity-100' : 'opacity-40'}`}
            strokeDasharray="6,6"
          />
          {accessType === 'internet' && (
            <path d={pathInternet} fill="none" strokeWidth="4" className="stroke-red-400/60" />
          )}
        </g>

        {/* EC2 Instance */}
        <foreignObject
          x={pos.ec2.x - 80}
          y={pos.ec2.y - 60}
          width="160"
          height="120"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`w-[120px] flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg
              ${accessType ? 'border-cyan-500 ring-4 ring-cyan-100 dark:ring-cyan-900/30' : 'border-slate-200 dark:border-slate-700'}
            `}
            >
              <div
                className={`p-3 rounded-full mb-2 ${accessType ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-500'}`}
              >
                <Server size={28} />
              </div>
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                EC2 Instance
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">Private Subnet</span>
            </div>
          </div>
        </foreignObject>

        {/* VPC Gateway Endpoint */}
        <foreignObject
          x={pos.endpoint.x - 90}
          y={pos.endpoint.y - 60}
          width="180"
          height="130"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`w-[140px] flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg
              ${accessType === 'endpoint' ? 'border-indigo-500 scale-105 ring-4 ring-indigo-100 dark:ring-indigo-900/30' : 'border-slate-200 dark:border-slate-700'}
            `}
            >
              <div
                className={`p-3 rounded-full mb-2 ${accessType === 'endpoint' ? 'bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}
              >
                <Zap size={28} />
              </div>
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                Gateway Endpoint
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
                com.amazonaws.*.s3
              </span>
            </div>
          </div>
        </foreignObject>

        {/* Internet Gateway (blocked) */}
        <foreignObject
          x={pos.internet.x - 70}
          y={pos.internet.y - 40}
          width="140"
          height="90"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`w-[100px] flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900 shadow-md
              ${accessType === 'internet' ? 'border-red-500 ring-4 ring-red-100 dark:ring-red-900/30' : 'border-slate-200 dark:border-slate-700 opacity-60'}
            `}
            >
              <div
                className={`p-2 rounded-full mb-1 ${accessType === 'internet' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}
              >
                <Globe size={20} />
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 line-through">
                Internet
              </span>
              <span className="text-[10px] text-red-500 font-bold">No Access</span>
            </div>
          </div>
        </foreignObject>

        {/* S3 Bucket */}
        <foreignObject
          x={pos.s3.x - 90}
          y={pos.s3.y - 70}
          width="180"
          height="160"
          className="overflow-visible"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[140px] flex flex-col items-center p-4 rounded-2xl border-[3px] border-orange-400 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded-bl-xl">
                <span className="text-[10px] font-bold text-orange-600">S3</span>
              </div>

              <div className="p-3 rounded-full bg-orange-50 dark:bg-orange-900/20 mb-2 group-hover:scale-110 transition-transform">
                <Database size={36} className="text-orange-500" />
              </div>
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                Amazon S3
              </span>
              <div className="mt-2 text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-center">
                <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                  logs-bucket
                </span>
              </div>
            </div>
          </div>
        </foreignObject>

        {/* Animation Packets */}
        {isVerifying && accessType === 'endpoint' && (
          <g key={animationKey}>
            <circle r="8" className="fill-indigo-500">
              <animateMotion dur="1s" repeatCount="1" fill="freeze">
                <mpath href="#p-endpoint-1" />
              </animateMotion>
            </circle>
            <circle r="8" className="fill-cyan-500">
              <animateMotion dur="1s" begin="1s" repeatCount="1" fill="freeze">
                <mpath href="#p-endpoint-2" />
              </animateMotion>
            </circle>
          </g>
        )}
        {isVerifying && accessType === 'internet' && (
          <g key={animationKey + 'int'}>
            <circle r="8" className="fill-red-500">
              <animateMotion dur="1s" repeatCount="1" fill="freeze">
                <mpath href="#p-internet" />
              </animateMotion>
            </circle>
            {/* X mark at the end */}
            <g opacity={0}>
              <animate attributeName="opacity" values="0;1" dur="0.1s" begin="0.9s" fill="freeze" />
              <circle
                cx={isMobile ? pos.internet.x : pos.internet.x - 50}
                cy={isMobile ? pos.internet.y - 50 : pos.internet.y}
                r="20"
                className="fill-red-500/20"
              />
              <text
                x={isMobile ? pos.internet.x : pos.internet.x - 50}
                y={isMobile ? pos.internet.y - 45 : pos.internet.y + 5}
                textAnchor="middle"
                className="fill-red-600 text-2xl font-black"
              >
                ✕
              </text>
            </g>
          </g>
        )}

        <defs>
          <path id="p-endpoint-1" d={pathEndpoint} />
          <path id="p-endpoint-2" d={pathEndpointToS3} />
          <path id="p-internet" d={pathInternet} />
        </defs>

        {/* Result Popup */}
        {result && (
          <foreignObject
            x={pos.s3.x - 120}
            y={isMobile ? pos.s3.y + 60 : pos.s3.y + 70}
            width="240"
            height="80"
            className="overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`
                flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border-2 animate-in fade-in zoom-in slide-in-from-top-4 duration-300
                ${
                  result === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/90 dark:border-green-700 dark:text-green-50'
                    : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/90 dark:border-red-700 dark:text-red-50'
                }
              `}
              >
                {result === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                <div>
                  <p className="font-black text-sm">
                    {result === 'success' ? 'Private 연결 성공!' : '연결 실패'}
                  </p>
                  <p className="text-xs opacity-90 font-bold">
                    {result === 'success' ? '인터넷 없이 S3 접근' : '인터넷 없이는 불가'}
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
      <div className="w-full max-w-5xl bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row">
        {/* Left Area: Diagram */}
        <div className="flex-[1.8] relative bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 min-h-[450px]">
          <div className="absolute top-4 left-5">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              VPC Endpoint 시뮬레이션
            </h3>
          </div>

          {renderDiagram(false)}
          {renderDiagram(true)}

          {!accessType && !result && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-950/30 backdrop-blur-[1px] pointer-events-none">
              <div className="bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm">
                <ArrowRight className="w-4 h-4" />
                우측 패널에서 테스트 시작
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Controls */}
        <div className="flex-1 p-6 md:p-8 flex flex-col bg-white dark:bg-slate-950">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              S3 접근 방식 테스트
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              인터넷 없이 Private Subnet에서 S3에 접근하는 방법을 비교해보세요.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            <Button
              onClick={() => startVerification('endpoint')}
              disabled={isVerifying}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                accessType === 'endpoint'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 text-slate-700'
              }`}
              variant="ghost"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-cyan-100 dark:from-indigo-900/50 dark:to-cyan-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="font-bold text-base">VPC Gateway Endpoint</div>
                <div className="text-xs opacity-70 font-medium">인터넷 없이 Private 연결 ✓</div>
              </div>
              {accessType === 'endpoint' && isVerifying && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
              )}
            </Button>

            <Button
              onClick={() => startVerification('internet')}
              disabled={isVerifying}
              className={`w-full h-auto p-4 justify-start text-left border-2 transition-all relative overflow-hidden group ${
                accessType === 'internet'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-red-200 text-slate-700'
              }`}
              variant="ghost"
            >
              <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg mr-3 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="font-bold text-base">인터넷 경유 (불가)</div>
                <div className="text-xs opacity-70 font-medium">인터넷 연결 없음 ✕</div>
              </div>
              {accessType === 'internet' && isVerifying && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">
                💡 Gateway Endpoint란?
              </span>
              VPC에서 S3, DynamoDB로 향하는 트래픽을 AWS 내부 네트워크로 라우팅합니다. 인터넷을
              거치지 않아 보안이 강화되고, 추가 비용이 없습니다.
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
