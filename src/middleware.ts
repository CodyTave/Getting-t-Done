import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

function verifyToken(token: string, secret: string) {
  try {
    return jwtVerify(token, new TextEncoder().encode(secret));
  } catch (error) {
    console.log("error", error);

    return null;
  }
}

function handleAuthentication(request: NextRequest) {
  const token = request.cookies.get("session");
  if (!token) return false;

  const decoded = verifyToken(token.value, process.env.JWT_SECRET!);
  return !!decoded;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const excludedPaths = ["/api/auth/login"];
  const assetPattern = /^\/(_next\/static|static|public)\//;

  if (
    assetPattern.test(pathname) ||
    // excludedPaths.includes(pathname) ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = handleAuthentication(request);

  if (pathname === "/login" || pathname === "/singup") {
    return isAuthenticated
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
