// handles user input from form send to backend

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth.js";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!id.trim() || !password) {
      setError("Please enter your id and password.");
      return;
    }

    try {
      setLoading(true);

      const ok = await login(id.trim(), password); // IMPORTANT: login must return true/false

      if (ok) {
        navigate("/");
      } else {
        setError("Login failed.");
      }
    } catch (err) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p style={{ marginTop: 12 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}