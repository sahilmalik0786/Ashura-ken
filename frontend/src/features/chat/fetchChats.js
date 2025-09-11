import apiClient from "@/services/apiClient"

export const fetchChats = async ()=>{
    const res = await apiClient.get('api/chat/chats')
    return res.data?.chats
      
}