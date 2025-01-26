import axios from "axios";

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

//CHANGE THIS BACK TO SERVER_PORT ONCE YOU GET IT WORKING

export const axiosInstance = axios.create({
  baseURL:`http://localhost:3001/api`,
  withCredentials: true,  
  headers: {
    'Content-Type': 'application/json', // Ensure the content type is set
  },
});