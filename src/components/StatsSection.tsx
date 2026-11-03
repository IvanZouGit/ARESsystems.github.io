import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionShell, Label } from '../lib/ui';
import { CountUp } from './CountUp';
import { STATS } from '../lib/stats';

export function StatsSection() {
  return (
    <SectionShell className="border-t border-line">
      <Label>The gap</Label>
      <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-5xl">
        Responders still go in first.
        <span className="block text-signal-bright">ARES sends robots ahead.</span>
      </h2>

      <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:mt-14 md:grid-cols-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.source}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
            className="flex flex-col bg-surface p-7 md:p-8"
          >
            <span className="block h-[3px] w-8 bg-signal" />
            <p className="mt-6 text-5xl font-semibold tabular-nums tracking-tight text-bone md:text-6xl">
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">{s.text}</p>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-steel underline-offset-4 transition-colors hover:text-signal-bright hover:underline"
            >
              {s.source}
            </a>
          </motion.div>
        ))}
      </div>

      <Link
        to="/mission"
        className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-signal-bright"
      >
        Read our full mission
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </SectionShell>
  );
}
