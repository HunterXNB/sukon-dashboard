import { getUser } from "@/actions/auth";
import { LoadingTable } from "@/components/DataTable";
import columns from "@/components/registrations/columns";
import RegistrationActionDialog from "@/components/registrations/RegistrationActionDialog";
import RegistrationsTable from "@/components/registrations/RegistrationsTable";
import TableSearch from "@/components/TableSearch";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function RegisterationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ search, page }, user] = await Promise.all([searchParams, getUser()]);
  const registerationsPermissions = user?.permissions?.Registrations.filter(
    (el) => el !== "registrations-show"
  );
  if ((registerationsPermissions?.length ?? 0) === 0) return redirect("/");
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
          {user?.permissions?.Registrations.includes("registrations-list") && (
            <TableSearch />
          )}
        </div>
        <Suspense
          key={`${urlSearchParams.get("page")}-${urlSearchParams.get(
            "search"
          )}`}
          fallback={<LoadingTable columns={columns} />}
        >
          <RegistrationsTable searchParams={urlSearchParams} />
        </Suspense>
      </div>
      {user?.permissions?.Registrations.includes("registrations-delete") && (
        <RegistrationActionDialog type="delete" />
      )}
      {user?.permissions?.Registrations.includes("registrations-approve") && (
        <RegistrationActionDialog type="approve" />
      )}
      {user?.permissions?.Registrations.includes("registrations-reject") && (
        <RegistrationActionDialog type="reject" />
      )}
    </div>
  );
}

export default RegisterationsPage;
