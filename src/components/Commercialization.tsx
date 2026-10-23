import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';

const FUNNEL = [
  'Prototype',
  'Controlled demonstration',
  'First-responder pilot',
  'Paid pilot',
  'Fleet deployment',
];

export function Commercialization() {
  return (
    <SectionShell id="commercialization" className="border-t border-line">
      <Label>Path to market</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        Prototype. Pilot. Deployment.
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-14 flex flex-col md:flex-row md:items-stretch"
      >
        {FUNNEL.map((stage, i) => (
          <div key={stage} className="flex flex-1 items-center">
            <div className="flex-1 border border-line bg-surface px-5 py-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-2 text-sm font-medium leading-snug text-bone">{stage}</p>
            </div>
            {i < FUNNEL.length - 1 && (
              <div
                className="hidden h-px w-6 shrink-0 bg-line-bright md:block"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </motion.div>

      <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-mist">
        ARES plans to initially commercialize through pilot deployments with emergency-response
        organizations and strategic partners. Revenue may come from robotic systems, deployment
        packages, training, maintenance, and software services.
      </p>
    </SectionShell>
  );
}
