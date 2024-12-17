import React from "react";
import RoleForm from "./RoleForm";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getRole } from "@/actions/roles";

function EditRole({
  roleId,
  closeForm,
}: {
  roleId: number;
  closeForm: () => void;
}) {
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["role", roleId],
    queryFn: async () => await getRole(roleId),
  });
  if (isFetching)
    return (
      <div className="min-h-64 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (isError)
    return (
      <div className="min-h-64 items-center justify-center flex">
        {error.message}
      </div>
    );
  return <RoleForm role={data} closeForm={closeForm} />;
}

export default EditRole;
