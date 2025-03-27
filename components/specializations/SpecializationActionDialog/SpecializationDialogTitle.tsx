import React from "react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

import { useLocale, useTranslations } from "next-intl";
import { SpecializationFullData } from "@/types/Specialization";

function SpecializationDialogTitle({
  specialization,
}: {
  type: "delete";
  specialization: SpecializationFullData;
}) {
  return <DeleteSpecializationTitle specialization={specialization} />;
}

function DeleteSpecializationTitle({
  specialization,
}: {
  specialization: SpecializationFullData;
}) {
  const locale = useLocale();
  const t = useTranslations("specializationsTable.deleteSpecializationDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t("msg", {
          name:
            locale === "ar" ? specialization.name.ar : specialization.name.en,
        })}
      </DialogTitle>
    </DialogHeader>
  );
}

export default SpecializationDialogTitle;
