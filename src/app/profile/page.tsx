"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    try {
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data._id);
      toast.success("User details fetched!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || "Failed to fetch user details");
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg text-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

        <div className="space-y-6 text-center">
          <h2  className="inline-block px-4 py-2 rounded-full font-semibold bg-green-500 text-white"> Click the ID:
            
            {userId ? (
              <Link href={`/profile/${userId}`} className="hover:underline">
                {userId}
              </Link>
            ) : (
              "Nothing"
            )}
          </h2>

          <button
            onClick={getUserDetails}
            disabled={loadingDetails}
            className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              loadingDetails
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:bg-indigo-700"
            }`}
          >
            {loadingDetails ? "Fetching..." : "Get User Details"}
          </button>

          <button
            onClick={logout}
            disabled={loadingLogout}
            className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              loadingLogout
                ? "bg-red-600 cursor-not-allowed"
                : "bg-red-800 hover:bg-red-700 active:bg-red-700"
            }`}
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
