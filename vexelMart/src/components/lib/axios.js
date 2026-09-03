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

// 2. RESPONSE INTERCEPTOR: Catches errors coming back from the server
api.interceptors.response.use(
  (response) => {
    // If the request is successful (status 200-299), just pass the data through normally
    return response;
  },
  (error) => {
    // If the backend throws an error, we check if it is a 401 (Unauthorized/Expired Token)
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out automatically.");
      
      // Step A: Remove the expired token from LocalStorage
      localStorage.removeItem("userInfo");
      
      // Step B: Force the browser to redirect back to the login page
      window.location.href = "/login";
    }
    
    // Pass the error back so your React components can still display toast notifications if needed
    return Promise.reject(error);
  }
);

export default api;