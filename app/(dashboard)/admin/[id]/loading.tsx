import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AdminLoadingPage() {
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <Skeleton className=" w-64 h-8" />
      <Skeleton className=" w-80 h-8" />
      <Skeleton className=" w-72 h-8" />
      <Skeleton className=" w-64 h-8" />
      <Skeleton className="w-52 h-8 " />
    </div>
  );
}

export default AdminLoadingPage;
