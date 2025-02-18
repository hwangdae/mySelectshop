import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? undefined;

  const reviewCount = await prisma.review.count({
    where: {
      userId,
    },
  });
  return NextResponse.json(reviewCount);
};
