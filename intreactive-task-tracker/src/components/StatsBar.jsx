import "./StatsBar.css";

export default function StatsBar({ tasks }) {
  const total     = tasks.length;
  const done      = tasks.filter((t) => t.done).length;
  const remaining = total - done;

  const stats = [
    { label: "Total",     value: total     },
    { label: "Completed", value: done      },
    { label: "Remaining", value: remaining },
  ];

  return (
    <div className="stats-bar">
      {stats.map(({ label, value }) => (
        <div className="stat-card" key={label}>
          <span className="stat-label">{label}</span>
          <span className="stat-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
