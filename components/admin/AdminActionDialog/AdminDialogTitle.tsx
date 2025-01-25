import React from "react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

import { useTranslations } from "next-intl";
import { Admin } from "@/types/Admin";

function AdminDialogTitle({
  type,
  admin,
}: {
  type: "activeToggle" | "delete";
  admin: Admin;
}) {
  if (type === "activeToggle") return <ActiveToggleTitle admin={admin} />;
  return <DeleteAdminTitle admin={admin} />;
}
function ActiveToggleTitle({ admin }: { admin: Admin }) {
  const t = useTranslations("adminsTable.toggleStatusDialog");
  if (admin.user.is_active)
    return (
      <DialogHeader>
        <DialogTitle>
          {t("active.title", { name: admin.user?.name })}
        </DialogTitle>
      </DialogHeader>
    );
  return (
    <DialogHeader>
      <DialogTitle>
        {t("notActive.title", { name: admin.user?.name })}
      </DialogTitle>
    </DialogHeader>
  );
}
function DeleteAdminTitle({ admin }: { admin: Admin }) {
  const t = useTranslations("adminsTable.deleteAdminDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t("title", {
          name: admin.user?.name,
        })}
      </DialogTitle>
    </DialogHeader>
  );
}

export default AdminDialogTitle;
