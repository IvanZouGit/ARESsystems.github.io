import { useState } from 'react';
import { CornerBrackets } from '../lib/ui';
import { TEAM } from '../lib/team';

/**
 * Group photo slot. Put the photo at public/images/founders.jpg and it shows automatically.
 * Until then it shows the two individual portraits.
 */
export function FounderPhoto({ className = '' }: { className?: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <figure className={`relative overflow-hidden border border-line bg-surface ${className}`}>
      {!missing ? (
        <img
          src="/images/founders.jpg"
          alt="Ivan Zou and Jake Claybrook, co-founders of ARES Systems"
          onError={() => setMissing(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full grid-cols-2">
          {TEAM.map((m) => (
            <img
              key={m.name}
              src={m.photo}
              alt={`Portrait of ${m.name}`}
              className="h-full w-full object-cover object-top grayscale"
            />
          ))}
        </div>
      )}
      <CornerBrackets className="m-2" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">
        Ivan Zou &amp; Jake Claybrook, co-founders
      </figcaption>
    </figure>
  );
}
