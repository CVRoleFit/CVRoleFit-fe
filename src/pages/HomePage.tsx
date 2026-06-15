import { Link } from "react-router-dom";
import { Button } from "@/shared/components";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        AI Resume Intelligence Platform
      </h1>
      <p className="mt-4 max-w-xl text-lg text-gray-600">
        Upload your resume and get AI-powered insights about your skills, projects,
        and experience. Go beyond keyword matching with evidence-based analysis.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/resume">
          <Button size="lg">Analyze Resume</Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </Link>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-3xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 mb-4">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Upload Resume</h3>
          <p className="mt-1 text-sm text-gray-600">
            Upload your PDF resume for AI-powered analysis.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 mb-4">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.95-.38-1.874-1.057-2.579z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">AI Analysis</h3>
          <p className="mt-1 text-sm text-gray-600">
            Extract skills, projects, and experience with confidence scores.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 mb-4">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Evidence-Based</h3>
          <p className="mt-1 text-sm text-gray-600">
            See how each skill was demonstrated through real work.
          </p>
        </div>
      </div>
    </div>
  );
}
