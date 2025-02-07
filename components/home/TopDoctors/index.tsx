import { getLocale } from "@/actions/intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { TopDoctorChart } from "./TopDoctorsChart";

export default async function TopDoctors() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "homePage.topDoctors",
  });
  return (
    <Card className="border-none h-full flex-col bg-muted flex overflow-hidden  dark:bg-slate-900">
      <CardHeader>
        <CardTitle>{t("topDoctorsCardTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden ">
        <TopDoctorChart />
      </CardContent>
    </Card>
  );
}
