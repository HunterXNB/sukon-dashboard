import { getAdmin } from "@/actions/admins";
import { useQuery } from "@tanstack/react-query";

export function useGetAdmin(adminId: number) {
  return useQuery({
    queryKey: ["role", adminId],
    queryFn: async () => await getAdmin(adminId),
    enabled: adminId !== null,
    refetchOnWindowFocus: false,
  });
}
