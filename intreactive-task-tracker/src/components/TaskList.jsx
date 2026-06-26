import TaskItem from "./TaskItem";
import "./TaskList.css";

export default function TaskList({ tasks, onComplete, onDelete }) {
  if (tasks.length === 0) {
    return <p className="task-empty">No tasks yet — add one above</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}  // prop passed down from parent
          onDelete={onDelete}      // prop passed down from parent
        />
      ))}
    </ul>
  );
}
