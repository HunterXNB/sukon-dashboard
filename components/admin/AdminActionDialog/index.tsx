"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import AdminActionDialogContent from "./AdminActionDialogContent";
function AdminActionDialog({ type }: { type: "activeToggle" | "delete" }) {
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
      <Dialog open={true} defaultOpen onOpenChange={toggleDialog}>
        <DialogContent>
          <AdminActionDialogContent type={type} />
        </DialogContent>
      </Dialog>
    )
  );
}

export default AdminActionDialog;
