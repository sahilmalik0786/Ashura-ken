import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchNewChatId } from '@/features/chat/fetchNewChatId';



export function useChatId() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => fetchNewChatId(data), // backend sets cookie
      onSuccess: async () => {
      
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
      
    },
  });
}