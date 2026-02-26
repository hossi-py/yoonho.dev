'use client';

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Eye, Layers, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ── 모바일 감지 훅 ──
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

const marqueeItems = [
  'Frontend Engineering',
  'React & Next.js',
  'TypeScript Patterns',
  'Devlog & TIL',
  'Work Project Cases',
  'UI/UX Problem Solving',
];

const featureCards = [
  {
    title: 'Study Log',
    description: '하루 학습 내용을 기록하고 시행착오를 정리해 다음 구현에 바로 반영합니다.',
    icon: Zap,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Work Projects',
    description: '회사에서 진행한 기능 개발과 개선 경험을 배경, 선택, 결과 중심으로 공유합니다.',
    icon: Eye,
    color: 'from-fuchsia-400 to-purple-500',
  },
  {
    title: 'Interests',
    description: '프론트엔드 생산성, UI/UX, 협업 방식처럼 제가 꾸준히 파고드는 관심사를 다룹니다.',
    icon: Layers,
    color: 'from-lime-400 to-emerald-500',
  },
];

// 텍스트 스크램블 효과
function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '.' || char === '\n') return char;
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return display;
}

// 플루이드 블롭 컴포넌트 (will-change 추가로 GPU 가속)
function FluidBlob({
  className,
  color1 = '#f0abfc',
  color2 = '#22d3ee',
  delay = 0,
}: {
  className?: string;
  color1?: string;
  color2?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn('absolute', className)}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        background: `linear-gradient(135deg, ${color1}40, ${color2}40)`,
        filter: 'blur(60px)',
        willChange: 'transform',
      }}
    />
  );
}

// 벌집 패턴 배경
function HexagonPattern() {
  return (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagons"
            width="50"
            height="43.4"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <polygon
              fill="none"
              stroke="white"
              strokeWidth="1"
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              transform="translate(-12.3, -22)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

// 3D 틸트 카드 — useMotionValue로 리렌더 제거
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      rotateX.set(((e.clientY - centerY) / (rect.height / 2)) * -15);
      rotateY.set(((e.clientX - centerX) / (rect.width / 2)) * 15);
      glowX.set(((e.clientX - rect.left) / rect.width) * 100);
      glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rotateX, rotateY, glowX, glowY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: glowBg }}
      />
      {children}
    </motion.div>
  );
}

// 파티클 필드 — O(n) 최적화, 연결선 제거, visibility 기반 정지
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }>
  >([]);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── visibility 감지: 탭이 백그라운드면 중단 ──
    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (isVisibleRef.current && !animationRef.current) animate();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#22d3ee', '#f0abfc', '#a3e635', '#fbbf24'];
    const PARTICLE_COUNT = 20; // 36 → 20 으로 축소
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // O(n) 렌더링 — 연결선(O(n²)) 제거
    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = 0;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.6;

      for (const particle of particlesRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.6, zIndex: 1 }}
    />
  );
}

// 수평 스크롤 섹션 - 개선된 버전
function HorizontalScrollSection({
  scrollContainerRef,
}: {
  scrollContainerRef: RefObject<HTMLElement | null>;
}) {
  const HORIZONTAL_DISTANCE = '-128vw';
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const forwardReleaseAccumRef = useRef(0);
  const horizontalTarget = useMotionValue(0);
  const horizontalProgress = useSpring(horizontalTarget, {
    stiffness: 210,
    damping: 34,
    mass: 0.55,
  });
  const x = useTransform(horizontalProgress, [0, 1], ['0%', HORIZONTAL_DISTANCE]);

  const items = [
    {
      title: 'Blog',
      subtitle: 'Study Archive',
      description: '개념 정리부터 트러블슈팅까지, 공부 흔적을 누적하는 기록 공간입니다.',
      color: 'from-cyan-400 to-blue-600',
      bg: 'bg-cyan-500',
    },
    {
      title: 'Projects',
      subtitle: 'Work Cases',
      description: '회사에서 만든 기능을 왜 그렇게 구현했는지 의사결정 과정까지 남깁니다.',
      color: 'from-fuchsia-400 to-purple-600',
      bg: 'bg-fuchsia-500',
    },
    {
      title: 'About Me',
      subtitle: 'Values & Interests',
      description: '어떤 개발자인지, 무엇에 끌리고 어떤 방식으로 성장하는지 소개합니다.',
      color: 'from-lime-400 to-emerald-600',
      bg: 'bg-lime-500',
    },
  ];

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    const section = containerRef.current;
    const sticky = stickyRef.current;
    if (!scroller || !section || !sticky) return;

    const STEP = 0.003;
    const PINNED_BUFFER = 56;
    const PROGRESS_EPSILON = 0.001;
    const FORWARD_RELEASE_THRESHOLD = 220;

    // sticky top = 15vh → (viewport 높이) * 0.15 와 동일
    const getStickyTopPx = () => scroller.clientHeight * 0.15;

    // ── 섹션이 뷰포트 아래에 있으면 수평 진행도를 0으로 리셋 ──
    // 사용자가 위로 돌아온 뒤 다시 내려올 때 처음부터 시작하도록 한다.
    const onScroll = () => {
      const sectionTop = section.offsetTop;
      const viewportBottom = scroller.scrollTop + scroller.clientHeight;

      if (viewportBottom < sectionTop && horizontalTarget.get() > PROGRESS_EPSILON) {
        horizontalTarget.set(0);
        forwardReleaseAccumRef.current = 0;
      }
    };

    const onWheel = (event: WheelEvent) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const viewportTop = scroller.scrollTop;
      const viewportBottom = viewportTop + scroller.clientHeight;
      const isSectionVisible = viewportBottom > sectionTop && viewportTop < sectionBottom;
      if (!isSectionVisible) return;

      const stickyTopOffset = getStickyTopPx();
      const stickyStart = sectionTop - stickyTopOffset;
      const stickyEnd = sectionBottom - scroller.clientHeight;
      const isStickyPinned =
        viewportTop >= stickyStart - PINNED_BUFFER && viewportTop <= stickyEnd + PINNED_BUFFER;
      if (!isStickyPinned) {
        forwardReleaseAccumRef.current = 0;
        return;
      }

      const current = horizontalTarget.get();
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      if (direction < 0) {
        forwardReleaseAccumRef.current = 0;
      }

      const reachedEnd = current >= 1 - PROGRESS_EPSILON;
      if (direction > 0 && reachedEnd) {
        if (forwardReleaseAccumRef.current < FORWARD_RELEASE_THRESHOLD) {
          event.preventDefault();
          forwardReleaseAccumRef.current += Math.abs(event.deltaY);
          return;
        }
        return;
      }

      const deltaUnit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      const normalizedDelta = Math.min(48, Math.abs(event.deltaY) * deltaUnit);
      const next = Math.min(1, Math.max(0, current + normalizedDelta * STEP * direction));

      const shouldConsume =
        (direction > 0 && current < 1 - PROGRESS_EPSILON) ||
        (direction < 0 && current > PROGRESS_EPSILON);
      if (!shouldConsume) return;

      // 수평 전환이 끝나기 전에는 세로 스크롤을 막아 카드 진행을 우선시한다.
      event.preventDefault();
      horizontalTarget.set(next);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    scroller.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      scroller.removeEventListener('wheel', onWheel);
    };
  }, [horizontalTarget, scrollContainerRef]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '220vh', zIndex: 10 }}>
      <div
        ref={stickyRef}
        className="sticky h-[70vh] overflow-hidden flex flex-col justify-center bg-[#06070b]"
        style={{ top: '15vh' }}
      >
        {/* 섹션 타이틀 */}
        <div className="px-8 mb-6 z-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
            Scroll Through My Story
          </p>
          <h3 className="text-2xl font-bold text-white">What I Share</h3>
        </div>

        <motion.div className="flex gap-8 px-8" style={{ x }}>
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="w-[70vw] h-[55vh] flex-shrink-0 relative overflow-hidden rounded-3xl border border-white/20"
            >
              {/* 배경 그라데이션 */}
              <div className={cn('absolute inset-0 bg-gradient-to-br', item.color)} />

              {/* 패턴 오버레이 */}
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* 글리치 효과 오버레이 */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  opacity: [0, 0.3, 0],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 4 + i * 2,
                  ease: 'linear',
                }}
              />

              {/* 콘텐츠 */}
              <div className="relative h-full flex flex-col justify-center items-center text-white p-8">
                <motion.span
                  className="text-sm uppercase tracking-[0.3em] mb-4 text-white/80 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.subtitle}
                </motion.span>
                <motion.h2
                  className="text-7xl md:text-8xl font-black tracking-tighter mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                >
                  {item.title}
                </motion.h2>
                <motion.div
                  className="w-32 h-1 bg-white/70 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />

                {/* 추가 정보 */}
                <motion.p
                  className="mt-8 text-white/70 text-center max-w-md"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {item.description}
                </motion.p>

                {/* 인덱스 표시 */}
                <div className="absolute bottom-8 right-8 text-6xl font-black text-white/20">
                  0{i + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 진행 표시기 */}
        <div className="absolute bottom-8 left-1/2 w-[220px] -translate-x-1/2 rounded-full bg-white/20 p-[2px]">
          <motion.div
            className="h-[4px] rounded-full bg-white"
            style={{
              scaleX: horizontalProgress,
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// 글리치 텍스트
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={cn('relative inline-block cursor-default', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              className="absolute inset-0 text-cyan-400"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0, 1, 0],
                x: [-2, 2, -2, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              {text}
            </motion.span>
            <motion.span
              className="absolute inset-0 text-fuchsia-400"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0, 1, 0],
                x: [2, -2, 2, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              {text}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

function ScrambledGlitchText({
  text,
  trigger,
  widthCh,
  className,
}: {
  text: string;
  trigger: boolean;
  widthCh: number;
  className?: string;
}) {
  const scrambled = useTextScramble(text, trigger);

  return (
    <span className="inline-block align-top" style={{ width: `${widthCh}ch` }}>
      <GlitchText text={scrambled} className={className} />
    </span>
  );
}

function RootHomeExperienceContent({ scrollContainer }: { scrollContainer: HTMLElement }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(scrollContainer);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: rootRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.28 });
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  // ── useTransform 을 컴포넌트 최상위로 이동 (렌더 바디 내 호출 제거) ──
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const orbNegY = useTransform(orbY, (v) => -v * 0.6);
  const orbNegRotate = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const orbSmallY = useTransform(orbY, (v) => v * 0.35);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.4 });
  const glowY = useSpring(my, { stiffness: 140, damping: 24, mass: 0.4 });
  const glowXPercent = useTransform(glowX, (v) => `${v * 100}%`);
  const glowYPercent = useTransform(glowY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(800px circle at ${glowXPercent} ${glowYPercent}, rgba(255,255,255,0.15), transparent 50%)`;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-clip bg-[#06070b]"
      onMouseMove={
        isMobile
          ? undefined
          : (e) => {
              const bounds = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - bounds.left) / bounds.width);
              my.set((e.clientY - bounds.top) / bounds.height);
            }
      }
    >
      {/* 모바일에서 ParticleField 비활성화 */}
      {!isMobile && <ParticleField />}

      {/* 스크롤 프로그레스 바 */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-300"
        style={{ scaleX: progress }}
      />

      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0 bg-[#06070b]" style={{ zIndex: 0 }} />
      {/* 모바일에서 커서 스포트라이트 비활성화 */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight, zIndex: 2 }}
        />
      )}
      <HexagonPattern />

      {/* 플루이드 블롭들 — 모바일 비활성화 */}
      {!isMobile && (
        <>
          <FluidBlob
            className="-left-40 top-20 w-[40rem] h-[40rem]"
            color1="#f0abfc"
            color2="#c084fc"
            delay={0}
          />
          <FluidBlob
            className="-right-32 top-32 w-[35rem] h-[35rem]"
            color1="#22d3ee"
            color2="#0ea5e9"
            delay={2}
          />
          <FluidBlob
            className="bottom-20 left-1/4 w-[30rem] h-[30rem]"
            color1="#a3e635"
            color2="#22c55e"
            delay={4}
          />

          {/* 추가 블롭 */}
          <motion.div
            style={{ y: orbY, rotate: orbRotate }}
            className="pointer-events-none absolute -left-28 top-16 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/30 blur-[130px]"
          />
          <motion.div
            style={{ y: orbNegY, rotate: orbNegRotate }}
            className="pointer-events-none absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full bg-cyan-400/25 blur-[120px]"
          />
          <motion.div
            style={{ y: orbSmallY }}
            className="pointer-events-none absolute bottom-8 left-1/3 h-[24rem] w-[24rem] rounded-full bg-lime-300/15 blur-[120px]"
          />
        </>
      )}

      {/* 히어로 섹션 */}
      <section
        className="relative px-6 pb-20 pt-24 md:pt-28 min-h-screen flex items-center"
        style={{ zIndex: 5 }}
      >
        <motion.div style={{ y: heroY }} className="mx-auto max-w-7xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mb-7 inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md rounded-full"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </motion.span>
            FE DEVELOPER DEVLOG & PROJECT ARCHIVE
          </motion.p>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            >
              <h1 className="text-balance text-5xl font-black leading-[0.9] tracking-[-0.03em] text-white md:text-7xl lg:text-[7.4rem]">
                <ScrambledGlitchText text="STUDY." trigger={isLoaded} widthCh={6} />
                <br />
                <ScrambledGlitchText
                  text="BUILD."
                  trigger={isLoaded}
                  widthCh={6}
                  className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-lime-200 bg-clip-text text-transparent"
                />
                <br />
                <ScrambledGlitchText text="SHARE." trigger={isLoaded} widthCh={6} />
              </h1>
              <motion.p
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                이 공간에는 FE 개발자로서의 학습 기록, 회사에서 진행한 프로젝트, 그리고 제가
                중요하게 생각하는 관심사와 일하는 방식이 담겨 있습니다.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="h-12 border-0 bg-white text-black hover:bg-white/90 rounded-full px-8 font-semibold group"
                  >
                    <Link href="/projects">
                      회사 프로젝트 보기
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-white/35 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                  >
                    <Link href="/blog">공부 블로그 읽기</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid gap-3"
            >
              {[
                { text: '학습 기록', color: 'from-cyan-400/20 to-blue-500/20' },
                { text: '실무 프로젝트', color: 'from-fuchsia-400/20 to-purple-500/20' },
                { text: '관심사 탐구', color: 'from-lime-400/20 to-emerald-500/20' },
              ].map((item, i) => (
                <TiltCard key={item.text}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      'border border-white/20 bg-gradient-to-r p-4 text-white backdrop-blur-xl rounded-xl cursor-pointer',
                      item.color
                    )}
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">
                      Focus 0{i + 1}
                    </p>
                    <p className="mt-1.5 text-lg font-bold tracking-tight">{item.text}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 마퀴 섹션 — 개별 회전 애니메이션 제거 */}
      <section
        className="overflow-hidden border-y border-white/15 bg-white/[0.04] py-4 backdrop-blur-xl relative"
        style={{ zIndex: 5 }}
      >
        <motion.div
          className="flex w-max items-center gap-6"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (text, index) => (
              <div key={`${text}-${index}`} className="flex items-center gap-4 px-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/70 whitespace-nowrap">
                  {text}
                </span>
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300" />
              </div>
            )
          )}
        </motion.div>
      </section>

      {/* 수평 스크롤 섹션 */}
      <HorizontalScrollSection scrollContainerRef={scrollContainerRef} />

      {/* 피처 카드 섹션 */}
      <section className="px-6 py-24 relative" style={{ zIndex: 5 }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <GlitchText text="WHAT I SHARE" />
            </h2>
            <p className="text-white/60">블로그, 프로젝트, 그리고 FE 개발자로서의 성장 기록</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card, index) => (
              <TiltCard key={card.title} className="group">
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden border border-white/15 bg-white/[0.06] p-8 backdrop-blur-xl rounded-2xl h-full"
                >
                  {/* 그라데이트 배경 */}
                  <motion.div
                    className={cn(
                      'absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                      card.color
                    )}
                  />

                  {/* 아이콘 */}
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <p className="text-xs uppercase tracking-[0.17em] text-white/55 mb-2">
                    Track 0{index + 1}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">{card.description}</p>

                  {/* 애니메이션 라인 */}
                  <motion.div
                    className={cn('mt-6 h-[2px] w-14 bg-gradient-to-r', card.color)}
                    initial={{ scaleX: 1 }}
                    whileHover={{ scaleX: 2 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />

                  {/* 코너 장식 */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <motion.div
                      className={cn(
                        'absolute top-0 right-0 w-full h-full bg-gradient-to-bl opacity-0 group-hover:opacity-30 transition-opacity',
                        card.color
                      )}
                      style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                    />
                  </div>
                </motion.article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ zIndex: 5 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/20 via-transparent to-cyan-900/20" />
        <motion.div
          className="mx-auto max-w-4xl text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-black text-white mb-6"
            animate={{
              textShadow: [
                '0 0 20px rgba(34, 211, 238, 0.5)',
                '0 0 40px rgba(240, 171, 252, 0.5)',
                '0 0 20px rgba(34, 211, 238, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            FOLLOW MY
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-lime-200 bg-clip-text text-transparent">
              FRONTEND JOURNEY
            </span>
          </motion.h2>
          <p className="text-white/60 text-lg mb-8">
            새로운 글과 프로젝트 회고를 계속 업데이트하고 있습니다.
          </p>
          <motion.div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="h-14 px-10 rounded-full bg-white text-black font-bold text-lg border-0 hover:bg-white/90 group"
              >
                <Link href="/about">
                  About Me 보러가기
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                className="h-14 px-10 rounded-full border-white/35 bg-transparent text-white text-lg hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                <Link href="/blog">블로그 둘러보기</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export function RootHomeExperience() {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setScrollContainer(document.getElementById('app-scroll-container'));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!scrollContainer) {
    return <div className="min-h-screen bg-[#06070b]" />;
  }

  return <RootHomeExperienceContent scrollContainer={scrollContainer} />;
}
