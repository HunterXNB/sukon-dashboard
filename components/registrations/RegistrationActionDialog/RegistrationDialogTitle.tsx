import React from "react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";
import { useTranslations } from "next-intl";
import { RegistrationFullData } from "@/types/Registration";

function RegistrationDialogTitle({
  type,
  registeration,
}: {
  type: "approve" | "reject" | "delete";
  registeration: RegistrationFullData;
}) {
  if (type === "approve") return <ApproveTitle registeration={registeration} />;
  if (type === "reject") return <RejectTitle registeration={registeration} />;
  return <DeleteRoleTitle registeration={registeration} />;
}
function ApproveTitle({
  registeration,
}: {
  registeration: RegistrationFullData;
}) {
  const t = useTranslations("registrationsTable.approveDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t("approveTitle", {
          name: [registeration.first_name, registeration.last_name]
            .filter((n) => n != null)
            .join(" "),
        })}
      </DialogTitle>
    </DialogHeader>
  );
}
function RejectTitle({
  registeration,
}: {
  registeration: RegistrationFullData;
}) {
  const t = useTranslations("registrationsTable.rejectDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t("rejectTitle", {
          name: [registeration.first_name, registeration.last_name]
            .filter((n) => n != null)
            .join(" "),
        })}
      </DialogTitle>
    </DialogHeader>
  );
}
function DeleteRoleTitle({
  registeration,
}: {
  registeration: RegistrationFullData;
}) {
  const t = useTranslations("registrationsTable.deleteDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t("deleteTitle", {
          name: [registeration.first_name, registeration.last_name]
            .filter((n) => n != null)
            .join(" "),
        })}
      </DialogTitle>
    </DialogHeader>
  );
}

export default RegistrationDialogTitle;
