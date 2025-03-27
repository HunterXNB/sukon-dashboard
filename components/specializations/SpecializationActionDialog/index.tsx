"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import SpecializationActionDialogContent from "./SpecializationActionDialogContent";
function SpecializationActionDialog({ type = "delete" }: { type: "delete" }) {
  const [id, setId] = useQueryState("deleteId", parseAsInteger);

  function toggleDialog(s: boolean) {
    if (!s) {
      setId(null);
    }
  }
  return id ? (
    <Dialog open={!!id} onOpenChange={toggleDialog}>
      <DialogContent>
        <SpecializationActionDialogContent type={type} />
      </DialogContent>
    </Dialog>
  ) : null;
}

export default SpecializationActionDialog;
