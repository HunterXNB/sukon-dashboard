import React, { useActionState, useEffect } from "react";
import { Button } from "../../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { RegistrationFullData } from "@/types/Registration";
import {
  approveRegisteration,
  deleteRegisteration,
  rejectRegisteration,
} from "@/actions/registeration";

function ActionButton({
  id,
  closeDialog,
  type,
}: {
  id: number;
  closeDialog: () => void;
  type: "approve" | "reject" | "delete";
  registeration?: RegistrationFullData;
}) {
  const [state, action, isPending] = useActionState(
    type === "approve"
      ? approveRegisteration
      : type === "reject"
      ? rejectRegisteration
      : deleteRegisteration,
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
      <Button disabled={isPending} variant={"destructive"}>
        {isPending ? t("submitLoadingBtn") : t("submitBtn")}
      </Button>
    </form>
  );
}

export default ActionButton;
