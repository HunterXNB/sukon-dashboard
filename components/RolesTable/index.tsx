"use client";
import tableColumns from "./columns";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Role } from "@/types/role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import TablePagination from "../TablePagination";
import TableSearch from "../TableSearch";
import RoleDialog from "../RoleDialog";

interface DataTableProps<TValue> {
  data: Role[];
  columns?: ColumnDef<Role, TValue>[];
  meta: ResponseMeta;
}

export default function DataTable<TValue>({
  columns = tableColumns,
  data,
  meta,
}: DataTableProps<TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const locale = useLocale();
  return (
    <div className=" w-full max-w-[900px]">
      <div className="flex justify-between mb-2">
        <TableSearch />
        <RoleDialog />
      </div>
      <div className="border rounded-md w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn("", {
                        "text-right": locale === "ar",
                      })}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination meta={meta} />
    </div>
  );
}
