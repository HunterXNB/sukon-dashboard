import React from "react";
import DataTable from "../DataTable";
import { Role } from "@/types/role";
import { ResponseMeta } from "@/types/response-meta";
import { fetchData } from "@/lib/utils";
import columns from "./columns";
import TableSearch from "../TableSearch";
import RoleDialog from "./RoleDialog";
import TablePagination from "../TablePagination";
import { getUser } from "@/actions/auth";
import { getTranslations } from "next-intl/server";

async function RolesTable({ searchParams }: { searchParams: URLSearchParams }) {
  const user = await getUser();
  const req =
    user?.permissions.includes("roles-list") &&
    (await fetchData(`/roles/index?${searchParams}`));
  const data = req && (await req.json()).data;
  const roles = data ? (data.data as Role[]) : [];
  const rolesMeta: ResponseMeta = data.meta;
  const t = await getTranslations("rolesTable.table");
  return (
    <div className=" w-full max-w-[900px]">
      <div className="flex justify-between mb-2">
        {req && <TableSearch />}
        {user?.permissions.includes("roles-create") && <RoleDialog />}
      </div>
      <div className="border rounded-md w-full overflow-x-auto">
        {req ? (
          <DataTable columns={columns} data={roles} />
        ) : (
          <p className="flex items-center justify-center h-[70dvh]">
            {t("noPermission")}
          </p>
        )}
      </div>
      {req && <TablePagination meta={rolesMeta} />}
    </div>
  );
}

export default RolesTable;
