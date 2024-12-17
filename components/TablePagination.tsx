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

function TablePagination({ meta }: { meta: ResponseMeta }) {
  const { current_page, last_page } = meta;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function setPage(page: number) {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("page", `${page}`);
    router.replace(`./${pathname}?${urlSearchParams}`);
  }
  const t = useTranslations("rolesTable.pagination");
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
