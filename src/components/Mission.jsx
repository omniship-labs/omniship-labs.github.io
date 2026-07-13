const CELLS = [
  {
    k: 'Open',
    t: 'Open by default',
    d: 'Source, schematics, and docs in the open from commit one. Fork anything; it is already yours.',
  },
  {
    k: 'Meets',
    t: 'Made together',
    d: 'Maintainers and weekend tinkerers in the same workshop. We show the work — commands, repos, real screenshots.',
  },
  {
    k: 'New Ideas',
    t: 'For real problems',
    d: 'No hype, no growth-speak. We pick everyday problems and solve them once, so nobody has to solve them again.',
  },
];

export function Mission() {
  return (
    <section className="mission">
      <div className="wrap">
        <div className="mission-intro">
          <p className="mission-eyebrow mono">Omni = Open · Meets · New Ideas</p>
          <p className="mission-statement">Free tools, given away for good. The name is the mission.</p>
        </div>
        <div className="mission-grid">
          {CELLS.map((c) => (
            <div className="mission-cell" key={c.k}>
              <div className="mission-k mono">{c.k}</div>
              <div className="mission-t">{c.t}</div>
              <div className="mission-d">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
