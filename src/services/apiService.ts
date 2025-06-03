// import axios, {AxiosRequestConfig } from "axios";
// import { Alert } from "react-native";

// // Base API URL (Update with your backend service URL)
// const BASE_URL = "http://127.0.0.1:8000"; // Change to your backend's local IP

// interface ApiRequestData {
//   email?: string;
//   password?: string;
//   [key: string]: any; // Allow other optional properties
// }

// // Create an Axios instance
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to handle API requests
// const apiRequest = async (
//   // method: "GET" | "POST" | "PUT" | "DELETE",
//   endpoint: string,
//   data?: Record<string, any>,
//   // token?: string
// ) => {
//   try {
//     Alert.alert("Calling API:", endpoint);

//     const config: AxiosRequestConfig = {
//       method: "POST", // Default to POST (you can extend this if needed)
//       url: endpoint,
//       data, // ✅ Place `email` and `password` inside `data`
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };


//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }

//     // const response = await apiClient(config);
//     const response = await apiClient.request(config);

//     return response.data;
//   } catch (error: any) {
//     console.error("API Error:", error.response?.data || error.message);
//     Alert.alert("API Error", JSON.stringify(error.response?.data || error.message));
//     throw error.response?.data || { message: "Something went wrong!" };
//   }
// };

// // Exported functions for common API calls
// // export const AuthService = {
// //   signUp: (data: any) => apiRequest("POST", "/auth/signup", data),
// //   login: (data: any) => apiRequest("POST", "/auth/login", data),
// //   getUserProfile: (token: string) => apiRequest("GET", "/user/profile", undefined, token),
// // };

// export default apiClient;


import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL } from "../assets/Constants";

// Base API URL (Change as per your backend)
// const BASE_URL = "http://10.0.2.2:8003";
//  const BASE_URL = BASE_URL + "http://192.168.1.6:8003"; // Change to your backend's local IP

// Create Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API request function
const apiRequest = async (method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, data?: any, token?: string) => {
  try {
    // Alert.alert("Entered into API")
    const config = {
      method,
      url: endpoint,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    // Alert.alert("Calling an api"+JSON.stringify(config))
    // Alert.alert(JSON.stringify(config))

    const response = await apiClient.request(config);
    // Alert.alert("")
    // Alert.alert("Response ====> ")
    return response.data;
    
  } catch (error: any) {
    Alert.alert("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

// Auth Services
export const AuthService = {
  signUp: (data: any) => apiRequest("POST", "/auth/signup", data),
  login: (data: any) => apiRequest("POST", "/auth/login", data),
  getUserProfile: (token: string) => apiRequest("GET", "/user/profile", undefined, token),
};

// General API call function
export default apiRequest;
