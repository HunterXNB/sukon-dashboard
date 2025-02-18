import React from "react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

import { useTranslations } from "next-intl";
import { AppUserFull } from "@/types/user";

function UserDialogTitle({
  type,
  user,
}: {
  type: "activate" | "deactivate" | "delete";
  user: AppUserFull;
}) {
  const t = useTranslations("usersTable.actionDialog");

  return (
    <DialogHeader>
      <DialogTitle>
        {t(type, {
          name:
            [user.first_name, user.last_name]
              .filter((el) => el != null)
              .join(" ") || "_",
        })}
      </DialogTitle>
    </DialogHeader>
  );
}
export default UserDialogTitle;
