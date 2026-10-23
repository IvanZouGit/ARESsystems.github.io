export interface SectionDef {
  id: string;
  label: string;
  /** which top-nav link this section belongs to */
  group: string;
}

export const SECTIONS: SectionDef[] = [
  { id: 'top', label: 'Home', group: 'top' },
  { id: 'problem', label: 'The Problem', group: 'problem' },
  { id: 'technology', label: 'Technology', group: 'technology' },
  { id: 'how-it-works', label: 'How It Works', group: 'technology' },
  { id: 'advantage', label: 'Advantage', group: 'technology' },
  { id: 'applications', label: 'Applications', group: 'applications' },
  { id: 'impact', label: 'Impact', group: 'impact' },
  { id: 'roadmap', label: 'Roadmap', group: 'roadmap' },
  { id: 'market', label: 'Customers', group: 'roadmap' },
  { id: 'commercialization', label: 'Path to Market', group: 'roadmap' },
  { id: 'team', label: 'Team', group: 'team' },
  { id: 'about', label: 'Mission', group: 'team' },
  { id: 'demo', label: 'Get in Touch', group: 'demo' },
];

/** Links shown in the top bar. `group` matches SectionDef.group. */
export const NAV_LINKS = [
  { label: 'Problem', href: '#problem', group: 'problem' },
  { label: 'Technology', href: '#technology', group: 'technology' },
  { label: 'Applications', href: '#applications', group: 'applications' },
  { label: 'Impact', href: '#impact', group: 'impact' },
  { label: 'Roadmap', href: '#roadmap', group: 'roadmap' },
  { label: 'Team', href: '#team', group: 'team' },
];
