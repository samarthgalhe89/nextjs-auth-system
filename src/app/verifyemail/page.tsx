"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Prevent double API calls
  const hasRequested = useRef(false);

  const verifyUserEmail = async (rawToken: string) => {
    try {
      await axios.post("/api/users/verifyemail", { token: rawToken });
      setVerified(true);
      setError(false);
    } catch (err) {
      const errorData =
        err instanceof AxiosError && err.response
          ? err.response.data
          : (err as Error).message;

      console.error("Email verification error:", errorData);
      setError(true);
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasRequested.current) return; // prevent multiple runs
    hasRequested.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      verifyUserEmail(token);
    } else {
      console.warn("No token found in URL");
      setError(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl">Verifying your email...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>

      {verified && (
        <div className="p-4 bg-green-400 text-black rounded-lg">
          <h2 className="text-2xl mb-2">Email Verified Successfully ✅</h2>
          <Link href="/login" className="underline text-blue-700">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500 text-white rounded-lg">
          <h2 className="text-2xl mb-2">Invalid or Expired Token ❌</h2>
          <p>Please request a new verification email.</p>
        </div>
      )}
    </div>
  );
}
