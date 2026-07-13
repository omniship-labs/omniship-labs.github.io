function ProjectCard({ p }) {
  return (
    <a className="project-card" href={p.href} rel="noopener" style={{ '--a': p.accent }}>
      <span className="project-topline" aria-hidden="true"></span>
      <span className="project-head">
        <span className="project-icon project-icon-mark" aria-hidden="true">
          <img src={p.mark} alt="" width="38" height="38" />
        </span>
        <span className="project-names">
          <span className="project-repo mono">omniship-labs/<strong>{p.repo}</strong></span>
          <span className="project-cat mono">{p.category}</span>
        </span>
      </span>
      <span className="project-desc">{p.description}</span>
      <span className="project-meta">
        <span className="badge badge-neutral mono">{p.license}</span>
        <span className="lang-chip mono">{p.language}</span>
        {p.live && (
          <span className="badge badge-success mono"><span className="badge-dot"></span>live</span>
        )}
      </span>
    </a>
  );
}

function WorkbenchCard({ github }) {
  return (
    <a className="project-card project-card-placeholder" href={github} rel="noopener">
      <span className="project-desc">More on the workbench. Follow the org on GitHub to see what ships next.</span>
      <span className="project-meta">
        <span className="all-link mono">github.com/omniship-labs
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </span>
      </span>
    </a>
  );
}

export function ProjectGrid({ projects, github }) {
  return (
    <section className="wrap projects-section" id="projects">
      <div className="section-head">
        <div>
          <p className="eyebrow mono"><span className="eyebrow-dot"></span>The workshop</p>
          <h2>Anything that needs solving.</h2>
        </div>
        <a className="all-link mono" href={github} rel="noopener">
          All projects
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </a>
      </div>

      <div className="project-grid">
        {projects.map((p) => <ProjectCard p={p} key={p.repo} />)}
        <WorkbenchCard github={github} />
      </div>
    </section>
  );
}
