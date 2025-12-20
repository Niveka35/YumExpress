import React from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [mode, setMode] = React.useState("signin");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const navigate = useNavigate();


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

  async function handleSubmit(e) {
  e.preventDefault();
  setMessage(null);

  const err = simpleValidate();
  if (err) {
    setMessage({ type: "error", text: err });
    return;
  }

  setLoading(true);

  try {
    if (mode === "signup") {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setMessage({ type: "success", text: "Account created! Please sign in." });
      setMode("signin");
      resetFormAndMsg();
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home");
    }
  } catch (err) {
    setMessage({
      type: "error",
      text: err.response?.data?.msg || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
  }

  function resetFormAndMsg() {
    setForm({
      name: "",
      email: "",
      password: "",
      confirm: "",
    });
    setMessage(null);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
           <h1> Welcome to <span>Niveka Grocery Store</span> </h1>
          <p>Create an account or sign in to continue.</p>
          <ul>
            <li>Save more on every grocery trip</li>
            <li>Affordable prices across multiple stores</li>
            <li>Daily essentials & fresh groceries</li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <div className="top-bar">
            <h2>{mode === "signin" ? "Sign in" : "Sign up"}</h2>
            <p>
              {mode === "signin"
                ? "Welcome back — please enter your details."
                : "Join us — it only takes a minute."}
            </p>
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
              <div className={`msg ${message.type}`}>
                {message.text}
              </div>
            )}

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "signin"
                ? "Sign in"
                : "Sign up"}
            </button>
          </form>

          <div className="switch-footer">
            {mode === "signin" ? (
              <>
                Don’t have an account?
                <button
                  className="link-btn"
                  onClick={() => {
                    setMode("signup");
                    resetFormAndMsg();
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button
                  className="link-btn"
                  onClick={() => {
                    setMode("signin");
                    resetFormAndMsg();
                  }}
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
