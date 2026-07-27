"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function HistoryPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setReviews(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <p className="text-white p-10">Loading history...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <a
          href="/dashboard"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Dashboard
        </a>

        <h1 className="text-4xl font-bold mt-6">
          Review History
        </h1>

        {reviews.length === 0 ? (
          <p className="text-slate-400 mt-8">
            No reviews found yet.
          </p>
        ) : (
          <div className="mt-8 space-y-6">

            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-700"
              >
                <h2 className="text-3xl font-bold text-blue-400">
                  {review.score}%
                </h2>

                <p className="text-slate-400 mt-2">
                  Resume Match Score
                </p>

                <div className="mt-5">
                  <h3 className="font-bold text-green-400">
                    Matching Skills
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {review.matching_skills?.join(", ") || "None"}
                  </p>
                </div>

                <div className="mt-5">
                  <h3 className="font-bold text-red-400">
                    Missing Skills
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {review.missing_skills?.join(", ") || "None"}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}