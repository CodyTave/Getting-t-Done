import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {}
//   const pathname = req.nextUrl.pathname;
//   const token = req.cookies.get("session");

//   if (!token) {
//     // return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const decoded = jwt.verify(
//       token?.value!,
//       process.env.JWT_SECRET as string
//     ) as JwtPayload;
//     // return NextResponse.next();
//   } catch (error) {
//     // return NextResponse.redirect(new URL("/login", req.url));
//   }
// }
