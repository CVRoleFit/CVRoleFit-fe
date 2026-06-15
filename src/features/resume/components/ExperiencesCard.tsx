import type { Experience } from "@/features/resume/types";

interface ExperiencesCardProps {
  experiences: Experience[];
}

export function ExperiencesCard({ experiences }: ExperiencesCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>

      {experiences.length === 0 ? (
        <p className="text-sm text-gray-500">No work experience detected.</p>
      ) : (
        <div className="space-y-5">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-blue-600">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.title}</h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                {(exp.startDate || exp.endDate) && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                )}
              </div>
              {exp.description && (
                <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
              )}
              {exp.highlights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-sm text-gray-600 pl-4 relative before:absolute before:left-0 before:content-['-']"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              {exp.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
