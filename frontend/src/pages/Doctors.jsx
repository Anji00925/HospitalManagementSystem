// import { useEffect, useState } from "react";
// import { getDoctors, createDoctor } from "../api/doctorApi";
// import Layout from "../components/Layout";
// import "../styles/table.css";
//
// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     departmentId: ""
//   });
//
//   const loadDoctors = async () => {
//     const res = await getDoctors();
//     setDoctors(res.data);
//   };
//
//   useEffect(() => {
//     loadDoctors();
//   }, []);
//
//   const handleCreate = async () => {
//     await createDoctor(form);
//     setForm({ name: "", email: "", phone: "", departmentId: "" });
//     loadDoctors();
//   };
//
//   return (
//     <Layout>
//       <h2>Doctors</h2>
//
//       <div className="form-row">
//         <input placeholder="Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//         />
//         <input placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//         />
//         <input placeholder="Phone"
//           value={form.phone}
//           onChange={e => setForm({ ...form, phone: e.target.value })}
//         />
//         <input placeholder="Department ID"
//           value={form.departmentId}
//           onChange={e => setForm({ ...form, departmentId: e.target.value })}
//         />
//         <button onClick={handleCreate}>Add Doctor</button>
//       </div>
//
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map(d => (
//             <tr key={d.id}>
//               <td>{d.id}</td>
//               <td>{d.name}</td>
//               <td>{d.email}</td>
//               <td>{d.departmentName || "-"}</td>
//               <td>{d.active ? "ACTIVE" : "INACTIVE"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Layout>
//   );
// }
//
// export default Doctors;


import { useEffect, useState } from "react";
import { getDoctors, createDoctor } from "../api/doctorApi";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/table.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: ""
  });

  const loadDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  const loadDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  useEffect(() => {
    loadDoctors();
    loadDepartments();
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.phone || !form.departmentId) {
      alert("Please fill all fields");
      return;
    }

    await createDoctor({
      ...form,
      departmentId: Number(form.departmentId)
    });

    setForm({ name: "", email: "", phone: "", departmentId: "" });
    loadDoctors();
  };

  return (
    <Layout>
      <h2>Doctors</h2>

      <div className="form-row">

        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        {/* ✅ DEPARTMENT DROPDOWN */}
        <select
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
        >
          <option value="">Select Department</option>

          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Add Doctor</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.departmentName || "-"}</td>

              <td>
                <span className={`badge ${d.active ? "active" : "inactive"}`}>
                  {d.active ? "ACTIVE" : "INACTIVE"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Doctors;