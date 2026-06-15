import type { Skill } from "@/features/resume/types";

interface SkillEvidenceCardProps {
  skill: Skill;
  onClose: () => void;
}

export function SkillEvidenceCard({ skill, onClose }: SkillEvidenceCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
            <p className="text-sm text-gray-500">{skill.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Confidence Level</span>
            <span className="font-medium text-gray-900">{Math.round(skill.confidence * 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${skill.confidence * 100}%` }}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Supporting Evidence</h4>
          {skill.evidence.length === 0 ? (
            <p className="text-sm text-gray-500">No evidence available.</p>
          ) : (
            <ul className="space-y-2">
              {skill.evidence.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
