import { motion } from 'framer-motion';
import { LayoutGrid, UserCog, ShieldAlert } from 'lucide-react';
import { SectionShell, Label } from '../lib/ui';

const CARDS = [
  {
    n: '01',
    icon: LayoutGrid,
    title: 'Limited coverage',
    body: 'Single robotic platforms can only search so much area at a time.',
  },
  {
    n: '02',
    icon: UserCog,
    title: 'Operator workload',
    body: 'Traditional drone operations often require a dedicated human operator for each platform.',
  },
  {
    n: '03',
    icon: ShieldAlert,
    title: 'Human risk',
    body: 'Responders may need to enter hazardous environments simply to determine what is happening.',
  },
];

export function Problem() {
  return (
    <SectionShell id="problem" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Label>The problem</Label>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
            Emergency response has an information problem.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
            Wildfires, disasters, and search-and-rescue missions often force responders to make
            critical decisions with incomplete information. The environments they need to
            understand can be too large, dangerous, or unpredictable for immediate human access.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="group border border-line bg-surface p-6 transition-all duration-200 hover:border-signal/50 hover:shadow-[0_0_24px_-14px_rgba(255,44,48,0.5)] lg:flex lg:items-start lg:gap-6"
            >
              <div className="flex items-center gap-3 lg:w-32 lg:shrink-0">
                <span className="font-mono text-xs text-steel">{card.n}</span>
                <card.icon size={18} className="text-signal-bright" strokeWidth={1.5} />
              </div>
              <div className="mt-4 lg:mt-0">
                <h3 className="text-[15px] font-medium text-bone">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-14 border-t border-line pt-8 text-balance text-xl font-medium leading-snug text-bone md:text-2xl"
      >
        ARES moves reconnaissance from individual robots to coordinated robotic teams.
      </motion.p>
    </SectionShell>
  );
}
