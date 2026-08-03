import { useEffect, useRef } from 'react';

const NODES = [
  { label: 'Merchant', className: 'hero-3d-node hero-3d-node--merchant' },
  { label: 'Cards', className: 'hero-3d-node hero-3d-node--cards' },
  { label: 'RTP', className: 'hero-3d-node hero-3d-node--rtp' },
  { label: 'USDC', className: 'hero-3d-node hero-3d-node--usdc' },
  { label: 'Ledger', className: 'hero-3d-node hero-3d-node--ledger' },
  { label: 'Agent', className: 'hero-3d-node hero-3d-node--agent' },
];

export default function HeroDepthScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        scene.style.setProperty('--scene-rotate-y', `${x * 10}deg`);
        scene.style.setProperty('--scene-rotate-x', `${y * -7}deg`);
        scene.style.setProperty('--scene-shift-x', `${x * 18}px`);
        scene.style.setProperty('--scene-shift-y', `${y * 12}px`);
      });
    };

    const updateScroll = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      scene.style.setProperty('--scene-scroll', String(progress));
      scene.style.setProperty('--scene-scroll-x', `${progress * 18}px`);
      scene.style.setProperty('--scene-scroll-y', `${progress * -22}px`);
      scene.style.setProperty('--scene-scale', String(1 - progress * 0.06));
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-depth-scene" aria-hidden="true">
      <div className="hero-depth-scene__fade" />
      <div className="hero-depth-scene__viewport">
        <div className="hero-depth-scene__world">
          <div className="hero-3d-grid hero-3d-grid--back" />
          <div className="hero-3d-grid hero-3d-grid--front" />

          <div className="hero-3d-core-wrap">
            <div className="hero-3d-halo hero-3d-halo--one" />
            <div className="hero-3d-halo hero-3d-halo--two" />
            <div className="hero-3d-core">
              <div className="hero-3d-core__inner" />
              <div className="hero-3d-core__pulse" />
            </div>
          </div>

          <div className="hero-3d-orbit hero-3d-orbit--one">
            <span className="hero-3d-packet hero-3d-packet--one" />
            <span className="hero-3d-packet hero-3d-packet--two" />
          </div>
          <div className="hero-3d-orbit hero-3d-orbit--two">
            <span className="hero-3d-packet hero-3d-packet--three" />
          </div>
          <div className="hero-3d-orbit hero-3d-orbit--three">
            <span className="hero-3d-packet hero-3d-packet--four" />
          </div>

          {NODES.map((node) => (
            <div key={node.label} className={node.className}>
              <span className="hero-3d-node__dot" />
              <span className="hero-3d-node__label">{node.label}</span>
            </div>
          ))}

          <div className="hero-depth-scene__caption">
            Intelligent money network
          </div>
        </div>
      </div>
    </div>
  );
}
