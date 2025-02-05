import { getTier } from "@/actions/tiers";
import { useQuery } from "@tanstack/react-query";

export function useGetTier(tierId: number) {
  return useQuery({
    queryKey: ["tier", tierId],
    queryFn: async () => await getTier(tierId),
    enabled: tierId !== null,
    refetchOnWindowFocus: false,
  });
}
