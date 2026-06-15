import type { CV } from "@/features/cv/types";

interface CVPreviewProps {
  cv: CV;
}

export function CVPreview({ cv }: CVPreviewProps) {
  const { personalInfo, experiences, education, skills, projects } = cv;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900/20">
      {/* Header */}
      <header className="text-center border-b border-gray-200 pb-4 mb-4 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{personalInfo.fullName || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="text-blue-600 hover:underline dark:text-blue-400">
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} className="text-blue-600 hover:underline dark:text-blue-400">
              Website
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.achievements.map((a, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 pl-3 relative before:absolute before:left-0 before:content-['-']">
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} • {edu.location}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{edu.field}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Skills
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {skills.map((s) => s.name).join(" • ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {proj.name}
                  {proj.url && (
                    <a href={proj.url} className="ml-2 text-sm font-normal text-blue-600 hover:underline dark:text-blue-400">
                      [Link]
                    </a>
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-xs text-gray-500">Technologies: {proj.technologies.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
