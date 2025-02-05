import { getUser } from "@/actions/auth";
import columns from "@/components/admin/columns";
import { LoadingTable } from "@/components/DataTable";
import TableSearch from "@/components/TableSearch";
import EditTier from "@/components/tiers/EditTier";
import TierActionDialog from "@/components/tiers/TierActionDialog";
import TierDialog from "@/components/tiers/TierDialog";
import TiersTable from "@/components/tiers/TiersTable";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function TiersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ search, page }, user] = await Promise.all([searchParams, getUser()]);
  const tiersPermissions = user?.permissions?.Tiers.filter(
    (el) => el !== "tiers-show"
  );
  if ((tiersPermissions?.length ?? 0) === 0) return redirect("/");
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

  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <div className=" w-full max-w-[900px]">
        <div className="flex justify-between mb-2">
          {user?.permissions?.Tiers.includes("tiers-list") && <TableSearch />}
          {user?.permissions?.Tiers.includes("tiers-create") && <TierDialog />}
        </div>
        <Suspense
          key={`${page}-${search}`}
          fallback={<LoadingTable columns={columns} />}
        >
          <TiersTable searchParams={urlSearchParams} />
        </Suspense>
      </div>
      {user?.permissions?.Tiers.includes("tiers-delete") && (
        <TierActionDialog type="delete" />
      )}
      {user?.permissions?.Tiers.includes("tiers-edit") && <EditTier />}
    </div>
  );
}

export default TiersPage;
