"use client";
import { cn } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

function TablePagination({
  meta,
  isLoading,
}:
  | { meta: ResponseMeta; isLoading?: false }
  | { meta?: ResponseMeta; isLoading: true }) {
  const locale = useLocale();
  const router = useRouter();
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
    router.replace(`./${pathname}?${urlSearchParams}`);
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
        <Button
          disabled={current_page === 1}
          title={t("first")}
          variant={"outline"}
          onClick={() => setPage(1)}
        >
          {locale === "en" ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
        <Button
          disabled={current_page === 1}
          title={t("prev")}
          variant={"outline"}
          onClick={() => setPage(current_page - 1)}
        >
          {locale === "en" ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        <Button
          disabled={current_page === last_page}
          title={t("next")}
          variant={"outline"}
          onClick={() => setPage(current_page + 1)}
        >
          {locale === "en" ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        <Button
          disabled={current_page === last_page}
          title={t("last")}
          variant={"outline"}
          onClick={() => setPage(last_page)}
        >
          {locale === "en" ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      </div>
    </div>
  );
}

export default TablePagination;
