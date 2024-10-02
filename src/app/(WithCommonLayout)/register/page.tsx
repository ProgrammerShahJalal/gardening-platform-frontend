"use client"; 
import { title } from "@/src/components/primitives";
import RegisterForm from "@/src/components/RegisterForm";



const RegisterPage = () => {
  return (
    <div className="text-center">
      <h1 className={title()}>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
