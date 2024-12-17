"use server";

import { getLocale as getMyLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const setLanguage = async (locale: "en" | "ar") => {
  const cookieStore = await cookies();
  const currentLocale = await getMyLocale();
  if (currentLocale == locale) return;
  cookieStore.set("locale", locale, {
    httpOnly: true,
  });

  revalidatePath("/", "layout");
};

export async function getLocale() {
  return (await getMyLocale()) as "ar" | "en";
}
