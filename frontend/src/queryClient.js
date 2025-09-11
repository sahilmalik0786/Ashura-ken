// src/queryClient.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});




window.__TANSTACK_QUERY_CLIENT__ = queryClient;
