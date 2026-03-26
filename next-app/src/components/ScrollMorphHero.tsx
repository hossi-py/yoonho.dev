"use client";

import {
  useAnimationFrame,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import KoreaMap from "@/components/KoreaMap";
import { KOREA_VIEW_BOX, koreaPaths } from "@/lib/logo/geometry";
import {
  buildWordmarkPoints,
  createParticleSeeds,
  getParticleFrame,
  sampleSvgPathsToStage,
} from "@/lib/logo/particles";

const PARTICLE_COUNT = 960;
const PROGRESS_BUCKETS = 120;

type StageSize = {
  width: number;
  height: number;
};

export default function ScrollMorphHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const morphFrameRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const spriteRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const isFirefox = useMemo(
    () => typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent),
    []
  );

  const [displayProgress, setDisplayProgress] = useState(0);
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });
  const [sourcePoints, setSourcePoints] = useState<{ x: number; y: number }[]>([]);
  const [targetPoints, setTargetPoints] = useState<{ x: number; y: number }[]>([]);

  const effectiveParticleCount = isFirefox ? 360 : 520;
  const seeds = useMemo(() => createParticleSeeds(effectiveParticleCount), [effectiveParticleCount]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;

    const bucket = Math.round(value * PROGRESS_BUCKETS) / PROGRESS_BUCKETS;
    setDisplayProgress((current) => (current === bucket ? current : bucket));
  });

  useEffect(() => {
    const node = morphFrameRef.current;
    if (!node) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const width = Math.floor(entry.contentRect.width);
      const height = Math.floor(entry.contentRect.height);
      setStageSize((current) =>
        current.width === width && current.height === height ? current : { width, height }
      );
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    const source = sampleSvgPathsToStage(koreaPaths, effectiveParticleCount, KOREA_VIEW_BOX, {
      width: stageSize.width,
      height: stageSize.height,
    });

    const target = buildWordmarkPoints("yoonho.dev", effectiveParticleCount, {
      width: stageSize.width,
      height: stageSize.height,
    });

    setSourcePoints(source);
    setTargetPoints(target);
  }, [effectiveParticleCount, reduceMotion, stageSize]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const sprite = document.createElement("canvas");
    const size = isFirefox ? 24 : 32;
    sprite.width = size;
    sprite.height = size;

    const context = sprite.getContext("2d");
    if (!context) {
      return;
    }

    const gradient = context.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    spriteRef.current = sprite;
  }, [isFirefox, reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion || stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      return;
    }

    const rawDpr = window.devicePixelRatio || 1;
    const effectiveDpr = Math.min(rawDpr, isFirefox ? 1 : 1.5);
    const width = Math.max(1, Math.floor(stageSize.width));
    const height = Math.max(1, Math.floor(stageSize.height));

    canvas.width = Math.floor(width * effectiveDpr);
    canvas.height = Math.floor(height * effectiveDpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(effectiveDpr, 0, 0, effectiveDpr, 0, 0);
    context.imageSmoothingEnabled = true;
    contextRef.current = context;
  }, [isFirefox, reduceMotion, stageSize]);

  useAnimationFrame(() => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    const sprite = spriteRef.current;

    if (!canvas || !context || !sprite || reduceMotion || sourcePoints.length === 0 || targetPoints.length === 0) {
      return;
    }

    if (document.hidden) {
      return;
    }

    const width = Math.max(1, Math.floor(stageSize.width));
    const height = Math.max(1, Math.floor(stageSize.height));
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    const frame = getParticleFrame(progressRef.current, sourcePoints, targetPoints, seeds, {
      width,
      height,
    });

    frame.particles.forEach((particle) => {
      if (particle.alpha <= 0.01) {
        return;
      }

      const glowSize = particle.size * (5 + particle.glow * 6);
      context.globalAlpha = Math.min(1, particle.alpha * (0.35 + particle.glow * 0.45));
      context.drawImage(
        sprite,
        particle.x - glowSize / 2,
        particle.y - glowSize / 2,
        glowSize,
        glowSize
      );

      context.globalAlpha = Math.min(1, particle.alpha + 0.08);
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    });

    context.globalAlpha = 1;
  });

  const wordmarkOpacity = Math.min(1, Math.max(0, (displayProgress - 0.72) / 0.18));
  const mapOpacity =
    displayProgress < 0.14
      ? 1
      : displayProgress < 0.3
        ? 1 - (displayProgress - 0.14) / 0.16
        : 0;
  const particleOpacity = displayProgress < 0.06 ? 0 : displayProgress > 0.96 ? 0 : 1;
  const hintOpacity =
    displayProgress < 0.08
      ? 0.8
      : displayProgress < 0.3
        ? 1 - (displayProgress - 0.08) / 0.22
        : 0;

  if (reduceMotion) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-black px-6 py-16 text-white">
        <KoreaMap className="h-full max-h-[60svh] w-full max-w-xl" />
        <div className="text-center font-sans text-[clamp(2.75rem,10vw,7.5rem)] font-bold lowercase tracking-[-0.08em] text-white">
          yoonho.dev
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-black text-white">
      <div className="fixed inset-0 z-0 flex h-svh items-center justify-center overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%),linear-gradient(180deg,_#0a0a0a_0%,_#000_55%,_#000_100%)]" />

        <div className="relative flex h-full w-full items-center justify-center px-6">
          <div
            ref={morphFrameRef}
            className="relative flex aspect-[9/16] w-full max-w-[min(20rem,46vw)] items-center justify-center"
          >
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{ opacity: mapOpacity }}
            >
              <KoreaMap className="h-full w-full" />
            </div>

            {!reduceMotion ? (
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
                style={{ opacity: particleOpacity }}
              />
            ) : null}
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="translate-y-[6svh] text-center font-sans text-[clamp(2.5rem,8vw,6rem)] font-bold lowercase tracking-[-0.08em] text-white transition-opacity duration-300"
              style={{ opacity: reduceMotion ? 1 : wordmarkOpacity, textShadow: reduceMotion ? "none" : "none" }}
            >
              yoonho.dev
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-[12svh] left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.5em] text-white/45 transition-opacity duration-300"
            style={{ opacity: reduceMotion ? 0 : hintOpacity }}
          >
            Scroll
          </div>
        </div>
      </div>

      <section ref={sectionRef} className="relative z-10 h-[300svh] bg-transparent" />
    </main>
  );
}
