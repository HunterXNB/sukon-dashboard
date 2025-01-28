"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";
import { useGetAdmin } from "@/hooks/useGetAdmin";
import EditAdminForm from "./EditAdminForm";

function EditAdmin() {
  const [adminId, setAdminId] = useQueryState("adminEditId", parseAsInteger);
  function closeDialog() {
    setAdminId(null);
  }
  const t = useTranslations("rolesTable.form");

  return adminId ? (
    <Dialog
      open={!!adminId}
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
        <EditAdminFormContainer closeForm={closeDialog} adminId={adminId!} />
      </DialogContent>
    </Dialog>
  ) : null;
}
function EditAdminFormContainer({
  adminId,
  closeForm,
}: {
  adminId: number;
  closeForm: () => void;
}) {
  const { isFetching, data, isError, error } = useGetAdmin(adminId);
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
  return <EditAdminForm adminData={data!} closeForm={closeForm} />;
}

export default EditAdmin;
