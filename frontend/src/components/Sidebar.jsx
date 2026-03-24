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

import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🏥 HMS</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointments">Appointments</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
