"use client"
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/authApi";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { IoAlertCircleOutline } from "react-icons/io5";

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

      router.push("/login");
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
    <form onSubmit={handleSubmit}
    className="flex flex-col space-y-4 py-10 md:w-8/12 mx-auto"
    >
      <Input
        name="name"
        label="Name"
        fullWidth
        required
        onChange={handleInputChange}
         className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
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
      <Input
        name="phone"
        label="Phone"
        fullWidth
        required
        onChange={handleInputChange}
         className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Input
        name="address"
        label="Address"
        fullWidth
        required
        onChange={handleInputChange}
         className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Input
        name="securityAnswers[0]"
        label="In what city and state were you born?"
        fullWidth
        required
        onChange={(e) => {
          const updatedAnswers = [...form.securityAnswers];
          updatedAnswers[0] = e.target.value;
          setForm({ ...form, securityAnswers: updatedAnswers });
        }}
         className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Input
        name="securityAnswers[1]"
        label="What is your favorite childhood toy?"
        fullWidth
        required
        onChange={(e) => {
          const updatedAnswers = [...form.securityAnswers];
          updatedAnswers[1] = e.target.value;
          setForm({ ...form, securityAnswers: updatedAnswers });
        }}
         className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button 
      className="w-1/6 mx-auto"
      type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
