import { resumes } from "~/constant";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Resumecard from "~/components/Resumecard";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
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

  const { auth} = usePuterStore();
  const navigate = useNavigate();

  useEffect(()=>{
      if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      
      
      <section className="main-section">
        <div className="page-heading  py-16">
          <h1>Track Your Application And Resume Ratings</h1>
          <h2>Review you Resume with AI Powered Feedbacks</h2>
        </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <Resumecard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
