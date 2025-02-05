import React from "react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

import { useTranslations } from "next-intl";
import { TierFullData } from "@/types/Tiers";

function TierDialogTitle({ tier }: { type: "delete"; tier: TierFullData }) {
  return <DeleteTierTitle tier={tier} />;
}
function DeleteTierTitle({ tier }: { tier: TierFullData }) {
  const t = useTranslations("tiersTable.deleteTierDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t("title", {
          name: tier?.name,
        })}
      </DialogTitle>
    </DialogHeader>
  );
}

export default TierDialogTitle;
