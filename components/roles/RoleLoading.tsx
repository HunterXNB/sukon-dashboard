import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
export function RoleLoading({ isModal }: { isModal?: boolean }) {
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-5 w-36" />

      <div className="flex flex-col gap-2 items-center text-lg">
        <Skeleton className="h-5 w-20" />

        <ul
          className={cn(
            "grid  justify-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] w-full justify-items-center gap-2",
            {
              "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]": isModal,
            }
          )}
        >
          {Array.from(
            {
              length: 8,
            },
            (_, i) => (
              <li className={"w-full h-full"} key={i}>
                <Skeleton className="h-10 w-full" />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
