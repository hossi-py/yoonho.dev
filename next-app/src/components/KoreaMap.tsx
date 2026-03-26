"use client";

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
  return (
    <div
      className={`relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden bg-transparent p-8 ${className}`}
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
      </div>
    </div>
  );
}
