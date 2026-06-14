import api from "../api/axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

localStorage.setItem("auth", JSON.stringify({
  token: response.data.token,
  role: response.data.role,
  email: response.data.email,
  id: response.data.id
}));
