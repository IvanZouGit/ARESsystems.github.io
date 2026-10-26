import { motion } from 'framer-motion';
import { SectionShell, Label, CornerBrackets } from '../lib/ui';
import { TEAM } from '../lib/team';
import { LinkedinIcon } from '../lib/icons';

export function Team() {
  return (
    <SectionShell id="team" className="border-t border-line">
      <Label>Team</Label>
      <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-bone md:text-4xl">
        Built by engineers who build robots.
      </h2>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="group flex items-start gap-5 border border-line bg-surface p-5 transition-all duration-200 hover:border-signal/50 hover:shadow-[0_0_24px_-14px_rgba(255,44,48,0.5)] sm:gap-6 sm:p-6"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-line-bright sm:h-24 sm:w-24">
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                className="h-full w-full object-cover object-top grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0"
              />
              <CornerBrackets className="z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>

            <div className="min-w-0">
              <h3 className="text-[15px] font-medium text-bone">{member.name}</h3>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-signal-bright">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{member.bio}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="mt-4 inline-flex items-center gap-2 border border-line-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-mist transition-colors hover:border-signal hover:text-bone"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
