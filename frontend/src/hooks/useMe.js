import { fetchUser } from "@/features/fetchUser";
import { useQuery } from "@tanstack/react-query";

export function useMe(){
    return useQuery({
        queryKey:['me'],
        queryFn:fetchUser,
        retry:false
    })

}