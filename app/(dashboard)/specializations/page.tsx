import { getUser } from "@/actions/auth";
import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/specializations/columns";
import EditSpecialization from "@/components/specializations/EditSpecialization";
import SpecializationActionDialog from "@/components/specializations/SpecializationActionDialog";
import SpecializationDialog from "@/components/specializations/SpecializationDialog";
import SpecializationsTable from "@/components/specializations/SpecializationsTable";
import TableSearch from "@/components/TableSearch";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function SpecializationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ search, page }, user] = await Promise.all([searchParams, getUser()]);
  const specializationsPermissions = user?.permissions?.Specializations;
  if ((specializationsPermissions?.length ?? 0) === 0) return redirect("/");
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
          {user?.permissions?.Specializations.includes(
            "specializations-list"
          ) && <TableSearch />}
          {user?.permissions?.Specializations.includes(
            "specializations-create"
          ) && <SpecializationDialog />}
        </div>
        <Suspense
          key={`${urlSearchParams.get("page")}-${urlSearchParams.get(
            "search"
          )}-${urlSearchParams.get("status")}`}
          fallback={<LoadingTable columns={columns} />}
        >
          <SpecializationsTable searchParams={urlSearchParams} />
        </Suspense>
        {user?.permissions?.Specializations.includes(
          "specializations-delete"
        ) && <SpecializationActionDialog type="delete" />}
      </div>
      {user?.permissions?.Specializations.includes("specializations-edit") && (
        <EditSpecialization />
      )}
    </div>
  );
}

export default SpecializationsPage;
