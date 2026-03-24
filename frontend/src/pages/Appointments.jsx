import { useEffect, useState } from "react";
import { createAppointment, getAppointments } from "../api/appointmentApi";
import Layout from "../components/Layout";
import "../styles/appointments.css"

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: ""
  });

  const loadAppointments = async () => {
    const res = await getAppointments();
    setAppointments(res.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCreate = async () => {
    await createAppointment(form);
    alert("Appointment created");
    setForm({ patientId: "", doctorId: "", appointmentDate: "" });
    loadAppointments();
  };

  return (
    <Layout>
      <h2 className="page-title">Appointments</h2>

      {/* CREATE FORM */}
      <div className="card">
        <h3>Create Appointment</h3>

        <div className="form-grid">
          <input
            placeholder="Patient ID"
            value={form.patientId}
            onChange={e => setForm({ ...form, patientId: e.target.value })}
          />

          <input
            placeholder="Doctor ID"
            value={form.doctorId}
            onChange={e => setForm({ ...form, doctorId: e.target.value })}
          />

          <input
            type="datetime-local"
            value={form.appointmentDate}
            onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
          />

          <button onClick={handleCreate}>Create Appointment</button>
        </div>
      </div>

      {/* TABLE */}
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
                  <span className={`badge ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
                <td>{a.active ? "YES" : "NO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );

}

export default Appointments;
