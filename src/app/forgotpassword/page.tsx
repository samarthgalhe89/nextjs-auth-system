"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromLogin = searchParams.get("fromLogin");

  useEffect(() => {
    if (fromLogin !== "true") {
      router.replace("/login");
    }
  }, [fromLogin, router]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [focusedField, setFocusedField] = useState("");

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
        setMessage("✅ Password reset link sent to your email!");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-600/20 via-transparent to-purple-600/20 blur-3xl"></div>

        {/* Floating shapes */}
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full top-10 left-10 animate-float-slow blur-3xl"></div>
        <div className="absolute w-56 h-56 bg-purple-500/20 rounded-full bottom-20 right-8 animate-float delay-500 blur-3xl"></div>
        <div className="absolute w-48 h-48 bg-pink-500/20 rounded-full top-1/2 left-1/3 animate-float-slower blur-2xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:shadow-blue-500/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-400 text-sm">Enter your email to reset your password</p>
          </div>

          {message && (
            <div className={`text-center text-sm mb-4 p-3 rounded-lg animate-slideDown ${
              message.includes("✅")
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}>
              {message}
            </div>
          )}

          <div className="relative mb-6">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              focusedField === "email" ? "text-blue-400" : "text-gray-500"
            }`}>
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-700/70"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 active:scale-95 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{" "}
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}
