"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";
import { useGetSpecialization } from "@/hooks/useGetSpecialization";
import SpecializationForm from "./SpecializationForm";

function EditSpecialization() {
  const [specializationId, setSpecializationId] = useQueryState(
    "specializationEditId",
    parseAsInteger
  );
  function closeDialog() {
    setSpecializationId(null);
  }
  const t = useTranslations("specializationsTable.form");

  return specializationId ? (
    <Dialog
      open={!!specializationId}
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
        <EditRoleForm
          closeForm={closeDialog}
          specializationId={specializationId!}
        />
      </DialogContent>
    </Dialog>
  ) : null;
}
function EditRoleForm({
  specializationId,
  closeForm,
}: {
  specializationId: number;
  closeForm: () => void;
}) {
  const { isFetching, data, isError, error } =
    useGetSpecialization(specializationId);
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
  return <SpecializationForm specialization={data} closeForm={closeForm} />;
}

export default EditSpecialization;
