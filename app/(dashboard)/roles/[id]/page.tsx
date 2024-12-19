import { getUser } from "@/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn, fetchData } from "@/lib/utils";
import { Role } from "@/types/role";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
}
async function RolePage({ params }: IProps) {
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
  const { id } = await params;
  const roleId = parseInt(id);
  const t = await getTranslations("rolePage");
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
  const role = res.data as Role;
  return (
    <div className="py-3">
      <p>
        {t("roleName")}
        {role.name}
      </p>
    </div>
  );
}

export default RolePage;
