import assert from "node:assert/strict";
import test from "node:test";
import { generateLatex } from "../src/features/cv/latex.ts";

const createCV = (overrides = {}) => ({
  id: "cv-1",
  title: "Engineer Resume",
  personalInfo: {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    phone: "+1 555 0100",
    location: "London",
    linkedin: "https://linkedin.com/in/ada",
    website: "https://example.com",
    summary: "Mathematician & engineer.",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

test("generates the modern document and includes contact and summary", () => {
  const source = generateLatex(createCV(), "modern");

  assert.match(source, /\\documentclass\[11pt\]\{article\}/);
  assert.match(source, /Ada Lovelace/);
  assert.match(source, /ada@example\.com/);
  assert.match(source, /Professional Summary/);
  assert.match(source, /Mathematician \\& engineer\./);
  assert.match(source, /\\end\{document\}$/);
});

test("escapes LaTeX-special characters in all CV content", () => {
  const cv = createCV({
    personalInfo: {
      fullName: "A&B_50%",
      email: "a+b@example.com",
      phone: "(555) #1",
      location: "R&D {Lab}",
      linkedin: "https://example.com/~ada^",
      website: "https://example.com/$path",
      summary:
        "Use \\\\ and {braces}, #tags, $money, % growth, & more, _code, ~home, ^power.",
    },
  });
  const source = generateLatex(cv, "modern");

  for (const escaped of [
    "A\\&B\\_50\\%",
    "R\\&D \\{Lab\\}",
    "\\textasciitilde{}home",
    "\\textasciicircum{}",
    "\\textbackslash{}",
    "\\#tags",
    "\\$money",
  ]) {
    assert.ok(source.includes(escaped), `Expected escaped output: ${escaped}`);
  }
});

test("applies template-specific layout settings", () => {
  const cv = createCV();

  assert.match(generateLatex(cv, "modern"), /margin=0\.72in/);
  assert.match(
    generateLatex(cv, "classic"),
    /\\titleformat\{\\section\}\{\\large\\bfseries\}/,
  );
  assert.match(generateLatex(cv, "compact"), /margin=0\.55in/);
  assert.match(
    generateLatex(cv, "compact"),
    /\\setlist\[itemize\]\{leftmargin=1\.2em, itemsep=1pt/,
  );
});

test("renders current roles as Present and omits empty sections", () => {
  const cv = createCV({
    experiences: [
      {
        id: "exp-1",
        company: "Analytical Engines",
        position: "Programmer",
        location: "London",
        startDate: "1842",
        endDate: "",
        current: true,
        description: "",
        achievements: [],
      },
    ],
  });
  const source = generateLatex(cv, "classic");

  assert.match(source, /1842 -- Present/);
  assert.match(source, /\\section\*\{Experience\}/);
  assert.doesNotMatch(source, /\\section\*\{Education\}/);
  assert.doesNotMatch(source, /\\section\*\{Skills\}/);
  assert.doesNotMatch(source, /\\section\*\{Projects\}/);
});
