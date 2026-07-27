export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-400">
          ResumePilot
        </h1>

        <div className="flex gap-4">
          <a
            href="/login"
            className="px-5 py-2 rounded-lg border border-slate-600 hover:bg-slate-800"
          >
            Log in
          </a>

          <a
            href="/pricing"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <p className="text-blue-400 font-semibold mb-4">
          AI-POWERED RESUME REVIEW
        </p>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Get your resume ready
          <br />
          <span className="text-blue-400">
            for your dream job.
          </span>
        </h2>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          ResumePilot analyzes your resume against any job description
          and gives you actionable feedback to improve your chances of
          getting hired.
        </p>

        <a
          href="/review"
          className="inline-block mt-10 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
        >
          Review My Resume →
        </a>

        <a
          href="/pricing"
          className="inline-block mt-10 ml-4 px-8 py-4 rounded-xl border border-blue-500 hover:bg-blue-900 text-lg font-semibold"
        >
          View Pricing
        </a>
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-20 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-semibold mb-3">
            📊 Resume Score
          </h3>

          <p className="text-slate-400">
            Get a clear score showing how well your resume matches the job.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-semibold mb-3">
            🔍 Find Missing Skills
          </h3>

          <p className="text-slate-400">
            Discover important skills and keywords missing from your resume.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-semibold mb-3">
            🚀 Improve & Get Hired
          </h3>

          <p className="text-slate-400">
            Get practical suggestions to make your resume stronger.
          </p>
        </div>
      </section>
    </main>
  );
}