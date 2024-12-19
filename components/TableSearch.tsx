"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
function TableSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const pathname = usePathname();
  const router = useRouter();
  const search = useDebouncedCallback((value: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("search", value);
    urlSearchParams.delete("page");
    router.replace(`${pathname}?${urlSearchParams}`);
  }, 800);
  const resetSearch = () => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("search");
    urlSearchParams.delete("page");
    router.replace(`${pathname}?${urlSearchParams}`);
  };
  const t = useTranslations("rolesTable.search");
  const locale = useLocale();
  useEffect(() => {
    if (inputRef.current && !searchTerm) inputRef.current.value = "";
  }, [searchTerm]);
  return (
    <div className="w-fit flex flex-col relative max-w-52">
      <Input
        placeholder={t("placeholder")}
        ref={inputRef}
        defaultValue={searchTerm || undefined}
        onChange={(e) => search(e.target.value)}
      />
      {searchTerm && (
        <button
          tabIndex={-1}
          onClick={resetSearch}
          type="button"
          className={cn(
            `absolute top-1/2 -translate-y-1/2 self-end ${
              locale === "ar" ? "translate-x-2" : "-translate-x-2"
            } text-gray-400 hover:text-destructive`
          )}
        >
          <X />
        </button>
      )}
    </div>
  );
}

export default TableSearch;
