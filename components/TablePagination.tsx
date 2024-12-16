"use client";
import { cn } from "@/lib/utils";
import { ResponseMeta } from "@/types/ResponseMeta";
import { useLocale } from "next-intl";
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
  return (
    <div
      className={cn("flex items-center gap-2 w-fit my-2 mx-2 ml-auto mr-2", {
        "ml-2 mr-auto": locale === "ar",
      })}
    >
      <span>
        Page {current_page} of {last_page}
      </span>
      <div className="space-x-2">
        <Button
          disabled={current_page === 1}
          title="first"
          variant={"outline"}
          onClick={() => setPage(1)}
        >
          {locale === "en" ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
        <Button
          disabled={current_page === 1}
          title="previous"
          variant={"outline"}
          onClick={() => setPage(current_page - 1)}
        >
          {locale === "en" ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        <Button
          disabled={current_page === last_page}
          title="next"
          variant={"outline"}
          onClick={() => setPage(current_page + 1)}
        >
          {locale === "en" ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        <Button
          disabled={current_page === last_page}
          title="last"
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
