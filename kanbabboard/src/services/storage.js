import { STORAGE_KEY } from "../constants";

function hasArtifactStorage() {
  return (
    typeof window !== "undefined" &&
    window.storage &&
    typeof window.storage.get === "function" &&
    typeof window.storage.set === "function"
  );
}

export async function loadTasks() {
  try {
    if (hasArtifactStorage()) {
      const result = await window.storage.get(STORAGE_KEY);
      if (result?.value) {
        return JSON.parse(result.value);
      }
      return null;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function persistTasks(tasks) {
  try {
    const payload = JSON.stringify(tasks);

    if (hasArtifactStorage()) {
      await window.storage.set(STORAGE_KEY, payload);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // Ignore persistence failures to avoid interrupting UX.
  }
}
