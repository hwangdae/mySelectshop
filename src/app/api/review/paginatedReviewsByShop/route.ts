import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const selectshopId = searchParams.get("selectshopId") ?? undefined;
  const pageParam = parseInt(searchParams.get("pageParam") || "1");
  const pageSize = 6;
  try {
    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where: { selectshopId },
        skip: pageSize * (pageParam - 1),
        take: pageSize,
      }),
      prisma.review.count({
        where: { selectshopId },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return NextResponse.json({
      reviews,
      page: pageParam,
      total_pages: totalPages,
    });
  } catch (error: unknown) {
    console.log(error);
  }
};
