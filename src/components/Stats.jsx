export function Stats({ stats }) {
  return (
    <section className="wrap stats-section" aria-label="Collective at a glance">
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label mono">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
