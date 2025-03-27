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
  Roles: {
    name: "roles",
    link: "/roles",
  },
  AdminUsers: {
    name: "admin",
    link: "/admin",
  },
  Tiers: {
    name: "tiers",
    link: "/tiers",
  },
  Users: {
    name: "users",
    link: "/users",
  },
  Settings: {
    name: "settings",
    link: "/settings",
  },
  Specializations: {
    name: "specializations",
    link: "/specializations",
  },
};
function SidebarContent() {
  const user = useUser();
  const navigationList = useMemo(() => {
    if (user.permissions) {
      const list: (typeof links)[keyof typeof links][] = [];
      const userPermissions = Object.entries(user.permissions)
        .filter(
          (el) =>
            el[1].length > 0 &&
            !(el[1].length === 1 && el[1][0].endsWith("show"))
        )
        .map((el) => el[0]);
      userPermissions.forEach((p) => {
        if (links.hasOwnProperty(p)) {
          list.push(links[p]);
        }
      });
      return list;
    }
    return null;
  }, [user?.permissions]);
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
            {navigationList
              ? navigationList.map((link) => (
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
                ))
              : null}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </ShadSidebarContent>
  );
}

export default SidebarContent;
