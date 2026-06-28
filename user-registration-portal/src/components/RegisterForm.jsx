import { useState, useCallback } from "react";
import styles from "./Form.module.css";
import { EyeIcon } from "./Icons";

function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent", pct: "0%" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "",       color: "transparent", pct: "0%"   },
    { label: "Weak",   color: "#FF6B6B",     pct: "25%"  },
    { label: "Fair",   color: "#FFB347",     pct: "50%"  },
    { label: "Good",   color: "#6C63FF",     pct: "75%"  },
    { label: "Strong", color: "#4ECDC4",     pct: "100%" },
  ];
  return { ...map[score], score };
}

export default function RegisterForm({ onSwitch, onSuccess, switchToSignIn }) {
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
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
    if (!form.name.trim())             e.name = "Full name is required.";
    else if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.email.trim())            e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password)                e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");

    try {
      // POST to a mock/demo endpoint — swap URL for your real API
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) throw new Error("Registration failed. Please try again.");

      // Success — show toast then go to sign-in page
      onSuccess();
      setTimeout(() => switchToSignIn(), 800);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(form.password);

  return (
    <div className={styles.root}>
      <div className={styles.orb} />
      <div className={styles.card}>
        <p className={styles.eyebrow}>Get started</p>
        <h1 className={styles.headline}>Create your <em>account</em></h1>
        <p className={styles.subline}>Join thousands already building with us.</p>

        {apiError && (
          <div className={styles.apiError}>
            <span className={styles.apiErrorIcon}>⚠</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name" name="name" type="text" autoComplete="name"
              placeholder="Jane Smith" value={form.name} onChange={handle}
              className={[styles.input, errors.name ? styles.inputError : ""].join(" ")}
            />
            {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email" name="email" type="email" autoComplete="email"
              placeholder="jane@example.com" value={form.email} onChange={handle}
              className={[styles.input, errors.email ? styles.inputError : ""].join(" ")}
            />
            {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-password">Password</label>
            <div className={styles.inputWrap}>
              <input
                id="reg-password" name="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
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
            {form.password && (
              <div className={styles.strength}>
                <div className={styles.strengthBar}>
                  <div className={styles.strengthFill}
                    style={{ width: strength.pct, background: strength.color }} />
                </div>
                <p className={styles.strengthLabel} style={{ color: strength.color }}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : "Create Account"}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <button className={styles.switchLink} onClick={onSwitch}>Sign in</button>
        </p>
      </div>
    </div>
  );
}
