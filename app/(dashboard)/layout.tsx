import { SidebarProvider } from "@/components/ui/sidebar";
import { PermissionsContextProvider } from "@/context/PermissionsContext";
import { fetchData } from "@/lib/utils";
import { Permission } from "@/types/Permission";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "metadata.homePage",
  });
  return {
    title: t("title"),
  };
}
export default async function DashboardLayout({ children }: IProps) {
  const permissionsReq = await fetchData("/permissions/list");
  if (!permissionsReq.ok)
    throw new Error("An error occured, Please try again later.");
  const permissions = (await permissionsReq.json()).data as Permission[];

  return (
    <PermissionsContextProvider permissionsList={permissions}>
      <SidebarProvider>{children}</SidebarProvider>
    </PermissionsContextProvider>
  );
}
