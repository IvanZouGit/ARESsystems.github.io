import { PageHeader } from '../components/PageHeader';
import { About } from '../components/About';
import { Problem } from '../components/Problem';
import { StorySection } from '../components/StorySection';
import { CTA } from '../components/CTA';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function MissionPage() {
  useDocumentTitle('Mission');
  return (
    <>
      <PageHeader
        eyebrow="Our mission"
        title="Intelligence in every mission."
        body="Why ARES exists, the problem we are working on, and who is building it."
      />
      <About />
      <Problem />
      <StorySection full />
      <CTA />
    </>
  );
}
