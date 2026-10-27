import api from "./axios";

export const getDoctors = () => api.get("/doctors");

export const createDoctor = (data) => api.post("/doctors", data);