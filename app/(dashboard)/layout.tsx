import { getUser } from "@/actions/auth";
import { AppSidebar } from "@/components/AppSidebar";
import PageTitle from "@/components/PageTitle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AuthContextProvider from "@/context/AuthContext";
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
  return (
    <AuthContextProvider user={user!}>
      <SidebarProvider>
        <AppSidebar />
        <main className="mx-3 my-2">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <PageTitle />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </AuthContextProvider>
  );
}
