import { getRegisteration } from "@/actions/registeration";
import { useQuery } from "@tanstack/react-query";

export function useGetRegistration(registrationId: number) {
  return useQuery({
    queryKey: ["registeration", registrationId],
    queryFn: async () => await getRegisteration(registrationId),
    enabled: registrationId !== null,
    refetchOnWindowFocus: false,
  });
}
