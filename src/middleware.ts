import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "id"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = LOCALES.includes(cookie ?? "") ? cookie! : DEFAULT_LOCALE;
  const requestHeaders = new NextResponse().headers;
  requestHeaders.set("x-next-locale", locale);

  const response = NextResponse.next();

  if (!request.cookies.has("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", DEFAULT_LOCALE, {
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
