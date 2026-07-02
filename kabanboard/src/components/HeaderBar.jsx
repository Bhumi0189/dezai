import { LayoutDashboard, Search, Plus } from "lucide-react";
import { PRIORITIES } from "../constants";

function inputBase(extra = {}) {
  return {
    background: "#0D1117",
    border: "1px solid #30363D",
    borderRadius: 8,
    padding: "7px 12px",
    color: "#E6EDF3",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    ...extra,
  };
}

export default function HeaderBar({
  done,
  total,
  pct,
  search,
  setSearch,
  pFilter,
  setPFilter,
  onNewTask,
}) {
  return (
    <header
      style={{
        background: "#161B22",
        borderBottom: "1px solid #21262D",
        padding: "11px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <LayoutDashboard size={19} color="#7C3AED" strokeWidth={2} />
          <span style={{ fontSize: 15, fontWeight: 700, color: "#E6EDF3", letterSpacing: "-0.025em" }}>
            KanbanFlow
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 90,
              height: 4,
              background: "#21262D",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "#3FB950",
                borderRadius: 2,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: "#636E7B", whiteSpace: "nowrap" }}>
            {pct}% done · {done}/{total}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={13}
            color="#636E7B"
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks…"
            style={inputBase({ paddingLeft: 30, width: 170 })}
          />
        </div>

        <select value={pFilter} onChange={(event) => setPFilter(event.target.value)} style={inputBase()}>
          <option value="all">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.label}
            </option>
          ))}
        </select>

        <button
          onClick={onNewTask}
          style={{
            background: "#7C3AED",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            padding: "8px 15px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          <Plus size={15} strokeWidth={2.5} /> New task
        </button>
      </div>
    </header>
  );
}
