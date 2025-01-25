import { getUser } from "@/actions/auth";
import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/roles/columns";
import EditRole from "@/components/roles/EditRole";
import RoleActionDialog from "@/components/roles/RoleActionDialog";
import RoleDialog from "@/components/roles/RoleDialog";
import RolesTable from "@/components/roles/RolesTable";
import TableSearch from "@/components/TableSearch";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function RolesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ search, page, status }, user] = await Promise.all([
    searchParams,
    getUser(),
  ]);
  const rolesPermissions = user?.permissions.Roles;
  if (rolesPermissions!.length === 0) return redirect("/");
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
  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <div className=" w-full max-w-[900px]">
        <div className="flex justify-between mb-2">
          {user?.permissions.Roles.includes("roles-list") && <TableSearch />}
          {user?.permissions.Roles.includes("roles-create") && <RoleDialog />}
        </div>
        <Suspense
          key={`${urlSearchParams.get("page")}-${urlSearchParams.get(
            "search"
          )}-${urlSearchParams.get("status")}`}
          fallback={<LoadingTable columns={columns} />}
        >
          <RolesTable searchParams={urlSearchParams} />
        </Suspense>
        {user?.permissions.Roles.includes("roles-delete") && (
          <RoleActionDialog type="delete" />
        )}
      </div>
      {user?.permissions.Roles.includes("roles-activation-toggle") && (
        <RoleActionDialog type="activeToggle" />
      )}
      {user?.permissions.Roles.includes("roles-edit") && <EditRole />}
    </div>
  );
}

export default RolesPage;
