"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import RoleActionDialogContent from "./UserActionDialogContent";
function UserActionDialog({
  type,
}: {
  type: "activate" | "delete" | "deactivate";
}) {
  const [id, setId] = useQueryState(
    type === "activate"
      ? "activateId"
      : type === "deactivate"
      ? "deactivateId"
      : "deleteId",
    parseAsInteger
  );

  function toggleDialog(s: boolean) {
    if (!s) {
      setId(null);
    }
  }
  return id ? (
    <Dialog open={!!id} onOpenChange={toggleDialog}>
      <DialogContent>
        <RoleActionDialogContent type={type} />
      </DialogContent>
    </Dialog>
  ) : null;
}

export default UserActionDialog;
