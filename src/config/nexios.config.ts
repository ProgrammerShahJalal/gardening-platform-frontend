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
export default nexiosInstance;
