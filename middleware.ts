import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./lib/auth";

export async function middleware(req: any) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
