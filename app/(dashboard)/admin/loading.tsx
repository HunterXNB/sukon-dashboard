import columns from "@/components/admin/columns";
import { LoadingTable } from "@/components/DataTable";
import React from "react";

function AdminLoading() {
  return <LoadingTable columns={columns} />;
}

export default AdminLoading;
