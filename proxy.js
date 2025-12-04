import { NextResponse } from "next/server";

export function proxy(req) {
  const url = req.nextUrl;
  const refresh = req.cookies.get("refresh_token")?.value;

  const isAuthPage =
    url.pathname.startsWith("/login") || url.pathname.startsWith("/register");

  if (!refresh) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (refresh && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
