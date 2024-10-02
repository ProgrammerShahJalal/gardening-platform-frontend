import nexiosInstance from "../config/nexios.config";
import { ApiError } from "../types";

// Define the request payload types
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: string;
  securityAnswers: string[];
}

interface LoginPayload {
  email: string;
  password: string;
}

// Define the response types

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

// Function to register a new user
export const registerUser = async (data: RegisterPayload) => {
  try {
    const response = await nexiosInstance.post<AuthResponse>(
      "/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    const errorAsError: ApiError = error as Error;
    throw new Error(
      errorAsError.response?.data?.message || "Registration failed"
    );
  }
};

// Function to login a user
export const loginUser = async (data: LoginPayload) => {
  try {
    const response = await nexiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    const errorAsError: ApiError = error as Error;
    throw new Error(errorAsError.response?.data?.message || "Login failed");
  }
};
