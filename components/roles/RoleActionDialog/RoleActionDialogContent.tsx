import React, { useCallback } from "react";
import { DialogClose, DialogFooter, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useGetRole } from "@/hooks/useGetRole";
import { parseAsInteger, useQueryState } from "nuqs";
import { Loader2 } from "lucide-react";
import RoleDialogTitle from "./RoleDialogTitle";
import { useLocale } from "next-intl";
import ActionButton from "./ActionButton";

function RoleActionDialogContent({
  type,
}: {
  type: "activeToggle" | "delete";
}) {
  const locale = useLocale();
  const [id, setId] = useQueryState(
    type === "activeToggle" ? "activeToggleId" : "deleteId",
    parseAsInteger
  );
  const { isFetching, data, isError, error } = useGetRole(id!);
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
      <RoleDialogTitle role={data!} type={type} />
      <DialogFooter>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              {locale === "ar" ? "إغلاق" : "Close"}
            </Button>
          </DialogClose>
          <ActionButton
            role={data}
            type={type}
            id={id!}
            closeDialog={closeDialog}
          />
        </div>
      </DialogFooter>
    </>
  );
}

export default RoleActionDialogContent;
