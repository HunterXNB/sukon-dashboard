import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./actions/auth";
const protectedRoutes = ["/", "/roles"];
export default async function middleware(req: NextRequest) {
  const authenticated = await isAuthenticated();
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/reset-password"
  ) {
    if (authenticated) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
