import "./TaskItem.css";

const PRIORITY_STYLES = {
  high: { background: "#fcebeb", color: "#a32d2d" },
  mid:  { background: "#faeeda", color: "#854f0b" },
  low:  { background: "#f1efe8", color: "#5f5e5a" },
};

export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>

      {/* Complete button — calls onComplete prop from parent */}
      <button
        className={`check-btn ${task.done ? "checked" : ""}`}
        onClick={() => onComplete(task.id)}
        aria-label={task.done ? "Mark incomplete" : "Mark complete"}
      >
        {task.done && (
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Label */}
      <span className="task-label">{task.label}</span>

      {/* Priority badge */}
      {task.priority && (
        <span className="priority-badge" style={PRIORITY_STYLES[task.priority]}>
          {task.priority}
        </span>
      )}

      {/* Delete button — calls onDelete prop from parent */}
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
        </svg>
      </button>

    </li>
  );
}
