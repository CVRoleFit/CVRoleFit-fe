import { useState, useCallback } from "react";
import { useCVStore, useAIAssist } from "@/features/cv/hooks";
import {
  PersonalInfoSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  CVPreview,
} from "@/features/cv/components";
import { Button } from "@/shared/components";
import type { CVSection } from "@/features/cv/types";

const sections: { id: CVSection; label: string }[] = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

export function CVBuilderPage() {
  const {
    cv,
    activeSection,
    setActiveSection,
    updateTitle,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
  } = useCVStore();

  const { generateContent, isGenerating, error, clearError } = useAIAssist();
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [aiTarget, setAITarget] = useState<string | null>(null);

  const handleAIAssistPersonal = useCallback(
    async (field: string) => {
      setAITarget(field);
      const context = `${cv.personalInfo.fullName}, ${cv.personalInfo.email}, interested in roles related to their experience`;
      const content = await generateContent({ context, type: "summary" });
      if (content) {
        updatePersonalInfo({ summary: content });
      }
      setAITarget(null);
    },
    [cv.personalInfo, generateContent, updatePersonalInfo],
  );

  const handleAIAssistExperience = useCallback(
    async (type: "description" | "achievement", context: string, experienceId: string) => {
      setAITarget(experienceId);
      const content = await generateContent({ context, type: type === "description" ? "experience" : "achievement" });
      if (content) {
        const exp = cv.experiences.find((e) => e.id === experienceId);
        if (exp) {
          if (type === "description") {
            const achievements = content.split("\n").filter((line) => line.trim().startsWith("-") || line.trim().startsWith("•"));
            if (achievements.length > 0) {
              updateExperience(experienceId, {
                achievements: achievements.map((a) => a.replace(/^[-•]\s*/, "").trim()),
              });
            }
          }
        }
      }
      setAITarget(null);
    },
    [cv.experiences, generateContent, updateExperience],
  );

  const handleAIAssistSkills = useCallback(
    async (context: string) => {
      setAITarget("skills");
      const content = await generateContent({ context: context || "software developer", type: "skills" });
      if (content) {
        const skillNames = content.split(",").map((s) => s.trim()).filter(Boolean);
        skillNames.forEach((name) => {
          addSkill({ name, level: "intermediate" });
        });
      }
      setAITarget(null);
    },
    [addSkill, generateContent],
  );

  const handleAIAssistProject = useCallback(
    async (context: string) => {
      setAITarget("project");
      const content = await generateContent({ context, type: "project" });
      if (content) {
        setAITarget(null);
        return content;
      }
      setAITarget(null);
      return null;
    },
    [generateContent],
  );

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(cv, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cv.title.replace(/\s+/g, "_")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CV Builder</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create your perfect resume with AI assistance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={handleExportJSON}>
                Export JSON
              </Button>
              <Button size="sm" onClick={handlePrint}>
                Print / PDF
              </Button>
              <div className="ml-4 flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                <button
                  type="button"
                  onClick={() => setViewMode("edit")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    viewMode === "edit"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    viewMode === "preview"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg dark:border-red-800 dark:bg-red-950">
          <div className="flex items-start gap-3">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            <button onClick={clearError} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          {viewMode === "edit" && (
            <div className="lg:col-span-3">
              <div className="sticky top-20 space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume Title</label>
                  <input
                    type="text"
                    value={cv.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>

                <nav className="rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/50">
                  <div className="flex items-center gap-2 text-sm font-medium text-purple-700 dark:text-purple-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    AI Assistance
                  </div>
                  <p className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                    Click "AI Assist" buttons throughout the form to generate content with AI.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Editor / Preview */}
          <div className={viewMode === "edit" ? "lg:col-span-5" : "lg:col-span-12"}>
            {viewMode === "edit" ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                {activeSection === "personal" && (
                  <PersonalInfoSection
                    personalInfo={cv.personalInfo}
                    onUpdate={updatePersonalInfo}
                    onAIAssist={handleAIAssistPersonal}
                    isGenerating={isGenerating && aiTarget === "summary"}
                  />
                )}
                {activeSection === "experience" && (
                  <ExperienceSection
                    experiences={cv.experiences}
                    onAdd={addExperience}
                    onUpdate={updateExperience}
                    onRemove={removeExperience}
                    onAIAssist={handleAIAssistExperience}
                    isGenerating={isGenerating}
                  />
                )}
                {activeSection === "education" && (
                  <EducationSection
                    education={cv.education}
                    onAdd={addEducation}
                    onUpdate={updateEducation}
                    onRemove={removeEducation}
                    // onAIAssist={handleAIAssistEducation}
                    // isGenerating={isGenerating}
                  />
                )}
                {activeSection === "skills" && (
                  <SkillsSection
                    skills={cv.skills}
                    onAdd={addSkill}
                    onRemove={removeSkill}
                    onAIAssist={handleAIAssistSkills}
                    isGenerating={isGenerating && aiTarget === "skills"}
                  />
                )}
                {activeSection === "projects" && (
                  <ProjectsSection
                    projects={cv.projects}
                    onAdd={addProject}
                    onUpdate={updateProject}
                    onRemove={removeProject}
                    onAIAssist={handleAIAssistProject}
                    isGenerating={isGenerating && aiTarget === "project"}
                  />
                )}
              </div>
            ) : (
              <div className="print:shadow-none mx-auto max-w-3xl">
                <CVPreview cv={cv} />
              </div>
            )}
          </div>

          {/* Live Preview (Edit mode only) */}
          {viewMode === "edit" && (
            <div className="lg:col-span-4">
              <div className="sticky top-20">
                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Live Preview</h3>
                <div className="max-h-[calc(100vh-120px)] overflow-y-auto rounded-xl">
                  <CVPreview cv={cv} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
