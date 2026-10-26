import { MissionHero } from '../components/MissionHero';
import { StatsSection } from '../components/StatsSection';
import { ProductSection } from '../components/ProductSection';
import { StorySection } from '../components/StorySection';
import { CTA } from '../components/CTA';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <MissionHero />
      <StatsSection />
      <ProductSection />
      <StorySection />
      <CTA />
    </>
  );
}
