import React, { useCallback } from "react";
import { DialogClose, DialogFooter, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import ActionButton from "./ActionButton";
import { useGetUser } from "@/hooks/useGetUser";
import UserDialogTitle from "./UserDialogTitle";
import ActivateUserForm from "./ActivateForm";
import DeactivateUserForm from "./DeactivateForm";

function UserActionDialogContent({
  type,
}: {
  type: "activate" | "deactivate" | "delete";
}) {
  const locale = useLocale();
  const [id, setId] = useQueryState(
    type === "activate"
      ? "activateId"
      : type === "deactivate"
      ? "deactivateId"
      : "deleteId",
    parseAsInteger
  );
  const { isFetching, data, isError, error } = useGetUser(id!);
  const closeDialog = useCallback(() => setId(null), [setId]);
  if (isFetching)
    return (
      <>
        <DialogTitle className="hidden">Loading</DialogTitle>
        <div className="min-h-64 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </>
    );
  if (isError)
    return (
      <>
        <DialogTitle className="hidden">Error</DialogTitle>
        <div className="min-h-64 items-center justify-center flex">
          {error.message}
        </div>
      </>
    );
  return (
    <>
      <UserDialogTitle user={data!} type={type} />
      {type === "activate" && (
        <ActivateUserForm closeForm={closeDialog} id={id!} />
      )}
      {type === "deactivate" && (
        <DeactivateUserForm closeForm={closeDialog} id={id!} />
      )}
      {type === "delete" && (
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant={"secondary"}>
                {locale === "ar" ? "إغلاق" : "Close"}
              </Button>
            </DialogClose>
            <ActionButton
              user={data}
              type={type}
              id={id!}
              closeDialog={closeDialog}
            />
          </div>
        </DialogFooter>
      )}
    </>
  );
}

export default UserActionDialogContent;
