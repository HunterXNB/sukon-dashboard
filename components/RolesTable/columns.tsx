"use client";

import { Role } from "@/types/role";
import { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "id",
    header: HeaderCell,
  },
  {
    accessorKey: "name",
    header: HeaderCell,
  },
  {
    accessorKey: "is_active",
    header: HeaderCell,
    cell: StatusCell,
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
function ActionCell({ row }: CellContext<Role, unknown>) {
  const role = row.original;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("rolesTable.actions");
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              const urlSearchParams = new URLSearchParams(searchParams);
              urlSearchParams.set("roleEditId", role.id.toString());
              router.push(`${pathname}?${urlSearchParams}`);
            }}
          >
            {t("edit")}
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
function StatusCell({ row }: CellContext<Role, unknown>) {
  const isActive = row.getValue("is_active");
  const t = useTranslations("rolesTable.body.status");
  return (
    <Badge variant={isActive ? "default" : "destructive"}>
      {isActive ? t("active") : t("notActive")}
    </Badge>
  );
}
function HeaderCell({ header }: HeaderContext<Role, unknown>) {
  const t = useTranslations("rolesTable.header");
  return <>{t(header.id)}</>;
}
export default columns;
