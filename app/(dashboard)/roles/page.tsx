import { getUser } from "@/actions/auth";
import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/roles/columns";
import EditRole from "@/components/roles/EditRole";
import RoleActionDialog from "@/components/roles/RoleActionDialog";
import RolesTable from "@/components/roles/RolesTable";
import React, { Suspense } from "react";

async function RolesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search, page, status } = await searchParams;
  const urlSearchParams = new URLSearchParams();
  if (search) {
    if (typeof search === "string") urlSearchParams.append("search", search);
    else {
      urlSearchParams.append("search", search[0]);
    }
  }
  if (page) {
    if (typeof page === "string") urlSearchParams.append("page", page);
    else {
      urlSearchParams.append("page", page[0]);
    }
  }
  if (status) {
    if (typeof status === "string") urlSearchParams.append("status", status);
    else {
      urlSearchParams.append("status", status[0]);
    }
  }
  const user = await getUser();
  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <Suspense
        key={`${page}-${search}-${status}`}
        fallback={<LoadingTable columns={columns} />}
      >
        <RolesTable searchParams={urlSearchParams} />
      </Suspense>
      {user?.permissions.includes("roles-delete") && (
        <RoleActionDialog type="delete" />
      )}
      {user?.permissions.includes("roles-activation-toggle") && (
        <RoleActionDialog type="activeToggle" />
      )}
      {user?.permissions.includes("roles-edit") && <EditRole />}
    </div>
  );
}

export default RolesPage;
