import { getUser } from "@/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn, fetchData } from "@/lib/utils";
import { TierFullData } from "@/types/Tiers";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
  isModal?: boolean;
}
export default async function TierPage({ params, isModal }: IProps) {
  const user = await getUser();
  const hasTiersRelatedPermissions = (user?.permissions?.Tiers.length ?? 0) > 0;
  if (!user?.permissions?.Tiers.includes("tiers-show")) {
    if (hasTiersRelatedPermissions) {
      return redirect("/tiers");
    }
    return redirect("/");
  }
  const [{ id }, t] = await Promise.all([params, getTranslations("tierPage")]);
  const tierId = parseInt(id);
  if (isNaN(tierId))
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
  const req = await fetchData("/tiers/show/" + id);
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
  const tp = await getTranslations("permissionsNames");
  const tier = res.data as TierFullData;
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("tierName")}</span>
        {tier.name}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold self-start ">{t("tierDescription")}</span>
        {tier.description}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold self-start ">{t("usd_price")}</span>
        {tier.usd_price}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold self-start ">{t("egp_price")}</span>
        {tier.egp_price}
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold self-start ">{t("commission")}</span>
        {tier.commission}
      </p>
      <div className="flex flex-col gap-1 items-center text-lg">
        <span className="font-bold ">{t("permissions")}</span>

        {tier.permissions.length > 0 ? (
          <ul
            className={cn(
              "grid  justify-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] w-full justify-items-center gap-2",
              {
                "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]": isModal,
              }
            )}
          >
            {tier.permissions.map(({ id, name }) => (
              <li className={"w-full h-full"} key={id}>
                <span className={cn(buttonVariants(), "w-full ")}>
                  {tp(name)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <li className="list-none">
            <p>{t("noPermissions")}</p>
          </li>
        )}
      </div>
    </div>
  );
}
