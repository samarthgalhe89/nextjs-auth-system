"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, LogOut, Loader2, ExternalLink } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const logout = async () => {
    setLoadingLogout(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("✅ Logout successful");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || "Logout failed");
    } finally {
      setLoadingLogout(false);
    }
  };




  const getUserDetails = async () => {
    setLoadingDetails(true);
    // Simulate API call - replace with your actual axios call
    setTimeout(() => {
      setUserId("64f8a9b2c1d4e5f6a7b8c9d0");
      setLoadingDetails(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-600/20 via-transparent to-purple-600/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main card */}
        <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 border border-blue-500/30">
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Profile
            </h1>
            <p className="text-gray-400 text-sm">Manage your account</p>
          </div>

          {/* User ID Display */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User ID
            </label>
            <div className="relative">
              {userId ? (
                <Link 
                  href={`/profile/${userId}`}
                  className="flex items-center justify-between w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white hover:bg-gray-700/70 hover:border-blue-500/50 transition-all duration-200 group"
                >
                  <span className="text-sm font-mono truncate">{userId}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </Link>
              ) : (
                <div className="flex items-center justify-center w-full p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl text-gray-500">
                  <span className="text-sm">No user data loaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Get User Details Button */}
            <button
              onClick={getUserDetails}
              disabled={loadingDetails}
              className={`w-full p-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loadingDetails
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-800 hover:to-blue-800 active:scale-95 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
              }`}
            >
              {loadingDetails ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>Get User Details</span>
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              disabled={loadingLogout}
              className={`w-full p-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loadingLogout
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r from-red-900 to-red-700 hover:bg-red-800 active:scale-95 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40"
              }`}
            >
              {loadingLogout ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}