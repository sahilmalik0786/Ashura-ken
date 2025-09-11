import apiClient from "@/services/apiClient"

export const fetchCommunityPr = async()=>{
     try {
        const res = await apiClient.get('/api/prompt/communityprompt')
        console.log(res)
        return res.data?.communityPrompts
     } catch (error) {
        return error
        
     }
}