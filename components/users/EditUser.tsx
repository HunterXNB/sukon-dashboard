"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";
import UserForm from "./UserForm";
import { useGetUser } from "@/hooks/useGetUser";

function EditUser() {
  const [userId, setUserId] = useQueryState("userEditId", parseAsInteger);
  function closeDialog() {
    setUserId(null);
  }
  const t = useTranslations("usersTable.form");

  return userId ? (
    <Dialog
      open={!!userId}
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
        <EditUserForm closeForm={closeDialog} userId={userId!} />
      </DialogContent>
    </Dialog>
  ) : null;
}
function EditUserForm({
  userId,
  closeForm,
}: {
  userId: number;
  closeForm: () => void;
}) {
  const { isFetching, data, isError, error } = useGetUser(userId);
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
  return <UserForm user={data!} closeForm={closeForm} />;
}

export default EditUser;
