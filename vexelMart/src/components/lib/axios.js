import axios from "axios";

const BASE_URL = "http://localhost:5001/api"
const api = axios.create({
    baseURL: BASE_URL,
})


api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;