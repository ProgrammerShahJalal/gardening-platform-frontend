import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
import Cookies from "js-cookie";

// Default configuration for Nexios
const defaultConfig: NexiosOptions = {
  baseURL: "https://gardening-platform-backend-delta.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include", // Ensure cookies are included in requests
  timeout: 10000,
};

const nexiosInstance = new Nexios(defaultConfig);

// Add request interceptor to include token
nexiosInstance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
    };
  }

  return config;
});

// Add response interceptor (optional)
nexiosInstance.interceptors.response.use((response) => {
  return response;
});

export default nexiosInstance;
