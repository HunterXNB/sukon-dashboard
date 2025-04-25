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
  "/tiers": "tiers",
  "/users": "users",
  "/settings": "settings",
  "/specializations": "specializations",
  "/registerations": "registerations",
};
function PageTitle() {
  const pathname = usePathname();
  const t = useTranslations("sidebar.navigations");

  return (
    <h1 className="font-bold text-lg md:text-2xl">
      {t(pathnames[pathname.split("/").slice(0, 2).join("/")])}
    </h1>
  );
}

export default PageTitle;
