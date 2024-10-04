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

// Define AuthContext type
type AuthContextType = {
  user: LoginUserInfo | null;
  login: (token: string, userData: LoginUserInfo) => void;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginUserInfo | null>(null);
  const router = useRouter();

  // Check the token from cookies to set the initial state
  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      // Parse the stored user data into an object
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (token: string, userData: LoginUserInfo) => {
    Cookies.set("accessToken", token);
    // Stringify the user object to store it as a cookie
    Cookies.set("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
