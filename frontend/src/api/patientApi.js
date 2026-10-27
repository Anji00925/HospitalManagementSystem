import api from "./axios";

const API = "http://localhost:8080/api/patients";

export const getPatients = () => api.get(API);

export const createPatient = (data) => api.post(API, data);
