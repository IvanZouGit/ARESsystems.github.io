import { SectionShell } from '../lib/ui';
import { Photo } from './Photo';
import type { PhotoKey } from '../lib/images';

/** Full-width image break between text-heavy sections. */
export function PhotoBand({ name, line }: { name: PhotoKey; line: string }) {
  return (
    <SectionShell className="!py-0">
      <div className="relative">
        <Photo name={name} width={1800} className="aspect-[16/9] sm:aspect-[21/9]" />
        <p className="absolute inset-x-0 bottom-0 max-w-2xl p-5 text-balance text-lg font-medium leading-snug text-bone sm:p-8 sm:text-2xl">
          {line}
        </p>
      </div>
    </SectionShell>
  );
}
