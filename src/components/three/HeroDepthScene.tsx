import { useEffect, useRef, useState } from 'react';
import {
  SimpleWebGLRenderer,
  compose,
  flattenVec3,
  makeColorArray,
  makeRing,
  perspective,
  rotationX,
  rotationY,
  rotationZ,
  scaling,
  seededRandom,
  translation,
  type Vec3,
} from './webgl';

const GREEN: Vec3 = [0.22, 1, 0.08];
const BLUE: Vec3 = [0, 0.75, 1];
const WHITE: Vec3 = [0.9, 0.96, 1];

const NODE_POSITIONS: Array<{ label: string; position: Vec3; color: Vec3; className: string }> = [
  { label: 'Merchant', position: [-2.75, 1.55, 0.45], color: GREEN, className: 'hero-webgl-label--merchant' },
  { label: 'Cards', position: [2.2, 1.7, -0.25], color: WHITE, className: 'hero-webgl-label--cards' },
  { label: 'RTP', position: [3.15, 0.1, 0.5], color: BLUE, className: 'hero-webgl-label--rtp' },
  { label: 'USDC', position: [2.15, -1.75, 0.7], color: BLUE, className: 'hero-webgl-label--usdc' },
  { label: 'Ledger', position: [-2.25, -1.65, -0.15], color: WHITE, className: 'hero-webgl-label--ledger' },
  { label: 'Agent', position: [-0.35, 2.55, 1.05], color: GREEN, className: 'hero-webgl-label--agent' },
];

const createSpherePoints = (count: number): { positions: Float32Array; colors: Float32Array } => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = goldenAngle * index;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = Math.sin(angle) * radius;
    const mix = (y + 1) / 2;
    colors[index * 3] = GREEN[0] * mix + BLUE[0] * (1 - mix);
    colors[index * 3 + 1] = GREEN[1] * mix + BLUE[1] * (1 - mix);
    colors[index * 3 + 2] = GREEN[2] * mix + BLUE[2] * (1 - mix);
  }
  return { positions, colors };
};

const createStarField = (count: number): { positions: Float32Array; colors: Float32Array } => {
  const random = seededRandom(8042026);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (random() - 0.5) * 15;
    positions[index * 3 + 1] = (random() - 0.5) * 9;
    positions[index * 3 + 2] = -random() * 10 - 1;
    const tint = random();
    const color = tint > 0.82 ? BLUE : tint > 0.62 ? GREEN : WHITE;
    const brightness = 0.2 + random() * 0.45;
    colors[index * 3] = color[0] * brightness;
    colors[index * 3 + 1] = color[1] * brightness;
    colors[index * 3 + 2] = color[2] * brightness;
  }
  return { positions, colors };
};

const createGrid = (): { positions: Float32Array; colors: Float32Array } => {
  const points: Vec3[] = [];
  const colorValues: number[] = [];
  for (let index = -9; index <= 9; index += 1) {
    points.push([index * 0.65, -2.55, -6], [index * 0.65, -2.55, 3]);
    points.push([-6, -2.55, index * 0.65 - 2], [6, -2.55, index * 0.65 - 2]);
    const lineColor = index % 3 === 0 ? GREEN : BLUE;
    for (let repeat = 0; repeat < 4; repeat += 1) colorValues.push(lineColor[0], lineColor[1], lineColor[2]);
  }
  return { positions: flattenVec3(points), colors: new Float32Array(colorValues) };
};

const createConnections = (): { positions: Float32Array; colors: Float32Array } => {
  const points: Vec3[] = [];
  const colorValues: number[] = [];
  NODE_POSITIONS.forEach((node) => {
    points.push([0, 0, 0], node.position);
    colorValues.push(GREEN[0], GREEN[1], GREEN[2], node.color[0], node.color[1], node.color[2]);
  });
  return { positions: flattenVec3(points), colors: new Float32Array(colorValues) };
};

const createNodePoints = (): { positions: Float32Array; colors: Float32Array } => ({
  positions: flattenVec3(NODE_POSITIONS.map((node) => node.position)),
  colors: new Float32Array(NODE_POSITIONS.flatMap((node) => node.color)),
});

export default function HeroDepthScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: SimpleWebGLRenderer;
    try {
      renderer = new SimpleWebGLRenderer(canvas);
    } catch {
      setSupported(false);
      return;
    }

    const { gl } = renderer;
    const sphere = createSpherePoints(window.innerWidth < 768 ? 430 : 900);
    const stars = createStarField(window.innerWidth < 768 ? 180 : 460);
    const grid = createGrid();
    const connections = createConnections();
    const nodes = createNodePoints();
    const ringOne = makeRing(2.15, 1.02, 220);
    const ringTwo = makeRing(2.72, 1.42, 260);
    const ringThree = makeRing(3.38, 1.82, 300);
    const ringOneColors = makeColorArray(ringOne.length / 3, GREEN);
    const ringTwoColors = makeColorArray(ringTwo.length / 3, BLUE);
    const ringThreeColors = makeColorArray(ringThree.length / 3, WHITE);
    const particleCount = window.innerWidth < 768 ? 28 : 64;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const random = seededRandom(10092026);
    const particleSeeds = Array.from({ length: particleCount }, () => ({
      route: Math.floor(random() * NODE_POSITIONS.length),
      speed: 0.05 + random() * 0.12,
      offset: random(),
      wobble: random() * Math.PI * 2,
    }));

    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let scrollProgress = 0;
    let animationFrame = 0;
    let visible = true;

    const onPointerMove = (event: PointerEvent) => {
      targetPointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      targetPointerY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };
    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    const render = (timeMilliseconds: number) => {
      if (!visible) return;
      renderer.resize();
      renderer.clear();
      const time = timeMilliseconds * 0.001;
      pointerX += (targetPointerX - pointerX) * 0.045;
      pointerY += (targetPointerY - pointerY) * 0.045;
      const aspect = canvas.width / Math.max(canvas.height, 1);
      const projection = perspective(Math.PI / 3.15, aspect, 0.1, 100);
      const camera = compose(
        projection,
        translation(window.innerWidth < 900 ? 0.6 : 1.6, 0.05 + scrollProgress * 0.25, -7.2 - scrollProgress * 0.5),
        rotationX(-0.13 + pointerY * 0.18),
        rotationY(0.18 + pointerX * 0.32 + time * 0.025),
        rotationZ(-0.045),
      );

      renderer.draw({
        mode: gl.POINTS,
        positions: stars.positions,
        colors: stars.colors,
        matrix: compose(projection, translation(0.8, 0, -3), rotationY(pointerX * 0.08 + time * 0.002)),
        opacity: 0.7,
        pointSize: 3.2,
        roundPoints: true,
      });
      renderer.draw({ mode: gl.LINES, positions: grid.positions, colors: grid.colors, matrix: camera, opacity: 0.1 });

      const coreMatrix = compose(camera, rotationY(time * 0.24), rotationX(time * 0.1), scaling(1.05, 1.05, 1.05));
      renderer.draw({
        mode: gl.POINTS,
        positions: sphere.positions,
        colors: sphere.colors,
        matrix: coreMatrix,
        opacity: 0.95,
        pointSize: 5.4,
        roundPoints: true,
      });

      renderer.draw({
        mode: gl.LINE_STRIP,
        positions: ringOne,
        colors: ringOneColors,
        matrix: compose(camera, rotationZ(time * 0.18), rotationX(0.82)),
        opacity: 0.62,
      });
      renderer.draw({
        mode: gl.LINE_STRIP,
        positions: ringTwo,
        colors: ringTwoColors,
        matrix: compose(camera, rotationZ(-time * 0.12 + 0.55), rotationX(1.07), rotationY(0.35)),
        opacity: 0.46,
      });
      renderer.draw({
        mode: gl.LINE_STRIP,
        positions: ringThree,
        colors: ringThreeColors,
        matrix: compose(camera, rotationZ(time * 0.075 - 0.35), rotationX(1.22), rotationY(-0.45)),
        opacity: 0.2,
      });

      renderer.draw({
        mode: gl.LINES,
        positions: connections.positions,
        colors: connections.colors,
        matrix: camera,
        opacity: 0.34,
      });
      renderer.draw({
        mode: gl.POINTS,
        positions: nodes.positions,
        colors: nodes.colors,
        matrix: camera,
        opacity: 1,
        pointSize: 12,
        roundPoints: true,
      });

      particleSeeds.forEach((seed, index) => {
        const destination = NODE_POSITIONS[seed.route];
        const progress = (time * seed.speed + seed.offset) % 1;
        const eased = progress * progress * (3 - 2 * progress);
        particlePositions[index * 3] = destination.position[0] * eased + Math.sin(time * 1.8 + seed.wobble) * 0.05;
        particlePositions[index * 3 + 1] = destination.position[1] * eased + Math.cos(time * 1.5 + seed.wobble) * 0.05;
        particlePositions[index * 3 + 2] = destination.position[2] * eased + Math.sin(progress * Math.PI) * 0.42;
        const color = seed.route % 2 === 0 ? GREEN : BLUE;
        particleColors.set(color, index * 3);
      });
      renderer.draw({
        mode: gl.POINTS,
        positions: particlePositions,
        colors: particleColors,
        matrix: camera,
        opacity: 0.95,
        pointSize: 7.4,
        roundPoints: true,
      });

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    onScroll();
    render(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`hero-webgl-scene ${supported ? 'is-supported' : 'is-fallback'}`} aria-hidden="true">
      <canvas ref={canvasRef} className="hero-webgl-scene__canvas" />
      <div className="hero-webgl-scene__vignette" />
      <div className="hero-webgl-scene__labels">
        {NODE_POSITIONS.map((node) => (
          <span key={node.label} className={`hero-webgl-label ${node.className}`}>
            <i style={{ background: node.color === BLUE ? '#00bfff' : '#39ff14' }} />
            {node.label}
          </span>
        ))}
      </div>
      <div className="hero-webgl-scene__status">
        <span /> Live WebGL money network
      </div>
    </div>
  );
}
