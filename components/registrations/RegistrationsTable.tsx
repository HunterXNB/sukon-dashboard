import React from "react";
import DataTable from "../DataTable";
import { ResponseMeta } from "@/types/response-meta";
import { fetchData } from "@/lib/utils";
import columns from "./columns";
import TablePagination from "../TablePagination";
import { getUser } from "@/actions/auth";
import { getTranslations } from "next-intl/server";
import { Registration } from "@/types/Registration";

async function RegistrationsTable({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const user = await getUser();
  searchParams.set("registration_status", "pending");
  const req =
    user?.permissions?.Registrations.includes("registrations-list") &&
    (await fetchData(`/providers/registerations/index?${searchParams}`));
  const data = req && (await req.json()).data;
  const registerations = data ? (data.data as Registration[]) : [];
  const registerationsMeta: ResponseMeta = data.meta;
  const t = await getTranslations("registrationsTable.table");
  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        {req ? (
          <DataTable columns={columns} data={registerations} />
        ) : (
          <p className="flex items-center justify-center h-[70dvh]">
            {t("noPermission")}
          </p>
        )}
      </div>
      {req && <TablePagination meta={registerationsMeta} />}
    </>
  );
}

export default RegistrationsTable;
