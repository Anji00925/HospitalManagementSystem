// import { useEffect, useState } from "react";
// import { createAppointment, getAppointments } from "../api/appointmentApi";
// import Layout from "../components/Layout";
// import "../styles/appointments.css"
//
// function Appointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [form, setForm] = useState({
//     patientId: "",
//     doctorId: "",
//     appointmentDate: ""
//   });
//
//   const loadAppointments = async () => {
//     const res = await getAppointments();
//     setAppointments(res.data);
//   };
//
//   useEffect(() => {
//     loadAppointments();
//   }, []);
//
//   const handleCreate = async () => {
//     await createAppointment(form);
//     alert("Appointment created");
//     setForm({ patientId: "", doctorId: "", appointmentDate: "" });
//     loadAppointments();
//   };
//
//   return (
//     <Layout>
//       <h2 className="page-title">Appointments</h2>
//
//       {/* CREATE FORM */}
//       <div className="card">
//         <h3>Create Appointment</h3>
//
//         <div className="form-grid">
//           <input
//             placeholder="Patient ID"
//             value={form.patientId}
//             onChange={e => setForm({ ...form, patientId: e.target.value })}
//           />
//
//           <input
//             placeholder="Doctor ID"
//             value={form.doctorId}
//             onChange={e => setForm({ ...form, doctorId: e.target.value })}
//           />
//
//           <input
//             type="datetime-local"
//             value={form.appointmentDate}
//             onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
//           />
//
//           <button onClick={handleCreate}>Create Appointment</button>
//         </div>
//       </div>
//
//       {/* TABLE */}
//       <div className="card">
//         <h3>All Appointments</h3>
//
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient</th>
//               <th>Doctor</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Active</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map(a => (
//               <tr key={a.id}>
//                 <td>{a.id}</td>
//                 <td>{a.patientName}</td>
//                 <td>{a.doctorName}</td>
//                 <td>{new Date(a.appointmentDate).toLocaleString()}</td>
//                 <td>
//                   <span className={`badge ${a.status.toLowerCase()}`}>
//                     {a.status}
//                   </span>
//                 </td>
//                 <td>{a.active ? "YES" : "NO"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Layout>
//   );
//
// }
//
// export default Appointments;


import { useEffect, useState } from "react";
import { createAppointment, getAppointments, updateStatus } from "../api/appointmentApi";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: ""
  });

  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;

  const loadAppointments = async () => {
    const res = await getAppointments();
    setAppointments(res.data);
  };

//   const loadPatients = async () => {
//     const res = await api.get("/patients");
// //     setPatients(res.data);
//     setPatients(Array.isArray(res.data) ? res.data : res.data.content || []);
//   };

const loadPatients = async () => {
  try {
    const res = await api.get("/patients");

    console.log("PATIENT API:", res.data); // 🔍 debug once

    const data = Array.isArray(res.data)
      ? res.data
      : res.data?.content || res.data?.data || [];

    setPatients(data);
  } catch (error) {
    console.error("Error loading patients:", error);
    setPatients([]); // fallback
  }
};

  const loadDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    loadAppointments();
    loadPatients();
    loadDoctors();
  }, []);

  const handleCreate = async () => {
    if (!form.patientId || !form.doctorId || !form.appointmentDate) {
      alert("Please fill all fields");
      return;
    }

    await createAppointment({
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      appointmentDate: form.appointmentDate
    });

    alert("Appointment created");

    setForm({ patientId: "", doctorId: "", appointmentDate: "" });
    loadAppointments();
  };

  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status);
    loadAppointments();
  };

  return (
    <Layout>
      <h2 className="page-title">Appointments</h2>

      {role === "ROLE_RECEPTIONIST" && (
        <div className="card">
          <h3>Create Appointment</h3>

          <div className="form-grid">

            {/* ✅ PATIENT DROPDOWN */}
            <select
              value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            >
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* ✅ DOCTOR DROPDOWN */}
            <select
              value={form.doctorId}
              onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            >
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="datetime-local"
              value={form.appointmentDate}
              onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
            />

            <button onClick={handleCreate}>Create Appointment</button>
          </div>
        </div>
      )}

      <div className="card">
        <h3>All Appointments</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Active</th>
              {role === "ROLE_DOCTOR" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.patientName}</td>
                <td>{a.doctorName}</td>
                <td>{new Date(a.appointmentDate).toLocaleString()}</td>

                <td>
                  <span className={`badge ${a.status?.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>

                <td>{a.active ? "YES" : "NO"}</td>

{/*                 {role === "ROLE_DOCTOR" && ( */}
{/*                   <td> */}
{/*                     <button onClick={() => handleStatusChange(a.id, "APPROVED")}> */}
{/*                       Accept */}
{/*                     </button> */}

{/*                     <button onClick={() => handleStatusChange(a.id, "REJECTED")}> */}
{/*                       Reject */}
{/*                     </button> */}

{/*                     <button onClick={() => handleStatusChange(a.id, "COMPLETED")}> */}
{/*                       Complete */}
{/*                     </button> */}
{/*                   </td> */}
{/*                 )} */}
                   {role === "ROLE_DOCTOR" && (
                     <td>

                       {a.status === "BOOKED" && (
                         <>
                           <button onClick={() => handleStatusChange(a.id, "APPROVED")}>
                             Accept
                           </button>

                           <button onClick={() => handleStatusChange(a.id, "REJECTED")}>
                             Reject
                           </button>

                           <button onClick={() => handleStatusChange(a.id, "COMPLETED")}>
                             Complete
                           </button>
                         </>
                       )}

                       {(a.status === "APPROVED" || a.status === "REJECTED") && (
                         <button onClick={() => handleStatusChange(a.id, "COMPLETED")}>
                           Complete
                         </button>
                       )}

                       {a.status === "COMPLETED" && (
                         <span className="completed-icon">✔</span>
                       )}

                     </td>
                   )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Appointments;