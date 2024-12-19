import { getUser } from "@/actions/auth";
import { AppSidebar } from "@/components/AppSidebar";
import PageTitle from "@/components/PageTitle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AuthContextProvider from "@/context/AuthContext";
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
  const user = await getUser();
  const permissionsReq = await fetchData("/permissions/list");
  if (!permissionsReq.ok)
    throw new Error("An error occured, Please try again later.");
  const permissions = (await permissionsReq.json()).data as Permission[];

  return (
    <AuthContextProvider user={user!}>
      <PermissionsContextProvider permissionsList={permissions}>
        <SidebarProvider>
          <AppSidebar />
          <main className="px-3 py-2 min-h-screen w-full overflow-hidden flex flex-col">
            <div className="flex gap-2 items-center">
              <SidebarTrigger />
              <PageTitle />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </PermissionsContextProvider>
    </AuthContextProvider>
  );
}
