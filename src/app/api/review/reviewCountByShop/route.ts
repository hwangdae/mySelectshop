import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const selectshopId = searchParams.get("selectshopId") ?? undefined;

  try {
    const reviewsCount = await prisma.review.count({
      where: { selectshopId },
    });
    return NextResponse.json(reviewsCount);
  } catch (error) {
    console.log(error);
  }
};
