import React from "react";
import "./Login.css";   // ← import CSS file

export default function Login() {
  const [mode, setMode] = React.useState("login");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function simpleValidate() {
    if (!form.email) return "Please enter an email.";
    if (!form.password) return "Please enter a password.";
    if (mode === "signup") {
      if (!form.name) return "Please enter your name.";
      if (form.password.length < 6)
        return "Password must be at least 6 characters.";
      if (form.password !== form.confirm)
        return "Passwords do not match.";
    }
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const err = simpleValidate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") {
        setMessage({
          type: "success",
          text: `Welcome back, ${form.email}!`,
        });
      } else {
        setMessage({
          type: "success",
          text: `Account created for ${form.name || form.email}!`,
        });
      }
    }, 900);
  }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <h1>Welcome to YourApp</h1>
          <p>Create an account or sign in to continue.</p>

          <ul>
            <li>Fast onboarding</li>
            <li>Secure demo login</li>
            <li>Responsive UI</li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <div className="top-bar">
            <div>
              <h2>{mode === "login" ? "Sign in" : "Create account"}</h2>
              <p>
                {mode === "login"
                  ? "Welcome back — please enter your details."
                  : "Join us — it only takes a minute."}
              </p>
            </div>

            <div className="switch-buttons">
              <button
                className={mode === "login" ? "active-btn" : ""}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={mode === "signup" ? "active-btn" : ""}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {mode === "signup" && (
              <div className="input-box">
                <label>Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="input-box">
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="input-box">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
              />
            </div>

            {mode === "signup" && (
              <div className="input-box">
                <label>Confirm password</label>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={onChange}
                  placeholder="Repeat password"
                />
              </div>
            )}

            {message && (
              <div
                className={
                  message.type === "error"
                    ? "msg error"
                    : "msg success"
                }
              >
                {message.text}
              </div>
            )}

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign in"
                : "Create account"}
            </button>
          </form>

          <div className="switch-footer">
            {mode === "login" ? (
              <>
                Don't have an account?
                <button
                  className="link-btn"
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button
                  className="link-btn"
                  onClick={() => setMode("login")}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
