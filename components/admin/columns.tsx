"use client";

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
import { Admin } from "@/types/Admin";
import { useState } from "react";

const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "user.id",
    header: HeaderCell,
  },
  {
    accessorKey: "user.name",
    header: HeaderCell,
  },
  {
    accessorKey: "user.email",
    header: HeaderCell,
  },
  {
    accessorKey: "user.mobile",
    header: HeaderCell,
  },

  {
    accessorKey: "user.is_active",
    header: StatusHeaderCell,
    cell: StatusCell,
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
function ActionCell({ row }: CellContext<Admin, unknown>) {
  const admin = row.original;
  const [, setAdminEditId] = useQueryState("adminEditId", parseAsInteger);
  const [, setActiveToggleId] = useQueryState("activeToggleId", parseAsInteger);
  const [, setDeleteId] = useQueryState("deleteId", parseAsInteger);
  const user = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const t = useTranslations("adminsTable.actions");
  return user.permissions.AdminUsers.filter(
    (el) =>
      el === "admin-users-edit" ||
      el === "admin-users-delete" ||
      el === "admin-users-activation-toggle" ||
      el === "admin-users-show"
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
          {user.permissions.AdminUsers.includes("admin-users-show") && (
            <DropdownMenuItem asChild>
              <Link href={`/admin/${admin.user.id}`}>{t("show")}</Link>
            </DropdownMenuItem>
          )}
          {user.permissions.AdminUsers.includes("admin-users-edit") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setAdminEditId(admin.user.id);
              }}
            >
              {t("edit")}
            </DropdownMenuItem>
          )}
          {user.permissions.AdminUsers.includes(
            "admin-users-activation-toggle"
          ) && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setActiveToggleId(admin.user.id);
              }}
            >
              {admin.user.is_active ? t("status.inactive") : t("status.active")}
            </DropdownMenuItem>
          )}
          {user.permissions.AdminUsers.includes("admin-users-delete") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeleteId(admin.user.id);
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
function StatusCell({ row }: CellContext<Admin, unknown>) {
  const isActive = row.getValue("user_is_active");
  const t = useTranslations("adminsTable.body.status");
  return (
    <Badge variant={isActive ? "default" : "destructive"}>
      {isActive ? t("active") : t("notActive")}
    </Badge>
  );
}
function HeaderCell({ header }: HeaderContext<Admin, unknown>) {
  const t = useTranslations("adminsTable.header");
  return <>{t(header.id)}</>;
}
function StatusHeaderCell() {
  const t = useTranslations("adminsTable.header.isActive");
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
