import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SwarmVisualization } from './SwarmVisualization';
import logoMark from '../assets/logo-mark.png';

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="top" className="relative grid-field-fine overflow-hidden pb-20 pt-36 md:pt-44">
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src="/media/hero-background.mp4" type="video/mp4" />
        </video>
      )}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b to-void ${
          videoReady ? 'from-void/40 via-void/70' : 'from-void via-transparent'
        }`}
      />

      <div
        className="pointer-events-none absolute -right-24 top-10 h-[560px] w-[560px] rounded-full opacity-[0.16] blur-3xl md:-right-10"
        style={{ background: 'radial-gradient(circle, var(--color-signal) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <motion.img
        src={logoMark}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="pointer-events-none absolute -right-16 top-16 hidden w-[420px] select-none md:block lg:w-[520px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">
            Autonomous swarm robotics
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          className="max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-bone sm:text-6xl lg:text-[4.5rem]"
        >
          Intelligence in Every Mission.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
          className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-mist"
        >
          ARES Systems develops autonomous robotic swarms that help first responders explore
          hazardous environments, expand situational awareness, and reduce human exposure to risk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#demo"
            className="group inline-flex items-center gap-2.5 bg-signal px-6 py-3.5 text-sm font-medium text-bone transition-all duration-200 hover:bg-signal-bright hover:shadow-[0_0_28px_-6px_rgba(255,44,48,0.55)]"
          >
            Request a Demo
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#technology"
            className="inline-flex items-center gap-2.5 border border-line-bright px-6 py-3.5 text-sm font-medium text-bone transition-colors duration-200 hover:border-mist hover:bg-panel"
          >
            Explore the Technology
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="mt-16"
        >
          <SwarmVisualization />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-14 hidden justify-center md:flex"
        aria-hidden="true"
      >
        <ChevronDown size={18} className="animate-bounce text-steel" />
      </motion.div>
    </section>
  );
}
