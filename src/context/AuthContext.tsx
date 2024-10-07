"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginUserInfo } from "../types";
import { fetchUserProfile, updateProfile } from "../services/profileApi";

type AuthContextType = {
  user: LoginUserInfo | null;
  login: (token: string, userData: LoginUserInfo) => void;
  logout: () => void;
  updateUserProfile: (updatedUserData: Partial<LoginUserInfo>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginUserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (token: string, userData: LoginUserInfo) => {
    Cookies.set("accessToken", token);
    Cookies.set("user", JSON.stringify(userData));
    setUser(userData);
    try {
      const latestUserProfile = await fetchUserProfile();
      if (latestUserProfile) {
        Cookies.set("user", JSON.stringify(latestUserProfile));
        setUser(latestUserProfile?.data);
      }
    } catch (error) {
      console.error("Failed to fetch latest profile data:", error);
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    setUser(null);
    router.push("/login");
  };

  const updateUserProfile = async (updatedUserData: Partial<LoginUserInfo>) => {
    const previousUser = user; // Save previous user data for rollback
    const updatedUser = { ...user, ...updatedUserData } as LoginUserInfo;

    setUser(updatedUser);
    Cookies.set("user", JSON.stringify(updatedUser));

    try {
      const response = await updateProfile(updatedUserData);
      Cookies.set("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Revert to previous state if the update fails
      setUser(previousUser);
      Cookies.set("user", JSON.stringify(previousUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
