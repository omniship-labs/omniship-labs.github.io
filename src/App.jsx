import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { Stats } from './components/Stats.jsx';
import { ProjectGrid } from './components/ProjectGrid.jsx';
import { Mission } from './components/Mission.jsx';
import { SponsorLedger } from './components/SponsorLedger.jsx';
import { Footer } from './components/Footer.jsx';

export function App({ data }) {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats stats={data.stats} />
        <ProjectGrid projects={data.projects} github={data.github} />
        <Mission />
        <SponsorLedger
          openCollective={data.openCollective}
          raised={data.raised}
          backers={data.backers}
          ledger={data.ledger}
        />
      </main>
      <Footer projects={data.projects} github={data.github} />
    </>
  );
}
