import React from "react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

import { RoleFullData } from "@/types/role";
import { useTranslations } from "next-intl";

function RoleDialogTitle({
  type,
  role,
}: {
  type: "activeToggle" | "delete";
  role: RoleFullData;
}) {
  if (type === "activeToggle") return <ActiveToggleTitle role={role} />;
  return <DeleteRoleTitle role={role} />;
}
function ActiveToggleTitle({ role }: { role: RoleFullData }) {
  const t = useTranslations("rolesTable.toggleStatusDialog");
  if (role?.is_active)
    return (
      <DialogHeader>
        <DialogTitle>
          {role.is_assigned_to_any_user
            ? t("active.assignedToUser", { name: role?.name })
            : t("active.notAssigned", { name: role?.name })}
        </DialogTitle>
      </DialogHeader>
    );
  return (
    <DialogHeader>
      <DialogTitle>{t("notActive.title", { name: role?.name })}</DialogTitle>
    </DialogHeader>
  );
}
function DeleteRoleTitle({ role }: { role: RoleFullData }) {
  const t = useTranslations("rolesTable.deleteRoleDialog");
  return (
    <DialogHeader>
      <DialogTitle>
        {t(role?.is_assigned_to_any_user ? "assigned" : "notAssigned", {
          name: role?.name,
        })}
      </DialogTitle>
    </DialogHeader>
  );
}

export default RoleDialogTitle;
