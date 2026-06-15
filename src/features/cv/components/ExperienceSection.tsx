import { useState } from "react";
import { Button, Input } from "@/shared/components";
import type { Experience } from "@/features/cv/types";
import { AIAssistButton } from "./AIAssistButton";

interface ExperienceSectionProps {
  experiences: Experience[];
  onAdd: (experience: Omit<Experience, "id">) => void;
  onUpdate: (id: string, experience: Partial<Experience>) => void;
  onRemove: (id: string) => void;
  onAIAssist: (type: "description" | "achievement", context: string, experienceId: string) => void;
  isGenerating?: boolean;
}

export function ExperienceSection({ experiences, onAdd, onUpdate, onRemove, onAIAssist, isGenerating }: ExperienceSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState<Record<string, string>>({});

  const emptyExperience: Omit<Experience, "id"> = {
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [],
  };

  const handleAddAchievement = (expId: string) => {
    const achievement = newAchievement[expId]?.trim();
    if (!achievement) return;
    const exp = experiences.find((e) => e.id === expId);
    if (exp) {
      onUpdate(expId, { achievements: [...exp.achievements, achievement] });
      setNewAchievement((prev) => ({ ...prev, [expId]: "" }));
    }
  };

  const handleRemoveAchievement = (expId: string, index: number) => {
    const exp = experiences.find((e) => e.id === expId);
    if (exp) {
      onUpdate(expId, { achievements: exp.achievements.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h3>
        <Button size="sm" variant="secondary" onClick={() => setShowForm(true)}>
          + Add Experience
        </Button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <ExperienceForm
            experience={emptyExperience}
            onSave={(exp) => {
              onAdd(exp);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {experiences.length === 0 && !showForm ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No work experience added yet.</p>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              {editingId === exp.id ? (
                <ExperienceForm
                  experience={exp}
                  onSave={(updated) => {
                    onUpdate(exp.id, updated);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{exp.position}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.company} • {exp.location}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(exp.id)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => onRemove(exp.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
                  )}

                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Achievements:</span>
                      <AIAssistButton
                        onClick={() => onAIAssist("description", `${exp.position} at ${exp.company}`, exp.id)}
                        isLoading={isGenerating}
                        label="Generate"
                      />
                    </div>
                    {exp.achievements.length > 0 && (
                      <ul className="space-y-1 mb-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-blue-500">•</span>
                            <span>{achievement}</span>
                            <button
                              onClick={() => handleRemoveAchievement(exp.id, idx)}
                              className="ml-auto text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAchievement[exp.id] ?? ""}
                        onChange={(e) => setNewAchievement((prev) => ({ ...prev, [exp.id]: e.target.value }))}
                        placeholder="Add an achievement..."
                        className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddAchievement(exp.id);
                          }
                        }}
                      />
                      <Button size="sm" variant="secondary" onClick={() => handleAddAchievement(exp.id)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExperienceForm({
  experience,
  onSave,
  onCancel,
}: {
  experience: Omit<Experience, "id">;
  onSave: (exp: Omit<Experience, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(experience);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Company"
          value={form.company}
          onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
          placeholder="Company name"
        />
        <Input
          label="Position"
          value={form.position}
          onChange={(e) => setForm((prev) => ({ ...prev, position: e.target.value }))}
          placeholder="Job title"
        />
        <Input
          label="Location"
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="City, Country"
        />
        <div className="flex gap-2">
          <Input
            label="Start Date"
            value={form.startDate}
            onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
            placeholder="MMM YYYY"
          />
          <Input
            label="End Date"
            value={form.endDate}
            onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
            placeholder="MMM YYYY or Present"
            disabled={form.current}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <input
          type="checkbox"
          checked={form.current}
          onChange={(e) => setForm((prev) => ({ ...prev, current: e.target.checked, endDate: e.target.checked ? "" : prev.endDate }))}
          className="rounded border-gray-300"
        />
        I currently work here
      </label>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your role and responsibilities..."
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(form)}>Save</Button>
      </div>
    </div>
  );
}
