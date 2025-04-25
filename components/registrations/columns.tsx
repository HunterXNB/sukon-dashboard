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
import Link from "next/link";
import { useState } from "react";
import { Registration } from "@/types/Registration";

const columns: ColumnDef<Registration>[] = [
  {
    accessorKey: "id",
    header: HeaderCell,
  },
  {
    accessorKey: "name",
    header: HeaderCell,
    cell: NameCell,
  },
  {
    accessorKey: "email",
    header: HeaderCell,
    cell: Cell,
  },
  {
    accessorKey: "mobile",
    header: HeaderCell,
    cell: Cell,
  },
  {
    accessorKey: "role",
    header: HeaderCell,
    cell: Cell,
  },
  {
    accessorKey: "title",
    header: HeaderCell,
    cell: Cell,
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
function ActionCell({ row }: CellContext<Registration, unknown>) {
  const registration = row.original;
  const [, setDoctorApproveId] = useQueryState(
    "doctorApproveId",
    parseAsInteger
  );
  const [, setDoctorRejectId] = useQueryState("doctorRejectId", parseAsInteger);
  const [, setDeleteId] = useQueryState("deleteId", parseAsInteger);
  const user = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const t = useTranslations("registrationsTable.actions");
  if (!user.permissions) return null;
  return user?.permissions.Registrations.filter(
    (el) =>
      el === "registrations-approve" ||
      el === "registrations-reject" ||
      el === "registrations-show" ||
      el === "registrations-delete"
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
          {user?.permissions?.Registrations.includes("registrations-show") && (
            <DropdownMenuItem asChild>
              <Link href={`/registerations/${registration.id}`}>
                {t("show")}
              </Link>
            </DropdownMenuItem>
          )}
          {user.permissions?.Registrations.includes(
            "registrations-approve"
          ) && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDoctorApproveId(registration.id);
              }}
            >
              {t("approve")}
            </DropdownMenuItem>
          )}
          {user.permissions?.Registrations.includes("registrations-reject") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDoctorRejectId(registration.id);
              }}
            >
              {t("reject")}
            </DropdownMenuItem>
          )}
          {user.permissions?.Registrations.includes("registrations-delete") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeleteId(registration.id);
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
function Cell({ cell }: CellContext<Registration, unknown>) {
  const value = cell.getValue();
  if (typeof value === "string")
    return (
      <p
        className="max-w-52 flex mx-auto items-center justify-center truncate"
        dir="ltr"
        title={value}
      >
        {value}
      </p>
    );
}

function NameCell({ row }: CellContext<Registration, unknown>) {
  const first_name = row.original.first_name;
  const last_name = row.original.last_name;

  return (
    [first_name, last_name].filter((name) => name !== null).join(" ") || "_"
  );
}
function HeaderCell({ header }: HeaderContext<Registration, unknown>) {
  const t = useTranslations("registrationsTable.header");
  return <p className="text-center">{t(header.id)}</p>;
}

export default columns;
