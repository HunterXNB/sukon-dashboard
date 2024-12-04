import { ReactNode } from "react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ThemeToggler from "@/components/ThemeToggler";
import { cn } from "@/lib/utils";
import LanguageToggler from "@/components/LanguageToggler";
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "metadata.auth",
  });
  const title = t("title");
  return {
    title,
  };
}
async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh flex flex-col gap-2 pb-5">
      <div className="w-full py-3 px-4 flex items-center justify-end gap-4">
        <LanguageToggler />
        <ThemeToggler
          className={cn(
            "bg-background dark:bg-background border-none rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-7 md:gap-9 lg:gap-10 ">
        <Image
          src="/sukon.svg"
          alt="sukon"
          className="select-none"
          width={76}
          height={76}
        />
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
