import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
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
      await api.post("/api/auth/register", form);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
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

      {/* Register Card */}

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">✨</div>

          <h2>Create Account</h2>

          <p>Register to access the employee portal</p>
        </div>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Choose a username"
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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
