"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  KOREA_VIEW_BOX,
  dokdoEastPath,
  dokdoWestPath,
  peninsulaPath,
  ulleungdoPath,
} from "@/lib/logo/geometry";

type KoreaMapProps = {
  className?: string;
};

const WORK_MARKER_POSITION = {
  left: "38.4%",
  top: "55.8%",
} as const;

function OutlinePath({
  d,
  glowWidth,
  mainWidth,
}: {
  d: string;
  glowWidth: number;
  mainWidth: number;
}) {
  return (
    <>
      <path
        d={d}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={mainWidth * 0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        stroke="rgba(255,255,255,0.28)"
        strokeWidth={glowWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#line-glow)"
      />
      <path
        d={d}
        stroke="rgba(255,255,255,0.88)"
        strokeWidth={mainWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

export default function KoreaMap({ className = "" }: KoreaMapProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`pointer-events-none relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden bg-transparent p-8 ${className}`}
    >
      <div className="relative z-10 aspect-9/16 w-full max-w-sm">
        <svg
          viewBox={`${KOREA_VIEW_BOX.minX} ${KOREA_VIEW_BOX.minY} ${KOREA_VIEW_BOX.width} ${KOREA_VIEW_BOX.height}`}
          className="h-full w-full drop-shadow-[0_0_8px_rgba(255,255,255,0.12)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Outline of the Korean Peninsula with Jeju, Ulleungdo and Dokdo"
        >
          <defs>
            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <OutlinePath d={peninsulaPath} glowWidth={1} mainWidth={0.22} />
          <OutlinePath d={ulleungdoPath} glowWidth={0.34} mainWidth={0.18} />
          <OutlinePath d={dokdoWestPath} glowWidth={0.34} mainWidth={0.18} />
          <OutlinePath d={dokdoEastPath} glowWidth={0.34} mainWidth={0.18} />
        </svg>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <div className="absolute z-20" style={WORK_MARKER_POSITION}>
            <PopoverTrigger asChild>
              <motion.button
                type="button"
                aria-label="근무지 정보 보기"
                aria-expanded={isOpen}
                className="pointer-events-auto relative -translate-x-1/2 -translate-y-full rounded-full [perspective:900px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <motion.span
                  className="relative block [transform-style:preserve-3d]"
                  animate={{ rotateY: [0, 360, 360, 360, 360, 720] }}
                  transition={{
                    duration: 5.8,
                    times: [0, 0.24, 0.38, 0.52, 0.66, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-xl"
                    animate={{ opacity: [0.12, 0.22, 0.16, 0.22, 0.16, 0.12] }}
                    transition={{
                      duration: 5.8,
                      times: [0, 0.24, 0.38, 0.52, 0.66, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.span
                    className="relative block"
                    animate={{ y: [0, 0, -4, 0, -4, 0] }}
                    transition={{
                      duration: 5.8,
                      times: [0, 0.24, 0.38, 0.52, 0.66, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      width="24"
                      height="34"
                      viewBox="0 0 30 42"
                      className="drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                      aria-hidden="true"
                    >
                      <path
                        d="M15 40C15 40 27.5 26.1 27.5 14.4C27.5 7.55 21.9 2 15 2C8.1 2 2.5 7.55 2.5 14.4C2.5 26.1 15 40 15 40Z"
                        fill="rgba(0,0,0,0.86)"
                        stroke="rgba(255,255,255,0.78)"
                        strokeWidth="1.6"
                      />
                      <circle cx="15" cy="14.4" r="4.2" fill="rgba(255,255,255,0.96)" />
                      <circle cx="13.2" cy="12.5" r="1.2" fill="rgba(255,255,255,0.65)" />
                    </svg>
                  </motion.span>
                </motion.span>
              </motion.button>
            </PopoverTrigger>

            <PopoverContent
              side="right"
              align="center"
              sideOffset={16}
              className="pointer-events-auto w-64 rounded-2xl border border-white/15 bg-black/85 p-4 text-left text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <div className="space-y-4">
                <PopoverHeader className="gap-2">
                  <PopoverTitle className="text-[11px] uppercase tracking-[0.3em] text-white/45">
                    근무지
                  </PopoverTitle>
                  <PopoverDescription className="text-sm font-medium leading-6 text-white/90">
                    2026.03.09 ~ 현재 서울 영등포구 국제금융로 39 (앵커원 빌딩)
                  </PopoverDescription>
                </PopoverHeader>

                <div className="h-px bg-white/10" />

                <PopoverHeader className="gap-2">
                  <PopoverTitle className="text-[11px] uppercase tracking-[0.3em] text-white/45">
                    거주지
                  </PopoverTitle>
                  <PopoverDescription className="text-sm font-medium leading-6 text-white/90">
                    서울 노원구 상계동
                  </PopoverDescription>
                </PopoverHeader>
              </div>
            </PopoverContent>
          </div>
        </Popover>
      </div>
    </div>
  );
}
