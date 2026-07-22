import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  totalProperties: 0,
  availableProperties: 0,
  pendingRequests: 0,
  activeTenants: 0,
});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  fetchStats();
}, []);

const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/properties/dashboard/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(response.data);
  } catch (error) {
    console.log(error);
  }
};

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
            <div className="number">{stats.totalProperties}</div>
          </div>

          <div className="stat-card blue">
            <h3>Available Properties</h3>
           <div className="number">{stats.availableProperties}</div>
          </div>

          <div className="stat-card orange">
  <h3>Pending Requests</h3>
  <div className="number">{stats.pendingRequests}</div>
</div>

<div className="stat-card purple">
  <h3>Active Tenants</h3>
  <div className="number">{stats.activeTenants}</div>
</div>
        </div>
        <div className="dashboard-actions">
  <Link to="/properties">
    <button className="dashboard-btn">
      Manage Properties
    </button>
  </Link>

  <Link to="/rental-requests">
  <button className="dashboard-btn">
    View Rental Requests
  </button>
</Link>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;