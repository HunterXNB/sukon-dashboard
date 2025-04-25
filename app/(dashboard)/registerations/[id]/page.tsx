import { getUser } from "@/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, fetchData } from "@/lib/utils";
import { RegistrationFullData } from "@/types/Registration";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
}
async function RegisterationPage({ params }: IProps) {
  const user = await getUser();
  const hasRegisterationsRelatedPermissions =
    (user?.permissions?.Registrations.length ?? 0) > 0;
  if (!user?.permissions?.Registrations.includes("registrations-show")) {
    if (hasRegisterationsRelatedPermissions) {
      return redirect("/registerations");
    }
    return redirect("/");
  }
  const [{ id }, t] = await Promise.all([
    params,
    getTranslations("registerationPage"),
  ]);
  const registerationId = parseInt(id);
  if (isNaN(registerationId))
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p>
          {" "}
          {t.rich("invalidId", {
            a: (chunks) => (
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "p-0"
                )}
                href={"/"}
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    );
  const req = await fetchData("/providers/registerations/show/" + id);
  const res = await req.json();
  if (!req.ok) {
    if (req.status === 404)
      return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <p>
            {t.rich("notFound", {
              a: (chunks) => (
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "link",
                    }),
                    "p-0"
                  )}
                  href={"/"}
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      );
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <p>{res.message}</p>
      </div>
    );
  }
  const registeration = res.data as RegistrationFullData;
  return (
    <div className="py-3 flex-1 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] sm:colu gap-2">
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("name")}</span>
        {[registeration.first_name, registeration.last_name]
          .filter((val) => val !== null)
          .join(" ") || "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("title")}</span>
        <span dir="ltr">{registeration.title}</span>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("email")}</span>
        <Button asChild variant={"link"}>
          <a href={`mailto:${registeration.email}`}>{registeration.email}</a>
        </Button>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("mobile")}</span>
        {registeration.mobile ? (
          <Button asChild variant={"link"}>
            <a href={`tel:${registeration.mobile}`}>{registeration.mobile}</a>
          </Button>
        ) : (
          "_"
        )}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("role")}</span>

        <Badge>{registeration.role}</Badge>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("status")}</span>

        <Badge
          variant={
            registeration.registration_status === "rejected"
              ? "destructive"
              : registeration.registration_status === "pending"
              ? "secondary"
              : "default"
          }
          className={cn()}
        >
          {t(registeration.registration_status)}
        </Badge>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("gender.title")}</span>
        {registeration.gender ? t(`gender.${registeration.gender}`) : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("date_of_birth")}</span>
        {registeration.date_of_birth ? registeration.date_of_birth : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("nationality")}</span>
        {registeration.nationality ? registeration.nationality : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("country_of_residence")}</span>
        {registeration.country_of_residence
          ? registeration.country_of_residence
          : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("lang")}</span>
        {registeration.fluent_language ? registeration.fluent_language : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("highest_degree")}</span>
        {registeration.highest_degree ? registeration.highest_degree : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("university")}</span>
        {registeration.university ? registeration.university : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("grad_year")}</span>
        {registeration.graduation_year ? registeration.graduation_year : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("classification")}</span>
        {registeration.classification ? registeration.classification : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("specification")}</span>
        {registeration.specification ? registeration.specification : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("years_of_experience")}</span>
        {registeration.years_of_experience
          ? registeration.years_of_experience
          : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("licensing_area")}</span>
        {registeration.licensing_area ? registeration.licensing_area : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("license_Number")}</span>
        {registeration.licensing_number ? registeration.licensing_number : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("address")}</span>
        {registeration.clinic_address ? registeration.clinic_address : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("usd")}</span>
        {registeration.session_usd_price
          ? registeration.session_usd_price
          : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("egp")}</span>
        {registeration.session_egp_price
          ? registeration.session_egp_price
          : "_"}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("work_on_clinic.title")}</span>
        {registeration.work_on_clinic ? (
          <Badge> {t("work_on_clinic.yes")}</Badge>
        ) : (
          <Badge variant={"destructive"}>{t("work_on_clinic.no")}</Badge>
        )}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("more_than_qualification.title")}</span>
        {registeration.has_more_than_one_qualification ? (
          <Badge> {t("more_than_qualification.yes")}</Badge>
        ) : (
          <Badge variant={"destructive"}>
            {t("more_than_qualification.no")}
          </Badge>
        )}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("available.title")}</span>
        {registeration.available_now ? (
          <Badge> {t("available.yes")}</Badge>
        ) : (
          <Badge variant={"destructive"}>{t("available.no")}</Badge>
        )}
      </p>
    </div>
  );
}

export default RegisterationPage;
