import api from "@/shared/api/axios";
import type { Resume, ResumeAnalysis, UploadProgress } from "@/features/resume/types";
import type { ApiResponse } from "@/shared/types";

export const resumeApi = {
  uploadResume: async (
    file: File,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<Resume> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<ApiResponse<Resume>>("/resumes/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100),
          });
        }
      },
    });
    return response.data.data;
  },

  getResumes: async (): Promise<Resume[]> => {
    const response = await api.get<ApiResponse<Resume[]>>("/resumes");
    return response.data.data;
  },

  getResume: async (id: string): Promise<Resume> => {
    const response = await api.get<ApiResponse<Resume>>(`/resumes/${id}`);
    return response.data.data;
  },

  deleteResume: async (id: string): Promise<void> => {
    await api.delete(`/resumes/${id}`);
  },

  getAnalysis: async (resumeId: string): Promise<ResumeAnalysis> => {
    const response = await api.get<ApiResponse<ResumeAnalysis>>(`/resumes/${resumeId}/analysis`);
    return response.data.data;
  },

  triggerAnalysis: async (resumeId: string): Promise<ResumeAnalysis> => {
    const response = await api.post<ApiResponse<ResumeAnalysis>>(`/resumes/${resumeId}/analyze`);
    return response.data.data;
  },
};
