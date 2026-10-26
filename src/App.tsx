import { Navigation } from './components/Navigation';
import { BackToTop } from './components/BackToTop';
import { useActiveSection } from './lib/useActiveSection';
import { Hero } from './components/Hero';
import { MissionTicker } from './components/MissionTicker';
import { Problem } from './components/Problem';
import { Technology } from './components/Technology';
import { HowItWorks } from './components/HowItWorks';
import { CompetitiveAdvantage } from './components/CompetitiveAdvantage';
import { Applications } from './components/Applications';
import { Impact } from './components/Impact';
import { Roadmap } from './components/Roadmap';
import { Market } from './components/Market';
import { Commercialization } from './components/Commercialization';
import { Team } from './components/Team';
import { About } from './components/About';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  const active = useActiveSection();

  return (
    <div className="bg-void">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>
      <Navigation active={active} />
      <BackToTop />
      <main id="main">
        <Hero />
        <MissionTicker />
        <Problem />
        <Technology />
        <HowItWorks />
        <CompetitiveAdvantage />
        <Applications />
        <Impact />
        <Roadmap />
        <Market />
        <Commercialization />
        <Team />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
