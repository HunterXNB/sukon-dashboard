import React from "react";
import DataTable from "../DataTable";
import { ResponseMeta } from "@/types/response-meta";
import { fetchData } from "@/lib/utils";
import columns from "./columns";
import TablePagination from "../TablePagination";
import { getUser } from "@/actions/auth";
import { getTranslations } from "next-intl/server";
import { AppUser } from "@/types/user";

async function UsersTable({ searchParams }: { searchParams: URLSearchParams }) {
  const user = await getUser();
  const req =
    user?.permissions?.Roles.includes("roles-list") &&
    (await fetchData(`/users/index?${searchParams}`));
  const data = req && (await req.json()).data;
  const users = data ? (data.data as AppUser[]) : [];
  const usersMeta: ResponseMeta = data.meta;
  const t = await getTranslations("usersTable.table");
  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        {req ? (
          <DataTable columns={columns} data={users} />
        ) : (
          <p className="flex items-center justify-center h-[70dvh]">
            {t("noPermission")}
          </p>
        )}
      </div>
      {req && <TablePagination meta={usersMeta} />}
    </>
  );
}

export default UsersTable;
