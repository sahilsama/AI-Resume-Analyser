import { resumes } from "~/constant";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Resumecard from "~/components/Resumecard";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import Footer from "~/components/Footer";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyser" },
    {
      name: "description",
      content:
        "This project focuses on building an AI-powered Applicant Tracking System (ATS), specifically a Resume Analyzer. The application allows users to upload their resumes and job descriptions, then uses AI to automatically evaluate and match resumes to job requirements!",
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-blue-700 bg-cover">
      <Navbar />

      <section className="main-section mt-20 grainy-bg">
        <div className="page-heading font-modern-antiqua py-16">
          <div className="corner-borders relative text-5xl text-white p-4">
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            Track Your Application And Resume Ratings
          </div>
          <div className="text-2xl p-1 text-amber-300 ">
            Review you Resume with AI Powered Feedbacks
          </div>
          <div className="flex justify-center relative z-[999]">
            <img
              src="/images/agents.png"
              alt="Resume Analysis"
              className="w-1/2 h-auto"
            />
          </div>
          <p className="text-shadow-teal-400 bg-amber-300">With our agent</p>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <Resumecard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
      <section>
        <Footer/>
      </section>
    </main>
  );
}
