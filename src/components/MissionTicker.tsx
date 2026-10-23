const ITEMS = [
  'MISSION: SEARCH-01',
  'AGENTS: 04 ACTIVE',
  'COMM LINK: NOMINAL',
  'AUTONOMY: ENGAGED',
  'COVERAGE: IN PROGRESS',
  'STATUS: OPERATIONAL',
];

export function MissionTicker() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-panel"
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-2.5">
            <span className="h-1 w-1 rounded-full bg-signal-bright" />
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
