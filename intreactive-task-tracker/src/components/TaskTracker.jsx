import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import StatsBar from "./StatsBar";
import "./TaskTracker.css";

let nextId = 5;

const initialTasks = [
  { id: 1, label: "Design component hierarchy", done: false, priority: "high" },
  { id: 2, label: "Pass props from parent to child", done: true,  priority: "high" },
  { id: 3, label: "Handle state in parent only",    done: false, priority: "mid"  },
  { id: 4, label: "Lift event handlers up",         done: false, priority: "low"  },
];

export default function TaskTracker() {
  const [tasks, setTasks] = useState(initialTasks);

  // ── handlers live here in the parent ──────────────────────────────────────

  const handleComplete = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const handleDelete = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const handleAdd = ({ label, priority }) => {
    setTasks((prev) => [
      ...prev,
      { id: nextId++, label, done: false, priority },
    ]);
  };

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div className="tracker">
      <div className="tracker-header">
        <svg className="tracker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
        <h1>Task tracker</h1>
      </div>

      {/* StatsBar — receives derived data only */}
      <StatsBar tasks={tasks} />

      {/* AddTaskForm — receives onAdd handler as prop */}
      <AddTaskForm onAdd={handleAdd} />

      <p className="prop-note">
        Parent passes{" "}
        <code>onComplete</code> and <code>onDelete</code> as props to each child
      </p>

      {/* TaskList — receives tasks + both handlers as props */}
      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}
