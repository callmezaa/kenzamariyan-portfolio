import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/locales";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = (locales as readonly string[]).includes(cookie ?? "") ? cookie! : defaultLocale;

  const response = NextResponse.next();

  if (!request.cookies.has("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
