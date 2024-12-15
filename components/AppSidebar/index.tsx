import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import LanguageToggler from "../LanguageToggler";
import ThemeToggler from "../ThemeToggler";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter>
        <div className="flex justify-between">
          <LanguageToggler />
          <ThemeToggler className="border-none rounded-full dark:bg-transparent" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
