import axios from 'axios'

export const axiosInstence = axios.create({
  // baseURL: "http://localhost:5001/api/v1",
  baseURL: " https://ak-strore.onrender.com/api/v1",

  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});