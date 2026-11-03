import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import TechnologyPage from './pages/TechnologyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import RoadmapPage from './pages/RoadmapPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import MissionPage from './pages/MissionPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="technology" element={<TechnologyPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="mission" element={<MissionPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
