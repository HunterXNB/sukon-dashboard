"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import RegistrationActionDialogContent from "./RegistrationActionDialogContent";
function RegistrationActionDialog({
  type,
}: {
  type: "approve" | "reject" | "delete";
}) {
  const [id, setId] = useQueryState(
    type === "approve"
      ? "doctorApproveId"
      : type === "reject"
      ? "doctorRejectId"
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
        <RegistrationActionDialogContent type={type} />
      </DialogContent>
    </Dialog>
  ) : null;
}

export default RegistrationActionDialog;
