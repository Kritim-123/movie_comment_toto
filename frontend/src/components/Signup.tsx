import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:4000/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: { token?: string; error?: string } = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage({ type: "success", text: "Signup successful! 🎉" });
        setFormData({ name: "", email: "", password: "" });

        // Auto-hide after 3s
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Signup failed. Try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
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
        value={formData.name}
        placeholder="Name"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="Password"
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-500 text-white py-2 rounded transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        }`}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {message && (
        <p
          className={`text-sm text-center ${
            message.type === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
