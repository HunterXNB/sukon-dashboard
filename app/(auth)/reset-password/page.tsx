import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function ResetPasswordPage() {
  const t = useTranslations("resetPasswordPage");

  return (
    <Card className="w-full max-w-[325px] min-w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">{t("formTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
      <CardFooter className="text-center">
        <Button className="w-full" asChild variant={"link"}>
          <Link href={"/login"}>{t("loginLink")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ResetPasswordPage;
