import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { GameScore, InsertGameScore } from "@shared/schema";

export function useGameScores(studentName: string) {
  return useQuery<GameScore[]>({
    queryKey: ["/api/scores", studentName],
    enabled: !!studentName,
  });
}

export function useAddScore() {
  return useMutation({
    mutationFn: async (data: InsertGameScore) => {
      return await apiRequest("POST", "/api/scores", data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/scores", variables.studentName] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress", variables.studentName] });
    },
  });
}
