import { PageHeader } from '../components/PageHeader';
import { Roadmap } from '../components/Roadmap';
import { Market } from '../components/Market';
import { Commercialization } from '../components/Commercialization';
import { CTA } from '../components/CTA';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function RoadmapPage() {
  useDocumentTitle('Roadmap');
  return (
    <>
      <PageHeader
        eyebrow="Roadmap"
        title="The path to deployment."
        body="An early-stage venture with a clear path: build, test, pilot with responders, then scale."
        image="rescueRuins"
      />
      <Roadmap />
      <Market />
      <Commercialization />
      <CTA />
    </>
  );
}
