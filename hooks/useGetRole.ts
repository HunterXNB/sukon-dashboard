import { getRole } from "@/actions/roles";
import { useQuery } from "@tanstack/react-query";

export function useGetRole(roleId: number) {
  return useQuery({
    queryKey: ["role", roleId],
    queryFn: async () => await getRole(roleId),
    enabled: roleId !== null,
    refetchOnWindowFocus: false,
  });
}
