import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function CornerBrackets({ className = '' }: { className?: string }) {
  const arm = 'absolute h-[14px] w-[14px] border-signal/70';
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span className={`${arm} left-0 top-0 border-l border-t`} />
      <span className={`${arm} right-0 top-0 border-r border-t`} />
      <span className={`${arm} bottom-0 left-0 border-b border-l`} />
      <span className={`${arm} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">
      {children}
    </span>
  );
}

export function Coord({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-steel tabular-nums">{children}</span>
  );
}

export function SectionShell({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-16 md:py-24 lg:py-28 ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export function PrimaryButton({
  children,
  href = '/contact',
  onClick,
  type = 'button',
  className = '',
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}) {
  const base =
    'group relative inline-flex items-center gap-2.5 bg-signal px-6 py-3.5 text-sm font-medium text-bone transition-all duration-200 hover:bg-signal-bright hover:shadow-[0_0_28px_-6px_rgba(255,44,48,0.55)] focus-visible:outline-2 focus-visible:outline-signal-bright';
  if (onClick) {
    return (
      <button type={type} onClick={onClick} className={`${base} ${className}`}>
        {children}
      </button>
    );
  }
  return <SmartLink href={href} className={`${base} ${className}`}>{children}</SmartLink>;
}

export function SecondaryButton({
  children,
  href,
  onClick,
  className = '',
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    'inline-flex items-center gap-2.5 border border-line-bright px-6 py-3.5 text-sm font-medium text-bone transition-colors duration-200 hover:border-signal hover:bg-panel focus-visible:outline-2 focus-visible:outline-signal-bright';
  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${className}`}>
        {children}
      </button>
    );
  }
  return <SmartLink href={href} className={`${base} ${className}`}>{children}</SmartLink>;
}

/** Internal paths ("/team") use the router (no page reload); mailto:, http(s): and #anchors stay plain links. */
export function SmartLink({
  href = '#',
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
