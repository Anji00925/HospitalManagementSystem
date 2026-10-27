// // import Layout from "../components/Layout";
// import "../styles/dashboard.css";
// import AiAssistant from "../components/AiAssistant";
//
//
// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// // import "../styles/dashboard.css";
// import api from "../api/axios";
//
// function Dashboard() {
//   const [stats, setStats] = useState({
//     patients: 0,
//     doctors: 0,
//     appointments: 0,
//     activeAppointments: 0,
//     inactiveAppointments: 0
//   });
//
//   const [loading, setLoading] = useState(true);
//
//   const loadStats = async () => {
//     try {
//       const res = await api.get("/dashboard/stats");
//
//       // 🔥 handle different response structures
//       const data = res.data?.data || res.data;
//
//       setStats(data);
//     } catch (err) {
//       console.error("Dashboard error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     loadStats();
//   }, []);
//
//   return (
//     <Layout>
//       <h1>Dashboard</h1>
//
//       {loading ? (
//         <p>Loading dashboard...</p>
//       ) : (
//         <div className="cards">
//
//           <div className="card">
//             <h3>Patients</h3>
//             <p>{stats.patients}</p>
//           </div>
//
//           <div className="card">
//             <h3>Doctors</h3>
//             <p>{stats.doctors}</p>
//           </div>
//
//           <div className="card">
//             <h3>Appointments</h3>
//             <p>{stats.appointments}</p>
//           </div>
//
//           <div className="card success">
//             <h3>Active Appointments</h3>
//             <p>{stats.activeAppointments}</p>
//           </div>
//
//           <div className="card danger">
//             <h3>Inactive Appointments</h3>
//             <p>{stats.inactiveAppointments}</p>
//           </div>
//
//         </div>
//       )}
//
//   <AiAssistant />
//     </Layout>
//
//
//   );
// }
//
// export default Dashboard;

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AiAssistant from "../components/AiAssistant";
import "../styles/dashboard.css";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    activeAppointments: 0,
    inactiveAppointments: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");
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
      <div className="dashboard-page">

        <div className="dashboard-header">
          <div>
            <h1>Hospital Dashboard</h1>
            <p>
              Monitor patients, doctors, appointments and hospital activity
            </p>
          </div>

          <div className="dashboard-badge">
            HMS Analytics
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading Dashboard...</p>
          </div>
        ) : (
          <div className="cards">

            <div className="card">
              <div className="card-icon">👨‍⚕️</div>

              <div className="card-content">
                <h3>Total Patients</h3>
                <p>{stats.patients}</p>
                <span>Registered Patients</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">🩺</div>

              <div className="card-content">
                <h3>Total Doctors</h3>
                <p>{stats.doctors}</p>
                <span>Medical Staff</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">📅</div>

              <div className="card-content">
                <h3>Appointments</h3>
                <p>{stats.appointments}</p>
                <span>Total Scheduled</span>
              </div>
            </div>

            <div className="card success">
              <div className="card-icon">✅</div>

              <div className="card-content">
                <h3>Active Appointments</h3>
                <p>{stats.activeAppointments}</p>
                <span>Currently Active</span>
              </div>
            </div>

            <div className="card danger">
              <div className="card-icon">❌</div>

              <div className="card-content">
                <h3>Inactive Appointments</h3>
                <p>{stats.inactiveAppointments}</p>
                <span>Cancelled / Closed</span>
              </div>
            </div>

          </div>
        )}

        <AiAssistant />

      </div>
    </Layout>
  );
}

export default Dashboard;