import apiClient from "@/services/apiClient";

export async function fetchUser(){
     const res = await apiClient.get('/api/auth/getMe')
   
     return res.data?.user
     
}