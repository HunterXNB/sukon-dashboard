import RolesTable from "@/components/RolesTable";
import { PermissionsContextProvider } from "@/context/PermissionsContext";
import { fetchData } from "@/lib/utils";
import { Permission } from "@/types/Permission";
import { ResponseMeta } from "@/types/ResponseMeta";
import { Role } from "@/types/role";
import React from "react";

async function RolesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search, page } = await searchParams;
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
  const req = await fetchData(`/roles/index?${urlSearchParams}`);
  if (!req.ok) throw new Error("An error occured, Please try again later.");
  const data = (await req.json()).data;
  const roles = data.data as Role[];
  const rolesMeta: ResponseMeta = data.meta;
  const permissionsReq = await fetchData("/permissions/list");
  if (!permissionsReq.ok)
    throw new Error("An error occured, Please try again later.");
  const permissions = (await permissionsReq.json()).data as Permission[];
  return (
    <PermissionsContextProvider permissionsList={permissions}>
      <div className="flex-1 flex items-center justify-center w-full">
        <RolesTable data={roles} meta={rolesMeta} />
      </div>
    </PermissionsContextProvider>
  );
}

export default RolesPage;
