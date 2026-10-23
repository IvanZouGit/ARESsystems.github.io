import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';

const METRICS = [
  {
    title: 'More coverage',
    body: 'Multiple robots can investigate an environment simultaneously.',
  },
  {
    title: 'Less operator load',
    body: 'One responder can supervise a coordinated robotic team rather than manually piloting every vehicle.',
  },
  {
    title: 'Lower human exposure',
    body: 'Robots can gather information before responders enter hazardous areas.',
  },
];

export function Impact() {
  return (
    <SectionShell id="impact" className="border-t border-line">
      <Label>Impact</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        More information. Less exposure.
      </h2>

      <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="bg-surface p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight text-bone">{m.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{m.body}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl font-mono text-[12px] leading-relaxed text-steel">
        Performance figures are under active testing and validation and will be published as they
        become available.
      </p>
    </SectionShell>
  );
}
