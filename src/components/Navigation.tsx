import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoMark from '../assets/logo-mark.png';
import { NAV_LINKS, SECTIONS } from '../lib/sections';

export function Navigation({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  const activeGroup = SECTIONS.find((s) => s.id === active)?.group;

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-void/90 backdrop-blur-sm' : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12 lg:px-20 xl:px-24"
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="ARES Systems home">
          <img src={logoMark} alt="" className="h-5 w-auto" aria-hidden="true" />
          <span className="text-[15px] font-semibold tracking-tight text-bone">ARES Systems</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV_LINKS.map((link) => {
            const isActive = activeGroup === link.group;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block py-1 text-[13.5px] transition-colors duration-150 hover:text-bone ${
                    isActive ? 'text-bone' : 'text-mist'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-signal-bright transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#demo"
            className="inline-flex items-center border border-line-bright px-5 py-2.5 text-[13px] font-medium text-bone transition-colors duration-200 hover:border-signal hover:text-signal-bright"
          >
            Request a Demo
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-bone lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-line bg-void lg:hidden"
          >
            <ul className="px-6 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-line last:border-b-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[17px] text-mist hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6 pt-2">
              <a
                href="#demo"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center bg-signal px-5 py-3.5 text-sm font-medium text-bone"
              >
                Request a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
