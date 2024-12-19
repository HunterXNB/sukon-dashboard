import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/roles/columns";
import React from "react";

function RolesTableLoadingPage() {
  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <LoadingTable columns={columns} />
    </div>
  );
}

export default RolesTableLoadingPage;
