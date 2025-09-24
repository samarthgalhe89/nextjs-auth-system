"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromLogin = searchParams.get("fromLogin"); // Check query param

  // Redirect if page not accessed from login
  useEffect(() => {
    if (fromLogin !== "true") {
      router.replace("/login"); // redirect to login
    }
  }, [fromLogin, router]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      if (res.data.success) {
        setMessage("Password reset link sent to your email!");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const messageColor = message.includes("sent") ? "text-green-400" : "text-red-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
        {message && <p className={`mb-4 font-medium ${messageColor}`}>{message}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-semibold transition-colors duration-200 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
