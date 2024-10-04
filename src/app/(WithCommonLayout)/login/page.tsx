"use client";
import { title } from "@/src/components/primitives";
import LoginForm from "@/src/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="text-center">
      <h1 className={title()}>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
