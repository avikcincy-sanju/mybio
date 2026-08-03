import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import {
  SimpleWebGLRenderer,
  compose,
  hexToRgb,
  makeBoxLines,
  makeColorArray,
  perspective,
  rotationX,
  rotationY,
  rotationZ,
  scaling,
  seededRandom,
  translation,
  type Vec3,
} from './webgl';

export interface BuildWorldItem {
  title: string;
  category: string;
  desc: string;
  value: string;
  demoUrl: string;
  sourceUrl: string;
  accent: string;
}

interface InteractiveBuildWorldProps {
  items: BuildWorldItem[];
}

const createGrid = (): { positions: Float32Array; colors: Float32Array } => {
  const positions: number[] = [];
  const colors: number[] = [];
  for (let index = -12; index <= 12; index += 1) {
    positions.push(index * 0.5, -2.3, -6, index * 0.5, -2.3, 4);
    positions.push(-6, -2.3, index * 0.5 - 2, 6, -2.3, index * 0.5 - 2);
    const color: Vec3 = index % 4 === 0 ? [0.22, 1, 0.08] : [0, 0.55, 0.85];
    for (let point = 0; point < 4; point += 1) colors.push(...color);
  }
  return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
};

const panelLines = makeBoxLines(2.2, 1.28, 0.16);

export default function InteractiveBuildWorld({ items }: InteractiveBuildWorldProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeItem = items[activeIndex];

  const positionedItems = useMemo(
    () => items.map((item, index) => {
      let relative = index - activeIndex;
      const half = items.length / 2;
      if (relative > half) relative -= items.length;
      if (relative < -half) relative += items.length;
      return { item, index, relative };
    }),
    [activeIndex, items],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: SimpleWebGLRenderer;
    try {
      renderer = new SimpleWebGLRenderer(canvas);
    } catch {
      setWebglSupported(false);
      return;
    }

    const { gl } = renderer;
    const grid = createGrid();
    const random = seededRandom(7112026);
    const stars = new Float32Array(170 * 3);
    const starColors = new Float32Array(170 * 3);
    for (let index = 0; index < 170; index += 1) {
      stars[index * 3] = (random() - 0.5) * 12;
      stars[index * 3 + 1] = (random() - 0.5) * 7;
      stars[index * 3 + 2] = -random() * 8;
      const brightness = 0.08 + random() * 0.24;
      starColors.set([brightness, brightness * 1.5, brightness], index * 3);
    }
    const orbitPoints = new Float32Array(42 * 3);
    const orbitColors = new Float32Array(42 * 3);

    let targetYaw = 0;
    let targetPitch = 0;
    let yaw = 0;
    let pitch = 0;
    let animationFrame = 0;
    let visible = true;

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetYaw = ((event.clientX - rect.left) / rect.width - 0.5) * 0.34;
      targetPitch = ((event.clientY - rect.top) / rect.height - 0.5) * -0.2;
    };
    const onPointerLeave = () => {
      targetYaw = 0;
      targetPitch = 0;
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
      yaw += (targetYaw - yaw) * 0.055;
      pitch += (targetPitch - pitch) * 0.055;
      const aspect = canvas.width / Math.max(canvas.height, 1);
      const projection = perspective(Math.PI / 3.3, aspect, 0.1, 100);
      const sceneMatrix = compose(
        projection,
        translation(0, 0.15, -7.4),
        rotationX(-0.12 + pitch),
        rotationY(yaw + Math.sin(time * 0.18) * 0.035),
      );

      renderer.draw({ mode: gl.POINTS, positions: stars, colors: starColors, matrix: sceneMatrix, opacity: 0.72, pointSize: 3, roundPoints: true });
      renderer.draw({ mode: gl.LINES, positions: grid.positions, colors: grid.colors, matrix: sceneMatrix, opacity: 0.095 });

      positionedItems.forEach(({ item, relative }) => {
        const accent = hexToRgb(item.accent);
        const absoluteRelative = Math.abs(relative);
        const active = relative === 0;
        const x = relative * 2.72;
        const y = active ? 0.15 : -0.12 - absoluteRelative * 0.08;
        const z = active ? 0.65 : -1.3 - absoluteRelative * 0.4;
        const modelMatrix = compose(
          sceneMatrix,
          translation(x, y, z),
          rotationY(relative * -0.42 + Math.sin(time * 0.45 + relative) * 0.015),
          rotationX(active ? -0.03 : -0.1),
          scaling(active ? 1.08 : 0.84, active ? 1.08 : 0.84, 1),
        );
        renderer.draw({
          mode: gl.LINES,
          positions: panelLines,
          colors: makeColorArray(panelLines.length / 3, accent),
          matrix: modelMatrix,
          opacity: active ? 0.95 : 0.28,
          lineWidth: 1,
        });

        const nodePositions = new Float32Array([
          -0.72, 0.22, 0.11,
          -0.2, -0.2, 0.11,
          0.35, 0.26, 0.11,
          0.72, -0.18, 0.11,
        ]);
        renderer.draw({
          mode: gl.POINTS,
          positions: nodePositions,
          colors: makeColorArray(4, accent),
          matrix: modelMatrix,
          opacity: active ? 1 : 0.34,
          pointSize: active ? 10 : 6,
          roundPoints: true,
        });
        renderer.draw({
          mode: gl.LINE_STRIP,
          positions: nodePositions,
          colors: makeColorArray(4, accent),
          matrix: modelMatrix,
          opacity: active ? 0.72 : 0.2,
        });
      });

      const activeAccent = hexToRgb(items[activeIndex].accent);
      for (let index = 0; index < 42; index += 1) {
        const angle = time * 0.45 + (index / 42) * Math.PI * 2;
        const radius = 2.25 + Math.sin(index * 1.7) * 0.22;
        orbitPoints[index * 3] = Math.cos(angle) * radius;
        orbitPoints[index * 3 + 1] = Math.sin(angle * 1.4) * 0.48;
        orbitPoints[index * 3 + 2] = Math.sin(angle) * 0.8;
        orbitColors.set(activeAccent, index * 3);
      }
      renderer.draw({ mode: gl.POINTS, positions: orbitPoints, colors: orbitColors, matrix: sceneMatrix, opacity: 0.48, pointSize: 4.6, roundPoints: true });

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    render(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    };
  }, [activeIndex, items, positionedItems]);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  if (!activeItem) return null;

  return (
    <div className="build-world-webgl reveal" aria-label="Interactive featured product world">
      <div className={`build-world-webgl__viewport ${webglSupported ? 'is-supported' : 'is-fallback'}`}>
        <canvas ref={canvasRef} className="build-world-webgl__canvas" aria-hidden="true" />
        <div className="build-world-webgl__hud" aria-hidden="true">
          <span>WebGL product universe</span>
          <span>Pointer-reactive · Live</span>
        </div>
        <div className="build-world-webgl__selector" aria-label="Choose a featured build">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={activeIndex === index ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-pressed={activeIndex === index}
            >
              <i style={{ background: item.accent }} />
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="build-world-webgl__console">
        <div>
          <div className="build-world-webgl__eyebrow" style={{ color: activeItem.accent }}>
            Active build 0{activeIndex + 1} / 0{items.length}
          </div>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.desc}</p>
          <div className="build-world-webgl__value">
            <span>Business value</span>
            {activeItem.value}
          </div>
        </div>

        <div className="build-world-webgl__actions">
          <div className="build-world-webgl__switcher" aria-label="Select featured build">
            <button type="button" onClick={() => move(-1)} aria-label="Previous build">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next build">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <a href={activeItem.demoUrl} target="_blank" rel="noopener noreferrer" className="build-world-webgl__launch">
            Launch demo <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={activeItem.sourceUrl} target="_blank" rel="noopener noreferrer" className="build-world-webgl__source">
            Source <Github aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
