import { getRequestConfig } from "next-intl/server";
import { routing, redirect, Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
    console.log("redirecting to default locale", locale);
    // redirect({ href: "/", locale: "ar" });
    // redirect(`/${locale}`);
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
