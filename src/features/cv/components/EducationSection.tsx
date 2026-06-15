import { useState } from "react";
import { Button, Input } from "@/shared/components";
import type { Education } from "@/features/cv/types";

interface EducationSectionProps {
  education: Education[];
  onAdd: (education: Omit<Education, "id">) => void;
  onUpdate: (id: string, education: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationSection({ education, onAdd, onUpdate, onRemove }: EducationSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyEducation: Omit<Education, "id"> = {
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    achievements: [],
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
        <Button size="sm" variant="secondary" onClick={() => setShowForm(true)}>
          + Add Education
        </Button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <EducationForm
            education={emptyEducation}
            onSave={(edu) => {
              onAdd(edu);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {education.length === 0 && !showForm ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No education added yet.</p>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              {editingId === edu.id ? (
                <EducationForm
                  education={edu}
                  onSave={(updated) => {
                    onUpdate(edu.id, updated);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} • {edu.location}</p>
                      <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(edu.id)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => onRemove(edu.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                  {edu.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-blue-500">•</span> {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationForm({
  education,
  onSave,
  onCancel,
}: {
  education: Omit<Education, "id">;
  onSave: (edu: Omit<Education, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(education);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Institution"
          value={form.institution}
          onChange={(e) => setForm((prev) => ({ ...prev, institution: e.target.value }))}
          placeholder="University name"
        />
        <Input
          label="Degree"
          value={form.degree}
          onChange={(e) => setForm((prev) => ({ ...prev, degree: e.target.value }))}
          placeholder="Bachelor's, Master's, etc."
        />
        <Input
          label="Field of Study"
          value={form.field}
          onChange={(e) => setForm((prev) => ({ ...prev, field: e.target.value }))}
          placeholder="Computer Science"
        />
        <Input
          label="Location"
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="City, Country"
        />
        <Input
          label="Start Date"
          value={form.startDate}
          onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
          placeholder="Sep 2018"
        />
        <Input
          label="End Date"
          value={form.endDate}
          onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
          placeholder="Jun 2022"
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
