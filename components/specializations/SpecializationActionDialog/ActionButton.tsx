import React, { useActionState, useEffect } from "react";
import { Button } from "../../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { deleteSpecialization } from "@/actions/specializations";

function ActionButton({
  id,
  closeDialog,
}: {
  id: number;
  closeDialog: () => void;
  type: "delete";
}) {
  const [state, action, isPending] = useActionState(
    deleteSpecialization,
    undefined
  );
  const { toast } = useToast();
  const t = useTranslations("specializationsTable.form");
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
