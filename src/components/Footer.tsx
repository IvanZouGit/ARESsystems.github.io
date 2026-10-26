import { Link } from 'react-router-dom';
import logoMark from '../assets/logo-mark.png';

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

const LINKS = [
  { label: 'Mission', href: '/mission' },
  { label: 'Technology', href: '/technology' },
  { label: 'Applications', href: '/applications' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

// TODO: replace with your real profile URLs
const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'X', href: '#', icon: XIcon },
];

// TODO: point these at real legal pages once they exist
const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="site-container flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logoMark} alt="" className="h-[18px] w-auto" aria-hidden="true" />
            <span className="text-[15px] font-semibold tracking-tight text-bone">ARES Systems</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
            Intelligence in Every Mission.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-mist transition-colors duration-150 hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-container mt-10">
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-steel">© 2026 ARES Systems</p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <ul className="flex items-center gap-x-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-steel transition-colors duration-150 hover:text-mist"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-x-4" aria-label="Social media">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center border border-line text-steel transition-colors duration-150 hover:border-signal/50 hover:text-signal-bright"
                >
                  <Icon size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-steel">
          Photographs are illustrative stock images from Pexels and do not depict ARES hardware or
          deployments.
        </p>
      </div>
    </footer>
  );
}
