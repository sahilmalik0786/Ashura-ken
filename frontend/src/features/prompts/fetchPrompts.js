import apiClient from "@/services/apiClient"

export const fetchPrompts = async()=>{
    const res = await apiClient.get('/api/prompt/getprompt')
   
    return res.data?.prompts
}