"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";
import { useGetTier } from "@/hooks/useGetTier";
import TierForm from "./TierForm";

function EditTier() {
  const [tierId, setTierId] = useQueryState("tierEditId", parseAsInteger);
  function closeDialog() {
    setTierId(null);
  }
  const t = useTranslations("tiersTable.form");

  return tierId ? (
    <Dialog
      open={!!tierId}
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
        <EditTierForm closeForm={closeDialog} tierId={tierId!} />
      </DialogContent>
    </Dialog>
  ) : null;
}
function EditTierForm({
  tierId,
  closeForm,
}: {
  tierId: number;
  closeForm: () => void;
}) {
  const { isFetching, data, isError, error } = useGetTier(tierId);
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
  return <TierForm tier={data} closeForm={closeForm} />;
}

export default EditTier;
