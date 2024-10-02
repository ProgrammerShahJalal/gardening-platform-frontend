"use client"
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { loginUser } from "../services/authApi";
import { IoCheckmarkDoneCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(form);
      if(data?.success){
        toast("Login Successful!", {
          className: "border-green-500 text-base",
          description: data?.message, 
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />, 
        });
      }else{
        toast("Invalid Credentials!", {
          className: "border-red-500 text-base",
          description: data?.message,
          duration: 3000,
          icon: <IoCloseCircleOutline />,
          });
      }
      
      setCookie(null, "accessToken", data.token, { path: "/" }); // Save token as a cookie
      setForm({ email: "", password: "" });
      router.push("/"); // Redirect to home page after login
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
    onSubmit={handleSubmit}>
      <Input
        name="email"
        label="Email"
        type="email"
        fullWidth
        required
        onChange={handleInputChange}
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      
      />
      <Input
        name="password"
        label="Password"
        type="password"
        fullWidth
        required
        onChange={handleInputChange}
         className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button
      className="w-1/6  mx-auto"
      type="submit" disabled={loading}>
        {loading ? "Logging..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
