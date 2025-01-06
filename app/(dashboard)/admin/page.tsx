import { getUser } from "@/actions/auth";
import AdminsTable from "@/components/admin/AdminsTable";
import columns from "@/components/admin/columns";
import { LoadingTable } from "@/components/DataTable";
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
  const adminPermissions = user?.permissions.filter(
    (el) => el.startsWith("admin-users") && el !== "admin-users-show"
  );
  if (adminPermissions!.length === 0) return redirect("/");
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
      <Suspense
        key={`${page}-${search}-${status}`}
        fallback={<LoadingTable columns={columns} />}
      >
        <AdminsTable searchParams={urlSearchParams} />
      </Suspense>
      {/* {user?.permissions.includes("roles-delete") && (
        <RoleActionDialog type="delete" />
      )}
      {user?.permissions.includes("roles-activation-toggle") && (
        <RoleActionDialog type="activeToggle" />
      )}
      {user?.permissions.includes("roles-edit") && <EditRole />} */}
    </div>
  );
}

export default AdminPage;
