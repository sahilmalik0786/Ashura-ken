// to get community prompts or those prompt that are public

import { fetchCommunityPr } from "@/features/prompts/fetchCommunityPr"
import { useQuery } from "@tanstack/react-query"

export const useCommPrompt = ()=>{
    return useQuery({
        queryKey:['communityPrompts'],
        queryFn: fetchCommunityPr,
        retry:false
    })
}