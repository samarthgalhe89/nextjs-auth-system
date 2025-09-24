"use client";

import { useEffect } from "react";

export default function UserProfile({ params }: any) {

  useEffect(() => {
    // Optional: could add more interactive effects here
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x"></div>

      {/* Content card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-4">User Profile</h1>
        <p className="text-xl mb-4">Welcome to the profile page!</p>
        <span className="inline-block px-6 py-3 rounded-full bg-gray-500 text-black font-semibold text-lg">
          User ID: {params.id}
        </span>
      </div>

    {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient-x {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(270deg, 
rgb(211, 217, 226), /* blue-500 */
              #6366f1, /* indigo-500 */
              #0ea5e9, /* cyan-500 */
              #8b5cf6, /* violet-500 */
              #38bdf8  /* sky-400 */
            );
            background-size: 400% 400%; /* bigger size for smooth movement */
            animation: gradient-x 30s ease infinite; /* slower, smooth movement */
            z-index: 0;
          }
        `}
      </style>
    </div>
  );
}
