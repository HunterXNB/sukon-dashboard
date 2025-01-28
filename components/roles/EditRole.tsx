"use client";
import React from "react";
import RoleForm from "./RoleForm";
import { Loader2 } from "lucide-react";
import { useGetRole } from "@/hooks/useGetRole";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";

function EditRole() {
  const [roleId, setRoleId] = useQueryState("roleEditId", parseAsInteger);
  function closeDialog() {
    setRoleId(null);
  }
  const t = useTranslations("rolesTable.form");

  return roleId ? (
    <Dialog
      open={!!roleId}
      onOpenChange={(s) => {
        if (!s) {
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("editTitle")}</DialogTitle>
        </DialogHeader>
        <EditRoleForm closeForm={closeDialog} roleId={roleId!} />
      </DialogContent>
    </Dialog>
  ) : null;
}
function EditRoleForm({
  roleId,
  closeForm,
}: {
  roleId: number;
  closeForm: () => void;
}) {
  const { isFetching, data, isError, error } = useGetRole(roleId);
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
