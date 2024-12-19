import React, { useActionState, useEffect } from "react";
import { Button } from "../../ui/button";
import { deleteRole, toggleRoleActiveStatus } from "@/actions/roles";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { RoleFullData } from "@/types/role";

function ActionButton({
  id,
  closeDialog,
  type,
  role,
}: {
  id: number;
  closeDialog: () => void;
  type: "activeToggle" | "delete";
  role?: RoleFullData;
}) {
  const [state, action, isPending] = useActionState(
    type === "activeToggle" ? toggleRoleActiveStatus : deleteRole,
    undefined
  );
  const { toast } = useToast();
  const t = useTranslations("rolesTable.form");
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
      {type === "activeToggle" ? (
        <Button disabled={isPending} variant={"destructive"}>
          {isPending ? t("submitLoadingBtn") : t("submitBtn")}
        </Button>
      ) : (
        <Button
          disabled={isPending || role?.is_assigned_to_any_user}
          variant={"destructive"}
        >
          {isPending ? t("submitLoadingBtn") : t("submitBtn")}
        </Button>
      )}
    </form>
  );
}

export default ActionButton;
