import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Simple hook to check if user is authenticated
export function useAuthStatus() {
  const token = localStorage.getItem("userToken");
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user", token],
    queryFn: async () => {
      if (!token) return null;
      try {
        const { data } = await axios.get("/api/auth/user", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return data;
      } catch (error) {
        localStorage.removeItem("userToken");
        return null;
      }
    },
    retry: false,
    enabled: !!token,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}

