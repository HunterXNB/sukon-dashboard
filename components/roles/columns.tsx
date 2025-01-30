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
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useUser } from "@/context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

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
    header: StatusHeaderCell,
    cell: StatusCell,
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
function ActionCell({ row }: CellContext<Role, unknown>) {
  const role = row.original;
  const [, setRoleEditId] = useQueryState("roleEditId", parseAsInteger);
  const [, setActiveToggleId] = useQueryState("activeToggleId", parseAsInteger);
  const [, setDeleteId] = useQueryState("deleteId", parseAsInteger);
  const user = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const t = useTranslations("rolesTable.actions");
  if (!user.permissions) return null;
  return user?.permissions.Roles.filter(
    (el) =>
      el === "roles-edit" ||
      el === "roles-delete" ||
      el === "roles-activation-toggle" ||
      el === "roles-show"
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
          {user?.permissions?.Roles.includes("roles-show") && (
            <DropdownMenuItem asChild>
              <Link href={`/roles/${role.id}`}>{t("show")}</Link>
            </DropdownMenuItem>
          )}
          {user.permissions?.Roles.includes("roles-edit") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setRoleEditId(role.id);
              }}
            >
              {t("edit")}
            </DropdownMenuItem>
          )}
          {user.permissions?.Roles.includes("roles-activation-toggle") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setActiveToggleId(role.id);
              }}
            >
              {role.is_active ? t("status.inactive") : t("status.active")}
            </DropdownMenuItem>
          )}
          {user.permissions?.Roles.includes("roles-delete") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeleteId(role.id);
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
function StatusHeaderCell() {
  const t = useTranslations("rolesTable.header.isActive");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const status = searchParams.get("status");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"extra"}>{t("title")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[
          {
            value: "inactive",
            label: t("notActive"),
          },
          {
            value: "active",
            label: t("active"),
          },
          { value: null, label: t("both") },
        ].map((el) => (
          <DropdownMenuItem
            disabled={el.value === status}
            onClick={() => {
              const urlSearchParams = new URLSearchParams(searchParams);
              urlSearchParams.delete("page");
              if (el.value) {
                urlSearchParams.set("status", el.value);
              } else {
                urlSearchParams.delete("status");
              }
              router.push(`${pathname}?${urlSearchParams}`);
            }}
            key={el.value}
          >
            {el.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default columns;
