import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api";

export function useResumeAnalysis(resumeId: string | undefined) {
  return useQuery({
    queryKey: ["resumes", resumeId, "analysis"],
    queryFn: () => resumeApi.getAnalysis(resumeId!),
    enabled: !!resumeId,
    retry: false,
  });
}
