import React, { useActionState, useEffect } from "react";
import { Button } from "../../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { AppUserFull } from "@/types/user";
import { deleteUser } from "@/actions/users";

function ActionButton({
  id,
  closeDialog,
  type,
  user,
}: {
  id: number;
  closeDialog: () => void;
  type: "activate" | "deactivate" | "delete";
  user?: AppUserFull;
}) {
  if (type === "delete")
    return <DeleteButton closeDialog={closeDialog} user={user!} id={id} />;
}
function DeleteButton({
  id,
  closeDialog,
}: {
  id: number;
  closeDialog: () => void;
  user?: AppUserFull;
}) {
  const [state, action, isPending] = useActionState(deleteUser, undefined);
  const { toast } = useToast();
  const t = useTranslations("usersTable.form");
  useEffect(() => {
    if (state) {
      if (state.type === "success") {
        toast({ title: state.message });
        closeDialog();
      }
    }
  }, [toast, state, closeDialog]);
  useEffect(() => {
    if (state) {
      if (state.type === "error") {
        toast({ title: state.message });
      }
    }
  }, [toast, state]);

  return (
    <form action={action.bind(undefined, id)}>
      <Button disabled={isPending} variant={"destructive"}>
        {isPending ? t("deleteLoadingBtn") : t("deleteBtn")}
      </Button>
    </form>
  );
}

export default ActionButton;
