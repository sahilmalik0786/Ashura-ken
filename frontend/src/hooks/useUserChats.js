import { fetchChats } from "@/features/chat/fetchChats";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUserChats(){
    return useQuery({
        queryKey:['chats'],
        queryFn: fetchChats,
        retry:false
    })
}