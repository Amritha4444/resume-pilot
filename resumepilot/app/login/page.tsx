"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const supabase = createClient();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (!email || !password || (isSignup && !name)) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Account created successfully! Check your email to confirm your account."
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        window.location.href = "/dashboard";
      }
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <a
            href="/"
            className="text-3xl font-bold text-blue-400"
          >
            ResumePilot
          </a>

          <h1 className="text-3xl font-bold mt-8 mb-3">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>

          <p className="text-slate-400">
            {isSignup
              ? "Start improving your resume today."
              : "Log in to continue to ResumePilot."}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">

          <form onSubmit={handleSubmit}>

            {isSignup && (
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Log In"}
            </button>

          </form>

          {message && (
            <p className="mt-5 text-center text-blue-300">
              {message}
            </p>
          )}

          <div className="text-center mt-6">
            <p className="text-slate-400">
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>

            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
              }}
              className="text-blue-400 hover:text-blue-300 mt-2 font-semibold"
            >
              {isSignup
                ? "Log in instead"
                : "Create an account"}
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}