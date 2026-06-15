import { useMutation } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api";
import type { UploadProgress } from "@/features/resume/types";

export function useUploadResume() {
  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: UploadProgress) => void;
    }) => resumeApi.uploadResume(file, onProgress),
  });
}
