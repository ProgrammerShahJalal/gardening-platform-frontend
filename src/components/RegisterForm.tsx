"use client";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

import { registerUser } from "../services/authApi";

const RegisterForm = () => {
  const defaultFormValues = {
    role: "user",
    securityAnswers: ["", ""],
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    ...defaultFormValues,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams(); // Get the search parameters from the URL

  // Get the "redirect" parameter from the URL if it exists
  const redirectUrl = searchParams.get("redirect") || "/login"; // Default to login page if no redirect

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await registerUser(form);

      toast("Signup Successful!", {
        className: "border-green-500 text-base",
        description: result?.message,
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });

      // Clear the form after success
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        ...defaultFormValues,
      });

      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message);
      toast("Signup Failed!", {
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
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="Name"
        name="name"
        onChange={handleInputChange}
      />
      <Input
        fullWidth
        required
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="Email"
        name="email"
        type="email"
        onChange={handleInputChange}
      />
      <Input
        fullWidth
        required
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="Password"
        name="password"
        type="password"
        onChange={handleInputChange}
      />
      <Input
        fullWidth
        required
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="Phone"
        name="phone"
        onChange={handleInputChange}
      />
      <Input
        fullWidth
        required
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="Address"
        name="address"
        onChange={handleInputChange}
      />
      <Input
        fullWidth
        required
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="In what city and state were you born?"
        name="securityAnswers[0]"
        onChange={(e) => {
          const updatedAnswers = [...form.securityAnswers];

          updatedAnswers[0] = e.target.value;
          setForm({ ...form, securityAnswers: updatedAnswers });
        }}
      />
      <Input
        fullWidth
        required
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        label="What is your favorite childhood toy?"
        name="securityAnswers[1]"
        onChange={(e) => {
          const updatedAnswers = [...form.securityAnswers];

          updatedAnswers[1] = e.target.value;
          setForm({ ...form, securityAnswers: updatedAnswers });
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button className="w-1/6 mx-auto" disabled={loading} type="submit">
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
