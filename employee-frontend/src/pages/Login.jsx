import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", form);

      const { token, username, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Welcome Section */}

      <div className="welcome-section">
        <div className="welcome-icon">👥</div>

        <h1>Employee Management System</h1>

        <p>Welcome to your employee management portal</p>

        <div className="welcome-features">
          <span>🔐 Secure</span>
          <span>📊 Simple</span>
          <span>⚡ Efficient</span>
        </div>
      </div>

      {/* Login Card */}

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🔐</div>

          <h2>Welcome Back!</h2>

          <p>Login to continue to your account</p>
        </div>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>

          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
