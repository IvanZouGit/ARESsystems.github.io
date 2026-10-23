import { SECTIONS } from '../lib/sections';

/** Desktop-only vertical index: shows where you are, jumps to any section. */
export function SectionRail({ active }: { active: string }) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`pointer-events-none border border-line bg-void/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-200 ${
                    isActive
                      ? 'translate-x-0 text-bone opacity-100'
                      : 'translate-x-1 text-steel opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block transition-all duration-200 ${
                    isActive
                      ? 'h-[3px] w-6 bg-signal-bright'
                      : 'h-[3px] w-3 bg-line-bright group-hover:w-5 group-hover:bg-mist'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
