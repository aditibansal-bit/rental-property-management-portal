import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <h1>Rental Property Management</h1>

        <div className="user-info">
          <span>Hi, {user?.name}</span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Dashboard</h2>
          <p>Manage your rental properties and requests efficiently</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card green">
            <h3>Total Properties</h3>
            <div className="number">12</div>
          </div>

          <div className="stat-card blue">
            <h3>Available Properties</h3>
            <div className="number">8</div>
          </div>

          <div className="stat-card orange">
            <h3>Pending Requests</h3>
            <div className="number">5</div>
          </div>

          <div className="stat-card purple">
            <h3>Active Tenants</h3>
            <div className="number">7</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;