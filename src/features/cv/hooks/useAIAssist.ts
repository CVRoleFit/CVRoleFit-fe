import { useState, useCallback } from "react";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface AIAssistOptions {
  context: string;
  type: "summary" | "experience" | "skills" | "project" | "achievement";
  existingContent?: string;
}

export function useAIAssist() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async (options: AIAssistOptions): Promise<string | null> => {
    if (!OPENAI_API_KEY) {
      setError("OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.");
      return null;
    }

    setIsGenerating(true);
    setError(null);

    const prompts: Record<string, string> = {
      summary: `Write a compelling professional summary for a resume. Context: ${options.context}. Keep it under 150 words and focus on achievements and value provided.`,
      experience: `Write a job description for a resume. Context: ${options.context}. Include 3-4 bullet points highlighting achievements and responsibilities. Start each bullet with an action verb.`,
      skills: `Based on this context: ${options.context}, suggest relevant technical and soft skills that would be valuable. Format as a comma-separated list.`,
      project: `Write a project description for a resume. Context: ${options.context}. Include the purpose, technologies used, and impact achieved. Keep it under 100 words.`,
      achievement: `Transform this into a quantified achievement bullet point: ${options.context}. Include metrics where possible. Start with an action verb.`,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a professional resume writer. Write concise, impactful content that highlights achievements and uses action verbs. Avoid clichés and generic statements.",
            },
            {
              role: "user",
              content: prompts[options.type],
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();

      if (!content) {
        throw new Error("No content generated");
      }

      return content;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate content";
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const improveContent = useCallback(async (content: string, type: AIAssistOptions["type"]): Promise<string | null> => {
    if (!OPENAI_API_KEY) {
      setError("OpenAI API key not configured.");
      return null;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a professional resume editor. Improve the given content to be more impactful, using action verbs and quantified achievements where possible. Keep the same general meaning and length.",
            },
            {
              role: "user",
              content: `Improve this ${type} description: "${content}"`,
            },
          ],
          max_tokens: 300,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() ?? null;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to improve content";
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateContent,
    improveContent,
    isGenerating,
    error,
    clearError: () => setError(null),
  };
}
