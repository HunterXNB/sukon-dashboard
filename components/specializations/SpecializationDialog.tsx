"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import SpecializationForm from "./SpecializationForm";

function SpecializationDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("specializationsTable.form");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus />
          {t("createBtn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("createTitle")}</DialogTitle>
        </DialogHeader>
        <SpecializationForm closeForm={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default SpecializationDialog;
