import { getSpecialization } from "@/actions/specializations";
import { useQuery } from "@tanstack/react-query";

export function useGetSpecialization(specializationId: number) {
  return useQuery({
    queryKey: ["specialization", specializationId],
    queryFn: async () => await getSpecialization(specializationId),
    enabled: specializationId !== null,
    refetchOnWindowFocus: false,
  });
}
