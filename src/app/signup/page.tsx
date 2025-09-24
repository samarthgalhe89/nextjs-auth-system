"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  // State variables
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");

  // Enable/disable button based on inputs
  useEffect(() => {
    const isValid = user.username && user.email && user.password;
    setButtonDisabled(!isValid);
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    if (buttonDisabled) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/users/signup", user);

      if (res.data.success) {
        setMessage("✅ Signup successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">
          {loading ? "Processing..." : "Sign Up"}
        </h1>

        {message && <p className="mb-4 text-center text-blue-400">{message}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              value={user.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              value={user.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSignup}
          disabled={buttonDisabled || loading}
          className={`w-full mt-6 p-3 rounded-lg font-semibold transition-all duration-300 ${
            buttonDisabled || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 text-white"
          }`}
        >
          {loading ? "Processing..." : buttonDisabled ? "Fill all fields" : "Sign Up"}
        </button>

        <a
          href="/login"
          className="block text-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          Already have an account? Log In
        </a>
      </div>
    </div>
  );
}
