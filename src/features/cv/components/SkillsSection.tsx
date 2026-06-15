import { useState } from "react";
import { Button, Input } from "@/shared/components";
import type { Skill } from "@/features/cv/types";
import { AIAssistButton } from "./AIAssistButton";
import { cn } from "@/shared/utils/cn";

interface SkillsSectionProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, "id">) => void;
  onRemove: (id: string) => void;
  onAIAssist: (context: string) => void;
  isGenerating?: boolean;
}

const levelLabels: Record<Skill["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const levelColors: Record<Skill["level"], string> = {
  beginner: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  advanced: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  expert: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export function SkillsSection({ skills, onAdd, onRemove, onAIAssist, isGenerating }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState({ name: "", level: "intermediate" as Skill["level"] });

  const handleAdd = () => {
    if (!newSkill.name.trim()) return;
    onAdd({ name: newSkill.name.trim(), level: newSkill.level });
    setNewSkill({ name: "", level: "intermediate" });
  };

  const getSkillsContext = () => {
    return skills.map((s) => s.name).join(", ");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
        <AIAssistButton
          onClick={() => onAIAssist(getSkillsContext())}
          isLoading={isGenerating}
          label="Suggest Skills"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
              levelColors[skill.level]
            )}
          >
            <span>{skill.name}</span>
            <span className="text-xs opacity-70">({levelLabels[skill.level]})</span>
            <button
              onClick={() => onRemove(skill.id)}
              className="ml-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newSkill.name}
          onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Add a skill (e.g., React, Python)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <select
          value={newSkill.level}
          onChange={(e) => setNewSkill((prev) => ({ ...prev, level: e.target.value as Skill["level"] }))}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
