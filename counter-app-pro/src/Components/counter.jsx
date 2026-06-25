import { useState } from "react";

const getColor = (count) => {
  if (count > 0) return { bg: "#eaf3de", text: "#3B6D11", border: "#97C459" };
  if (count < 0) return { bg: "#fcebeb", text: "#A32D2D", border: "#F09595" };
  return { bg: "#EEEDFE", text: "#534AB7", border: "#AFA9EC" };
};

export default function Counter() {
  const [count, setCount] = useState(0);
  const [pop, setPop] = useState(false);

  const update = (val) => {
    setCount(val);
    setPop(false);
    setTimeout(() => setPop(true), 10);
    setTimeout(() => setPop(false), 250);
  };

  const { bg, text, border } = getColor(count);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f4f8",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: "white",
        borderRadius: 28,
        padding: "48px 56px",
        textAlign: "center",
        boxShadow: "0 4px 40px rgba(0,0,0,0.09)",
        minWidth: 300,
      }}>

        <p style={{ fontSize: 12, color: "#bbb", letterSpacing: "0.12em", marginBottom: 28, textTransform: "uppercase" }}>
          Counter Pro
        </p>

        {/* Count bubble */}
        <div style={{
          background: bg,
          border: `2px solid ${border}`,
          borderRadius: 24,
          padding: "36px 52px",
          marginBottom: 36,
          transition: "background 0.35s, border-color 0.35s",
        }}>
          <span style={{
            fontSize: 88,
            fontWeight: 700,
            color: text,
            display: "block",
            lineHeight: 1,
            transition: "transform 0.18s ease, color 0.35s",
            transform: pop ? "scale(1.18)" : "scale(1)",
          }}>
            {count}
          </span>
          <span style={{ fontSize: 12, color: text, opacity: 0.65, marginTop: 10, display: "block" }}>
            {count > 0 ? "positive" : count < 0 ? "negative" : "zero"}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn onClick={() => update(count - 1)} bg="#fcebeb" color="#A32D2D">−</Btn>
          <Btn onClick={() => update(0)} bg="#f3f3f3" color="#999" small>Reset</Btn>
          <Btn onClick={() => update(count + 1)} bg="#eaf3de" color="#3B6D11">+</Btn>
        </div>

      </div>
    </div>
  );
}

function Btn({ onClick, bg, color, small, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: small ? "auto" : 58,
        height: 58,
        padding: small ? "0 22px" : 0,
        borderRadius: 18,
        border: "none",
        background: bg,
        color,
        fontSize: small ? 14 : 28,
        fontWeight: 600,
        cursor: "pointer",
        transform: hover ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.15s",
      }}
    >
      {children}
    </button>
  );
}