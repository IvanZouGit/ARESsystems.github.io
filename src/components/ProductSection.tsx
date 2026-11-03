import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionShell, Label } from '../lib/ui';
import { SwarmVisualization } from './SwarmVisualization';

const POINTS = [
  { title: 'Explore', body: 'Robots navigate unknown environments and investigate areas that have not been explored.' },
  { title: 'Coordinate', body: 'Multiple robots share information and divide the work as a team.' },
  { title: 'Map', body: 'The swarm builds an understanding of the scene and reports what matters to responders.' },
];

export function ProductSection() {
  return (
    <SectionShell className="border-t border-line">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
        <div>
          <Label>The product</Label>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
            One responder. A team of robots.
          </h2>
        </div>
        <div>
          <p className="text-[15px] leading-relaxed text-mist md:text-base">
            ARES is an autonomy and coordination layer for teams of robots. A responder sets the
            mission, and the swarm handles navigation, exploration, and mapping.
          </p>
          <Link
            to="/technology"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-signal-bright"
          >
            See how it works
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mt-10"
      >
        <SwarmVisualization />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
          Simulation of the planned system. Hardware is under development.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
        {POINTS.map((p) => (
          <div key={p.title} className="bg-surface p-6">
            <h3 className="text-[15px] font-medium text-bone">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
