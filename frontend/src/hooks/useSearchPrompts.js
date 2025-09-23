import { fetchSearchPrompts } from "@/features/prompts/fetchSearchPrompts"
import { useQuery } from "@tanstack/react-query"

export const useSearchPrompts = (tag , reset)=>{
    
    console.log(reset)
    return useQuery({
        queryKey:['searchPrompts' , tag ],
        queryFn: () => fetchSearchPrompts(tag , reset),        
        retry:false,
        enabled: !!tag
    }) 
}