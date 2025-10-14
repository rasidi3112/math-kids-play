import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Achievement, InsertAchievement } from "@shared/schema";

export function useAchievements(studentName: string) {
  return useQuery<Achievement[]>({
    queryKey: ["/api/achievements", studentName],
    enabled: !!studentName,
  });
}

export function useAddAchievement() {
  return useMutation({
    mutationFn: async (data: InsertAchievement) => {
      return await apiRequest("POST", "/api/achievements", data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements", variables.studentName] });
    },
  });
}
