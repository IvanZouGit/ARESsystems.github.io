import { motion } from 'framer-motion';
import { Compass, Network, Map, ShieldCheck } from 'lucide-react';
import { SectionShell, Label, CornerBrackets } from '../lib/ui';

const CAPABILITIES = [
  {
    icon: Compass,
    title: 'Autonomous exploration',
    body: 'Robots navigate unknown environments and investigate areas that have not yet been explored.',
  },
  {
    icon: Network,
    title: 'Swarm coordination',
    body: 'Multiple robots share information and coordinate their actions as a team.',
  },
  {
    icon: Map,
    title: 'Mapping & perception',
    body: 'Robots build an understanding of their environment and provide responders with actionable information.',
  },
  {
    icon: ShieldCheck,
    title: 'Redundancy',
    body: 'The mission can continue even when individual robotic agents encounter failures or communication issues.',
  },
];

function ArchitectureDiagram() {
  return (
    <div className="relative border border-line bg-surface p-6 md:p-10">
      <CornerBrackets className="m-2" />
      <div className="flex flex-col items-center gap-0">
        <DiagramNode label="Mission Command" sub="Operator defines objectives" />
        <Connector />
        <DiagramNode label="Swarm Coordination" sub="Task allocation · shared state" />
        <Connector />

        <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4">
          {['Robot 01', 'Robot 02', 'Robot 03', 'Robot 04'].map((r) => (
            <div
              key={r}
              className="border border-line-bright bg-panel px-3 py-3 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-mist"
            >
              {r}
            </div>
          ))}
        </div>

        <Connector />
        <DiagramNode label="Sensors · Mapping · Navigation" sub="Perception and control layer" wide />
      </div>
    </div>
  );
}

function DiagramNode({ label, sub, wide = false }: { label: string; sub: string; wide?: boolean }) {
  return (
    <div
      className={`border border-line-bright bg-panel-raised px-6 py-4 text-center ${
        wide ? 'w-full' : 'w-full max-w-xs sm:w-auto sm:max-w-none'
      }`}
    >
      <div className="text-sm font-medium text-bone">{label}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-steel">{sub}</div>
    </div>
  );
}

function Connector() {
  return <div className="my-2 h-6 w-px bg-line-bright" aria-hidden="true" />;
}

export function Technology() {
  return (
    <SectionShell id="technology" className="border-t border-line">
      <Label>The ARES system</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        One mission. Multiple autonomous agents.
      </h2>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mist">
        ARES allows a human operator to define mission-level objectives while the swarm handles
        lower-level navigation, exploration, and coordination.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-12"
      >
        <ArchitectureDiagram />
      </motion.div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
            className="border border-line bg-surface p-6 transition-all duration-200 hover:border-signal/50 hover:shadow-[0_0_24px_-14px_rgba(255,44,48,0.5)]"
          >
            <cap.icon size={20} className="text-signal-bright" strokeWidth={1.5} />
            <h3 className="mt-4 text-[15px] font-medium text-bone">{cap.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{cap.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
