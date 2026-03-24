import { useEffect, useState } from "react";
import { getPatients, createPatient } from "../api/patientApi";
import Layout from "../components/Layout";
import "../styles/table.css";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const loadPatients = async () => {
    const res = await getPatients();

    // handle both Page & List responses safely
    const data = Array.isArray(res.data)
      ? res.data
      : res.data.content || [];

    setPatients(data);
  };


  useEffect(() => {
    loadPatients();
  }, []);

  const handleCreate = async () => {
    await createPatient(form);
    setForm({ name: "", email: "", phone: "" });
    loadPatients();
  };

  return (
    <Layout>
      <h2>Patients</h2>

      <div className="form-row">
        <input placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <button onClick={handleCreate}>Add Patient</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.active ? "ACTIVE" : "INACTIVE"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Patients;
