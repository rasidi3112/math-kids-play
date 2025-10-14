import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { LearningProgress, InsertLearningProgress } from "@shared/schema";

export function useLearningProgress(studentName: string) {
  return useQuery<LearningProgress[]>({
    queryKey: ["/api/learning", studentName],
    enabled: !!studentName,
  });
}

export function useUpdateLearning() {
  return useMutation({
    mutationFn: async (data: InsertLearningProgress) => {
      return await apiRequest("POST", "/api/learning", data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/learning", variables.studentName] });
    },
  });
}
