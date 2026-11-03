import { PageHeader } from '../components/PageHeader';
import { Team } from '../components/Team';
import { About } from '../components/About';
import { CTA } from '../components/CTA';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function TeamPage() {
  useDocumentTitle('Team');
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="The people behind ARES."
        body="Two co-founders from Worcester Polytechnic Institute, working on autonomy for emergency response."
      />
      <Team />
      <About />
      <CTA />
    </>
  );
}
