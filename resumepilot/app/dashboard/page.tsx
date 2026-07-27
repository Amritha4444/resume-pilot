"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const name =
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "User";

      setUserName(name);
      setEmail(user.email || "");

      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("score")
        .eq("user_id", user.id);

      if (!error && reviews && reviews.length > 0) {
        setReviewCount(reviews.length);

        const scores = reviews.map((review) =>
          Number(review.score)
        );

        const highestScore = Math.max(...scores);

        setBestScore(highestScore);
      } else if (!error) {
        setReviewCount(0);
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <nav className="border-b border-slate-800 px-8 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <a
            href="/"
            className="text-2xl font-bold text-blue-400"
          >
            ResumePilot
          </a>

          <div className="flex items-center gap-6">

            <span className="text-slate-400">
              Free Plan
            </span>

            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white"
            >
              Log out
            </button>

          </div>

        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">

        <div className="mb-10">

          <p className="text-blue-400 font-semibold mb-2">
            WELCOME BACK 👋
          </p>

          <h1 className="text-4xl font-bold">
            Hi, {userName}!
          </h1>

          <p className="text-slate-400 mt-3">
            {email}
          </p>

          <p className="text-slate-400 mt-2">
            Improve your resume and get closer to your dream job.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">

            <p className="text-slate-400 mb-2">
              Current Plan
            </p>

            <h2 className="text-3xl font-bold text-blue-400">
              Free
            </h2>

            <p className="text-slate-500 mt-2">
              Upgrade for unlimited reviews
            </p>

          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">

            <p className="text-slate-400 mb-2">
              Reviews Used
            </p>

            <h2 className="text-3xl font-bold">
              {reviewCount} / 3
            </h2>

            <p className="text-slate-500 mt-2">
              {Math.max(0, 3 - reviewCount)} free reviews remaining
            </p>

          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">

            <p className="text-slate-400 mb-2">
              Best Match Score
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {bestScore !== null ? bestScore + "%" : "—"}
            </h2>

            <p className="text-slate-500 mt-2">
              Your highest resume match score
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 rounded-2xl bg-blue-950 border border-blue-700">

            <h2 className="text-2xl font-bold mb-3">
              New Review 🚀
            </h2>

            <p className="text-slate-300 mb-6">
              Compare your resume with a job description and discover
              your missing skills and keywords.
            </p>

            <a
              href="/review"
              className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              Start New Review →
            </a>

          </div>

          <div className="p-8 rounded-2xl bg-purple-950 border border-purple-700">

            <h2 className="text-2xl font-bold mb-3">
              Review History 📊
            </h2>

            <p className="text-slate-300 mb-6">
              View your previous resume analyses, scores, matching skills,
              and missing skills.
            </p>

            <a
              href="/history"
              className="inline-block px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold"
            >
              View History →
            </a>

          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">

            <h2 className="text-2xl font-bold mb-3">
              Upgrade to Pro ⭐
            </h2>

            <p className="text-slate-400 mb-6">
              Get unlimited resume reviews and advanced feedback.
            </p>

            <a
              href="/pricing"
              className="inline-block px-6 py-3 rounded-xl border border-blue-500 hover:bg-blue-600 font-semibold"
            >
              View Pro Plan →
            </a>

          </div>

        </div>

      </div>

    </main>
  );
}   