import { getUser } from "@/actions/auth";
import { fetchData } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import { getTranslations } from "next-intl/server";
import TablePagination from "../TablePagination";
import DataTable from "../DataTable";
import columns from "./columns";
import { Tier } from "@/types/Tiers";

async function TiersTable({ searchParams }: { searchParams: URLSearchParams }) {
  const user = await getUser();
  const req =
    user?.permissions?.Tiers.includes("tiers-list") &&
    (await fetchData(`/tiers/index?${searchParams}`));

  const data = req && (await req.json()).data;
  const tiers = data ? (data.data as Tier[]) : [];
  const tiersMeta: ResponseMeta = data.meta;
  const t = await getTranslations("tiersTable.table");

  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        {req ? (
          <DataTable columns={columns} data={tiers} />
        ) : (
          <p className="flex items-center justify-center h-[70dvh]">
            {t("noPermission")}
          </p>
        )}
      </div>
      {req && <TablePagination meta={tiersMeta} />}
    </>
  );
}

export default TiersTable;
