import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔐 NÃO proteger a página de login
  if (pathname.startsWith("/adminLogin")) {
    return NextResponse.next();
  }

  const session = req.cookies.get("admin_session")?.value;

  if (!session) {
    const loginUrl = new URL("/adminLogin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
