import { useMe } from "./useMe";

export function useAuth(){
    const {  data:user , isLoading } = useMe();
    return {
      user,
      isAuthenticated: !!user,
      isLoading,
    };
}