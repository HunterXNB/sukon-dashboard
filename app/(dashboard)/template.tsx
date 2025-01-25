import { getUser } from "@/actions/auth";
import { AppSidebar } from "@/components/AppSidebar";
import PageTitle from "@/components/PageTitle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthContextProvider from "@/context/AuthContext";
import { ReactNode } from "react";

async function DashboardTemplate({ children }: { children: ReactNode }) {
  const user = await getUser();
  return (
    <AuthContextProvider user={user!}>
      <AppSidebar />
      <main className="px-3 py-2 min-h-screen w-full overflow-hidden flex flex-col">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />
          <PageTitle />
        </div>
        {children}
      </main>
    </AuthContextProvider>
  );
}

export default DashboardTemplate;
