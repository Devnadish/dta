import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/admin"];
    const isAuthRoute = pathname.startsWith("/auth/login");
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (isAuthRoute && isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);
export const config = { matcher: ["/admin/:path*", "/auth/:path*"] };
