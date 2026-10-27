
import api from "./axios";

export const getPatients = () => api.get("/patients");

export const createPatient = (data) => api.post("/patients", data);
