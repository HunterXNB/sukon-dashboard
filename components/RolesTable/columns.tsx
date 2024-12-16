"use client";

import { Role } from "@/types/role";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active");

      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Active" : "Not Active"}
        </Badge>
      );
    },
  },
];
export default columns;
