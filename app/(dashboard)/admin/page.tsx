import { getUser } from "@/actions/auth";
import AdminActionDialog from "@/components/admin/AdminActionDialog";
import AdminDialog from "@/components/admin/AdminDialog";
import AdminsTable from "@/components/admin/AdminsTable";
import columns from "@/components/admin/columns";
import EditAdmin from "@/components/admin/EditAdmin";
import { LoadingTable } from "@/components/DataTable";
import TableSearch from "@/components/TableSearch";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ search, page, status }, user] = await Promise.all([
    searchParams,
    getUser(),
  ]);
  const adminPermissions = user?.permissions?.AdminUsers.filter(
    (el) => el !== "admin-users-show"
  );
  if ((adminPermissions?.length ?? 0) === 0) return redirect("/");
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
          {user?.permissions?.AdminUsers.includes("admin-users-list") && (
            <TableSearch />
          )}
          {user?.permissions?.AdminUsers.includes("admin-users-create") && (
            <AdminDialog />
          )}
        </div>
        <Suspense
          key={`${page}-${search}-${status}`}
          fallback={<LoadingTable columns={columns} />}
        >
          <AdminsTable searchParams={urlSearchParams} />
        </Suspense>
      </div>
      {user?.permissions?.AdminUsers.includes("admin-users-delete") && (
        <AdminActionDialog type="delete" />
      )}
      {user?.permissions?.AdminUsers.includes(
        "admin-users-activation-toggle"
      ) && <AdminActionDialog type="activeToggle" />}
      {user?.permissions?.AdminUsers.includes("admin-users-edit") && (
        <EditAdmin />
      )}
    </div>
  );
}

export default AdminPage;
