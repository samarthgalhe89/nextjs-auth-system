"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");

  // Enable/disable login button
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async () => {
    if (buttonDisabled) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("✅ Login successful!");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/profile"), 1000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || "Login failed";
      toast.error(`❌ ${errorMsg}`);
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>

        {message && <p className="text-center text-sm text-blue-400 mb-4">{message}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            />
          </div>
        </div>

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full mt-6 p-3 rounded-lg font-semibold transition-all duration-300 ${
            buttonDisabled || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 text-white"
          }`}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">
            Sign Up
          </Link>
        </p>

        <p className="text-center mt-4 text-sm text-gray-400">
          Forgot password?{" "}
          <Link href="/forgotpassword?fromLogin=true" className="text-blue-400 hover:text-blue-300">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
