import { useEffect, useState } from 'react';
import { SECTIONS } from './sections';

/** Tracks which section is currently under the reading line of the viewport. */
export function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        });
        if (visible.size) {
          // the section whose top is closest to (but above) the reading line wins
          const best = [...visible.entries()].sort((a, b) => a[1] - b[1]).pop();
          if (best) setActive(best[0]);
        }
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return active;
}
