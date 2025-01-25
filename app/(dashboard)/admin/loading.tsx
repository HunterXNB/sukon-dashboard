import columns from "@/components/admin/columns";
import { LoadingTable } from "@/components/DataTable";
import React from "react";

function AdminLoading() {
  return (
    <div className=" w-full max-w-[900px]">
      <LoadingTable columns={columns} />
    </div>
  );
}

export default AdminLoading;
