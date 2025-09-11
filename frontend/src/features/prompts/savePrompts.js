import apiClient from "@/services/apiClient"


export const savePrompt = async(data)=>{
    try {
        const res = await apiClient.post('/api/prompt/saveprompt' , {prompt:data})
         return res.data?.message 
        
    } catch (error) {
        return error
    }
}