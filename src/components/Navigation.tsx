import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoMark from '../assets/logo-mark.png';
import { NAV } from '../lib/routes';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative block py-1 text-[14px] transition-colors duration-150 hover:text-bone ${
      isActive ? 'text-bone' : 'text-mist'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-void/90 backdrop-blur-sm' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="site-container flex h-16 items-center justify-between md:h-[72px]">
        {/* logo — left */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="ARES Systems home">
          <img src={logoMark} alt="" className="h-5 w-auto" aria-hidden="true" />
          <span className="text-[15px] font-semibold tracking-tight text-bone">ARES Systems</span>
        </Link>

        {/* everything else — right */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          <ul className="flex items-center gap-6 lg:gap-9">
            {NAV.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-signal-bright transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="inline-flex items-center bg-signal px-5 py-2.5 text-[13px] font-medium text-bone transition-all duration-200 hover:bg-signal-bright hover:shadow-[0_0_24px_-6px_rgba(255,44,48,0.55)]"
          >
            Request a Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-10 w-10 items-center justify-center text-bone md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-void md:hidden"
          >
            <ul className="site-container py-2">
              {NAV.map((l) => (
                <li key={l.to} className="border-b border-line last:border-b-0">
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 text-[17px] ${isActive ? 'text-bone' : 'text-mist hover:text-bone'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="site-container pb-6 pt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center bg-signal px-5 py-3.5 text-sm font-medium text-bone"
              >
                Request a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
