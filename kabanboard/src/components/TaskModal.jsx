import { useState } from "react";
import { X } from "lucide-react";
import { PRIORITIES } from "../constants";

function inputStyle(extra = {}) {
  return {
    width: "100%",
    background: "#0D1117",
    border: "1px solid #30363D",
    borderRadius: 8,
    padding: "9px 12px",
    color: "#E6EDF3",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    ...extra,
  };
}

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: "#7D8590",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

export default function TaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");

  const submit = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.78)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
        padding: 16,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          background: "#161B22",
          border: "1px solid #30363D",
          borderRadius: 14,
          padding: 28,
          width: "100%",
          maxWidth: 460,
          boxShadow: "0 24px 60px rgba(0,0,0,0.65)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#E6EDF3" }}>
            {task ? "Edit task" : "New task"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#6B7280",
              cursor: "pointer",
              padding: 4,
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Title *</label>
          <input
            style={inputStyle()}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") submit();
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Description</label>
          <textarea
            style={inputStyle({ height: 80, resize: "vertical" })}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add more context…"
          />
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 26 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Priority</label>
            <select
              style={inputStyle()}
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Due date</label>
            <input
              type="date"
              style={inputStyle()}
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid #30363D",
              borderRadius: 8,
              color: "#7D8590",
              padding: "8px 18px",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!title.trim()}
            style={{
              background: title.trim() ? "#7C3AED" : "#21262D",
              border: "none",
              borderRadius: 8,
              color: title.trim() ? "#fff" : "#484F58",
              padding: "8px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: title.trim() ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}
          >
            {task ? "Save changes" : "Add task"}
          </button>
        </div>
      </div>
    </div>
  );
}
