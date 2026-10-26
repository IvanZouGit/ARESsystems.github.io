import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CornerBrackets } from '../lib/ui';
import logoMark from '../assets/logo-mark.png';

export function MissionHero() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden grid-field-fine">
      {/* optional background video: drop public/media/hero-background.mp4 and it plays automatically */}
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => setVideoReady(true)}
          aria-hidden="true"
        >
          <source src="/media/hero-background.mp4" type="video/mp4" onError={() => setVideoFailed(true)} />
        </video>
      )}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b to-void ${
          videoReady ? 'from-void/40 via-void/70' : 'from-void via-transparent'
        }`}
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[560px] w-[560px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-signal) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="site-container relative grid items-center gap-12 pb-16 pt-28 md:pt-32 lg:min-h-[min(88dvh,820px)] lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pb-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-bright"
          >
            Intelligence in Every Mission.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
            className="mt-5 text-balance text-[2rem] font-semibold leading-[1.12] tracking-tight text-bone sm:text-5xl lg:text-[3.25rem]"
          >
            ARES exists to extend human capability into environments where humans should not have
            to go first.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-mist sm:text-lg"
          >
            We believe the future of emergency response is not humans versus robots. It is humans
            working with robots.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.28 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 bg-signal px-6 py-3.5 text-sm font-medium text-bone transition-all duration-200 hover:bg-signal-bright hover:shadow-[0_0_28px_-6px_rgba(255,44,48,0.55)]"
            >
              Request a Demo
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/mission"
              className="group inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-signal-bright"
            >
              Read our full mission
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* logo to the side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[280px] border border-line bg-surface/60 grid-field sm:max-w-[340px] lg:max-w-none"
        >
          <CornerBrackets className="m-2" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(215,2,6,0.22) 0%, transparent 62%)' }}
          />
          <motion.img
            src={logoMark}
            alt="ARES Systems logo"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ filter: 'drop-shadow(0 0 28px rgba(255,44,48,0.35))' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
