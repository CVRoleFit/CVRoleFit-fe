import { useState } from "react";
import { Button, Input } from "@/shared/components";
import type { Project } from "@/features/cv/types";
import { AIAssistButton } from "./AIAssistButton";

interface ProjectsSectionProps {
  projects: Project[];
  onAdd: (project: Omit<Project, "id">) => void;
  onUpdate: (id: string, project: Partial<Project>) => void;
  onRemove: (id: string) => void;
  onAIAssist: (context: string) => void;
  isGenerating?: boolean;
}

export function ProjectsSection({ projects, onAdd, onUpdate, onRemove, onAIAssist, isGenerating }: ProjectsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyProject: Omit<Project, "id"> = {
    name: "",
    description: "",
    technologies: [],
    url: "",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
        <Button size="sm" variant="secondary" onClick={() => setShowForm(true)}>
          + Add Project
        </Button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <ProjectForm
            project={emptyProject}
            onSave={(proj) => {
              onAdd(proj);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {projects.length === 0 && !showForm ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No projects added yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              {editingId === proj.id ? (
                <ProjectForm
                  project={proj}
                  onSave={(updated) => {
                    onUpdate(proj.id, updated);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{proj.name}</h4>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {proj.url}
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <AIAssistButton
                        onClick={() => onAIAssist(`${proj.name}: ${proj.description}`)}
                        isLoading={isGenerating}
                        label="Improve"
                      />
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(proj.id)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => onRemove(proj.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: Omit<Project, "id">;
  onSave: (proj: Omit<Project, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(project);
  const [techInput, setTechInput] = useState("");

  const handleAddTech = () => {
    const tech = techInput.trim();
    if (!tech) return;
    setForm((prev) => ({ ...prev, technologies: [...prev.technologies, tech] }));
    setTechInput("");
  };

  return (
    <div className="space-y-3">
      <Input
        label="Project Name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="My Awesome Project"
      />
      <Input
        label="URL"
        value={form.url ?? ""}
        onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
        placeholder="https://github.com/user/project"
      />
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe what the project does and your role..."
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Technologies</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTech();
              }
            }}
          />
          <Button size="sm" variant="secondary" onClick={handleAddTech}>
            Add
          </Button>
        </div>
        {form.technologies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {form.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300"
              >
                {tech}
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      technologies: prev.technologies.filter((_, i) => i !== idx),
                    }))
                  }
                  className="hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
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
