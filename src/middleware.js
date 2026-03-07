import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // LOGIN REQUIRED ROUTES
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/buyer")
  ) {

    // If user not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ROLE CHECK

    // Admin route protection
    if (pathname.startsWith("/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Seller route protection
    if (pathname.startsWith("/seller") && token.role !== "seller") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Buyer route protection
    if (pathname.startsWith("/buyer") && token.role !== "buyer") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/buyer/:path*",
  ],
};