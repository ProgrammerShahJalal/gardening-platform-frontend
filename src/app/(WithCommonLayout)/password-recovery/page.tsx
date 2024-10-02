import React, { useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import nexiosHttp from "nexios-http";

const RecoverPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    securityAnswers: ["", ""],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("securityAnswers")) {
      const updatedAnswers = [...formData.securityAnswers];
      updatedAnswers[index || 0] = value;
      setFormData({ ...formData, securityAnswers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await nexiosHttp.post("/auth/recover", formData);
      setMessage(
        response.data.message || "Check your email for reset instructions."
      );
    } catch (error) {
      console.error("Password recovery error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: "400px", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <h3>Recover Password</h3>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
        <Input
          name="securityAnswers[0]"
          label="Security Answer 1"
          placeholder="Enter answer for security question 1"
          onChange={(e) => handleChange(e, 0)}
          required
        />
        <Input
          name="securityAnswers[1]"
          label="Security Answer 2"
          placeholder="Enter answer for security question 2"
          onChange={(e) => handleChange(e, 1)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Recover Password"}
        </Button>
        {message && <p>{message}</p>}
      </form>
    </Card>
  );
};

export default RecoverPassword;
