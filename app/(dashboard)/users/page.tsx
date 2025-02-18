import { getUser } from "@/actions/auth";
import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/roles/columns";
import TableSearch from "@/components/TableSearch";
import UserActionDialog from "@/components/users/UserActionDialog";
import UsersTable from "@/components/users/UsersTable";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ search, page, status }, user] = await Promise.all([
    searchParams,
    getUser(),
  ]);
  const usersPermissions = user?.permissions?.Users.filter(
    (el) => el !== "users-show"
  );
  if ((usersPermissions?.length ?? 0) === 0) return redirect("/");
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
          {user?.permissions?.Roles.includes("roles-list") && <TableSearch />}
        </div>
        <Suspense
          key={`${urlSearchParams.get("page")}-${urlSearchParams.get(
            "search"
          )}-${urlSearchParams.get("status")}`}
          fallback={<LoadingTable columns={columns} />}
        >
          <UsersTable searchParams={urlSearchParams} />
        </Suspense>
        {user?.permissions?.Users.includes("users-delete") && (
          <UserActionDialog type="delete" />
        )}
      </div>
      {user?.permissions?.Users.includes("users-activate") && (
        <UserActionDialog type="activate" />
      )}
      {user?.permissions?.Users.includes("users-deactivate") && (
        <UserActionDialog type="deactivate" />
      )}
    </div>
  );
}

export default UsersPage;
