import apiClient from "@/services/apiClient"

export const fetchSearchPrompts = async(tag , reset)=>{
   try {
      console.log(tag)
      const res = await apiClient.get(`/api/prompt/search/${tag}`)
      reset({tag:''})
      return res.data?.prompts
 
   } catch (error) {
      console.log(error)
      return error
   }
}