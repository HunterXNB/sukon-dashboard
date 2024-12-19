"use client";
import React, { useMemo } from "react";
import {
  SidebarContent as ShadSidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
const links: {
  [k: string]: {
    link: string;
    name?: string;
  };
} = {
  roles: {
    name: "roles",
    link: "/roles",
  },
  admin: {
    name: "admin",
    link: "/admin",
  },
};
function SidebarContent() {
  const user = useUser();
  const navigationList = useMemo(() => {
    const list: (typeof links)[keyof typeof links][] = [];
    const userPermissions = [
      ...new Set(user.permissions.map((p) => p.split("-")[0])),
    ];
    userPermissions.forEach((p) => {
      if (links.hasOwnProperty(p)) {
        list.push(links[p]);
      }
    });
    return list;
  }, [user.permissions]);
  const pathname = usePathname();
  const t = useTranslations("sidebar.navigations");
  return (
    <ShadSidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{t("dashboard")}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn("", {
                  " bg-sidebar-accent text-sidebar-accent-foreground":
                    pathname === "/",
                })}
                asChild
              >
                <Link href={"/"}>
                  <span>{t("home")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {navigationList.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton
                  className={cn("", {
                    " bg-sidebar-accent text-sidebar-accent-foreground":
                      pathname.startsWith(link.link),
                  })}
                  asChild
                >
                  <Link href={link.link}>
                    <span>{t(link.name)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </ShadSidebarContent>
  );
}

export default SidebarContent;
