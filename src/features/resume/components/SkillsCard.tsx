import type { Skill } from "@/features/resume/types";
import { cn } from "@/shared/utils/cn";

interface SkillsCardProps {
  skills: (Skill & { onClick?: () => void })[];
}

const categoryColors: Record<string, string> = {
  Programming: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60",
  Framework: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60",
  Database: "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:hover:bg-orange-900/60",
  "Cloud & DevOps": "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-900/60",
  Tools: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
  Other: "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
};

export function SkillsCard({ skills }: SkillsCardProps) {
  const grouped = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, (Skill & { onClick?: () => void })[]>,
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Skills Detected</h3>

      {skills.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No skills detected yet.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category}>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={skill.onClick}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors",
                      categoryColors[category] || categoryColors.Other,
                      skill.onClick && "cursor-pointer",
                    )}
                  >
                    {skill.name}
                    {skill.confidence > 0 && (
                      <span className="text-xs opacity-70">
                        {Math.round(skill.confidence * 100)}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
