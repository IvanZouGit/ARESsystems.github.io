import { useState } from 'react';
import { photo, type PhotoKey } from '../lib/images';

interface Props {
  name: PhotoKey;
  /** pixel width requested from the CDN (kept small for cards) */
  width?: number;
  className?: string;
  imgClassName?: string;
  /** show the small "Illustrative image" tag */
  tag?: boolean;
  eager?: boolean;
}

/** Photo frame: lazy-loaded, dark-tinted to sit in the theme, and degrades to the grid background if the image can't load. */
export function Photo({ name, width = 1000, className = '', imgClassName = '', tag = true, eager = false }: Props) {
  const [failed, setFailed] = useState(false);
  const { src, alt } = photo(name, width);

  return (
    <figure className={`relative overflow-hidden border border-line bg-void grid-field ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover opacity-90 saturate-[0.85] contrast-[1.05] ${imgClassName}`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
      {tag && !failed && (
        <figcaption className="absolute bottom-2.5 left-3 font-mono text-[9px] uppercase tracking-[0.16em] text-mist/80">
          Illustrative image
        </figcaption>
      )}
    </figure>
  );
}
