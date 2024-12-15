"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";
const pathnames: {
  [key: string]: string;
} = {
  "/": "home",
  "/roles": "roles",
  "/admin": "admin",
};
function PageTitle() {
  const pathname = usePathname();
  const t = useTranslations("sidebar.navigations");

  return (
    <h1 className="font-bold text-lg md:text-2xl">{t(pathnames[pathname])}</h1>
  );
}

export default PageTitle;
