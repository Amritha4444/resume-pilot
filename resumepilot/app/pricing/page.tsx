"use client";

export default function PricingPage() {
  function handleUpgrade() {
    alert("Pro upgrade coming soon! 🚀");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <a
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Dashboard
          </a>

          <h1 className="text-4xl font-bold mt-6">
            Choose Your Plan
          </h1>

          <p className="text-slate-400 mt-3">
            Choose the plan that helps you build a better career.
          </p>

        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* FREE PLAN */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">

            <h2 className="text-2xl font-bold">
              Free
            </h2>

            <p className="text-4xl font-bold mt-5">
              ₹0
              <span className="text-base text-slate-400">
                /month
              </span>
            </p>

            <p className="text-slate-400 mt-4">
              Perfect for getting started.
            </p>

            <ul className="space-y-4 mt-8 text-slate-300">

              <li>✓ 3 resume reviews</li>

              <li>✓ Resume match score</li>

              <li>✓ Skill matching</li>

              <li>✓ Review history</li>

            </ul>

            <button
              disabled
              className="w-full mt-8 rounded-xl border border-slate-700 px-6 py-3 text-slate-500"
            >
              Current Plan
            </button>

          </div>

          {/* PRO PLAN */}
          <div className="p-8 rounded-2xl bg-blue-950 border-2 border-blue-500 relative">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">

              <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
                MOST POPULAR
              </span>

            </div>

            <h2 className="text-2xl font-bold">
              Pro ⭐
            </h2>

            <p className="text-4xl font-bold mt-5">
              ₹499
              <span className="text-base text-slate-400">
                /month
              </span>
            </p>

            <p className="text-slate-300 mt-4">
              For serious job seekers.
            </p>

            <ul className="space-y-4 mt-8 text-slate-200">

              <li>✓ Unlimited resume reviews</li>

              <li>✓ Advanced resume feedback</li>

              <li>✓ Detailed skill analysis</li>

              <li>✓ Missing keyword suggestions</li>

              <li>✓ Complete review history</li>

            </ul>

            <button
              onClick={handleUpgrade}
              className="w-full mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Upgrade to Pro — ₹499
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}