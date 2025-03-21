import { getUser } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, fetchData } from "@/lib/utils";
import { AppUserFull } from "@/types/user";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import DefaultAvatar from "@/assets/user.webp";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
interface IProps {
  params: Promise<{ id: string }>;
  isModal?: boolean;
}
export default async function UserPage({ params }: IProps) {
  const user = await getUser();
  const hasUserssRelatedPermissions =
    (user?.permissions?.Users.length ?? 0) > 0;
  if (!user?.permissions?.Users.includes("users-show")) {
    if (hasUserssRelatedPermissions) {
      return redirect("/users");
    }
    return redirect("/");
  }
  const [{ id }, t] = await Promise.all([params, getTranslations("userPage")]);
  const userId = parseInt(id);
  if (isNaN(userId))
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
  const req = await fetchData("/users/show/" + id);
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
  const pageUser = res.data.user as AppUserFull;
  return (
    <div className="py-3 flex-1 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative size-14 rounded-full overflow-hidden object-cover">
          <Image
            fill
            src={pageUser.avatar || DefaultAvatar}
            alt={user.first_name}
            className="object-cover"
          />
        </div>
        <p className="text-lg font-bold">
          {[pageUser.first_name, pageUser.last_name]
            .filter((el) => el != null)
            .join(" ") || ""}
        </p>
      </div>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("email")}</span>
        <Button asChild variant={"link"}>
          <a href={`mailto:${pageUser.email}`}>{pageUser.email}</a>
        </Button>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("status")}</span>
        <Badge variant={pageUser.is_active ? "default" : "destructive"}>
          {t(pageUser.is_active ? "active" : "inactive")}
        </Badge>
      </p>{" "}
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("lastLogin")}</span>
        <span>{format(pageUser.last_login_at, "dd/MM/yyyy")}</span>
      </p>
      <p className="flex gap-1 items-center text-xl">
        <span className="font-bold ">{t("loginCount")}</span>
        <span>{pageUser.login_count}</span>
      </p>
    </div>
  );
}
