"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [focusedField, setFocusedField] = useState("");

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
      const response = await axios.post("/api/users/signup", user, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Signup successful! Redirecting to login...");
      setLoading(false);

      // Redirect after 1.5s
      setTimeout(() => router.push("/login"), 1500);

    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error || err.message || "Signup failed";
      setMessage(errorMsg);
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-600/20 via-transparent to-purple-600/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main card with backdrop blur */}
        <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              {loading ? "Processing..." : "Create Account"}
            </h1>
            <p className="text-gray-400 text-sm">Sign up to get started</p>
          </div>

          {/* Status message */}
          {message && (
            <div className={`text-center text-sm mb-4 p-3 rounded-lg animate-slideDown ${
              message.includes("successful") 
                ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}>
              {message}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Username field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === "username" ? "text-blue-400" : "text-gray-500"
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="username"
                  value={user.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-700/70"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === "email" ? "text-blue-400" : "text-gray-500"
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-700/70"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === "password" ? "text-blue-400" : "text-gray-500"
                }`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-700/70"
                />
              </div>
            </div>
          </div>

          {/* Signup button */}
          <button
            onClick={handleSignup}
            disabled={buttonDisabled || loading}
            className={`w-full mt-7 p-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              buttonDisabled || loading
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 active:scale-95 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : buttonDisabled ? (
              <span>Fill all fields</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* Footer links */}
          <div className="mt-6 space-y-3">
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Join us by signing up and start your journey today!
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}