import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/tiers/columns";
import React from "react";

function AdminLoading() {
  return (
    <div className=" w-full max-w-[900px]">
      <LoadingTable columns={columns} />
    </div>
  );
}

export default AdminLoading;
