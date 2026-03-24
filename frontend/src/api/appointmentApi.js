import api from "./axios";

export const createAppointment = (data) =>
  api.post("/appointments", data);

export const getAppointments = () =>
  api.get("/appointments");
