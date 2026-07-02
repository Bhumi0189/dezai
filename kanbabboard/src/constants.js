import { ClipboardList, Zap, Eye, CheckCircle2 } from "lucide-react";

export const COLS = [
  { id: "todo", label: "To Do", color: "#58A6FF", Icon: ClipboardList },
  { id: "inprogress", label: "In Progress", color: "#F0883E", Icon: Zap },
  { id: "review", label: "Review", color: "#D29922", Icon: Eye },
  { id: "done", label: "Done", color: "#3FB950", Icon: CheckCircle2 },
];

export const PRIORITIES = [
  { id: "high", label: "High", color: "#F85149", bg: "rgba(248,81,73,0.15)" },
  { id: "medium", label: "Medium", color: "#F0883E", bg: "rgba(240,136,62,0.12)" },
  { id: "low", label: "Low", color: "#3FB950", bg: "rgba(63,185,80,0.12)" },
];

export const STORAGE_KEY = "kanban-v1";

export const SAMPLE = [
  {
    id: "t001",
    title: "Set up React project",
    description: "Initialize with Vite, install dependencies, configure ESLint",
    priority: "high",
    status: "done",
    dueDate: "",
  },
  {
    id: "t002",
    title: "Build Kanban board UI",
    description: "Design column layout and task card components",
    priority: "high",
    status: "inprogress",
    dueDate: "",
  },
  {
    id: "t003",
    title: "Add drag & drop",
    description: "Implement HTML5 drag and drop API across all columns",
    priority: "medium",
    status: "review",
    dueDate: "",
  },
  {
    id: "t004",
    title: "Write unit tests",
    description: "Test every component with React Testing Library",
    priority: "low",
    status: "todo",
    dueDate: "",
  },
  {
    id: "t005",
    title: "Deploy to Vercel",
    description: "Configure CI/CD pipeline and production environment",
    priority: "medium",
    status: "todo",
    dueDate: "",
  },
];
