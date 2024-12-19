"use client";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "./ui/dialog";
import { useRouter } from "next/navigation";

function OpenedModal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <Dialog
      open={true}
      defaultOpen={true}
      onOpenChange={(s) => {
        if (!s) router.back();
      }}
    >
      <DialogOverlay>
        <DialogContent className="max-h-[70dvh] overflow-y-auto">
          <DialogTitle className="sr-only">Role Title</DialogTitle>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default OpenedModal;
