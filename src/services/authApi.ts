import nexiosInstance from "../config/nexios.config";
import {
  ApiError,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types";

// Function to register a new user
export const registerUser = async (data: RegisterPayload) => {
  try {
    const response = await nexiosInstance.post<AuthResponse>(
      "/auth/register",
      data,
    );

    return response.data;
  } catch (error) {
    const errorAsError: ApiError = error as Error;

    throw new Error(
      errorAsError.response?.data?.message || "Registration failed",
    );
  }
};

// Function to login a user
export const loginUser = async (data: LoginPayload) => {
  try {
    const response = await nexiosInstance.post<AuthResponse>(
      "/auth/login",
      data,
    );

    return response.data;
  } catch (error) {
    const errorAsError: ApiError = error as Error;

    throw new Error(errorAsError.response?.data?.message || "Login failed");
  }
};
