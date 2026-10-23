import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';

const ROWS = [
  {
    current: 'Single drone',
    limitation: 'Limited coverage',
    ares: 'Multiple coordinated robots',
  },
  {
    current: 'Manual operation',
    limitation: 'High operator workload',
    ares: 'Autonomous mission execution',
  },
  {
    current: 'Ground response',
    limitation: 'Human exposure to hazards',
    ares: 'Remote reconnaissance',
  },
  {
    current: 'Multiple independent drones',
    limitation: 'Multiple operators',
    ares: 'Swarm-level coordination',
  },
];

export function CompetitiveAdvantage() {
  return (
    <SectionShell id="advantage" className="border-t border-line">
      <Label>Positioning</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        From individual drones to robotic teams.
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-12 overflow-x-auto border border-line"
      >
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel">
              <th className="px-5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-steel">
                Current approach
              </th>
              <th className="px-5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-steel">
                Limitation
              </th>
              <th className="px-5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-signal-bright">
                ARES
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.current} className="border-b border-line last:border-b-0">
                <td className="px-5 py-4 text-[14.5px] text-mist">{row.current}</td>
                <td className="px-5 py-4 text-[14.5px] text-steel">{row.limitation}</td>
                <td className="px-5 py-4 text-[14.5px] font-medium text-bone">{row.ares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-mist">
        ARES is not simply another drone. It is an autonomy and coordination layer designed to
        turn multiple robotic platforms into a single coordinated system.
      </p>
    </SectionShell>
  );
}
