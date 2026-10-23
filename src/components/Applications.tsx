import { motion } from 'framer-motion';
import { Flame, Search, Building2, Skull } from 'lucide-react';
import { SectionShell, Label } from '../lib/ui';

const APPS = [
  {
    icon: Flame,
    title: 'Wildfire response',
    body: 'Map dangerous areas, monitor changing conditions, and provide reconnaissance before responders enter.',
    pattern: 'contour',
  },
  {
    icon: Search,
    title: 'Search & rescue',
    body: 'Rapidly search large or difficult terrain using multiple coordinated robotic agents.',
    pattern: 'sweep',
  },
  {
    icon: Building2,
    title: 'Disaster response',
    body: 'Map damaged environments and provide responders with information after natural disasters.',
    pattern: 'fracture',
  },
  {
    icon: Skull,
    title: 'Hazardous environments',
    body: 'Send robotic systems into environments where immediate human access is unsafe.',
    pattern: 'hazard',
  },
];

function CardVisual({ pattern }: { pattern: string }) {
  return (
    <svg viewBox="0 0 300 140" className="h-full w-full" aria-hidden="true">
      <rect width="300" height="140" fill="none" />
      {pattern === 'contour' &&
        [0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M -10 ${100 - i * 22} Q 80 ${60 - i * 20} 150 ${90 - i * 18} T 320 ${70 - i * 16}`}
            fill="none"
            stroke="#d70206"
            strokeOpacity={0.18 + i * 0.08}
            strokeWidth="1"
          />
        ))}
      {pattern === 'sweep' && (
        <>
          <circle cx="150" cy="70" r="55" fill="none" stroke="#d70206" strokeOpacity="0.2" strokeWidth="1" />
          <circle cx="150" cy="70" r="30" fill="none" stroke="#d70206" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="150" y1="70" x2="150" y2="15" stroke="#ff2c30" strokeOpacity="0.5" strokeWidth="1" />
          {[...Array(10)].map((_, i) => (
            <circle key={i} cx={40 + i * 24} cy={30 + ((i * 37) % 90)} r="1.5" fill="#b8bac0" fillOpacity="0.35" />
          ))}
        </>
      )}
      {pattern === 'fracture' &&
        [
          'M20 20 L120 50 L90 110',
          'M120 50 L220 30 L280 100',
          'M90 110 L180 130 L280 100',
          'M20 20 L60 100 L90 110',
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#d70206" strokeOpacity="0.28" strokeWidth="1" />
        ))}
      {pattern === 'hazard' && (
        <>
          <polygon
            points="150,20 270,120 30,120"
            fill="none"
            stroke="#d70206"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <line x1="150" y1="55" x2="150" y2="90" stroke="#ff2c30" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="150" cy="102" r="2" fill="#ff2c30" fillOpacity="0.6" />
        </>
      )}
    </svg>
  );
}

export function Applications() {
  return (
    <SectionShell id="applications" className="border-t border-line">
      <Label>Applications</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        Built for the environments that matter most.
      </h2>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {APPS.map((app, i) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
            className="group border border-line bg-surface transition-all duration-200 hover:border-signal/50 hover:shadow-[0_0_24px_-14px_rgba(255,44,48,0.5)]"
          >
            <div className="h-36 border-b border-line bg-void">
              <CardVisual pattern={app.pattern} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <app.icon size={18} className="text-signal-bright" strokeWidth={1.5} />
                <h3 className="text-[15px] font-medium text-bone">{app.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist">{app.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
