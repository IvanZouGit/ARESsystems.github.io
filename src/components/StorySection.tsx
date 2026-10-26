import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionShell, Label } from '../lib/ui';
import { FounderPhoto } from './FounderPhoto';
import { STORY } from '../lib/story';

/** `full` = the longer version used on the Mission page (no "read the full story" link). */
export function StorySection({ full = false }: { full?: boolean }) {
  return (
    <SectionShell className="border-t border-line">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Label>{STORY.eyebrow}</Label>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-5xl">
            {STORY.headingTop}
            <span className="block text-signal-bright">{STORY.headingBottom}</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist md:text-base">{STORY.summary}</p>
          {full &&
            STORY.more.map((p) => (
              <p key={p} className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist md:text-base">
                {p}
              </p>
            ))}
          {!full && (
            <Link
              to="/mission"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-signal-bright"
            >
              Read the full story
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </motion.div>

        <FounderPhoto className="aspect-[4/3]" />
      </div>
    </SectionShell>
  );
}
