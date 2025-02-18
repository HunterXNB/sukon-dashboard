import { getUser } from "@/actions/users";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(userId),
    enabled: userId !== null,
    refetchOnWindowFocus: false,
  });
}
