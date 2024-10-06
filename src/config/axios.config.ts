import axios from 'axios';
import Cookies from 'js-cookie';
import envConfig from './envConfig';

// Default configuration for Axios
const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, 
});

// Add a request interceptor to include token in Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');  // Get token from cookies

    // Add Authorization header if token is available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);  // Handle errors if something goes wrong
  }
);

export default axiosInstance;
