import { getLocale } from "@/actions/intl";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Clock, Hospital, Users } from "lucide-react";
export function LoadingStatisticsCard() {
  return null;
}

export function ErrorStatisticsCard() {
  return null;
}
export async function NumberOfDoctorsStatisticsCard() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "homePage.statisticsCard",
  });

  return (
    <Card className="dark:bg-slate-900 border-none min-w-[250px]">
      <CardContent className="p-4 relative">
        <div className="space-y-2">
          <p className="text-lg font-bold">{t("doctorsStatisticsCardTitle")}</p>
          <p className="text-2xl font-bold">251</p>
        </div>
        <p className="">
          {t.rich("cardFooter", {
            msg: () => (
              <span className="inline-flex gap-1 text-green-500">
                32.3%
                <span className="border-8 w-0 border-transparent -translate-y-1/3 border-b-green-500" />
              </span>
            ),
          })}
        </p>
        <div className="absolute top-2 ltr:right-2 rtl:left-2 p-2 dark:bg-slate-800 rounded overflow-hidden grid place-content-center">
          <Hospital size={30} />
        </div>
      </CardContent>
    </Card>
  );
}

export async function NumberOfPatientsStatisticsCard() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "homePage.statisticsCard",
  });

  return (
    <Card className="dark:bg-slate-900 border-none min-w-[250px]">
      <CardContent className="p-4 relative">
        <div className="space-y-2">
          <p className="text-lg font-bold">
            {t("patientsStatisticsCardTitle")}
          </p>
          <p className="text-2xl font-bold">1058</p>
        </div>
        <p className="">
          {t.rich("cardFooter", {
            msg: () => (
              <span className="inline-flex gap-1 text-green-500">
                45.9%
                <span className="border-8 w-0 border-transparent -translate-y-1/3 border-b-green-500" />
              </span>
            ),
          })}
        </p>
        <div className="absolute top-2 ltr:right-2 rtl:left-2 p-2 dark:bg-slate-800 rounded overflow-hidden grid place-content-center">
          <Users size={30} />
        </div>
      </CardContent>
    </Card>
  );
}
export async function NumberOfAppointmentsStatisticsCard() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "homePage.statisticsCard",
  });

  return (
    <Card className="dark:bg-slate-900 border-none min-w-[250px]">
      <CardContent className="p-4 relative">
        <div className="space-y-2">
          <p className="text-lg font-bold">{t("totalAppointmentsCardTitle")}</p>
          <p className="text-2xl font-bold">2001</p>
        </div>
        <p>
          {t.rich("cardFooter", {
            msg: () => (
              <span className="inline-flex gap-1 text-destructive">
                45.9%
                <span className="border-8 w-0 border-transparent translate-y-1/3 border-t-destructive" />
              </span>
            ),
          })}
        </p>
        <div className="absolute top-2 ltr:right-2 rtl:left-2 p-2 dark:bg-slate-800 rounded overflow-hidden grid place-content-center">
          <Clock size={30} />
        </div>
      </CardContent>
    </Card>
  );
}
