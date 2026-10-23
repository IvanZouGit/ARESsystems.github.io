import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';

const STEPS = [
  { n: '01', title: 'Deploy', body: 'Deploy robotic agents into the area.' },
  { n: '02', title: 'Explore', body: 'Robots autonomously navigate and investigate.' },
  { n: '03', title: 'Coordinate', body: 'The swarm shares information and divides tasks.' },
  { n: '04', title: 'Map', body: 'The system builds a map and identifies relevant information.' },
  { n: '05', title: 'Inform', body: 'Responders receive actionable situational awareness.' },
];

export function HowItWorks() {
  return (
    <SectionShell id="how-it-works" className="border-t border-line">
      <Label>Mission sequence</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        How a mission unfolds.
      </h2>

      <div className="mt-14">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
            className="group grid grid-cols-[3.5rem_1fr] items-start gap-4 border-t border-line py-7 last:border-b sm:grid-cols-[5rem_10rem_1fr] sm:items-center sm:gap-8"
          >
            <span className="font-mono text-sm text-steel">{step.n}</span>
            <h3 className="text-lg font-medium text-bone">{step.title}</h3>
            <p className="col-span-2 text-[15px] leading-relaxed text-mist sm:col-span-1">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
