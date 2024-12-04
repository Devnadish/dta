import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";
import { NextRequest, NextResponse } from "next/server";

import { CustomMiddleware } from "./chain";

export function languageMiddleware(middleware: CustomMiddleware) {
  console.log("-------------language middle ware------------- ");

  const defaultLocale = "ar"; // Declare and initialize defaultLocale

  return async function middlewareHandler(
    request: NextRequest
  ): Promise<NextResponse> {
    const handleI18nRouting = createMiddleware({
      locales: ["en", "ar"], // Specify your supported locales
      defaultLocale,
    });

    const response = await handleI18nRouting(request);

    return response;
  };
}
