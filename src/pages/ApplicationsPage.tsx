import { PageHeader } from '../components/PageHeader';
import { Applications } from '../components/Applications';
import { Impact } from '../components/Impact';
import { CTA } from '../components/CTA';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function ApplicationsPage() {
  useDocumentTitle('Applications');
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Robotic teammates where it matters most."
        body="Reconnaissance for emergencies and hazardous sites, so responders know more before they go in."
        image="wildfire"
      />
      <Applications />
      <div className="border-t border-line">
        <Impact />
      </div>
      <CTA />
    </>
  );
}
