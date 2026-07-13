const Heart = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-10-9.2C.3 8.4 2 5 5.4 5c2 0 3.3 1 4.6 2.6C11.3 6 12.6 5 14.6 5 18 5 19.7 8.4 22 11.8 19.5 16.4 12 21 12 21z" />
  </svg>
);

/**
 * "Where it goes" — the OmniShip Labs design system's DonationAsk, ledger
 * format (components/brand/DonationAsk.jsx). Beacon is spent once on the CTA;
 * budget bars stay muted so they never compete with it.
 */
export function SponsorLedger({ openCollective, raised, backers, ledger, license = 'AGPL-3.0' }) {
  return (
    <section className="wrap sponsor-section" id="sponsor">
      <div className="ledger-card">
        <p className="eyebrow mono"><span className="eyebrow-dot"></span>Where it goes</p>
        <h2 className="ledger-title">Every dollar, in the open.</h2>
        <p className="ledger-body">
          Everything OmniShip makes is free under {license}. Donations keep it maintained — here is the whole budget, straight from the collective.
        </p>

        {ledger.map((row) => (
          <div className="ledger-row" key={row.label}>
            <div className="ledger-row-head">
              <span className="ledger-row-label">{row.label}</span>
              <span className="ledger-row-pct mono">{row.pct}%</span>
            </div>
            <div className="ledger-bar-track">
              <div className="ledger-bar-fill" style={{ width: `${row.pct}%` }} />
            </div>
          </div>
        ))}

        <div className="ledger-foot">
          <span className="ledger-foot-stat mono">
            <strong>${raised.toLocaleString('en-US')}</strong> raised · {backers} {backers === 1 ? 'backer' : 'backers'}
          </span>
          <span className="badge badge-neutral mono">{license}</span>
          <a className="btn btn-primary ledger-cta" href={openCollective} rel="noopener">
            <Heart />
            Become a backer
          </a>
        </div>
      </div>
    </section>
  );
}
