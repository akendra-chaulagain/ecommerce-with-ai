import axios from "axios";

export const axiosInstence = axios.create({
  // baseURL: "http://localhost:5001/api/v1",
  baseURL: " https://ak-strore.onrender.com/api/v1",

  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});


// utils/axiosInstence.ts

// 🔗 Attach tokens on every request
axiosInstence.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

