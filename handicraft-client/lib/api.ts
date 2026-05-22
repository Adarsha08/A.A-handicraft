import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// attach token
api.interceptors.request.use((config) => {
 const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle 401 (no refresh)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or invalid
      localStorage.removeItem("admin_token");

      // redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;