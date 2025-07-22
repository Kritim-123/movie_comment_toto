import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: { token?: string; error?: string } = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Signup successful!");
      } else {
        alert(data.error || "Signup failed");
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
      <h2 className="text-xl font-bold text-center">Sign Up</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
      />
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
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
