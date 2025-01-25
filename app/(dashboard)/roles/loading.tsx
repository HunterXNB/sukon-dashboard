import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/roles/columns";
import React from "react";

function RolesTableLoadingPage() {
  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <div className=" w-full max-w-[900px]">
        <LoadingTable columns={columns} />
      </div>
    </div>
  );
}

export default RolesTableLoadingPage;
