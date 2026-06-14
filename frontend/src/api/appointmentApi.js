import api from "./axios";

export const createAppointment = (data) =>
  api.post("/appointments", data);

export const getAppointments = () =>
  api.get("/appointments");

export const updateStatus = (id, status) =>
  api.put(`/appointments/status/${id}`, { status: status });
