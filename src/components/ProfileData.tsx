import nexiosInstance from "../config/nexios.config";
import { ProfileResponse } from "../types";

export const ProfileData = async () => {
  try {
    const { data } = await nexiosInstance.get<ProfileResponse>("/profile/me", {
      cache: "no-store",
    });

    return data?.data;
  } catch (error) {
    if (error instanceof Error) {
      // Now TypeScript knows error is of type Error
      throw new Error(error.message || "Failed to fetch profile data");
    } else {
      // Handle unexpected error types
      throw new Error("An unknown error occurred");
    }

    return null;
  }
};
