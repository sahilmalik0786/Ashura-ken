import { savePrompt } from "@/features/prompts/savePrompts"
import { queryClient } from "@/queryClient"
import { useMutation } from "@tanstack/react-query"

export const useSavePrompt = ()=>{
      return useMutation({
        mutationFn: (data)=>savePrompt(data.prompt),
        onSuccess: async()=>{
            await queryClient.invalidateQueries({queryKey:['prompts']})
        }
      })
}