// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  if (!session) {
    return NextResponse.redirect(
      new URL("/adminLogin", req.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
