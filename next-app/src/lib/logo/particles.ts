export type Point = {
  x: number;
  y: number;
};

export type ParticleSeed = {
  angle: number;
  radius: number;
  wobble: number;
  size: number;
};

const SVG_NS = "http://www.w3.org/2000/svg";

function createSeed(index: number): ParticleSeed {
  const base = Math.sin(index * 12.9898) * 43758.5453;
  const unit = base - Math.floor(base);

  return {
    angle: unit * Math.PI * 2,
    radius: 24 + unit * 90,
    wobble: 0.35 + (1 - unit) * 0.75,
    size: 0.9 + unit * 1.9,
  };
}

function resizePoints(points: Point[], count: number): Point[] {
  if (points.length === count) {
    return points;
  }

  if (points.length === 0) {
    return Array.from({ length: count }, () => ({ x: 0, y: 0 }));
  }

  return Array.from({ length: count }, (_, index) => {
    const sourceIndex = Math.floor((index / count) * points.length);
    return points[sourceIndex] ?? points[points.length - 1];
  });
}

export function sampleSvgPathToStage(
  pathData: string,
  count: number,
  viewBox: { minX: number; minY: number; width: number; height: number },
  stage: { width: number; height: number }
): Point[] {
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", pathData);

  const totalLength = path.getTotalLength();
  const samples = Array.from({ length: count }, (_, index) => {
    const point = path.getPointAtLength((index / count) * totalLength);

    return {
      x: ((point.x - viewBox.minX) / viewBox.width) * stage.width,
      y: ((point.y - viewBox.minY) / viewBox.height) * stage.height,
    };
  });

  return samples;
}

export function sampleSvgPathsToStage(
  paths: string[],
  count: number,
  viewBox: { minX: number; minY: number; width: number; height: number },
  stage: { width: number; height: number }
): Point[] {
  const counts = paths.map((_, index) => {
    const weight = index === 0 ? 0.88 : 0.04;
    return Math.max(16, Math.floor(count * weight));
  });

  const totalAssigned = counts.reduce((sum, value) => sum + value, 0);
  counts[0] += count - totalAssigned;

  const points = paths.flatMap((path, index) =>
    sampleSvgPathToStage(path, counts[index] ?? 0, viewBox, stage)
  );

  return resizePoints(points, count);
}

export function buildWordmarkPoints(
  text: string,
  count: number,
  stage: { width: number; height: number }
): Point[] {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(stage.width));
  canvas.height = Math.max(1, Math.floor(stage.height));

  const context = canvas.getContext("2d");
  if (!context) {
    return Array.from({ length: count }, () => ({
      x: stage.width / 2,
      y: stage.height / 2,
    }));
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  const fontSize = Math.min(stage.width * 0.13, stage.height * 0.18);
  context.font = `700 ${fontSize}px Arial, Helvetica, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ffffff";
  context.fillText(text, canvas.width / 2, canvas.height * 0.55);

  const image = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const sampled: Point[] = [];
  const step = Math.max(2, Math.floor(fontSize / 18));

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const alpha = image[(y * canvas.width + x) * 4 + 3];
      if (alpha > 120) {
        sampled.push({ x, y });
      }
    }
  }

  return resizePoints(sampled, count);
}

function easeInOut(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function createParticleSeeds(count: number) {
  return Array.from({ length: count }, (_, index) => createSeed(index));
}

export function getParticleFrame(
  progress: number,
  source: Point[],
  target: Point[],
  seeds: ParticleSeed[],
  viewport: { width: number; height: number }
) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const particleReveal =
    clamped < 0.08 ? 0 : clamped < 0.2 ? (clamped - 0.08) / 0.12 : 1;
  const particleFade = clamped < 0.84 ? 1 : Math.max(0, 1 - (clamped - 0.84) / 0.16);
  const particles = source.map((from, index) => {
    const to = target[index] ?? from;
    const seed = seeds[index] ?? createSeed(index);

    let x = from.x;
    let y = from.y;
    let alpha = 0.9;

    if (clamped <= 0.18) {
      const settle = clamped / 0.18;
      alpha = 0.45 + settle * 0.45;
    } else if (clamped <= 0.48) {
      const local = easeInOut((clamped - 0.18) / 0.3);
      const burst = seed.radius * local;
      x = from.x + Math.cos(seed.angle) * burst;
      y = from.y + Math.sin(seed.angle) * burst * 0.72;
      alpha = 0.65 + local * 0.2;
    } else {
      const local = easeInOut((clamped - 0.48) / 0.52);
      const startX = from.x + Math.cos(seed.angle) * seed.radius;
      const startY = from.y + Math.sin(seed.angle) * seed.radius * 0.72;
      const wobbleX = Math.cos(seed.angle + local * Math.PI * 2) * seed.wobble * (1 - local) * 12;
      const wobbleY = Math.sin(seed.angle - local * Math.PI * 2) * seed.wobble * (1 - local) * 9;

      x = startX + (to.x - startX) * local + wobbleX;
      y = startY + (to.y - startY) * local + wobbleY;
      alpha = 0.72 + local * 0.25;
    }

    const glow = Math.min(1, Math.max(0, clamped > 0.8 ? (clamped - 0.8) / 0.2 : 0));

    return {
      x,
      y,
      alpha: alpha * particleReveal * particleFade,
      size: seed.size,
      glow: glow * particleReveal * particleFade,
    };
  });

  return {
    particles,
    lineOpacity: clamped < 0.34 ? 1 - clamped / 0.34 : 0,
    wordOpacity: clamped < 0.72 ? 0 : Math.min(1, (clamped - 0.72) / 0.18),
    hintOpacity: clamped < 0.08 ? 0.8 : clamped < 0.3 ? 1 - (clamped - 0.08) / 0.22 : 0,
    centerX: viewport.width / 2,
    centerY: viewport.height / 2,
  };
}
