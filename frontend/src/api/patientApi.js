import axios from "axios";

const API = "http://localhost:8080/api/patients";

export const getPatients = () => axios.get(API);

export const createPatient = (data) => axios.post(API, data);
