import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { COLS, SAMPLE } from "./constants";
import Confetti from "./components/Confetti";
import TaskModal from "./components/TaskModal";
import KanbanCol from "./components/KanbanCol";
import HeaderBar from "./components/HeaderBar";
import { loadTasks, persistTasks } from "./services/storage";
import { nextStatusByDirection, toDone, uid } from "./utils/taskUtils";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    loadTasks().then((data) => {
      setTasks(data ?? SAMPLE);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      persistTasks(tasks);
    }
  }, [tasks, ready]);

  const addTask = (data) => {
    setTasks((previous) => [...previous, { ...data, id: uid(), status: "todo" }]);
    setModal(null);
  };

  const editTask = (data) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === modal.id ? { ...task, ...data } : task)),
    );
    setModal(null);
  };

  const deleteTask = (id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  const moveTask = (id, dir) => {
    setTasks((previous) =>
      previous.map((task) => {
        if (task.id !== id) return task;
        const nextStatus = nextStatusByDirection(task.status, dir);
        if (toDone(task, nextStatus)) setConfetti(true);
        return { ...task, status: nextStatus };
      }),
    );
  };

  const onDrop = useCallback(
    (event, colId) => {
      event.preventDefault();
      if (!dragging) return;

      setTasks((previous) =>
        previous.map((task) => {
          if (task.id !== dragging) return task;
          if (toDone(task, colId)) setConfetti(true);
          return { ...task, status: colId };
        }),
      );

      setDragging(null);
    },
    [dragging],
  );

  const normalizedSearch = search.trim().toLowerCase();
  const filtered = tasks.filter(
    (task) =>
      (priorityFilter === "all" || task.priority === priorityFilter) &&
      (!normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        (task.description ?? "").toLowerCase().includes(normalizedSearch)),
  );

  const total = tasks.length;
  const done = tasks.filter((task) => task.status === "done").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!ready) {
    return (
      <div
        style={{
          background: "#0D1117",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#484F58",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
        }}
      >
        Loading board…
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D1117",
        color: "#E6EDF3",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {confetti && <Confetti onDone={() => setConfetti(false)} />}

      <HeaderBar
        done={done}
        total={total}
        pct={pct}
        search={search}
        setSearch={setSearch}
        pFilter={priorityFilter}
        setPFilter={setPriorityFilter}
        onNewTask={() => setModal("new")}
      />

      <main style={{ flex: 1, padding: 18, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 14, minWidth: "fit-content" }}>
          {COLS.map((col, idx) => (
            <KanbanCol
              key={col.id}
              col={col}
              tasks={filtered.filter((task) => task.status === col.id)}
              colIdx={idx}
              onEdit={setModal}
              onDelete={deleteTask}
              onMove={moveTask}
              onDragStart={(_, id) => setDragging(id)}
              onDragEnd={() => setDragging(null)}
              onDrop={onDrop}
              draggingId={dragging}
            />
          ))}
        </div>
      </main>

      {modal === "new" && <TaskModal onSave={addTask} onClose={() => setModal(null)} />}
      {modal && modal !== "new" && (
        <TaskModal task={modal} onSave={editTask} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
