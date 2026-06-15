import { useState, useCallback } from "react";
import type { CV, Experience, Education, Skill, Project } from "../types";
import { defaultCV } from "../types";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useCVStore() {
  const [cv, setCV] = useState<CV>({
    ...defaultCV,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [activeSection, setActiveSection] = useState<string>("personal");

  const updateTitle = useCallback((title: string) => {
    setCV((prev) => ({ ...prev, title, updatedAt: new Date().toISOString() }));
  }, []);

  const updatePersonalInfo = useCallback((personalInfo: Partial<CV["personalInfo"]>) => {
    setCV((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...personalInfo },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addExperience = useCallback((experience: Omit<Experience, "id">) => {
    setCV((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { ...experience, id: generateId() }],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateExperience = useCallback((id: string, experience: Partial<Experience>) => {
    setCV((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) =>
        e.id === id ? { ...e, ...experience } : e
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setCV((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addEducation = useCallback((education: Omit<Education, "id">) => {
    setCV((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id: generateId() }],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateEducation = useCallback((id: string, education: Partial<Education>) => {
    setCV((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, ...education } : e
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setCV((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addSkill = useCallback((skill: Omit<Skill, "id">) => {
    setCV((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: generateId() }],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateSkill = useCallback((id: string, skill: Partial<Skill>) => {
    setCV((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.id === id ? { ...s, ...skill } : s
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setCV((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addProject = useCallback((project: Omit<Project, "id">) => {
    setCV((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: generateId() }],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateProject = useCallback((id: string, project: Partial<Project>) => {
    setCV((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...project } : p
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setCV((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const loadCV = useCallback((savedCV: CV) => {
    setCV(savedCV);
  }, []);

  const resetCV = useCallback(() => {
    setCV({
      ...defaultCV,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  return {
    cv,
    activeSection,
    setActiveSection,
    updateTitle,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    loadCV,
    resetCV,
  };
}
