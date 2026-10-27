import api from "./api";

export const getDoctors = () => api.get("/doctors");

export const createDoctor = (data) => api.post("/doctors", data);