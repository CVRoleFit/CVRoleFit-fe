import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api";

export function useResume(id: string | undefined) {
  return useQuery({
    queryKey: ["resumes", id],
    queryFn: () => resumeApi.getResume(id!),
    enabled: !!id,
  });
}
