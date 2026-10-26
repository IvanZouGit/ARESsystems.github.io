import { Mail } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Photo } from '../components/Photo';
import { SectionShell, Label, PrimaryButton } from '../lib/ui';
import { LinkedinIcon } from '../lib/icons';
import { TEAM } from '../lib/team';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const EMAIL = 'contact@aressystems.com'; // TODO: your real address

const WHO = [
  'First responders',
  'Emergency organizations',
  'Technical partners',
  'Advisors',
];

export default function ContactPage() {
  useDocumentTitle('Contact');
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Help us build the next generation of emergency response."
        body="We are looking for first responders, emergency organizations, technical partners, and advisors who want to help shape autonomous robotics for real-world missions."
      />

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Label>Request a demo</Label>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
              Tell us who you are and what you do. We will get back to you directly.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <PrimaryButton href={`mailto:${EMAIL}?subject=Demo%20Request`}>
                <Mail size={16} /> Email us
              </PrimaryButton>
              <span className="font-mono text-[12px] text-steel">{EMAIL}</span>
            </div>

            <div className="mt-12">
              <Label>We want to hear from</Label>
              <ul className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
                {WHO.map((w) => (
                  <li key={w} className="bg-surface px-5 py-4 text-sm text-mist">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <Photo name="simulation" width={1000} className="aspect-[4/3]" />
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <Label>Connect with the founders</Label>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {TEAM.map((m) => (
              <a
                key={m.name}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-line bg-surface p-4 transition-all duration-200 hover:border-signal/50"
              >
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  className="h-14 w-14 shrink-0 object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-bone">{m.name}</p>
                  <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-signal-bright">
                    {m.role}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-bright text-mist transition-colors group-hover:border-signal group-hover:text-bone">
                  <LinkedinIcon size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
}
