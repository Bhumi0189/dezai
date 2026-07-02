import { COLS } from "../constants";

export const uid = () =>
  "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 4);

export function fmtDate(str) {
  if (!str) return null;
  return new Date(str + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function isOverdue(dueDate, status) {
  return !!(
    dueDate &&
    status !== "done" &&
    new Date(dueDate + "T00:00:00") < new Date()
  );
}

export function toDone(task, nextStatus) {
  return nextStatus === "done" && task.status !== "done";
}

export function nextStatusByDirection(currentStatus, dir) {
  const currentIndex = COLS.findIndex((col) => col.id === currentStatus);
  return COLS[Math.max(0, Math.min(COLS.length - 1, currentIndex + dir))].id;
}
