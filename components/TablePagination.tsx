"use client";
import { cn } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { buttonVariants } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

function TablePagination({
  meta,
  isLoading,
}:
  | { meta: ResponseMeta; isLoading?: false }
  | { meta?: ResponseMeta; isLoading: true }) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("rolesTable.pagination");
  if (isLoading)
    return (
      <div
        className={cn("flex items-center gap-2 w-fit my-2 mr-0 ml-auto", {
          "mr-auto ml-0": locale === "ar",
        })}
      >
        <Skeleton className="w-20" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="size-10" />
          ))}
        </div>
      </div>
    );
  function setPage(page: number) {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("page", `${page}`);
    return urlSearchParams.toString();
  }
  const { current_page, last_page } = meta;
  return (
    <div
      className={cn("flex items-center gap-2 w-fit my-2 mr-0 ml-auto", {
        "mr-auto ml-0": locale === "ar",
      })}
    >
      <span>{t("pageInfo", { num: current_page, total: last_page })}</span>
      <div className="flex gap-2">
        <Link
          title={t("first")}
          aria-disabled={current_page === 1}
          tabIndex={current_page === 1 ? -1 : 0}
          className={cn(buttonVariants({ variant: "outline" }), {
            "pointer-events-none bg-accent text-secondary-300 dark:text-white/40 opacity-50":
              current_page === 1,
          })}
          prefetch
          href={`${pathname}?${setPage(1)}`}
        >
          {locale === "en" ? <ChevronsLeft /> : <ChevronsRight />}
        </Link>

        <Link
          title={t("prev")}
          tabIndex={current_page === 1 ? -1 : 0}
          aria-disabled={current_page === 1}
          className={cn(buttonVariants({ variant: "outline" }), {
            "pointer-events-none bg-accent text-secondary-300 dark:text-white/40 opacity-50":
              current_page === 1,
          })}
          prefetch
          href={`${pathname}?${setPage(current_page - 1)}`}
        >
          {locale === "en" ? <ChevronLeft /> : <ChevronRight />}
        </Link>
        <Link
          tabIndex={current_page === last_page ? -1 : 0}
          title={t("next")}
          aria-disabled={current_page === last_page}
          className={cn(buttonVariants({ variant: "outline" }), {
            "pointer-events-none bg-accent text-secondary-300 dark:text-white/40 opacity-50":
              current_page === last_page,
          })}
          prefetch
          href={`${pathname}?${setPage(current_page + 1)}`}
        >
          {locale === "en" ? <ChevronRight /> : <ChevronLeft />}
        </Link>
        <Link
          tabIndex={current_page === last_page ? -1 : 0}
          title={t("last")}
          prefetch
          aria-disabled={current_page === 1}
          className={cn(buttonVariants({ variant: "outline" }), {
            "pointer-events-none bg-accent text-secondary-300 dark:text-white/40 opacity-50":
              current_page === last_page,
          })}
          href={`${pathname}?${setPage(last_page)}`}
        >
          {" "}
          {locale === "en" ? <ChevronsRight /> : <ChevronsLeft />}
        </Link>
      </div>
    </div>
  );
}

export default TablePagination;
