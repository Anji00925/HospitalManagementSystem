// import "../styles/navbar.css";
//
// function Navbar() {
//   return (
//     <div className="navbar">
//       <h3>🏥 HMS Dashboard</h3>
//       <span>Logged in</span>
//     </div>
//   );
// }
//
// export default Navbar;

// import { useNavigate } from "react-router-dom";
// import "../styles/navbar.css";
// const auth = JSON.parse(localStorage.getItem("auth"));
//
// function Navbar() {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");
//
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };
//
//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         🏥 <span>HMS</span>
//       </div>
//
//       <div className="navbar-right">
//         <span className="user-name">👤 {auth.username}</span>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }
//
// export default Navbar;

import { useNavigate, Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="navbar">

      <span>Welcome, {auth?.username}</span>

      {/* ✅ ROLE BASED LINKS */}

      {role === "ROLE_ADMIN" && <Link to="/doctors">Doctors</Link>}

      {(role === "ROLE_ADMIN" || role === "ROLE_RECEPTIONIST") && (
        <Link to="/patients">Patients</Link>
      )}

      {(role === "ROLE_DOCTOR" || role === "ROLE_RECEPTIONIST") && (
        <Link to="/appointments">Appointments</Link>
      )}

      <button onClick={logout}>Logout</button>

    </div>
  );
}

export default Navbar;
