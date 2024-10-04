"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

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

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      profilePicture: decodedToken.profilePicture,
    };
  }

  return decodedToken;
};
