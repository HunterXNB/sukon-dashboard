import { getUser } from "@/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, fetchData } from "@/lib/utils";
import { Admin } from "@/types/Admin";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
}
async function AdminPage({ params }: IProps) {
  const user = await getUser();
  const hasRolesRelatedPermissions = (user?.permissions.Roles.length ?? 0) > 0;
  if (!user?.permissions.AdminUsers.includes("admin-users-show")) {
    if (hasRolesRelatedPermissions) {
      return redirect("/roles");
    }
    return redirect("/");
  }
  const [{ id }, t] = await Promise.all([params, getTranslations("adminPage")]);
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
  const req = await fetchData("/admin-users/show/" + id);
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
  const admin = res.data as Admin;
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("adminName")}</span>
        {admin.user.name}
      </p>

      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("email")}</span>
        <Button asChild variant={"link"}>
          <a href={`mailto:${admin.user.email}`}>{admin.user.email}</a>
        </Button>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("mobile")}</span>
        <Button asChild variant={"link"}>
          <a href={`tel:${admin.user.mobile}`}>{admin.user.mobile}</a>
        </Button>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("roleName")}</span>
        {user.permissions.Roles.includes("roles-show") ? (
          <Link href={`/roles/${admin.user.role.id}`}>
            <Badge>{admin.user.role.name}</Badge>
          </Link>
        ) : (
          <Badge>{admin.user.role.name}</Badge>
        )}
      </p>
      <p className="flex gap-1 items-center text-lg">
        <span className="font-bold ">{t("status.statusLabel")}</span>
        {admin.user.is_active ? (
          <Badge>{t("status.active")}</Badge>
        ) : (
          <Badge variant={"destructive"}>{t("status.inactive")}</Badge>
        )}
      </p>
    </div>
  );
}

export default AdminPage;
