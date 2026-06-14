// import { Link } from "react-router-dom";
// import "../styles/sidebar.css";
//
// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <Link to="/dashboard">Dashboard</Link>
//       <Link to="/appointments">Appointments</Link>
//       <Link to="/doctors">Doctors</Link>
//       <Link to="/patients">Patients</Link>
//     </div>
//   );
// }
//
// export default Sidebar;

import { useNavigate, Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2>🏥 HMS</h2>
//
//       <nav>
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/patients">Patients</Link>
//         <Link to="/doctors">Doctors</Link>
//         <Link to="/appointments">Appointments</Link>
//       </nav>
//     </div>

const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;

//   const logout = () => {
//     localStorage.removeItem("auth");
//     navigate("/login");
//   };

  return (
    <div className="sidebar">

{/*       <span>Welcome, {auth?.username}</span> */}

      {/* ✅ ROLE BASED LINKS */}

      {role === "ROLE_ADMIN" && <Link to="/doctors">Doctors</Link>}

      {(role === "ROLE_ADMIN" || role === "ROLE_RECEPTIONIST") && (
        <Link to="/patients">Patients</Link>
      )}

      {(role === "ROLE_DOCTOR" || role === "ROLE_RECEPTIONIST") && (
        <Link to="/appointments">Appointments</Link>
      )}

  </div>
  );
}

export default Sidebar;
