import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from '../lib/ui';
import logoMark from '../assets/logo-mark.png';

export function CTA() {
  return (
    <section id="demo" className="relative border-t border-line grid-field-fine overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-signal) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.05] md:w-[340px]"
      />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-5xl"
        >
          Help us build the next generation of emergency response.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-mist"
        >
          We are looking for first responders, emergency organizations, technical partners, and
          advisors who want to help shape autonomous robotics for real-world missions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <PrimaryButton href="mailto:contact@aressystems.com?subject=Demo%20Request">
            Request a Demo
          </PrimaryButton>
          <SecondaryButton href="mailto:contact@aressystems.com">Contact ARES</SecondaryButton>
        </motion.div>
      </div>
    </section>
  );
}
