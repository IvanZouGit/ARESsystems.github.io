import { motion } from 'framer-motion';
import { SectionShell, Label } from '../lib/ui';
import { Photo } from './Photo';

export function About() {
  return (
    <SectionShell id="about" className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-14">
        <div className="space-y-8">
          <Label>Mission</Label>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-balance text-2xl font-medium leading-snug tracking-tight text-bone md:text-3xl"
          >
            ARES exists to extend human capability into environments where humans should not
            have to go first.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="max-w-xl text-[15px] leading-relaxed text-mist"
          >
            We believe the future of emergency response is not humans versus robots. It is
            humans working with robots.
          </motion.p>
        </div>
        <Photo name="firefightersNight" width={1000} className="aspect-[4/3]" />
      </div>
    </SectionShell>
  );
}
