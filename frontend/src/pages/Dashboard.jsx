// import Layout from "../components/Layout";
import "../styles/dashboard.css";


import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import "../styles/dashboard.css";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    activeAppointments: 0,
    inactiveAppointments: 0
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");

      // 🔥 handle different response structures
      const data = res.data?.data || res.data;

      setStats(data);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="cards">

          <div className="card">
            <h3>Patients</h3>
            <p>{stats.patients}</p>
          </div>

          <div className="card">
            <h3>Doctors</h3>
            <p>{stats.doctors}</p>
          </div>

          <div className="card">
            <h3>Appointments</h3>
            <p>{stats.appointments}</p>
          </div>

          <div className="card success">
            <h3>Active Appointments</h3>
            <p>{stats.activeAppointments}</p>
          </div>

          <div className="card danger">
            <h3>Inactive Appointments</h3>
            <p>{stats.inactiveAppointments}</p>
          </div>

        </div>
      )}
    </Layout>
  );
}

export default Dashboard;