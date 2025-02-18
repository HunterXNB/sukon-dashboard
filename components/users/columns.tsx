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
import { useState } from "react";
import { AppUser } from "@/types/user";
import { format } from "date-fns";

const columns: ColumnDef<AppUser>[] = [
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
  },
  {
    accessorKey: "created_at",
    header: HeaderCell,
    cell: DateCell,
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
function ActionCell({ row }: CellContext<AppUser, unknown>) {
  const rowUser = row.original;
  const [, setDeactivateId] = useQueryState("deactivateId", parseAsInteger);
  const [, setActivateId] = useQueryState("activateId", parseAsInteger);
  const [, setDeleteId] = useQueryState("deleteId", parseAsInteger);
  const user = useUser();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const t = useTranslations("usersTable.actions");
  if (!user.permissions) return null;
  return user?.permissions.Users.filter(
    (el) =>
      el === "users-activate" ||
      el === "users-deactivate" ||
      el === "users-delete" ||
      el === "users-show"
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
          {user?.permissions?.Users.includes("users-show") && (
            <DropdownMenuItem asChild>
              <Link href={`/users/${rowUser.id}`}>{t("show")}</Link>
            </DropdownMenuItem>
          )}
          {user.permissions?.Users.includes("users-activate") &&
          !rowUser.is_active ? (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setActivateId(rowUser.id);
              }}
            >
              {t("activate")}
            </DropdownMenuItem>
          ) : null}
          {user.permissions?.Users.includes("users-deactivate") &&
          rowUser.is_active ? (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeactivateId(rowUser.id);
              }}
            >
              {t("deactivate")}
            </DropdownMenuItem>
          ) : null}
          {user.permissions?.Users.includes("users-delete") && (
            <DropdownMenuItem
              onPointerDown={(e) => e.preventDefault()}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropDownOpen(false);
                setDeleteId(rowUser.id);
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
function StatusCell({ row }: CellContext<AppUser, unknown>) {
  const isActive = row.getValue("is_active");
  const t = useTranslations("rolesTable.body.status");
  return (
    <Badge variant={isActive ? "default" : "destructive"}>
      {isActive ? t("active") : t("notActive")}
    </Badge>
  );
}
function NameCell({ row }: CellContext<AppUser, unknown>) {
  const first_name = row.original.first_name;
  const last_name = row.original.last_name;

  return (
    [first_name, last_name].filter((name) => name !== null).join(" ") || "_"
  );
}
function DateCell({ row }: CellContext<AppUser, unknown>) {
  const created_at = row.original.created_at;

  return format(created_at, "yyyy-MM-dd");
}
function HeaderCell({ header }: HeaderContext<AppUser, unknown>) {
  const t = useTranslations("usersTable.header");
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
