import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
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

export interface ArchitectureLayer {
  num: string;
  accentColor: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  flow: string[];
  capabilities: string[];
}

interface ArchitectureStory3DProps {
  layers: ArchitectureLayer[];
}

const layerGeometry = makeBoxLines(4.9, 0.72, 2.5);

const createConnectorLines = (): Float32Array => new Float32Array([
  -1.55, -1.8, 0, -1.55, 1.8, 0,
  0, -1.8, 0, 0, 1.8, 0,
  1.55, -1.8, 0, 1.55, 1.8, 0,
]);

export default function ArchitectureStory3D({ layers }: ArchitectureStory3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(Math.min(1, Math.max(0, layers.length - 1)));
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || layers.length === 0) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: SimpleWebGLRenderer;
    try {
      renderer = new SimpleWebGLRenderer(canvas);
    } catch {
      setWebglSupported(false);
      return;
    }

    const { gl } = renderer;
    const random = seededRandom(314159);
    const ambientPoints = new Float32Array(120 * 3);
    const ambientColors = new Float32Array(120 * 3);
    for (let index = 0; index < 120; index += 1) {
      ambientPoints[index * 3] = (random() - 0.5) * 12;
      ambientPoints[index * 3 + 1] = (random() - 0.5) * 7;
      ambientPoints[index * 3 + 2] = -random() * 8;
      const brightness = 0.06 + random() * 0.16;
      ambientColors.set([brightness, brightness * 1.5, brightness * 1.25], index * 3);
    }

    const connectorLines = createConnectorLines();
    const connectorColors = makeColorArray(connectorLines.length / 3, [0.22, 1, 0.08]);
    const dataParticleCount = 36;
    const dataParticles = new Float32Array(dataParticleCount * 3);
    const dataParticleColors = new Float32Array(dataParticleCount * 3);
    const seeds = Array.from({ length: dataParticleCount }, () => ({
      x: [-1.55, 0, 1.55][Math.floor(random() * 3)],
      offset: random(),
      speed: 0.08 + random() * 0.14,
      z: (random() - 0.5) * 0.25,
    }));

    let scrollProgress = 0.5;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let animationFrame = 0;
    let visible = true;

    const updateScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = (viewport - rect.top) / (viewport + rect.height);
      scrollProgress = Math.max(0.08, Math.min(1, raw));
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.28;
      targetPointerY = ((event.clientY - rect.top) / rect.height - 0.5) * -0.16;
    };
    const onPointerLeave = () => {
      targetPointerX = 0;
      targetPointerY = 0;
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
      pointerX += (targetPointerX - pointerX) * 0.05;
      pointerY += (targetPointerY - pointerY) * 0.05;
      const aspect = canvas.width / Math.max(canvas.height, 1);
      const projection = perspective(Math.PI / 3.25, aspect, 0.1, 100);
      const base = compose(
        projection,
        translation(0, -0.05, -8.4),
        rotationX(-0.13 + pointerY),
        rotationY(-0.28 + pointerX + Math.sin(time * 0.16) * 0.025),
      );

      renderer.draw({ mode: gl.POINTS, positions: ambientPoints, colors: ambientColors, matrix: base, opacity: 0.7, pointSize: 3.1, roundPoints: true });

      const spread = 0.45 + scrollProgress * 0.85;
      layers.forEach((layer, index) => {
        const centeredIndex = index - (layers.length - 1) / 2;
        const active = index === activeIndex;
        const color = hexToRgb(layer.accentColor);
        const y = centeredIndex * 1.45 * spread;
        const z = centeredIndex * 0.34 + (active ? 0.42 : 0);
        const model = compose(
          base,
          translation(centeredIndex * 0.18 * spread, y, z),
          rotationX(0.49 - scrollProgress * 0.22),
          rotationZ(centeredIndex * -0.025),
          scaling(active ? 1.035 : 0.98, active ? 1.035 : 0.98, 1),
        );
        renderer.draw({
          mode: gl.LINES,
          positions: layerGeometry,
          colors: makeColorArray(layerGeometry.length / 3, color),
          matrix: model,
          opacity: active ? 1 : 0.34,
          lineWidth: 1,
        });

        const nodePositions = new Float32Array([
          -1.45, 0, 1.3,
          -0.45, 0.05, 1.3,
          0.55, -0.05, 1.3,
          1.5, 0.02, 1.3,
        ]);
        renderer.draw({
          mode: gl.LINE_STRIP,
          positions: nodePositions,
          colors: makeColorArray(4, color),
          matrix: model,
          opacity: active ? 0.85 : 0.22,
        });
        renderer.draw({
          mode: gl.POINTS,
          positions: nodePositions,
          colors: makeColorArray(4, color),
          matrix: model,
          opacity: active ? 1 : 0.35,
          pointSize: active ? 9.5 : 6,
          roundPoints: true,
        });
      });

      renderer.draw({ mode: gl.LINES, positions: connectorLines, colors: connectorColors, matrix: base, opacity: 0.22 });

      seeds.forEach((seed, index) => {
        const progress = (time * seed.speed + seed.offset) % 1;
        dataParticles[index * 3] = seed.x + Math.sin(time * 0.8 + index) * 0.025;
        dataParticles[index * 3 + 1] = -1.8 + progress * 3.6;
        dataParticles[index * 3 + 2] = seed.z + Math.sin(progress * Math.PI) * 0.35;
        const activeColor = hexToRgb(layers[activeIndex].accentColor);
        dataParticleColors.set(activeColor, index * 3);
      });
      renderer.draw({
        mode: gl.POINTS,
        positions: dataParticles,
        colors: dataParticleColors,
        matrix: base,
        opacity: 0.9,
        pointSize: 6.2,
        roundPoints: true,
      });

      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    updateScroll();
    render(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    };
  }, [activeIndex, layers]);

  const activeLayer = layers[activeIndex];
  if (!activeLayer) return null;

  return (
    <div ref={containerRef} className="architecture-webgl reveal">
      <div className={`architecture-webgl__scene ${webglSupported ? 'is-supported' : 'is-fallback'}`} aria-label="Interactive intelligent commerce architecture">
        <canvas ref={canvasRef} className="architecture-webgl__canvas" aria-hidden="true" />
        <div className="architecture-webgl__hud" aria-hidden="true">
          <span>3D architecture stack</span>
          <span>Scroll separates layers</span>
        </div>
        <div className="architecture-webgl__layer-buttons">
          {layers.map((layer, index) => (
            <button
              key={layer.num}
              type="button"
              className={activeIndex === index ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-pressed={activeIndex === index}
              style={{ '--layer-accent': layer.accentColor } as CSSProperties}
            >
              <span className="architecture-webgl__layer-icon"><layer.Icon aria-hidden="true" /></span>
              <span>
                <small>{layer.num} — Layer</small>
                <strong>{layer.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>

      <aside className="architecture-webgl__detail" style={{ borderColor: `${activeLayer.accentColor}45` }}>
        <div className="architecture-webgl__detail-label" style={{ color: activeLayer.accentColor }}>
          Selected layer · {activeLayer.num}
        </div>
        <h3>{activeLayer.title}</h3>
        <p>{activeLayer.desc}</p>
        <div className="architecture-webgl__flow">
          {activeLayer.flow.map((item, index) => (
            <span key={item}>
              {item}
              {index < activeLayer.flow.length - 1 && <i aria-hidden="true">→</i>}
            </span>
          ))}
        </div>
        <div className="architecture-webgl__capabilities">
          {activeLayer.capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
