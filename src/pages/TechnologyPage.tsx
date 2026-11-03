import { PageHeader } from '../components/PageHeader';
import { Technology } from '../components/Technology';
import { HowItWorks } from '../components/HowItWorks';
import { PhotoBand } from '../components/PhotoBand';
import { CompetitiveAdvantage } from '../components/CompetitiveAdvantage';
import { CTA } from '../components/CTA';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function TechnologyPage() {
  useDocumentTitle('Technology');
  return (
    <>
      <PageHeader
        eyebrow="The ARES system"
        title="How ARES works."
        body="A human sets the objective. The swarm handles navigation, exploration, and coordination."
        image="droneSky"
      />
      <Technology />
      <HowItWorks />
      <PhotoBand name="drone" line="An autonomy and coordination layer for teams of robots." />
      <CompetitiveAdvantage />
      <CTA />
    </>
  );
}
