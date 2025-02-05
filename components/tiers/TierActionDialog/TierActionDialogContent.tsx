import React, { useCallback } from "react";
import { DialogClose, DialogFooter, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useGetTier } from "@/hooks/useGetTier";
import TierDialogTitle from "./TierDialogTitle";
import ActionButton from "./ActionButton";

function TierActionDialogContent({ type }: { type: "delete" }) {
  const locale = useLocale();
  const [id, setId] = useQueryState("deleteId", parseAsInteger);
  const { isFetching, data, isError, error } = useGetTier(id!);
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
      <TierDialogTitle tier={data!} type={type} />
      <DialogFooter>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              {locale === "ar" ? "إغلاق" : "Close"}
            </Button>
          </DialogClose>
          <ActionButton
            tier={data}
            type={type}
            id={id!}
            closeDialog={closeDialog}
          />
        </div>
      </DialogFooter>
    </>
  );
}

export default TierActionDialogContent;
