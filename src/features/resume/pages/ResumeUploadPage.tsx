import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components";
import { useUploadResume, useAnalyzeResume, useResumeAnalysis } from "@/features/resume/hooks";
import {
  FileUploadZone,
  SkillsCard,
  ProjectsCard,
  ExperiencesCard,
  EducationCard,
  SkillEvidenceCard,
} from "@/features/resume/components";
import type { Resume, Skill, UploadProgress } from "@/features/resume/types";

export function ResumeUploadPage() {
  const [uploadedResume, setUploadedResume] = useState<Resume | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const uploadMutation = useUploadResume();
  const analyzeMutation = useAnalyzeResume();
  const { data: analysis, isLoading: isAnalysisLoading } = useResumeAnalysis(
    uploadedResume?.status === "completed" ? uploadedResume.id : undefined,
  );

  const handleFileSelect = useCallback(
    async (file: File) => {
      setUploadedResume(null);
      setUploadProgress({ loaded: 0, total: file.size, percentage: 0 });

      try {
        const resume = await uploadMutation.mutateAsync({
          file,
          onProgress: (progress) => setUploadProgress(progress),
        });
        setUploadedResume(resume);

        if (resume.status === "pending") {
          analyzeMutation.mutate(resume.id);
        }
      } catch {
        setUploadProgress(null);
      }
    },
    [uploadMutation, analyzeMutation],
  );

  const handleAnalyze = () => {
    if (uploadedResume) {
      analyzeMutation.mutate(uploadedResume.id);
    }
  };

  const isLoading = uploadMutation.isPending || isAnalysisLoading || analyzeMutation.isPending;
  const hasAnalysis = analysis && analysis.skills.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Local header for this page */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            CVRoleFit
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/cv-builder">
              <Button variant="secondary" size="sm">
                CV Builder
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume ATS Analysis</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Upload your resume (PDF) and get AI-powered insights about your skills,
            projects, and experience.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {/* Upload Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Upload Resume</h2>
              <FileUploadZone
                onFileSelect={handleFileSelect}
                isUploading={uploadMutation.isPending}
                progress={uploadProgress ?? undefined}
              />

              {uploadedResume && (
                <div className="mt-4 rounded-lg bg-green-50 p-4 border border-green-200 dark:border-green-800 dark:bg-green-950/30">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">
                      {uploadedResume.filename}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                    Status: {uploadedResume.status}
                  </p>
                  {uploadedResume.status === "completed" && !hasAnalysis && (
                    <Button
                      onClick={handleAnalyze}
                      size="sm"
                      className="mt-2"
                      disabled={analyzeMutation.isPending}
                    >
                      {analyzeMutation.isPending ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* How It Works Card */}
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">How It Works</h2>
              <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    1
                  </span>
                  <span>Upload your resume (PDF format)</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    2
                  </span>
                  <span>AI extracts and analyzes content</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    3
                  </span>
                  <span>View skills, projects, and evidence</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400" />
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {uploadMutation.isPending
                      ? "Uploading resume..."
                      : "Analyzing resume content..."}
                  </p>
                </div>
              </div>
            ) : hasAnalysis ? (
              <div className="space-y-6">
                {/* Analysis Summary Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Analysis Complete
                    </h2>
                    {analysis.confidenceScore && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Confidence Score</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {Math.round(analysis.confidenceScore * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  {analysis.summary && (
                    <p className="mt-3 text-gray-600 dark:text-gray-300">{analysis.summary}</p>
                  )}
                </div>

                <SkillsCard
                  skills={analysis.skills.map((s) => ({
                    ...s,
                    onClick: () => setSelectedSkill(s),
                  }))}
                />
                <ProjectsCard projects={analysis.projects} />
                <ExperiencesCard experiences={analysis.experiences} />
                <EducationCard education={analysis.education} />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Upload a resume to see AI-powered analysis
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedSkill && (
        <SkillEvidenceCard
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
