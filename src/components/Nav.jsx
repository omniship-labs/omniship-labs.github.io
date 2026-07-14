import glyph from '@omniship-labs/design-beacon/assets/omniship-glyph.svg';
import mark from '@omniship-labs/design-beacon/assets/omniship-mark.svg';

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="/">
          <span className="brand-avatar" aria-hidden="true">
            <img className="on-light" src={glyph} alt="" />
            <img className="on-dark" src={mark} alt="" />
          </span>
          <span className="wordmark">OmniShip<span className="wordmark-labs"> Labs</span></span>
        </a>
        <nav className="nav-links mono" aria-label="Main">
          <a href="#projects">Projects</a>
          <a className="nav-git" href="https://github.com/omniship-labs" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2.4" /><circle cx="6" cy="19" r="2.4" /><circle cx="18" cy="19" r="2.4" /><path d="M12 7.4V13a4 4 0 0 1-4 4M12 13a4 4 0 0 0 4 4" /></svg>
            GitHub
          </a>
          <button id="theme-toggle" type="button" aria-label="Toggle dark mode">
            <svg className="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
            <svg className="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <a className="btn btn-primary btn-sm" href="#sponsor">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.3 8.4 2 5 5.4 5c2 0 3.3 1 4.6 2.6C11.3 6 12.6 5 14.6 5 18 5 19.7 8.4 22 11.8 19.5 16.4 12 21 12 21z" /></svg>
            Sponsor
          </a>
        </nav>
      </div>
    </header>
  );
}
