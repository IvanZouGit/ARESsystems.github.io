import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';
import { Photo } from './Photo';

const SEGMENTS = [
  'Fire departments',
  'Wildfire organizations',
  'Search & rescue',
  'Emergency management',
  'Government agencies',
];

export function Market() {
  return (
    <SectionShell id="market" className="border-t border-line">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
        <Label>Market</Label>
        <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
          Built with responders, not just for them.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mist">
          ARES is using customer discovery to understand how first responders currently perform
          reconnaissance, where existing robotic systems fall short, and what capabilities would
          justify adoption.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {SEGMENTS.map((s) => (
            <span
              key={s}
              className="border border-line bg-surface px-4 py-2.5 text-sm text-mist"
            >
              {s}
            </span>
          ))}
        </motion.div>


        </div>
        <Photo name="simulation" width={1000} className="aspect-[4/3]" />
      </div>

      <p className="mt-10 border-t border-line pt-8 text-[15px] leading-relaxed text-mist">
        ARES will validate the technology through interviews, demonstrations, pilot programs, and
        field testing.
      </p>
    </SectionShell>
  );
}
