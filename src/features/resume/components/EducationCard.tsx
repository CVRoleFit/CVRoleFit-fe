import type { Education } from "@/features/resume/types";

interface EducationCardProps {
  education: Education[];
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>

      {education.length === 0 ? (
        <p className="text-sm text-gray-500">No education detected.</p>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.field}</p>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                )}
              </div>
              {edu.achievements.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {edu.achievements.map((achievement, aIdx) => (
                    <li
                      key={aIdx}
                      className="text-sm text-gray-600 pl-4 relative before:absolute before:left-0 before:content-['-']"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
