import { useMutation } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api";

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: (resumeId: string) => resumeApi.triggerAnalysis(resumeId),
  });
}
