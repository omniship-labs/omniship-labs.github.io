export function Footer({ projects, github }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-avatar brand-avatar-sm" aria-hidden="true">
              <img className="on-light" src="/vendor/omniship-ui/assets/omniship-glyph.svg" alt="" />
              <img className="on-dark" src="/vendor/omniship-ui/assets/omniship-mark.svg" alt="" />
            </span>
            <span className="wordmark wordmark-sm">OmniShip<span className="wordmark-labs"> Labs</span></span>
          </div>
          <p className="footer-blurb">Open source for everyday problems. Solve it once. Share it forever.</p>
          <div className="footer-tagline mono">Open Meets New Ideas</div>
          <span className="footer-domain mono">omniship.dev</span>
        </div>
        <nav aria-label="Projects">
          <div className="footer-head mono">Projects</div>
          <div className="footer-links">
            {projects.map((p) => (
              <a href={p.href} rel="noopener" key={p.repo}>{p.name}</a>
            ))}
            <a href={github} rel="noopener">All projects</a>
          </div>
        </nav>
        <nav aria-label="Build">
          <div className="footer-head mono">Build</div>
          <div className="footer-links">
            <a href="https://github.com/omniship-labs/omniship-labs.github.io/tree/main/src/vendor/omniship-ui" rel="noopener">Design system</a>
            <a href="https://github.com/omniship-labs/omniship-labs.github.io" rel="noopener">Source of this site</a>
          </div>
        </nav>
        <nav aria-label="Community">
          <div className="footer-head mono">Community</div>
          <div className="footer-links">
            <a href={github} rel="noopener">GitHub</a>
            <a href="/discord/">Discord</a>
          </div>
        </nav>
      </div>
      <div className="footer-bar">
        <div className="wrap footer-bar-inner">
          <span className="mono">© 2026 OmniShip Labs — released under AGPL-3.0</span>
          <span className="mono">Made in the open</span>
        </div>
      </div>
    </footer>
  );
}
