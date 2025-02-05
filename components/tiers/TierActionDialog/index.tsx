"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import TierActionDialogContent from "./TierActionDialogContent";
function TierActionDialog({ type }: { type: "delete" }) {
  const [id, setId] = useQueryState("deleteId", parseAsInteger);

  function toggleDialog(s: boolean) {
    if (!s) {
      setId(null);
    }
  }
  return id ? (
    <Dialog open={!!id} onOpenChange={toggleDialog}>
      <DialogContent>
        <TierActionDialogContent type={type} />
      </DialogContent>
    </Dialog>
  ) : null;
}

export default TierActionDialog;
