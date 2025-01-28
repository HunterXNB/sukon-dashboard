import { getUser } from "@/actions/auth";
import { fetchData } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import { getTranslations } from "next-intl/server";
import TablePagination from "../TablePagination";
import { Admin } from "@/types/Admin";
import DataTable from "../DataTable";
import columns from "./columns";

async function AdminsTable({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const user = await getUser();
  const req =
    user?.permissions.AdminUsers.includes("admin-users-list") &&
    (await fetchData(`/admin-users/index?${searchParams}`));
  const data = req && (await req.json()).data;
  const admins = data ? (data.data as Admin[]) : [];
  const adminsMeta: ResponseMeta = data.meta;
  const t = await getTranslations("rolesTable.table");

  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        {req ? (
          <DataTable columns={columns} data={admins} />
        ) : (
          <p className="flex items-center justify-center h-[70dvh]">
            {t("noPermission")}
          </p>
        )}
      </div>
      {req && <TablePagination meta={adminsMeta} />}
    </>
  );
}

export default AdminsTable;
