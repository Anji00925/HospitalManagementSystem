// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Appointments from "./pages/Appointments";
//
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/appointments" element={<Appointments />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
//
// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
                  path="/doctors"
                  element={
                    <ProtectedRoute>
                      <Doctors />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/patients"
                  element={
                    <ProtectedRoute>
                      <Patients />
                    </ProtectedRoute>
                  }
                />

        {/* 🔒 BLOCK EVERYTHING ELSE */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
