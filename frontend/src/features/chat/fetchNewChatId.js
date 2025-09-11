import apiClient from "@/services/apiClient";

export async function fetchNewChatId(data){
    console.log(data)
    const res = await apiClient.post('/api/chat/chatid' , {message:data})
     return res.data?.chat
    
}