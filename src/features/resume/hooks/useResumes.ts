import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api";

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: resumeApi.getResumes,
  });
}
