import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/locale-sync";

/** TalentX is light-only; inbound `?theme=` is ignored. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (process.env.VERCEL_ENV === "production" && host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.host = "talentxrecruiting.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const lang = request.nextUrl.searchParams.get("lang");

  if (!isLocale(lang)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set("talentx-locale", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
