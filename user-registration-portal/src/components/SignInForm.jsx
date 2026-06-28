import { useState, useCallback } from "react";
import styles from "./Form.module.css";
import { EyeIcon } from "./Icons";

// Simulate a small in-memory "registered users" store for demo purposes.
// In a real app this would be server-side.
const DEMO_USERS = [
  { email: "demo@example.com", password: "Password1!", name: "Demo User" },
];

export default function SignInForm({ onSwitch, onSuccess, onError }) {
  const [form, setForm]     = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handle = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
    if (apiError) setApiError("");
  }, [errors, apiError]);

  const validate = () => {
    const e = {};
    if (!form.email.trim())  e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password)      e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");

    try {
      // POST sign-in credentials to a demo endpoint
      // Replace with your real auth API (e.g. /api/auth/login)
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) throw new Error("Sign-in failed. Please try again.");

      // Demo credential check (replace with real server response)
      const match = DEMO_USERS.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (!match) {
        // Simulate invalid-credentials response
        setApiError("Invalid email or password. Try demo@example.com / Password1!");
        setLoading(false);
        return;
      }

      onSuccess(match.name);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
      onError && onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.orb} style={{ background: "radial-gradient(circle, rgba(78,205,196,0.14) 0%, rgba(78,205,196,0.03) 50%, transparent 70%)" }} />
      <div className={styles.card}>
        <p className={styles.eyebrow}>Welcome back</p>
        <h1 className={styles.headline}>Sign <em>in</em></h1>
        <p className={styles.subline}>Good to see you again.</p>

        {/* Demo hint */}
        <div className={styles.demoHint}>
          <strong>Demo credentials:</strong> demo@example.com / Password1!
        </div>

        {apiError && (
          <div className={styles.apiError}>
            <span className={styles.apiErrorIcon}>⚠</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="si-email">Email Address</label>
            <input
              id="si-email" name="email" type="email" autoComplete="email"
              placeholder="jane@example.com" value={form.email} onChange={handle}
              className={[styles.input, errors.email ? styles.inputError : ""].join(" ")}
            />
            {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="si-password">Password</label>
              <button type="button" className={styles.forgotLink}>Forgot password?</button>
            </div>
            <div className={styles.inputWrap}>
              <input
                id="si-password" name="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Your password"
                value={form.password} onChange={handle}
                className={[styles.input, styles.inputPw, errors.password ? styles.inputError : ""].join(" ")}
              />
              <button type="button" className={styles.toggleBtn}
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}>
                <EyeIcon open={showPw} />
              </button>
            </div>
            {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
          </div>

          <button type="submit" className={[styles.btn, styles.btnTeal].join(" ")} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : "Sign In"}
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <button className={styles.switchLink} onClick={onSwitch}>Create one</button>
        </p>
      </div>
    </div>
  );
}
