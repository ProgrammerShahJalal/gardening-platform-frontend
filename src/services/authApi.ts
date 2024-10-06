"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import nexiosInstance from "../config/nexios.config";
import {
  ApiError,
  AuthResponse,
  LoginPayload,
  PassResponse,
  PasswordChangePayload,
  PasswordRecoveryPayload,
  ProfileResponse,
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

// Function to recover password
export const recoverPassword = async (data: PasswordRecoveryPayload) => {
  try {
    const response = await nexiosInstance.post<PassResponse>(
      "/auth/recover-password",
      data,
    );

    return response.data;
  } catch (error) {
    const errorAsError: ApiError = error as Error;

    throw new Error(
      errorAsError.response?.data?.message || "Password recover failed",
    );
  }
};

// Function to change password
export const changePassword = async (data: PasswordChangePayload) => {
  try {
    const response = await nexiosInstance.post<PassResponse>(
      "/auth/change-password",
      data,
    );

    return response.data;
  } catch (error) {
    const errorAsError: ApiError = error as Error;

    throw new Error(
      errorAsError.response?.data?.message || "Password change failed",
    );
  }
};

// Function to get the current user profile from the server
export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }

  try {
    // Make a GET request to the /profile/me endpoint
    const response = await nexiosInstance.get<ProfileResponse>("/profile/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch user profile");
    }
  } catch (error) {
    const errorAsError: ApiError = error as Error;
    throw new Error(
      errorAsError.response?.data?.message || "Failed to get current user"
    );
  }
};
