import { useMemo, useState } from "react";
import type { CV } from "@/features/cv/types";
import { generateLatex, type LatexTemplate } from "@/features/cv/latex";
import { Button } from "@/shared/components";

interface LatexExportPanelProps {
  cv: CV;
}

const templates: { id: LatexTemplate; name: string; description: string }[] = [
  {
    id: "modern",
    name: "Modern",
    description: "A crisp blue accent with a contemporary feel.",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional typography and understated rules.",
  },
  {
    id: "compact",
    name: "Compact",
    description: "A space-saving layout for dense experience.",
  },
];

export function LatexExportPanel({ cv }: LatexExportPanelProps) {
  const [template, setTemplate] = useState<LatexTemplate>("modern");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const source = useMemo(() => generateLatex(cv, template), [cv, template]);
  const filename = (cv.title.trim() || "resume")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const downloadSource = () => {
    const blob = new Blob([source], {
      type: "application/x-tex;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename || "resume"}.tex`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 2400);
  };

  return (
    <section
      aria-labelledby="latex-title"
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex flex-col gap-5 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7 dark:border-gray-700">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            Source export
          </p>
          <h2
            id="latex-title"
            className="mt-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            LaTeX CV
          </h2>
          <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            Live LaTeX generated from your resume. Choose a layout, then
            download the source to compile in your preferred LaTeX editor.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={copySource}>
            {copyState === "copied" ? "Copied" : "Copy source"}
          </Button>
          <Button size="sm" onClick={downloadSource}>
            Download .tex
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="border-b border-gray-200 p-5 sm:p-7 lg:border-b-0 lg:border-r dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Choose a template
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {templates.map((option) => {
              const selected = template === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTemplate(option.id)}
                  className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selected
                      ? "border-blue-500 bg-blue-50/70 ring-1 ring-blue-500 dark:bg-blue-950/30"
                      : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {option.name}
                    </span>
                    <span
                      className={`flex size-4 items-center justify-center rounded-full border ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 dark:border-gray-600"}`}
                      aria-hidden="true"
                    >
                      {selected ? (
                        <span className="size-1.5 rounded-full bg-white" />
                      ) : null}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              What you get
            </p>
            <ul className="mt-2 flex flex-col gap-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
              <li>Standard article document, ready for pdfLaTeX</li>
              <li>Escaped special characters for safe LaTeX output</li>
              <li>Only sections with resume content are included</li>
            </ul>
          </div>
          <p
            className="mt-4 min-h-5 text-xs text-gray-500 dark:text-gray-400"
            role="status"
            aria-live="polite"
          >
            {copyState === "copied"
              ? "LaTeX source copied to clipboard."
              : copyState === "error"
                ? "Clipboard access was blocked. Download the .tex file instead."
                : ""}
          </p>
        </div>

        <div className="min-w-0 p-5 sm:p-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Generated source
              </h3>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Updates as you edit your CV
              </p>
            </div>
            <span className="rounded-md border border-gray-200 px-2 py-1 font-mono text-[11px] text-gray-500 dark:border-gray-700 dark:text-gray-400">
              {filename || "resume"}.tex
            </span>
          </div>
          <textarea
            aria-label="Generated LaTeX source"
            readOnly
            spellCheck={false}
            value={source}
            className="h-[520px] w-full resize-y rounded-xl border border-gray-800 bg-[#111827] p-4 font-mono text-xs leading-6 text-gray-200 outline-none selection:bg-blue-500/40"
          />
        </div>
      </div>
    </section>
  );
}
