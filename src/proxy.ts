import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    return NextResponse.redirect(
      // "/" → "/pl", not "/pl/" (which would cost a second redirect)
      new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // icon / apple-icon are generated metadata routes with no file extension
  matcher: ["/((?!_next|api|favicon\\.ico|icon|apple-icon|.*\\..*).*)"],
};
