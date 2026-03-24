import axios from "axios";

const API = "http://localhost:8080/api/doctors";

export const getDoctors = () => axios.get(API);

export const createDoctor = (data) => axios.post(API, data);
