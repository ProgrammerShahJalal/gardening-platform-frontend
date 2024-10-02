import Cookies from "js-cookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const isAuthenticated = () => {
  return Cookies.get("accessToken") !== undefined; // Returns true if accessToken exists
};
// Logout function
export const handleLogout = (router: AppRouterInstance | string[]) => {
  Cookies.remove("accessToken");
  router.push("/login");
};
