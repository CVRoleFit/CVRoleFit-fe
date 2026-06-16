import type { Project } from "@/features/resume/types";

interface ProjectsCardProps {
  projects: Project[];
}

export function ProjectsCard({ projects }: ProjectsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Projects</h3>

      {projects.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No projects detected.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                {project.duration && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">{project.duration}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="inline-flex rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.skills.length > 0 && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Skills: {project.skills.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
