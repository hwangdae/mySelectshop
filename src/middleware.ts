import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  const pathname = req.nextUrl.pathname;

  if (!session) {
    if (
      pathname.startsWith("/visitedSelectshop") ||
      pathname.startsWith("/notVisitedSelectshop")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
};
