import { useState } from "react";
import TaskCard from "./TaskCard";

export default function KanbanCol({
  col,
  tasks,
  colIdx,
  onEdit,
  onDelete,
  onMove,
  onDragStart,
  onDragEnd,
  onDrop,
  draggingId,
}) {
  const Icon = col.Icon;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 250, flexShrink: 0 }}>
      <div
        style={{
          background: "#161B22",
          borderRadius: "10px 10px 0 0",
          borderTop: `3px solid ${col.color}`,
          padding: "12px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon size={15} color={col.color} strokeWidth={2.2} />
          <span style={{ fontWeight: 600, fontSize: 13, color: "#CDD9E5" }}>{col.label}</span>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 9px",
            borderRadius: 20,
            background: `${col.color}1A`,
            color: col.color,
          }}
        >
          {tasks.length}
        </span>
      </div>

      <DropArea col={col} onDrop={onDrop}>
        {tasks.length === 0 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px dashed #2D333B",
              borderRadius: 8,
              padding: 24,
              margin: 2,
            }}
          >
            <Icon size={22} color="#2D333B" strokeWidth={1.5} />
            <p style={{ fontSize: 12, color: "#3D444D", margin: "8px 0 0" }}>Drop tasks here</p>
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            colIdx={colIdx}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggingId === task.id}
          />
        ))}
      </DropArea>
    </div>
  );
}

function DropArea({ col, onDrop, children }) {
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => {
        setOver(false);
      }}
      onDrop={(event) => {
        setOver(false);
        onDrop(event, col.id);
      }}
      style={{
        flex: 1,
        minHeight: 130,
        padding: "8px 10px 14px",
        background: over ? `${col.color}09` : "#161B22",
        border: `1px solid ${over ? `${col.color}50` : "#21262D"}`,
        borderRadius: "0 0 10px 10px",
        borderTop: "none",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "background 0.15s, border-color 0.15s",
      }}
    >
      {children}
    </div>
  );
}
