import axios, { AxiosInstance } from "axios";

const API_BASE_URL ="http://127.0.0.1:8000"; // Replace with your API base URL.

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptors (if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add an authorization token (if required)
    const token = "your_token_here"; // Replace with your token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors (if needed)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;