export function Hero() {
  return (
    <section className="wrap hero">
      <div>
        <p className="eyebrow mono"><span className="eyebrow-dot"></span>Open Meets New Ideas</p>
        <h1>Open source for<br />everyday problems.</h1>
        <p className="hero-lead">We build free tools for the things that need solving — software, home automation, hardware — and give them away for anyone to use, fork, and improve.</p>
        <p className="hero-sub"><span className="mono hero-omni">Omni</span> stands for <em>Open Meets New Ideas</em>. The name is the mission.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            Browse projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </a>
          <a className="btn btn-ghost" href="#sponsor">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.3 8.4 2 5 5.4 5c2 0 3.3 1 4.6 2.6C11.3 6 12.6 5 14.6 5 18 5 19.7 8.4 22 11.8 19.5 16.4 12 21 12 21z" /></svg>
            Sponsor OmniShip
          </a>
        </div>
      </div>
      <div className="hero-aside">
        <div className="codeblock">
          <div className="codeblock-head">
            <span className="mono">our latest ship</span>
            <button className="codeblock-copy mono" type="button" data-copy="https://get.eyeread.in">copy</button>
          </div>
          <pre><code>{'# eyeread.in — floats your script over any screen\n'}<a className="codeblock-link" href="https://get.eyeread.in" rel="noopener">open https://get.eyeread.in</a></code></pre>
        </div>
        <div className="alert" role="status">
          <span className="alert-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 7.6h.01" /></svg>
          </span>
          <div>
            <div className="alert-title">Solve it once. Share it forever.</div>
            <div className="alert-body">Every project starts under AGPL-3.0 — free to run, study, and pass on.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
