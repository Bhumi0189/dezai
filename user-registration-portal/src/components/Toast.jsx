import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

export default function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mount with slight delay so CSS transition fires
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 350);
    }, 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onClose]);

  return (
    <div className={[styles.toast, styles[type], visible ? styles.visible : ""].join(" ")}>
      <span className={styles.icon}>{type === "success" ? "✓" : "✕"}</span>
      <span className={styles.msg}>{message}</span>
      <button className={styles.close} onClick={() => { setVisible(false); setTimeout(onClose, 350); }}>×</button>
    </div>
  );
}
