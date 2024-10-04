import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const isAuthenticated = () => {
  return Cookies.get("accessToken") !== undefined; // Returns true if accessToken exists
};
// Custom Hook for handling logout
export const useLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/login");
  };

  return handleLogout;
};
