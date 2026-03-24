// import { Navigate } from "react-router-dom";
//
// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("auth") === "true";
//
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }
//
//   return children;
// };
//
// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
//
// function ProtectedRoute({ children }) {
//   const auth = localStorage.getItem("auth");
//
//   return auth ? children : <Navigate to="/login" />;
// }
//
// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
