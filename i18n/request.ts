import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
const langs = ["en", "ar"] as const;

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = langs.includes(cookieLocale as (typeof langs)[number])
    ? cookieLocale
    : "ar";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export { langs };
