import { getUser } from "@/actions/auth";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn, fetchData } from "@/lib/utils";
import { RoleFullData } from "@/types/role";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
  isModal?: boolean;
}
async function RolePage({ params, isModal }: IProps) {
  const user = await getUser();
  const hasRolesRelatedPermissions = !!user?.permissions.find((el) =>
    /^roles-/.test(el)
  );
  if (!user?.permissions.includes("roles-show")) {
    if (hasRolesRelatedPermissions) {
      return redirect("/roles");
    }
    return redirect("/");
  }
  const [{ id }, t] = await Promise.all([params, getTranslations("rolePage")]);
  const roleId = parseInt(id);
  if (isNaN(roleId))
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
  const req = await fetchData("/roles/show/" + id);
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
  const role = res.data as RoleFullData;
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("roleName")}</span>
        {role.name}
      </p>
      <p className="flex gap-1 items-center text-lg">
        <span className="font-bold ">{t("status.statusLabel")}</span>
        {role.is_active ? (
          <Badge>{t("status.active")}</Badge>
        ) : (
          <Badge variant={"destructive"}>{t("status.inactive")}</Badge>
        )}
      </p>
      <p className="flex gap-1 items-center text-lg">
        <span className="font-bold ">
          {t("assignedToUser.assignedToUserLabel")}
        </span>

        {role.is_assigned_to_any_user ? (
          <Badge>{t("assignedToUser.yes")}</Badge>
        ) : (
          <Badge variant={"destructive"}>{t("assignedToUser.no")}</Badge>
        )}
      </p>
      <div className="flex flex-col gap-1 items-center text-lg">
        <span className="font-bold ">{t("permissions")}</span>

        {role.permissions.length > 0 ? (
          <ul
            className={cn(
              "grid  justify-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] w-full justify-items-center gap-2",
              {
                "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]": isModal,
              }
            )}
          >
            {role.permissions.map(({ id, name }) => (
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

export default RolePage;
