import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient"
// your TanStack router instance

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) =>
      apiClient.post("/api/auth/login", credentials), // backend sets cookie
      onSuccess: async () => {
      // refresh "me" query
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      
    },
  });
}