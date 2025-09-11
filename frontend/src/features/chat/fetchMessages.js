import apiClient from "@/services/apiClient"

export const fetchMessages = async (data)=>{
    
    const res = await apiClient.post('/api/chat/chatHistory' , {id:data})
               return res.data?.messages
}