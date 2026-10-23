import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';

const STAGES = [
  { n: '01', title: 'Swarm coordination', body: 'Develop multi-robot communication and coordination.' },
  { n: '02', title: 'Autonomous exploration', body: 'Integrate navigation, mapping, and exploration.' },
  { n: '03', title: 'Physical swarm', body: 'Build and test multiple physical robotic agents.' },
  { n: '04', title: 'Controlled testing', body: 'Measure search coverage, reliability, and operator workload.' },
  { n: '05', title: 'Field pilots', body: 'Work with emergency-response partners in realistic environments.' },
  { n: '06', title: 'Deployment', body: 'Develop a scalable commercial system.' },
];

export function Roadmap() {
  return (
    <SectionShell id="roadmap" className="border-t border-line">
      <Label>Roadmap</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        From prototype to deployment.
      </h2>

      <div className="mt-14 grid gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-3">
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.n}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
            className="flex gap-5 border border-line bg-surface p-5 transition-all duration-200 hover:border-signal/50 hover:shadow-[0_0_24px_-14px_rgba(255,44,48,0.5)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-bright bg-panel font-mono text-[11px] text-steel">
              {stage.n}
            </span>
            <div>
              <h3 className="text-[15px] font-medium text-bone">{stage.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{stage.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
