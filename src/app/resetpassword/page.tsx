"use client";

import { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
        setMessage("✅ Password reset successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const messageColor = message.includes("successful") ? "text-green-400" : "text-red-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        {/* Card with hover effect */}
        <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            Reset Password
          </h1>

          {message && (
            <div className={`text-center text-sm mb-4 p-3 rounded-lg animate-slideDown ${
              message.includes("✅")
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}>
              {message}
            </div>
          )}

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg mb-4 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg mb-4 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-600 hover:to-indigo-500 active:scale-95 text-white shadow-lg shadow-blue-500/30 hover:shadow-indigo-500/50"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Resetting...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remembered your password?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">Secure reset with end-to-end encryption</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
}

