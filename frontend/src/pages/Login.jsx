//
// import { useState } from "react";
// import { loginUser } from "../auth/authService";
//
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//
//   const handleLogin = async () => {
//     try {
//       const res = await loginUser({ email, password });
//       localStorage.setItem("token", res.data.token);
//       window.location.href = "/dashboard";
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };
//
//   return (
//     <div>
//       <h2>Login</h2>
//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }
//
// export default Login;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/auth.css";
//
// function Login() {
//   const navigate = useNavigate();
//
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });
//
//   const [error, setError] = useState("");
//
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         {
//           email: form.email,
//           password: form.password
//         }
//       );
//
//       // 🔐 store full user
//       localStorage.setItem("auth", JSON.stringify(res.data));
//
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };
//
//
//
//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login</h2>
//
//         {error && <p className="error">{error}</p>}
//
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             onChange={handleChange}
//           />
//
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             onChange={handleChange}
//           />
//
//           <button type="submit">Login</button>
//         </form>
//
//         <p className="auth-link">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }
//
// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("auth", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;