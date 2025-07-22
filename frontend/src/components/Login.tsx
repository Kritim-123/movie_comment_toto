import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: { token?: string; error?: string } = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-80"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
}
