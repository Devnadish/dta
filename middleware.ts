import { chain } from "@/middlewares/chain";
import { withMiddleware2 } from "@/middlewares/middleware2";
import { languageMiddleware } from "@/middlewares/language";

const midillerWares = [withMiddleware2, languageMiddleware];

export default chain([withMiddleware2, languageMiddleware]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(ar|en)/:path*",
    "/",
  ],
};
