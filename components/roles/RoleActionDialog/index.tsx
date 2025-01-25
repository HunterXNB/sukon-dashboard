"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import RoleActionDialogContent from "./RoleActionDialogContent";
function RoleActionDialog({ type }: { type: "activeToggle" | "delete" }) {
  const [id, setId] = useQueryState(
    type === "activeToggle" ? "activeToggleId" : "deleteId",
    parseAsInteger
  );

  function toggleDialog(s: boolean) {
    if (!s) {
      setId(null);
    }
  }
  return (
    id && (
      <Dialog open={id !== null} defaultOpen onOpenChange={toggleDialog}>
        <DialogContent>
          <RoleActionDialogContent type={type} />
        </DialogContent>
      </Dialog>
    )
  );
}

export default RoleActionDialog;
