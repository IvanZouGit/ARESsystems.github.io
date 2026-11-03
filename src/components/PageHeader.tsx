import { motion } from 'framer-motion';
import { Label } from '../lib/ui';
import { photo, type PhotoKey } from '../lib/images';

interface Props {
  eyebrow: string;
  title: string;
  body?: string;
  image?: PhotoKey;
}

/** Top banner used by every inner page. Clears the fixed nav, keeps the grid overlay, optional photo behind. */
export function PageHeader({ eyebrow, title, body, image }: Props) {
  const bg = image ? photo(image, 1800) : null;
  return (
    <section className="relative overflow-hidden border-b border-line grid-field-fine">
      {bg && (
        <img
          src={bg.src}
          alt=""
          aria-hidden="true"
          loading="eager"
          onError={(e) => (e.currentTarget.style.display = 'none')}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28] saturate-[0.8]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/60 via-void/70 to-void" />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-signal) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="site-container relative pb-14 pt-32 md:pb-20 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Label>{eyebrow}</Label>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {body && <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-mist md:text-lg">{body}</p>}
        </motion.div>
      </div>
    </section>
  );
}
