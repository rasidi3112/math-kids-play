import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { UserProgress, InsertUserProgress } from "@shared/schema";

export function useUserProgress(studentName: string) {
  return useQuery<UserProgress>({
    queryKey: ["/api/progress", studentName],
    enabled: !!studentName,
  });
}

export function useUpdateProgress() {
  return useMutation({
    mutationFn: async (data: InsertUserProgress) => {
      return await apiRequest("POST", "/api/progress", data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", variables.studentName] });
    },
  });
}
