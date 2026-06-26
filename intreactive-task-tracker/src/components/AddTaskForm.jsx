import { useState } from "react";
import "./AddTaskForm.css";

export default function AddTaskForm({ onAdd }) {
  const [label,    setLabel]    = useState("");
  const [priority, setPriority] = useState("mid");

  const handleSubmit = () => {
    if (!label.trim()) return;
    onAdd({ label: label.trim(), priority });
    setLabel("");
  };

  return (
    <div className="add-form">
      <input
        type="text"
        className="add-input"
        value={label}
        placeholder="Add a new task…"
        onChange={(e) => setLabel(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <select
        className="add-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="mid">Mid</option>
        <option value="low">Low</option>
      </select>
      <button className="add-btn" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}
