import type { CV } from "./types";

export type LatexTemplate = "modern" | "classic" | "compact";

const escapeLatex = (value: string) =>
  value.replace(/[\\{}%$&#_~^]/g, (character) => {
    const escaped: Record<string, string> = {
      "\\": "\\textbackslash{}",
      "{": "\\{",
      "}": "\\}",
      "%": "\\%",
      $: "\\$",
      "&": "\\&",
      "#": "\\#",
      _: "\\_",
      "~": "\\textasciitilde{}",
      "^": "\\textasciicircum{}",
    };
    return escaped[character];
  });

const clean = (value: string | undefined) => escapeLatex(value?.trim() ?? "");

export function generateLatex(cv: CV, template: LatexTemplate): string {
  const { personalInfo, experiences, education, skills, projects } = cv;
  const compact = template === "compact";
  const sectionStyle =
    template === "classic"
      ? "\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]"
      : template === "compact"
        ? "\\titleformat{\\section}{\\normalsize\\bfseries\\color{accent}}{}{0em}{}"
        : "\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0em}{}[\\vspace{-0.4em}\\color{accent}\\titlerule]";

  const lines = [
    "\\documentclass[11pt]{article}",
    "\\usepackage[utf8]{inputenc}",
    "\\usepackage[T1]{fontenc}",
    `\\usepackage[${compact ? "margin=0.55in" : "margin=0.72in"}]{geometry}`,
    "\\usepackage{xcolor}",
    "\\usepackage{textcomp}",
    "\\usepackage{titlesec}",
    "\\usepackage{enumitem}",
    "\\usepackage[hidelinks]{hyperref}",
    "\\definecolor{accent}{HTML}{2563EB}",
    "\\pagestyle{empty}",
    `\\setlist[itemize]{leftmargin=1.2em, itemsep=${compact ? "1pt" : "2pt"}, topsep=3pt}`,
    sectionStyle,
    `\\titlespacing*{\\section}{0pt}{${compact ? "0.7" : "1.1"}em}{0.45em}`,
    "\\begin{document}",
    "\\begin{center}",
    `  {\\${compact ? "Large" : "huge"}\\bfseries ${clean(personalInfo.fullName) || "Your Name"}}\\\\[5pt]`,
  ];

  const contact = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
  ]
    .map((value) => value?.trim())
    .filter(Boolean)
    .map((value) => clean(value!));
  const links = [personalInfo.linkedin, personalInfo.website]
    .map((value) => value?.trim())
    .filter(Boolean)
    .map((value) => clean(value!));
  if (contact.length) lines.push(`  ${contact.join(" \\textbar{} ")}\\\\`);
  if (links.length) lines.push(`  ${links.join(" \\textbar{} ")}`);
  lines.push("\\end{center}", "\\vspace{-0.8em}");

  if (personalInfo.summary.trim()) {
    lines.push(
      "\\section*{Professional Summary}",
      clean(personalInfo.summary),
      "",
    );
  }

  if (experiences.length) {
    lines.push("\\section*{Experience}");
    for (const experience of experiences) {
      const role = [clean(experience.position), clean(experience.company)]
        .filter(Boolean)
        .join(" --- ");
      const date = [
        experience.startDate,
        experience.current ? "Present" : experience.endDate,
      ]
        .filter(Boolean)
        .map(clean)
        .join(" -- ");
      lines.push(`\\noindent\\textbf{${role}}\\hfill ${date}\\\\`);
      if (experience.location.trim())
        lines.push(`\\textit{${clean(experience.location)}}\\\\`);
      if (experience.description.trim())
        lines.push(clean(experience.description));
      if (experience.achievements.length) {
        lines.push("\\begin{itemize}");
        for (const achievement of experience.achievements.filter((item) =>
          item.trim(),
        )) {
          lines.push(`  \\item ${clean(achievement)}`);
        }
        lines.push("\\end{itemize}");
      }
      lines.push("\\vspace{0.25em}");
    }
  }

  if (education.length) {
    lines.push("\\section*{Education}");
    for (const item of education) {
      const degree = [clean(item.degree), clean(item.field)]
        .filter(Boolean)
        .join(" in ");
      const date = [item.startDate, item.endDate]
        .filter(Boolean)
        .map(clean)
        .join(" -- ");
      lines.push(`\\noindent\\textbf{${degree}}\\hfill ${date}\\\\`);
      lines.push(
        `\\textit{${clean(item.institution)}${item.location.trim() ? `, ${clean(item.location)}` : ""}}`,
      );
      if (item.achievements.length) {
        lines.push("\\begin{itemize}");
        for (const achievement of item.achievements.filter((entry) =>
          entry.trim(),
        )) {
          lines.push(`  \\item ${clean(achievement)}`);
        }
        lines.push("\\end{itemize}");
      }
      lines.push("");
    }
  }

  if (skills.length) {
    lines.push(
      "\\section*{Skills}",
      skills.map((skill) => clean(skill.name)).join(" \\textbar{} "),
      "",
    );
  }

  if (projects.length) {
    lines.push("\\section*{Projects}");
    for (const project of projects) {
      lines.push(
        `\\noindent\\textbf{${clean(project.name)}}${project.url?.trim() ? ` \\textbar{} ${clean(project.url)}` : ""}\\\\`,
      );
      if (project.description.trim()) lines.push(clean(project.description));
      if (project.technologies.length) {
        lines.push(
          `\\\\\\textit{${project.technologies.map(clean).join(", ")}}`,
        );
      }
      lines.push("\\vspace{0.25em}");
    }
  }

  lines.push("\\end{document}");
  return lines.join("\n");
}
