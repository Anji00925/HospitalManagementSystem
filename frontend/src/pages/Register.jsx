//
//
// import { useState } from "react";
// import { registerUser } from "../auth/authService";
//
// function Register() {
//   const [form, setForm] = useState({ email: "", username: "", password: "" });
//
//   const handleRegister = async () => {
//     try {
//       await registerUser(form);
//       alert("Registered successfully");
//       window.location.href = "/";
//     } catch {
//       alert("Registration failed");
//     }
//   };
//
//   return (
//     <div>
//       <h2>Register</h2>
//       <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
//       <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }
//
// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://localhost:8080/api/auth/register",
        form
      );

      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="username"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
