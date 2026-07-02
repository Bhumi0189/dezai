import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { PRIORITIES } from "../constants";
import { fmtDate, isOverdue } from "../utils/taskUtils";

const navButtonStyle = {
  background: "#0D1117",
  border: "1px solid #2D333B",
  borderRadius: 5,
  color: "#8B949E",
  padding: "3px 8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  lineHeight: 1,
};

const iconButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#6B7280",
  padding: "4px 5px",
  cursor: "pointer",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
};

export default function TaskCard({
  task,
  colIdx,
  onEdit,
  onDelete,
  onMove,
  onDragStart,
  onDragEnd,
  isDragging,
}) {
  const [hover, setHover] = useState(false);
  const priority = PRIORITIES.find((item) => item.id === task.priority) ?? PRIORITIES[1];
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      draggable
      onDragStart={(event) => {
        onDragStart(event, task.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#1C2128",
        border: `1px solid ${hover && !isDragging ? "#4B5563" : "#2D333B"}`,
        borderRadius: 8,
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.3 : 1,
        userSelect: "none",
        boxShadow: hover && !isDragging ? "0 6px 20px rgba(0,0,0,0.4)" : "none",
        transition: "border-color 0.15s, box-shadow 0.15s, opacity 0.15s",
      }}
    >
      <div style={{ height: 3, background: priority.color }} />

      <div style={{ padding: "10px 12px 12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 4,
              color: priority.color,
              background: priority.bg,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {priority.label}
          </span>
          <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace" }}>
            #{task.id.slice(-4)}
          </span>
        </div>

        <p
          style={{
            margin: "0 0 4px",
            fontSize: 13,
            fontWeight: 600,
            color: "#CDD9E5",
            lineHeight: 1.45,
          }}
        >
          {task.title}
        </p>

        {task.description && (
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 12,
              color: "#636E7B",
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 8,
              color: overdue ? "#F85149" : "#636E7B",
              fontSize: 11,
            }}
          >
            {overdue ? <AlertTriangle size={11} /> : <Calendar size={11} />}
            <span>
              {fmtDate(task.dueDate)}
              {overdue ? " · overdue" : ""}
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            marginTop: 10,
            borderTop: "1px solid #2D333B",
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {colIdx > 0 && (
              <button onClick={() => onMove(task.id, -1)} title="Move left" style={navButtonStyle}>
                <ArrowLeft size={12} />
              </button>
            )}
            {colIdx < 3 && (
              <button onClick={() => onMove(task.id, 1)} title="Move right" style={navButtonStyle}>
                <ArrowRight size={12} />
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: 2 }}>
            <button onClick={() => onEdit(task)} title="Edit task" style={iconButtonStyle}>
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              title="Delete task"
              style={{ ...iconButtonStyle, color: "#F85149" }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
