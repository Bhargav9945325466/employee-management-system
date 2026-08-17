import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  // ==============================
  // LOAD EMPLOYEES
  // ==============================

  const loadEmployees = async () => {
    try {
      setError("");

      const response = await api.get("/api/employees");

      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load employees.");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const employeeData = {
        ...form,
        salary: Number(form.salary),
      };

      if (editingId) {
        await api.put(`/api/employees/${editingId}`, employeeData);

        alert("Employee updated successfully!");
      } else {
        await api.post("/api/employees", employeeData);

        alert("Employee added successfully!");
      }

      resetForm();

      await loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // DELETE
  // ==============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/api/employees/${id}`);

      alert("Employee deleted successfully!");

      await loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {
    setEditingId(null);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  // ==============================
  // LOGOUT
  // ==============================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}

      <header className="dashboard-header">
        <div className="brand-section">
          <div className="brand-icon">👥</div>

          <div>
            <h1>Employee Management</h1>
            <p>Manage your organization with ease</p>
          </div>
        </div>

        <div className="user-section">
          <div className="user-info">
            <span>Welcome,</span>

            <strong>{username}</strong>

            <span
              className={`role-badge ${
                role === "ADMIN" ? "admin-badge" : "user-badge"
              }`}
            >
              {role}
            </span>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="dashboard-container">
        {/* ERROR */}

        {error && <div className="error-message">⚠️ {error}</div>}

        {/* ================= ADMIN FORM ================= */}

        {role === "ADMIN" && (
          <section className="form-section">
            <div className="section-heading">
              <div>
                <h2>{editingId ? "✏️ Update Employee" : "➕ Add Employee"}</h2>

                <p>
                  {editingId
                    ? "Update employee information"
                    : "Add a new employee to the organization"}
                </p>
              </div>
            </div>

            <form className="employee-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label>First Name</label>

                  <input
                    name="firstName"
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Last Name</label>

                  <input
                    name="lastName"
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email Address</label>

                  <input
                    name="email"
                    type="email"
                    placeholder="employee@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Department</label>

                  <input
                    name="department"
                    placeholder="e.g. IT, HR, Finance"
                    value={form.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Salary</label>

                  <input
                    name="salary"
                    type="number"
                    placeholder="Enter salary"
                    value={form.salary}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editingId
                      ? "Update Employee"
                      : "Add Employee"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        {/* ================= EMPLOYEE LIST ================= */}

        <section className="employees-section">
          <div className="employees-heading">
            <div>
              <h2>👨‍💼 Employees</h2>

              <p>
                {employees.length} employee
                {employees.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <button className="refresh-btn" onClick={loadEmployees}>
              🔄 Refresh
            </button>
          </div>

          {employees.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>

              <h3>No Employees Found</h3>

              <p>There are currently no employees in the system.</p>
            </div>
          ) : (
            <div className="employee-grid">
              {employees.map((employee) => (
                <div className="employee-card" key={employee.id}>
                  <div className="employee-avatar">
                    {employee.firstName?.charAt(0).toUpperCase()}
                  </div>

                  <h3>
                    {employee.firstName} {employee.lastName}
                  </h3>

                  <p className="employee-email">📧 {employee.email}</p>

                  <div className="employee-details">
                    <div>
                      <span>Department</span>
                      <strong>{employee.department}</strong>
                    </div>

                    <div>
                      <span>Salary</span>
                      <strong>
                        ₹{Number(employee.salary).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  {/* ADMIN ACTIONS */}

                  {role === "ADMIN" && (
                    <div className="card-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(employee)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(employee.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
