import React from "react";
import DataTable from "../DataTable";
import { ResponseMeta } from "@/types/response-meta";
import { fetchData } from "@/lib/utils";
import columns from "./columns";
import TablePagination from "../TablePagination";
import { getUser } from "@/actions/auth";
import { getTranslations } from "next-intl/server";
import { Specialization } from "@/types/Specialization";

async function SpecializationsTable({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const user = await getUser();
  const req =
    user?.permissions?.Specializations.includes("specializations-list") &&
    (await fetchData(`/specializations/index?${searchParams}`));
  const data = req && (await req.json()).data;
  const specializations = data ? (data.data as Specialization[]) : [];
  const specializationsMeta: ResponseMeta = data.meta;
  const t = await getTranslations("specializationsTable.table");
  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        {req ? (
          <DataTable columns={columns} data={specializations} />
        ) : (
          <p className="flex items-center justify-center h-[70dvh]">
            {t("noPermission")}
          </p>
        )}
      </div>
      {req && <TablePagination meta={specializationsMeta} />}
    </>
  );
}

export default SpecializationsTable;
