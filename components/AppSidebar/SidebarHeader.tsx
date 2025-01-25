"use client";
import React, { useState } from "react";
import { SidebarHeader as ShadSidebarHeader } from "../ui/sidebar";
import UserImg from "@/assets/user.webp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/context/AuthContext";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import LogoutDialog from "../LogoutDialog";

function SidebarHeader() {
  const user = useUser();
  const locale = useLocale();
  const t = useTranslations("sidebar.header");
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  return (
    <ShadSidebarHeader>
      <DropdownMenu dir={locale === "en" ? "ltr" : "rtl"}>
        <DropdownMenuTrigger asChild>
          <div className="w-full flex items-center justify-between max-w-full cursor-pointer select-none  py-1 px-2 rounded transition-colors duration-500 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <div className="flex h-full gap-1">
              <Image
                width={40}
                height={40}
                src={user.avatar || UserImg}
                alt={user.name}
                className="rounded-full object-cover object-center size-10"
              />
              <div className="-space-y-1">
                <p>{user.name}</p>
                <p className="text-slate-500 text-sm font-light">
                  {user.role.name}
                </p>
              </div>
            </div>
            {locale === "en" ? <ChevronRight /> : <ChevronLeft />}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            <LogOut />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog isOpen={isLogoutOpen} setIsOpen={setLogoutOpen} />
    </ShadSidebarHeader>
  );
}

export default SidebarHeader;
