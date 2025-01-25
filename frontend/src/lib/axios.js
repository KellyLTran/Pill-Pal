import axios from "axios";

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

export const axiosInstance = axios.create({
  baseURL:`http://localhost:${SERVER_PORT}/api`,
  withCredentials: true
});