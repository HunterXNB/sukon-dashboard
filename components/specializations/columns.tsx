"use client";

import { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useUser } from "@/context/AuthContext";
import { useState } from "react";
import { Specialization } from "@/types/Specialization";

const columns: ColumnDef<Specialization>[] = [
  {
    accessorKey: "id",
    header: HeaderCell,
  },
  {
    accessorKey: "name",
    header: HeaderCell,
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
function ActionCell({ row }: CellContext<Specialization, unknown>) {
  const specialization = row.original;
  const [, setSpecializationEditId] = useQueryState(
    "specializationEditId",
    parseAsInteger
  );
  const [, setDeleteId] = useQueryState("deleteId", parseAsInteger);
  const user = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const t = useTranslations("specializationsTable.actions");
  if (!user.permissions) return null;
  return user?.permissions.Specializations.filter(
    (el) => el === "specializations-edit" || el === "specializations-delete"
  ).length > 0 ? (
    <>
      <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>

          {user.permissions?.Specializations.includes(
            "specializations-edit"
          ) && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setSpecializationEditId(specialization.id);
              }}
            >
              {t("edit")}
            </DropdownMenuItem>
          )}
          {user.permissions?.Specializations.includes(
            "specializations-delete"
          ) && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeleteId(specialization.id);
              }}
            >
              {t("delete")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : null;
}

function HeaderCell({ header }: HeaderContext<Specialization, unknown>) {
  const t = useTranslations("specializationsTable.header");
  return <>{t(header.id)}</>;
}
export default columns;
