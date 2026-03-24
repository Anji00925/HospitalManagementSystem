// import Layout from "../components/Layout";
import "../styles/dashboard.css";


// function Dashboard() {
//   return (
//     <Layout>
//       <h2>Dashboard</h2>
//       <p>Welcome to Hospital Management System</p>
//     </Layout>
//   );
// }
//
// export default Dashboard;
//

// import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import "../styles/dashboard.css";
import api from "../api/axios";
import { useEffect, useState } from "react";


function Dashboard() {
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        activeAppointments: 0,
        inactiveAppointments: 0

      });

  useEffect(() => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      api.get("/dashboard/stats")
        .then(res => setStats(res.data))
        .catch(err => console.error(err));
    }, []);
  return (
    <Layout>
      <h1>Dashboard</h1>

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
    </Layout>
  );
}

export default Dashboard;
