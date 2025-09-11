import { fetchPrompts } from "@/features/prompts/fetchPrompts";
import { useQuery } from "@tanstack/react-query";

export  function usePrompts() {
    return useQuery({
        queryKey:['prompts'],
        queryFn: fetchPrompts,
        retry:false,
        
    })
}