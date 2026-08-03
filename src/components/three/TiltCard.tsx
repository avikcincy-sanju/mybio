import type { CSSProperties, HTMLAttributes, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { useRef } from 'react';

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = '',
  intensity = 8,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * intensity;
    const rotateX = (0.5 - y) * intensity;

    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
    card.style.setProperty('--glow-x', `${x * 100}%`);
    card.style.setProperty('--glow-y', `${y * 100}%`);
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glow-x', '50%');
    card.style.setProperty('--glow-y', '50%');
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-3d ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ '--tilt-x': '0deg', '--tilt-y': '0deg' } as CSSProperties}
      {...rest}
    >
      <div className="tilt-card-3d__glow" aria-hidden="true" />
      <div className="tilt-card-3d__content">{children}</div>
    </div>
  );
}
