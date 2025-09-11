import apiClient from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useRegister(){
  const queryClient = useQueryClient()
   return useMutation({
    mutationFn:(credentials) =>
       apiClient.post("/api/auth/register", credentials), // backend sets cookie
       onSuccess: async () => {
        // refresh "me" query
       await queryClient.invalidateQueries({ queryKey: ["me"] });
      
    },
    
   })

}