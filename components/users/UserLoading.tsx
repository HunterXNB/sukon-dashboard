import { Skeleton } from "@/components/ui/skeleton";
export function UserLoading({}: { isModal?: boolean }) {
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="h-[18px] w-28 font-bold" />
      </div>
      <p className="flex gap-1 items-center text-xl">
        <Skeleton className="w-24 h-[16px]" />
        <Skeleton className="w-36 h-[16px]" />
      </p>
      <p className="flex gap-1 items-center text-xl">
        <Skeleton className="w-16 h-[16px]" />
        <Skeleton className="w-10 h-[16px]" />
      </p>
      <p className="flex gap-1 items-center text-xl">
        <Skeleton className="w-16 h-[16px]" />
        <Skeleton className="w-10 h-[16px]" />
      </p>
      <p className="flex gap-1 items-center text-xl">
        <Skeleton className="w-16 h-[16px]" />
        <Skeleton className="w-10 h-[16px]" />
      </p>
    </div>
  );
}
