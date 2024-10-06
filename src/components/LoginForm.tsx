import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { toast } from "sonner";

import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { LoginUserInfo } from "../types";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // Access login function from AuthContext
  const router = useRouter();

  const searchParams = useSearchParams(); // Get the search parameters from the URL

  // Get the "redirect" parameter from the URL if it exists
  const redirectUrl = searchParams.get("redirect") || "/"; // Default to home page if no redirect

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(form);

      if (data?.success) {
        const user: LoginUserInfo = {
          _id: data?.data?._id,
          name: data?.data?.name,
          phone: data?.data?.phone,
          email: data?.data?.email,
          address: data?.data?.address,
          role: data?.data?.role,
          profilePicture: data?.data?.profilePicture,
        };

        // Use the login method from context
        login(data?.token, user); // Pass token and user info to context

        toast("Login Successful!", {
          className: "border-green-500 text-base",
          description: data?.message,
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />,
        });
        router.push(redirectUrl);
      } else {
        toast("Invalid Credentials!", {
          className: "border-red-500 text-base",
          description: data?.message || "User not found!",
          duration: 3000,
          icon: <IoCloseCircleOutline />,
        });
      }
    } catch (err: any) {
      setError(err.message);
      toast("Login Failed!", {
        className: "border-red-500 text-base",
        description: err?.message,
        duration: 3000,
        icon: <IoCloseCircleOutline />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col space-y-4 py-10 md:w-8/12 mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        fullWidth
        required
        label="Email"
        name="email"
        type="email"
        onChange={handleInputChange}
      />
      <Input
        fullWidth
        required
        label="Password"
        name="password"
        type="password"
        onChange={handleInputChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button className="w-1/6 mx-auto" disabled={loading} type="submit">
        {loading ? "Logging..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
