import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function RegisterLoadingPage() {
  return (
    <div className="py-3 flex-1 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] sm:colu gap-2">
      {Array.from({ length: 25 }, (_, i) => (
        <Skeleton key={i} className="w-full" />
      ))}
    </div>
  );
}

export default RegisterLoadingPage;
