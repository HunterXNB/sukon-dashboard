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
import { Tier } from "@/types/Tiers";

const columns: ColumnDef<Tier>[] = [
  {
    accessorKey: "id",
    header: HeaderCell,
  },
  {
    accessorKey: "name",
    header: HeaderCell,
  },
  {
    accessorKey: "usd_price",
    header: HeaderCell,
  },
  {
    accessorKey: "egp_price",
    header: HeaderCell,
  },
  {
    accessorKey: "commission",
    header: HeaderCell,
  },

  {
    id: "actions",
    cell: ActionCell,
  },
];
function ActionCell({ row }: CellContext<Tier, unknown>) {
  const tier = row.original;
  const [, setTierEditId] = useQueryState("tierEditId", parseAsInteger);
  const [, setDeleteId] = useQueryState("deleteId", parseAsInteger);
  const user = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const t = useTranslations("tiersTable.actions");
  if (!user.permissions) return null;
  return user.permissions.Tiers.filter(
    (el) => el === "tiers-edit" || el === "tiers-delete" || el === "tiers-show"
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
          {user.permissions.Tiers.includes("tiers-show") && (
            <DropdownMenuItem asChild>
              <Link href={`/tiers/${tier.id}`}>{t("show")}</Link>
            </DropdownMenuItem>
          )}
          {user.permissions.Tiers.includes("tiers-edit") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setTierEditId(tier.id);
              }}
            >
              {t("edit")}
            </DropdownMenuItem>
          )}

          {user.permissions.Tiers.includes("tiers-delete") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeleteId(tier.id);
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

function HeaderCell({ header }: HeaderContext<Tier, unknown>) {
  const t = useTranslations("tiersTable.header");
  return <>{t(header.id)}</>;
}

export default columns;
