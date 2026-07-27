"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function ReviewPage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [matchingSkills, setMatchingSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const commonSkills = [
    "javascript",
    "typescript",
    "react",
    "next.js",
    "nextjs",
    "python",
    "java",
    "sql",
    "html",
    "css",
    "git",
    "github",
    "docker",
    "aws",
    "node.js",
    "nodejs",
    "rest api",
    "api",
    "testing",
    "supabase",
  ];

  async function reviewResume() {
    if (!resume.trim() || !jobDescription.trim()) {
      alert("Please enter both your resume and the job description.");
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      alert('User error: ${userError.message}');
      setSaving(false);
      return;
    }

    if (!user) {
      alert("Please log in before reviewing your resume.");
      setSaving(false);
      return;
    }

    const { count, error: countError } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (countError) {
      alert('Could not check review limit: ${countError.message}');
      setSaving(false);
      return;
    }

    const { data: profile } = await supabase
  .from("profiles")
  .select("plan")
  .eq("id", user.id)
  .maybeSingle();

const userPlan = profile?.plan || "free";

if (userPlan !== "pro" && (count || 0) >= 3) {
  alert(
    "You have used all 3 free reviews. Upgrade to Pro for unlimited reviews."
  );
  setSaving(false);
  return;
}



    const resumeText = resume.toLowerCase();
    const jobText = jobDescription.toLowerCase();

    const jobSkills = commonSkills.filter((skill) =>
      jobText.includes(skill)
    );

    const matched = jobSkills.filter((skill) =>
      resumeText.includes(skill)
    );

    const missing = jobSkills.filter(
      (skill) => !resumeText.includes(skill)
    );

    let calculatedScore = 0;

    if (jobSkills.length > 0) {
      calculatedScore = Math.round(
        (matched.length / jobSkills.length) * 100
      );
    }

    setScore(calculatedScore);
    setMatchingSkills(matched);
    setMissingSkills(missing);
    setResult(true);

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      score: calculatedScore,
      resume_text: resume,
      job_description: jobDescription,
      matching_skills: matched,
      missing_skills: missing,
    });

    if (error) {
      console.error("SUPABASE SAVE ERROR:", error);

      alert(
        `Save error: ${error.message}\n\nCode: ${
          error.code || "No code"
        }`
      );
    } else {
      alert("Review saved successfully! 🎉");
    }

    setSaving(false);
  }

  function getScoreMessage() {
    if (score >= 80) {
      return "Excellent match! Your resume strongly aligns with this job.";
    }

    if (score >= 60) {
      return "Good match! A few improvements can make your resume stronger.";
    }

    if (score >= 40) {
      return "Moderate match. Consider adding more relevant skills and keywords.";
    }

    return "Low match. Your resume needs more job-specific keywords and skills.";
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
          Review Your Resume
        </h1>

        <p className="text-slate-400 mt-3 mb-10">
          Compare your resume with a job description and discover how well
          you match the role.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-3 font-semibold text-lg">
              📄 Your Resume
            </label>

            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume here..."
              className="w-full h-80 p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-3 font-semibold text-lg">
              💼 Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-80 p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500"
            />
          </div>

        </div>

        <button
          onClick={reviewResume}
          disabled={saving}
          className="mt-8 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-lg disabled:opacity-50"
        >
          {saving ? "Checking..." : "🔍 Analyze My Resume"}
        </button>

        {result && (
          <div className="mt-12 p-8 rounded-2xl bg-slate-900 border border-slate-700">

            <h2 className="text-3xl font-bold mb-8">
              Your Resume Analysis
            </h2>

            <div className="text-center mb-10">

              <p className="text-slate-400 mb-3">
                Resume Match Score
              </p>

              <div className="text-7xl font-bold text-blue-400">
                {score}%
              </div>

              <p className="text-slate-300 mt-4">
                {getScoreMessage()}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="p-6 rounded-xl bg-green-950 border border-green-800">

                <h3 className="text-xl font-bold text-green-400 mb-4">
                  ✅ Matching Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {matchingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-lg bg-green-900 text-green-200"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

              <div className="p-6 rounded-xl bg-red-950 border border-red-800">

                <h3 className="text-xl font-bold text-red-400 mb-4">
                  ⚠️ Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-lg bg-red-900 text-red-200"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

            </div>

            <div className="mt-8 p-6 rounded-xl bg-blue-950 border border-blue-800">

              <h3 className="text-xl font-bold text-blue-400 mb-4">
                💡 Personalized Suggestions
              </h3>

              <ul className="space-y-3 text-slate-300">

                <li>
                  • Add relevant missing skills if you genuinely have
                  experience with them.
                </li>

                <li>
                  • Use keywords from the job description naturally in
                  your resume.
                </li>

                <li>
                  • Add measurable achievements to your projects.
                </li>

                <li>
                  • Keep your resume focused on the target role.
                </li>

              </ul>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}