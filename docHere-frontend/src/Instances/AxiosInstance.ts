import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_PORT}`,
  timeout: 5000, // 5 seconds
});

export default axiosInstance;
