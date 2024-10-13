"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Contact Us
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <Button type="submit" color="success" fullWidth>
            Send Message
          </Button>
        </form>
      </div>
      <div className="mt-10 text-center">
        <p className="text-lg font-medium">You can also reach us at:</p>
        <p className="text-gray-700">Email: support@gardeningtips.com</p>
        <p className="text-gray-700">Phone: +1 (234) 567-890</p>
        <p className="text-gray-700">
          Address: 123 Green Thumb Lane, Garden City, USA
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
