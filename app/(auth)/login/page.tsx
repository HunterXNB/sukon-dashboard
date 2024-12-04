import LoginForm from "@/components/LoginForm";
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

function LoginPage() {
  const t = useTranslations("loginPage");

  return (
    <Card className="w-full max-w-[325px] min-w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">{t("formTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="text-center">
        <Button className="w-full" asChild variant={"link"}>
          <Link href={"/reset-password"}>{t("forgotPasswordLink")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
