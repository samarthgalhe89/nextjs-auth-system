"use client";

import { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("Fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });

      if (res.data.success) {
        setMessage("Password reset successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Determine message color dynamically
  const messageColor = message.includes("successful") ? "text-green-400" : "text-red-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

        {message && <p className={`mb-4 font-medium ${messageColor}`}>{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-semibold transition-colors duration-200 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
