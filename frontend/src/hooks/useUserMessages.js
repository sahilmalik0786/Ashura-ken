import { fetchMessages } from "@/features/chat/fetchMessages";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUserMessages(data){
    // console.log(data)
  return useQuery({
    queryKey:['messages' , data],
    queryFn:  async () => await fetchMessages(data)
  })
}