import Cookies from "js-cookie";
import { Nexios } from "nexios-http";


const nexiosInstance = new Nexios({
  baseURL: "https://gardening-platform-backend-delta.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
});

// Add request interceptor
nexiosInstance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken"); 

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
});

// Add response interceptor
nexiosInstance.interceptors.response.use((response) => {
  // Transform response data if needed
  return response;
});


export default nexiosInstance;
