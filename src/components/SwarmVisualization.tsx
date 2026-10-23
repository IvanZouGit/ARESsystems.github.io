import { lazy, Suspense } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CornerBrackets } from '../lib/ui';

// three.js is loaded on demand so it never blocks first paint
const DroneScene = lazy(() => import('./DroneScene'));

const SCENE_HEIGHT = 'h-[400px] sm:h-[460px] lg:h-[560px]';

export function SwarmVisualization() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="relative w-full overflow-hidden border border-line bg-surface">
      <CornerBrackets className="z-20 m-2" />

      <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
            Mission: search-01
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
          Status: active
        </span>
      </div>

      <div
        className="relative bg-[#08090b]"
        role="img"
        aria-label="Animated 3D view of four autonomous drones flying over forested terrain, scanning an active wildfire and sharing data over communication links"
      >
        <Suspense
          fallback={
            <div
              className={`${SCENE_HEIGHT} flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.14em] text-steel`}
            >
              Initializing mission view…
            </div>
          }
        >
          <DroneScene reduceMotion={reduceMotion} className={SCENE_HEIGHT} />
        </Suspense>

        {/* edge falloff so the scene sits in the page */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-void/30" />
        <div className="pointer-events-none absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
          Aerial view · Thermal scan
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-panel px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-steel">
        <span>Agents: 04</span>
        <span>Fire front: tracked</span>
        <span>Comm link: nominal</span>
        <span>Autonomy: engaged</span>
      </div>
    </div>
  );
}
