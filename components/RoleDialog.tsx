"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import RoleForm from "./RoleForm";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditRole from "./EditRole";

function RoleDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("rolesTable.form");
  const searchParams = useSearchParams();
  const roleIdParam = parseInt(searchParams.get("roleEditId") ?? "");
  const router = useRouter();
  const pathname = usePathname();
  function closeDialog() {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("roleEditId");
    router.push(`${pathname}?${urlSearchParams}`);
  }
  return (
    <Dialog
      open={!isNaN(roleIdParam) || open}
      onOpenChange={
        roleIdParam
          ? (s) => {
              if (!s) {
                closeDialog();
              }
            }
          : setOpen
      }
    >
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus />
          {t("createBtn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t(!isNaN(roleIdParam) ? "editTitle" : "createTitle")}
          </DialogTitle>
        </DialogHeader>

        {!roleIdParam ? (
          <RoleForm closeForm={() => setOpen(false)} />
        ) : (
          <EditRole closeForm={closeDialog} roleId={roleIdParam} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RoleDialog;
