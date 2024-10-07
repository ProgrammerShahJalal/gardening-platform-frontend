"use server";

import axiosInstance from "../config/axios.config";
import { ProfileResponse, ApiError, ProfileUpdate } from "../types";

// Function to update user profile
const handleError = (error: any): string => {
    return error.response?.data?.message || 'Something went wrong';
  };
  
  export const updateProfile = async (data: Partial<ProfileUpdate>) => {
    try {
      const response = await axiosInstance.patch<ProfileResponse>('/profile/me', data);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };


// Function to fetch user profile
export const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get<ProfileResponse>("/profile/me");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch profile data");
    }
  };
