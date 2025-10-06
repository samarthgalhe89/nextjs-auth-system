"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UserProfileProps = {
  params: { id: string };
};

export default function UserProfile({ params }: UserProfileProps) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Any client-side effects here
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 px-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[length:4rem_4rem] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-600/20 via-transparent to-purple-600/20 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-gray-800/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-700/50 text-center transform transition-transform duration-300 hover:scale-[1.03] hover:border-blue-500/50 hover:bg-gray-800/90 hover:backdrop-blur-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          User Profile
        </h1>

        <p className="text-sm md:text-lg mb-6 text-gray-400 font-light">
          Securely displaying your unique identifier.
        </p>

        <div className="p-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30">
          <div className="bg-gray-800 p-5 rounded-lg">
            <label className="block text-xs md:text-sm font-medium text-blue-400 mb-2 uppercase tracking-wide">
              Unique ID
            </label>
            <span className="block font-mono text-lg md:text-xl text-white break-all select-all">
              {id}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push("/profile")}
          className="mt-8 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
