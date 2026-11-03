import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from '../lib/ui';
import logoMark from '../assets/logo-mark.png';
import { TEAM } from '../lib/team';
import { LinkedinIcon } from '../lib/icons';

export function CTA() {
  return (
    <section className="relative border-t border-line grid-field-fine overflow-hidden">
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
      <div className="site-container relative max-w-4xl py-20 text-center md:py-28">
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
          <PrimaryButton href="/contact">
            Request a Demo
          </PrimaryButton>
          <SecondaryButton href="/contact">Contact ARES</SecondaryButton>
        </motion.div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
            Connect with the founders
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {TEAM.map((m) => (
              <a
                key={m.name}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on LinkedIn`}
                className="flex items-center gap-3 border border-line-bright bg-surface py-2 pl-2 pr-4 text-sm text-bone transition-colors hover:border-signal"
              >
                <img src={m.photo} alt="" className="h-8 w-8 object-cover object-top grayscale" />
                {m.name}
                <LinkedinIcon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
