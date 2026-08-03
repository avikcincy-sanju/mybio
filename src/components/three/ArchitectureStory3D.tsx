import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';

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

export default function ArchitectureStory3D({ layers }: ArchitectureStory3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const raw = (viewport - rect.top) / (viewport + rect.height);
        const progress = Math.max(0, Math.min(1, raw));
        container.style.setProperty('--architecture-progress', String(progress));
        container.style.setProperty('--architecture-translate-y', `${(0.5 - progress) * 26}px`);
        container.style.setProperty('--architecture-rotate-y', `${(0.5 - progress) * 8}deg`);
        container.style.setProperty('--architecture-rail-opacity', String(0.08 + progress * 0.2));
        container.style.setProperty('--architecture-core-scale', String(0.7 + progress * 0.3));
        setProgress(reducedMotion.matches ? 1 : progress);
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const activeLayer = layers[activeIndex];

  return (
    <div ref={containerRef} className="architecture-story-3d reveal">
      <div className="architecture-story-3d__scene" aria-label="Interactive intelligent commerce architecture">
        <div className="architecture-story-3d__floor" aria-hidden="true" />
        <div className="architecture-story-3d__rail architecture-story-3d__rail--left" aria-hidden="true" />
        <div className="architecture-story-3d__rail architecture-story-3d__rail--right" aria-hidden="true" />

        <div className="architecture-story-3d__stack">
          {layers.map((layer, index) => {
            const offset = index - 1;
            const spread = progress;
            const translateX = offset * 34 * spread;
            const translateY = offset * 118 * spread;
            const translateZ = offset * 92 * spread;
            const rotateX = 58 - progress * 42;
            const rotateZ = offset * -2.5 * spread;
            return (
              <button
                key={layer.num}
                type="button"
                className={`architecture-story-3d__layer ${activeIndex === index ? 'is-active' : ''}`}
                style={{
                  '--layer-index': index,
                  '--layer-offset': offset,
                  '--layer-accent': layer.accentColor,
                  transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
                } as CSSProperties}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
              >
                <span className="architecture-story-3d__layer-shine" aria-hidden="true" />
                <span className="architecture-story-3d__layer-icon">
                  <layer.Icon aria-hidden="true" />
                </span>
                <span className="architecture-story-3d__layer-copy">
                  <small>{layer.num} — Architecture layer</small>
                  <strong>{layer.title}</strong>
                  <span>{layer.flow.join(' · ')}</span>
                </span>
                <span className="architecture-story-3d__layer-depth" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="architecture-story-3d__core" aria-hidden="true">
          <span />
          <i />
        </div>
      </div>

      <aside className="architecture-story-3d__detail" style={{ borderColor: `${activeLayer.accentColor}33` }}>
        <div className="architecture-story-3d__detail-label" style={{ color: activeLayer.accentColor }}>
          Selected layer · {activeLayer.num}
        </div>
        <h3>{activeLayer.title}</h3>
        <p>{activeLayer.desc}</p>
        <div className="architecture-story-3d__flow">
          {activeLayer.flow.map((item, index) => (
            <span key={item}>
              {item}
              {index < activeLayer.flow.length - 1 && <i aria-hidden="true">→</i>}
            </span>
          ))}
        </div>
        <div className="architecture-story-3d__capabilities">
          {activeLayer.capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
