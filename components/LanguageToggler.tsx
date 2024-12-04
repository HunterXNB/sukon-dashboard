"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { setLanguage } from "@/actions/intl";
import { useLocale, useTranslations } from "next-intl";

function LanguageToggler() {
  const t = useTranslations("languageToggler");
  const locale = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent" asChild>
        <Button
          variant="outline"
          className="bg-transparent dark:bg-transparent w-fit px-2 py-1 border-none  focus-visible:ring-0 focus-visible:ring-offset-0"
          size="icon"
        >
          <span>{t("lang")}</span>
          <span className="sr-only">{t("changeLang")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled={locale === "ar"}
          onClick={() => setLanguage("ar")}
        >
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={locale === "en"}
          onClick={() => setLanguage("en")}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageToggler;
