import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';

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

export default function InteractiveBuildWorld({ items }: InteractiveBuildWorldProps) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  return (
    <div className="build-world-3d reveal" aria-label="Interactive featured product world">
      <div className="build-world-3d__viewport">
        <div className="build-world-3d__grid" aria-hidden="true" />
        <div className="build-world-3d__beam build-world-3d__beam--one" aria-hidden="true" />
        <div className="build-world-3d__beam build-world-3d__beam--two" aria-hidden="true" />

        <div className="build-world-3d__stage">
          {positionedItems.map(({ item, index, relative }) => {
            const isActive = relative === 0;
            const transform = `translate3d(${relative * 250}px, ${Math.abs(relative) * 16}px, ${isActive ? 65 : -Math.abs(relative) * 145}px) rotateY(${relative * -28}deg) scale(${isActive ? 1 : 0.84})`;

            return (
              <button
                key={item.title}
                type="button"
                className={`build-world-3d__terminal ${isActive ? 'is-active' : ''}`}
                style={{
                  transform,
                  zIndex: 10 - Math.abs(relative),
                  opacity: Math.abs(relative) > 1 ? 0 : isActive ? 1 : 0.48,
                  borderColor: isActive ? `${item.accent}66` : '#202020',
                }}
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Show ${item.title}`}
              >
                <span className="build-world-3d__terminal-glow" style={{ background: item.accent }} aria-hidden="true" />
                <span className="build-world-3d__terminal-topline" style={{ color: item.accent }}>
                  {item.category}
                </span>
                <span className="build-world-3d__terminal-title">{item.title}</span>
                <span className="build-world-3d__terminal-screen" aria-hidden="true">
                  <span className="build-world-3d__screen-row build-world-3d__screen-row--wide" />
                  <span className="build-world-3d__screen-row" />
                  <span className="build-world-3d__screen-row build-world-3d__screen-row--short" />
                  <span className="build-world-3d__screen-nodes">
                    <i /><i /><i /><i />
                  </span>
                </span>
                <span className="build-world-3d__terminal-status">
                  <i style={{ background: item.accent }} /> Live prototype
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="build-world-3d__console">
        <div>
          <div className="build-world-3d__eyebrow" style={{ color: activeItem.accent }}>
            Active build 0{activeIndex + 1} / 0{items.length}
          </div>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.desc}</p>
          <div className="build-world-3d__value">
            <span>Business value</span>
            {activeItem.value}
          </div>
        </div>

        <div className="build-world-3d__actions">
          <div className="build-world-3d__switcher" aria-label="Select featured build">
            <button type="button" onClick={() => move(-1)} aria-label="Previous build">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next build">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <a href={activeItem.demoUrl} target="_blank" rel="noopener noreferrer" className="build-world-3d__launch">
            Launch demo <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={activeItem.sourceUrl} target="_blank" rel="noopener noreferrer" className="build-world-3d__source">
            Source <Github aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
