import { motion } from 'framer-motion';
import { Flame, Search, Building2, Skull } from 'lucide-react';
import { SectionShell, Label } from '../lib/ui';
import { Photo } from './Photo';
import type { PhotoKey } from '../lib/images';

const APPS: { icon: typeof Flame; title: string; body: string; image: PhotoKey }[] = [
  {
    icon: Flame,
    title: 'Wildfire response',
    body: 'Map dangerous areas, monitor changing conditions, and provide reconnaissance before responders enter.',
    image: 'wildfire',
  },
  {
    icon: Search,
    title: 'Search & rescue',
    body: 'Rapidly search large or difficult terrain using multiple coordinated robotic agents.',
    image: 'rescueTeam',
  },
  {
    icon: Building2,
    title: 'Disaster response',
    body: 'Map damaged environments and provide responders with information after natural disasters.',
    image: 'destroyed',
  },
  {
    icon: Skull,
    title: 'Hazardous environments',
    body: 'Send robotic systems into environments where immediate human access is unsafe.',
    image: 'firefightersNight',
  },
];

export function Applications() {
  return (
    <SectionShell id="applications">
      <Label>Applications</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        Built for the environments that matter most.
      </h2>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {APPS.map((app, i) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: 'easeOut' }}
            className="group border border-line bg-surface transition-all duration-200 hover:border-signal/50 hover:shadow-[0_0_24px_-14px_rgba(255,44,48,0.5)]"
          >
            <Photo
              name={app.image}
              width={900}
              tag={false}
              className="aspect-[16/10] border-0 border-b"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="p-5 sm:p-6">
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
